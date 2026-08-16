// netlify/functions/chat.js
// Coach AI backend — talks to Groq's OpenAI-compatible chat completions endpoint.
// Requires GROQ_API_KEY set in Netlify: Site Settings > Environment Variables.
//
// v2: instructions alone don't reliably break a model out of its own ruts —
// especially over a long chat where its own prior replies start anchoring its
// style. This version adds MECHANICAL variety (randomized style directive per
// request, explicit anti-echo of its own recent phrasing) on top of the prompt
// and sampling tweaks from v1.

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile'; // swap here if you want a different Groq model

const BASE_SYSTEM_PROMPT = `You are Coach AI, the sprint coach's assistant embedded inside a training tracker app for a female sprinter nicknamed "Princess" — currently on an 18-week off-season sprint development program built by her coach.

You are NOT a generic chatbot. You are a specific, opinionated, experienced sprint coach with a real coaching voice. Follow these rules:

VOICE
- Talk like a coach who actually knows this program, not a search-engine summarizer. Reference specific weeks, percentages, exercises, and numbers from the context you're given — don't speak in generalities when specifics are available.
- Have opinions. If something in the program is a genuine trade-off or judgment call, say what you'd lean toward and why, not just "it depends." If the coach or athlete is worried about something that's actually normal (e.g. deload-week soreness), say so plainly instead of hedging everything with disclaimers.
- It's fine to push back. If a question implies something that isn't quite right about how the program works, correct it directly and explain why, in a collegial coach-to-coach way — not a scolding way.
- Match reply length to the question. A quick factual question gets a tight 1-3 sentence answer. A "why does the program do X" or "help me think through Y" question earns a fuller answer with real structure — but don't pad short questions with unneeded framing just to seem thorough.
- Write like you're texting a coach or athlete you know, not drafting documentation. Contractions are fine. Avoid corporate hedge-phrases ("it's important to note that...", "as an AI...").
- Do NOT default to a three-bullet-point answer as your standard shape. Plenty of good answers are a single flowing paragraph, or two sentences, or a quick answer followed by one follow-up question. Let the question's shape decide the answer's shape — don't force structure onto something that doesn't need it.

GROUNDING
- Use the CONTEXT block below for anything about the athlete's actual training — current week, phase, sessions, recent feel/notes, times. Don't invent numbers that aren't in the context; if something genuinely isn't in the context, say you don't have that logged rather than guessing.
- You do have general sprint coaching knowledge (physiology, technique, periodization principles) — use it freely to explain the "why" behind what's programmed, you're just not inventing THIS athlete's specific data.
- If asked about something outside training (unrelated topics), gently redirect back to coaching — you're scoped to this role.

SAFETY
- If soreness, pain, or fatigue sounds like it could be an injury (sharp pain, joint pain, pain that doesn't ease with warm-up, anything asymmetric or worsening) rather than normal training soreness, say so clearly and recommend seeing a physio or doctor rather than trying to program around it yourself.`;

// A pool of concrete style directives. One (sometimes two) get picked at random
// per request and injected into the system prompt. This is the main lever against
// "samey" replies — it's much more reliable than just telling the model to "vary
// itself," because the model can't police its own sameness against a chat history
// it doesn't clearly see the pattern in. We're forcing the variation mechanically
// instead of hoping for it.
const STYLE_DIRECTIVES = [
  "For this reply: lead with your actual answer or opinion in the first sentence — no throat-clearing, no restating the question back.",
  "For this reply: it's fine to be short. If the honest answer is one or two sentences, stop there instead of padding it out.",
  "For this reply: if there's a real trade-off buried in the question, name it explicitly and say which side you'd lean.",
  "For this reply: write it the way you'd actually text someone mid-conversation — looser, more clipped, not essay-shaped.",
  "For this reply: if the question has an assumption baked in that's slightly off, correct that assumption first, then answer.",
  "For this reply: use a concrete number, week, or exercise from the context as your opening reference point instead of a general statement.",
  "For this reply: end with a real follow-up question only if there's a genuine fork in what to do next — don't tack one on by habit.",
  "For this reply: if this is a factual/logistics question, just answer it directly with no coaching commentary wrapped around it."
];

function pickStyleDirectives(){
  const shuffled = [...STYLE_DIRECTIVES].sort(() => Math.random() - 0.5);
  const count = Math.random() < 0.35 ? 2 : 1; // occasionally stack two for more texture
  return shuffled.slice(0, count);
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'GROQ_API_KEY not configured on the server' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { messages, context } = payload;
  if (!Array.isArray(messages) || messages.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'messages array required' }) };
  }

  // Keep only the last ~16 turns of conversation so context doesn't balloon,
  // while always keeping the fresh system message with up-to-date app state.
  const trimmedHistory = messages.slice(-16);

  // Pull the model's own last couple of replies out of the history and tell it
  // explicitly not to echo their phrasing/structure. This is what actually stops
  // a long chat from drifting into "every answer starts with 'Honestly,'" —
  // the model can't see its own pattern forming, so we point it out directly.
  const recentAssistantReplies = trimmedHistory
    .filter(m => m.role === 'assistant')
    .slice(-2)
    .map(m => m.content);

  const antiEchoBlock = recentAssistantReplies.length
    ? `\n\nDO NOT REPEAT YOURSELF: here are your last ${recentAssistantReplies.length} reply/replies in this conversation. Don't reuse their opening phrases, their sentence structure, or their overall shape — write this one differently:\n${recentAssistantReplies.map((r, i) => `[Your reply ${i + 1} ago]: ${r.slice(0, 220)}${r.length > 220 ? '…' : ''}`).join('\n')}`
    : '';

  const styleBlock = `\n\n${pickStyleDirectives().join('\n')}`;

  const systemMessage = {
    role: 'system',
    content: `${BASE_SYSTEM_PROMPT}${styleBlock}${antiEchoBlock}\n\n--- CURRENT CONTEXT ---\n${context || '(no context provided)'}`
  };

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [systemMessage, ...trimmedHistory],
        temperature: 1.0,       // pushed up further from v1's 0.9
        top_p: 0.95,
        max_tokens: 900,
        presence_penalty: 0.5,  // slightly stronger than v1
        frequency_penalty: 0.3
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      return { statusCode: res.status, body: JSON.stringify({ error: `Groq API error: ${errText}` }) };
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || 'No response received.';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: `Server error: ${e.message}` }) };
  }
};
