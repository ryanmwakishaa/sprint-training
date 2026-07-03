exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GROQ_API_KEY not set in Netlify environment variables.' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch(e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body.' }) };
  }

  const { messages, context: appContext } = body;

  if (!messages || !Array.isArray(messages)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'messages array required.' }) };
  }

  // ── SYSTEM PROMPT ──────────────────────────────────────────────────────────
  // This is what the AI reads before every conversation. It contains the full
  // athlete profile, program structure, and any live data passed from the app.
  const systemPrompt = `You are a sprint coaching assistant embedded in a training app used by a coach (Ryan) and his athlete. You have deep knowledge of sprint development, strength and conditioning, and athletic performance.

ATHLETE PROFILE
- Female, age 20
- Height: 5'7" (170cm), Starting weight: ~67kg, Target: 72–73kg by Week 18
- Current 100m PB: ~13.5 seconds
- Program target: low 12s range
- Gym background: Strong. Hip Thrust ~160kg, Box Squat ~90kg
- Sprint background: Beginner — limited sprint-specific training before this program
- Key mobility restrictions: Ankle dorsiflexion limited (restricts squat depth), hip mobility needs work
- Build: Long femurs — squat depth limited by leverages, not skeletal structure. Fixable.

PROGRAM STRUCTURE — 18 WEEKS
Phase 1 (Weeks 1–4): Movement Foundation
  No running. Mobility first. Band complexes. Wall drills. Mach drill introduction.
  Goal: Fix ankle/hip mobility, build foundational glute/hip activation, establish sprint posture.

Phase 2 (Weeks 5–9): Strength Build
  Barbell loading increases. Speed bands introduced. First 20m sprints (Week 7).
  Goal: Build maximal force production. Sled work for horizontal force. 1RM testing Week 9.

Phase 3 (Weeks 10–13): Power Expression
  Plyometrics. Sprint distances to 80m. PAP complexes. First timed 60m + 100m (Week 12).
  Goal: Convert strength to explosive power. Race mechanics under speed.

Phase 4 (Weeks 14–18): Speed + Endurance
  Sprint sharpening. Steady-state endurance arc (60sec → 90sec → back down, rising intensity).
  Goal: Race-ready speed with capacity to sustain it across 100m.

KEY PROTOCOLS (referenced in sessions)
- Daily Mobility: Ankle wall stretch, hip flexor, 90/90, pigeon, deep squat, thoracic rotation, banded march — 12–15min before every session
- Band Complex A: Glute bridge, clamshell, lateral walk, hip flexion, pull-apart
- Band Complex B: SL glute bridge, TKE, hip extension kickback, ankle dorsiflexion, slow high knees
- Wall Drills A/B: Static drive position, wall march, A-skip mechanics — all no-run
- Mach Drills: A-skip, B-skip, C-skip, power skip, straight-leg bound, high knee run, arm drive
- Speed Band A: Resisted wall march, drive drill 10m, knee drive hold, standing high knee march
- Speed Band B: Resisted A-skip, bound, arm drive, calf raise
- Sled: ~10% bodyweight, 20m reps — horizontal force tool, not conditioning
- PAP Complex: Heavy lift → 4min rest → explosive movement (broad jump / depth jump)
- SS Endurance: Week 14: 2×60sec @86–88% → Week 15: 2×70sec @87–89% → Week 16: 2×90sec (peak) → Week 17: 2×70sec @90–92% → Week 18: 40sec→20sec @92–96%

STRENGTH TARGETS BY PHASE
- Hip Thrust: 3×8 @60% → 5×5 @70–78% → 5×3 @80–84% → 3×3 @82–87%
- Box Squat: 4×8 high box → 4×5 @68–76% → 4×4 @80–84% → 3×3 @82–84%
- Trap Bar DL: — → 4×5 @65–75% → 4×4 @78–83% → 3×4 @80–82%
- Nordic Curl: 3×6 → 3×5–6 → 4×5 → 2×4–5

CURRENT APP STATE (live data from the app)
${appContext || 'No session data provided yet.'}

YOUR ROLE
- Answer questions from both coach and athlete — be honest about who you're likely talking to based on context
- For athlete questions: be encouraging, clear, practical. Avoid jargon unless they ask for it.
- For coach questions: be technically precise. Discuss load management, periodisation, biomechanics as needed.
- Always ground advice in this specific athlete's profile and program — never give generic fitness advice
- If something is outside your knowledge (injury diagnosis, medical advice) say so clearly and recommend they see a professional
- Keep responses concise and conversational — this is a mobile app, not a textbook
- If asked about a specific week or session, refer to the program structure above`;

  // ── GROQ API CALL ──────────────────────────────────────────────────────────
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',  // current Groq 70B model (replaces decommissioned llama3-70b-8192)
        max_tokens: 1024,
        temperature: 0.65,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages  // full conversation history from the app
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Groq API error: ${err}` })
      };
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'No response from model.';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    };

  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Function error: ${e.message}` })
    };
  }
};
