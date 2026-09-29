// ===== COACH VIEW (PIN-gated, read-only) =====
// Change this to whatever PIN you want to require for coach access.
// This is a client-side deterrent, not real security 
//anyone reading the page source (or opening dev tools) can see it. 
// It's meant to keep a curious athlete out of the coach view on a shared/installed app, not to
// stop a determined attacker.
const COACH_PIN = '2468';

let coachViewState = null;
let coachPollTimer = null;

function isCoachUnlocked(){
  try{ return localStorage.getItem('coachUnlocked') === 'true'; }catch(e){ return false; }
}

function tryCoachUnlock(){
  const input = document.getElementById('coachPinInput');
  const err = document.getElementById('coachPinError');
  if(input.value === COACH_PIN){
    try{ localStorage.setItem('coachUnlocked','true'); }catch(e){}
    input.value='';
    err.style.display='none';
    openCoachDashboard();
  } else {
    err.style.display='block';
    input.value='';
    input.focus();
  }
}

function lockCoachView(){
  try{ localStorage.removeItem('coachUnlocked'); }catch(e){}
  stopCoachPolling();
  document.getElementById('coachGate').style.display='block';
  document.getElementById('coachDashboard').style.display='none';
}

// ===== HIDDEN COACH TAB — revealed only by a secret tap sequence =====
// Tap the "24" badge in the header 5 times within 2 seconds to reveal the
// Coach tab. Once revealed it stays visible on this device across reloads
// (nothing to redo every day) until you explicitly Hide it again from
// inside the dashboard, which re-hides the tab and forgets the reveal.
let secretTapCount=0, secretTapTimer=null;
function secretTap(){
  secretTapCount++;
  clearTimeout(secretTapTimer);
  secretTapTimer=setTimeout(()=>{ secretTapCount=0; }, 2000);
  if(secretTapCount>=5){
    secretTapCount=0;
    clearTimeout(secretTapTimer);
    revealCoachTab();
  }
}

function revealCoachTab(){
  try{ localStorage.setItem('coachTabRevealed','1'); }catch(e){}
  const btn=document.getElementById('coachTabBtn');
  if(btn) btn.style.display='';
}

function hideCoachTab(){
  try{ localStorage.removeItem('coachTabRevealed'); }catch(e){}
  const btn=document.getElementById('coachTabBtn');
  if(btn) btn.style.display='none';
  lockCoachView();
  switchTab(0, document.querySelector('.tab'));
}

try{
  if(localStorage.getItem('coachTabRevealed')==='1'){
    const btn=document.getElementById('coachTabBtn');
    if(btn) btn.style.display='';
  }
}catch(e){}

function openCoachTab(){
  if(isCoachUnlocked()){
    openCoachDashboard();
  } else {
    document.getElementById('coachGate').style.display='block';
    document.getElementById('coachDashboard').style.display='none';
    setTimeout(()=>{ const el=document.getElementById('coachPinInput'); if(el) el.focus(); }, 50);
  }
}

async function openCoachDashboard(){
  document.getElementById('coachGate').style.display='none';
  document.getElementById('coachDashboard').style.display='block';
  await refreshCoachView();
  startCoachPolling();
}

function setCoachSyncStatus(s){
  const el=document.getElementById('coachSyncIndicator');
  if(!el) return;
  const map={
    loading:['●','var(--go-dark)','Loading…'],
    live:['●','var(--sage-deep)','Live'],
    error:['●','var(--track)','Could not load — check connection']
  };
  const [dot,color,label]=map[s]||map.loading;
  el.innerHTML=`<span style="color:${color}">${dot}</span> ${label}`;
}

// Pulls a fresh, independent copy of the athlete's data purely for display —
// deliberately never touches the shared `state` object used by the Sessions/
// Progress/Program tabs, so viewing the Coach tab can never clobber an
// in-progress edit on this device the way a naive remote-overwrite would.
async function refreshCoachView(){
  setCoachSyncStatus('loading');
  if(!sb){
    setCoachSyncStatus('error');
    return;
  }
  const remote = await pullFromSupabase();
  if(remote && remote.state && Object.keys(remote.state).length){
    coachViewState = remote.state;
    renderCoachView();
    setCoachSyncStatus('live');
  } else {
    setCoachSyncStatus('error');
  }
}

function startCoachPolling(){
  stopCoachPolling();
  coachPollTimer = setInterval(refreshCoachView, 20000);
}
function stopCoachPolling(){
  if(coachPollTimer){ clearInterval(coachPollTimer); coachPollTimer=null; }
}

function renderCoachView(){
  if(!coachViewState) return;
  const w = coachViewState.currentWeek || 0;
  const wk = WEEKS[w];

  let totalDone=0, totalSessions=0;
  WEEKS.forEach((wkX,i)=>{
    wkX.sessions.forEach((_,d)=>{
      totalSessions++;
      if(coachViewState.sessions && coachViewState.sessions[sk(i,d)]==='done') totalDone++;
    });
  });
  document.getElementById('c-week').textContent = `${w+1} / ${WEEKS.length}`;
  document.getElementById('c-phase').textContent = wk.phase;
  document.getElementById('c-done').textContent = `${totalDone}/${totalSessions}`;
  const feels = Object.values(coachViewState.weekLogs||{}).filter(l=>l&&l.feel).map(l=>l.feel);
  document.getElementById('c-feel').textContent = feels.length ? (feels.reduce((a,b)=>a+b,0)/feels.length).toFixed(1) : '—';

  const feelLabels=['','Tired','Okay','Good','Great','Peak'];
  const flags=[];
  const thisWeekLog=(coachViewState.weekLogs||{})[w];
  if(thisWeekLog && thisWeekLog.feel && thisWeekLog.feel<=2){
    flags.push(`Feel logged as "${feelLabels[thisWeekLog.feel]}" this week${thisWeekLog.notes?' — "'+thisWeekLog.notes+'"':''}`);
  }
  const skippedThisWeek = wk.sessions.filter((_,d)=>coachViewState.sessions && coachViewState.sessions[sk(w,d)]==='skip').length;
  if(skippedThisWeek>0){
    flags.push(`${skippedThisWeek} session${skippedThisWeek>1?'s':''} skipped this week`);
  }
  document.getElementById('c-flags').innerHTML = flags.map(f=>`<div class="flag"><i class="ti ti-alert-triangle"></i><span>${f}</span></div>`).join('');

  document.getElementById('c-phaseBanner').innerHTML = `<strong>Week ${w+1}:</strong> ${PHASE_NOTES[w]}`;
  document.getElementById('c-sessionList').innerHTML = wk.sessions.map((s,d)=>{
    const key=sk(w,d);
    const status=(coachViewState.sessions && coachViewState.sessions[key])||'pending';
    const bc=status==='done'?'badge-done':status==='skip'?'badge-skip':s.type==='Rest'?'badge-rest':'badge-pending';
    const bl=status==='done'?'Done':status==='skip'?'Skipped':s.type==='Rest'?'Rest':'Upcoming';
    return `<div class="session-row">
      <span class="day-col">${s.day}</span>
      <span class="detail-col"><span class="type-pill type-${s.type}">${TYPE_LABELS[s.type]||s.type}</span>${s.detail}</span>
      <span class="badge ${bc}">${bl}</span>
    </div>`;
  }).join('');

  const feelEntries = Object.entries(coachViewState.weekLogs||{})
    .filter(([,l])=>l && l.feel)
    .map(([wi,l])=>({week:parseInt(wi)+1, feel:l.feel, notes:l.notes}))
    .sort((a,b)=>b.week-a.week)
    .slice(0,6);
  document.getElementById('c-feelTrend').innerHTML = feelEntries.length ?
    feelEntries.map(e=>`<div style="padding:8px 0;border-bottom:0.5px solid rgba(0,0,0,.08);font-size:13px"><span style="font-weight:500">Week ${e.week}</span> — ${feelLabels[e.feel]}${e.notes?'<div style="color:#5f5e5a;margin-top:2px">"'+e.notes+'"</div>':''}</div>`).join('')
    : '<p class="c-empty">No feel logs yet.</p>';

  const times = (coachViewState.times||[]).slice().reverse();
  document.getElementById('c-timesLog').innerHTML = times.length ?
    times.map(t=>`<div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px dashed var(--clay-line)"><span>${t.ev}</span><span><strong>${t.val}s</strong> · Week ${t.week}</span></div>`).join('')
    : '<p class="c-empty">No times logged yet.</p>';

  document.getElementById('c-weekProgress').innerHTML = WEEKS.map((wkX,i)=>{
    const done = wkX.sessions.filter((_,d)=>coachViewState.sessions && coachViewState.sessions[sk(i,d)]==='done').length;
    const pct = wkX.sessions.length ? Math.round((done/wkX.sessions.length)*100) : 0;
    const barCls=i<4?'bar-mov':i<9?'bar-str':i<13?'bar-pow':i<18?'bar-spe':'bar-race';
    return `<div class="progress-row">
      <span class="progress-wk">Wk ${i+1}</span>
      <div class="progress-bar-wrap"><div class="progress-bar ${barCls}" style="width:${Math.max(pct,2)}%">${pct>15?pct+'%':''}</div></div>
    </div>`;
  }).join('');
}

// Final init
refresh();
initSync();
