// ===== CHAT / COACH AI =====
const CHAT_SUGGESTIONS = [
  "What should I focus on in today's session?",
  "Why does the program delay sprinting until week 7?",
  "My hamstrings are sore — should I be worried?",
  "What does Band Complex A actually do?",
  "How do I know if the mobility work is working?",
  "What's the difference between A-skip and B-skip?",
  "Why does the sled work matter for sprinting?",
  "She's struggling with the B-skip — what should I cue?",
  "What should the 100m time look like by week 12?",
  "Explain PAP and why it's in the program"
];

let chatHistory = [];

function buildChatSuggestions(){
  const grid=document.getElementById('suggestGrid');
  if(!grid) return;
  grid.innerHTML=CHAT_SUGGESTIONS.slice(0,6).map(s=>
    `<button class="suggest-chip" onclick="useSuggestion(this)">${s}</button>`
  ).join('');
}

function useSuggestion(btn){
  document.getElementById('chatInput').value=btn.textContent;
  document.getElementById('chatSuggestions').style.display='none';
  sendChat();
}

function buildAppContext(){
  const w=state.currentWeek;
  const wk=WEEKS[w];
  const log=state.weekLogs[w]||{};
  const feelLabels=['','Tired','Okay','Good','Great','Peak'];
  let totalDone=0;
  WEEKS.forEach((wk2,i)=>wk2.sessions.forEach((_,d)=>{if(state.sessions[sk(i,d)]==='done')totalDone++;}));
  const recentFeels=[];
  for(let i=Math.max(0,w-3);i<=w;i++){const l=state.weekLogs[i]||{};if(l.feel)recentFeels.push(`Week ${i+1}: ${feelLabels[l.feel]}${l.notes?' ("'+l.notes.substring(0,60)+'")':''}`);}
  const recentTimes=(state.times||[]).slice(-5).map(t=>`${t.ev}: ${t.val}s (Week ${t.week})`);
  const thisWeekFull=wk.sessions.map((s,d)=>`  ${s.day} [${s.type}, ${state.sessions[sk(w,d)]||'pending'}]: ${s.detail}`).join('\n');
  const adjacentWeeks=[w-1,w+1].filter(i=>i>=0&&i<WEEKS.length).map(i=>`Week ${i+1} (${WEEKS[i].phase}${WEEKS[i].deload?' — deload':''}): ${WEEKS[i].focus}`).join('\n');
  const phaseOverview=[
    "Phase 1 — Movement foundation (Wks 1–4): mobility, band work, wall drills, no running.",
    "Phase 2 — Strength build (Wks 5–9): heavy compound lifts, sled introduced, first sprints, ends in 1RM testing.",
    "Phase 3 — Power expression (Wks 10–13): plyometrics, first timed 60m/100m, sled push+pull contrast work, ends in deload/reassessment.",
    "Phase 4 — Speed + endurance (Wks 14–18): steady-state endurance arc rising then descending, dedicated max-velocity fly work + assisted overspeed added to chase a high-11s stretch goal (up from the original low-12s target), sharpest sprint work, ends in a final timed 100m — the high-11s target was not hit at this point.",
    "Phase 5 — Max velocity & race conversion (Wks 19–24, added after Phase 4's 100m target wasn't hit): strength shifts to maintenance only, flying-sprint volume increases, reaction/block-start work added, a second controlled overspeed exposure (repeated exposure converts better than a single one-off), speed-endurance work specifically targeting holding top velocity through the back half of the race, a split-timed (30m/60m/100m) diagnostic 100m in Week 22, then a taper into a final retest in Week 24 comparing Week 12 → Week 18 → Week 24."
  ].join('\n');
  const glossaryIndex=GLOSSARY.map(g=>`${g.name} (${g.tag})`).join('; ');
  return `ATHLETE PROFILE: ${ATHLETE_NOTE}

PROGRAM OVERVIEW (5 phases, 24 weeks):
${phaseOverview}

NAMED PROTOCOLS AVAILABLE (glossary — pull specifics from these when relevant, don't just say "do your mobility work"):
${glossaryIndex}

CURRENT WEEK: ${w+1} of ${WEEKS.length} — ${wk.phase} phase${wk.deload?' (DELOAD WEEK)':''}
WEEK FOCUS: ${wk.focus}
THIS WEEK'S FULL SESSION PLAN:
${thisWeekFull}

NEARBY WEEKS FOR CONTEXT:
${adjacentWeeks}

TOTAL SESSIONS COMPLETED SO FAR: ${totalDone}
${log.feel?`FEEL THIS WEEK: ${feelLabels[log.feel]}${log.notes?' — "'+log.notes+'"':''}`:''}
${recentFeels.length?'RECENT FEELS:\n'+recentFeels.join('\n'):''}
${recentTimes.length?'RECENT TIMES:\n'+recentTimes.join('\n'):'NO TIMES LOGGED YET'}`;
}

function autoResize(el){el.style.height='auto';el.style.height=Math.min(el.scrollHeight,120)+'px';}
function handleChatKey(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChat();}}

function appendBubble(role,text){
  const msgs=document.getElementById('chatMessages');
  const bubble=document.createElement('div');
  bubble.className=`chat-bubble ${role}`;
  const now=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  bubble.innerHTML=`<div class="bubble-content">${text.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}</div><div class="bubble-time">${role==='assistant'?'Coach AI · ':'You · '}${now}</div>`;
  msgs.appendChild(bubble);
  msgs.scrollTop=msgs.scrollHeight;
}

function showTyping(){
  const msgs=document.getElementById('chatMessages');
  const el=document.createElement('div');
  el.className='chat-bubble assistant';el.id='typingIndicator';
  el.innerHTML=`<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
  msgs.appendChild(el);msgs.scrollTop=msgs.scrollHeight;
}
function hideTyping(){const el=document.getElementById('typingIndicator');if(el)el.remove();}

async function sendChat(){
  const input=document.getElementById('chatInput');
  const sendBtn=document.getElementById('chatSend');
  const text=input.value.trim();
  if(!text||sendBtn.disabled) return;
  document.getElementById('chatSuggestions').style.display='none';
  appendBubble('user',text);
  chatHistory.push({role:'user',content:text});
  input.value='';input.style.height='auto';sendBtn.disabled=true;
  showTyping();
  try{
    const res=await fetch('/.netlify/functions/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:chatHistory,context:buildAppContext()})});
    hideTyping();
    if(!res.ok){const err=await res.json().catch(()=>({}));appendBubble('assistant',`Something went wrong (${res.status}): ${err.error||'Unknown error'}. Check Netlify function logs and confirm GROQ_API_KEY is set.`);sendBtn.disabled=false;return;}
    const data=await res.json();
    const reply=data.reply||'No response received.';
    chatHistory.push({role:'assistant',content:reply});
    appendBubble('assistant',reply);
  }catch(e){
    hideTyping();
    appendBubble('assistant','Could not reach the server. Make sure the app is deployed on Netlify and GROQ_API_KEY is set in Site Settings &gt; Environment Variables.');
  }
  sendBtn.disabled=false;
}
