// ===== COACH DASHBOARD — AUTHENTICATED ROSTER =====
let coachViewState = null;
let coachPollTimer = null;
let selectedCoachAthleteId = null;
let coachRoster = [];

function lockCoachView(){
  stopCoachPolling();
  const d=document.getElementById('coachDashboard');
  if(d) d.style.display='none';
}
function revealCoachTab(){
  const btn=document.getElementById('coachTabBtn');
  if(btn && currentUserRole==='coach') btn.style.display='';
}
function hideCoachTab(){
  if(currentUserRole==='coach'){
    lockCoachView();
    switchTab(0, document.querySelector('.tab'));
  }
}
function openCoachTab(){
  if(currentUserRole!=='coach') return;
  openCoachDashboard();
}
async function openCoachDashboard(){
  if(currentUserRole!=='coach') return;
  const gate=document.getElementById('coachGate');
  if(gate) gate.style.display='none';
  document.getElementById('coachDashboard').style.display='block';
  await loadCoachRoster();
  await refreshCoachView();
  startCoachPolling();
}
async function loadCoachRoster(){
  if(!sb || currentUserRole!=='coach' || !currentUser) return;
  const status=document.getElementById('coachRosterMessage');
  try{
    const {data:links,error}=await sb.from('coach_athletes').select('athlete_id').eq('coach_id',currentUser.id);
    if(error) throw error;
    const profiles=await Promise.all((links||[]).map(async link=>{
      const {data,error}=await sb.from('profiles').select('id,full_name').eq('id',link.athlete_id).single();
      if(error) throw error;
      return data;
    }));
    coachRoster=profiles;
    const select=document.getElementById('coachAthleteSelect');
    if(!select) return;
    const previous=selectedCoachAthleteId;
    select.innerHTML='<option value="">Select an athlete…</option>'+profiles.map(p=>
      '<option value="'+p.id.replace(/"/g,'&quot;')+'">'+(p.full_name||'Athlete').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</option>'
    ).join('');
    if(previous && profiles.some(p=>p.id===previous)) select.value=previous;
    else { selectedCoachAthleteId=null; select.value=''; coachViewState=null; }
    if(status) status.textContent=profiles.length?'Athletes: '+profiles.length:'No athletes assigned yet. Add an athlete using their sign-up email.';
  }catch(e){
    console.error('Could not load coach roster',e);
    if(status) status.textContent='Could not load roster. Check the Supabase setup and coach role.';
  }
}
async function addCoachAthlete(){
  if(!sb || currentUserRole!=='coach') return;
  const input=document.getElementById('coachAthleteEmail');
  const status=document.getElementById('coachRosterMessage');
  const email=input.value.trim();
  if(!email){ if(status) status.textContent='Enter the athlete account email.'; return; }
  try{
    const {error}=await sb.rpc('coach_add_athlete_by_email',{athlete_email:email});
    if(error) throw error;
    input.value='';
    if(status) status.textContent='Athlete added to your roster.';
    await loadCoachRoster();
  }catch(e){
    if(status) status.textContent=e.message||'Could not add athlete.';
  }
}
function selectCoachAthlete(){
  const select=document.getElementById('coachAthleteSelect');
  selectedCoachAthleteId=select?select.value:null;
  coachViewState=null;
  if(!selectedCoachAthleteId){
    setCoachSyncStatus('loading');
    document.getElementById('c-week').textContent='—';
    document.getElementById('c-phase').textContent='Select athlete';
    document.getElementById('c-done').textContent='—';
    document.getElementById('c-feel').textContent='—';
    document.getElementById('c-flags').textContent='';
    document.getElementById('c-phaseBanner').textContent='Choose an athlete to view their individual programme progress.';
    document.getElementById('c-sessionList').textContent='';
    document.getElementById('c-feelTrend').textContent='';
    document.getElementById('c-timesLog').textContent='';
    document.getElementById('c-weekProgress').textContent='';
    return;
  }
  refreshCoachView();
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
  el.textContent='';
  const span=document.createElement('span');
  span.textContent=dot;
  span.style.color=color;
  el.append(span,document.createTextNode(' '+label));
}
async function refreshCoachView(){
  if(currentUserRole!=='coach' || !selectedCoachAthleteId){
    setCoachSyncStatus('loading');
    return;
  }
  setCoachSyncStatus('loading');
  try{
    const remote=await pullAthleteState(selectedCoachAthleteId);
    if(remote && remote.state && Object.keys(remote.state).length){
      coachViewState=remote.state;
      renderCoachView();
      setCoachSyncStatus('live');
    }else{
      coachViewState={currentWeek:0,sessions:{},weekLogs:{},times:[],sessionEdits:{}};
      renderCoachView();
      setCoachSyncStatus('live');
    }
  }catch(e){
    console.error('Could not load selected athlete',e);
    setCoachSyncStatus('error');
  }
}
function startCoachPolling(){
  stopCoachPolling();
  coachPollTimer=setInterval(refreshCoachView,20000);
}
function stopCoachPolling(){
  if(coachPollTimer){ clearInterval(coachPollTimer); coachPollTimer=null; }
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
