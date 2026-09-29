// ===== SUPABASE SYNC =====
// Fill these in after you create your Supabase project (see supabase-setup.sql).
// ATHLETE_KEY must match the athlete_key you inserted into tracker_state.
const SUPABASE_URL = 'https://jmkslokukidwgwcvcsoc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_IMHlk7X_fzA0lsIDVukL4Q_t1Eyt3a2';
const ATHLETE_KEY = 'scubaa';

let sb = null;
let syncStatus = 'offline'; // 'offline' | 'syncing' | 'synced' | 'error'
try {
  if (SUPABASE_URL !== 'YOUR_SUPABASE_URL' && window.supabase) {
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch(e){ console.log('Supabase init failed', e); }

function setSyncStatus(s){
  syncStatus = s;
  const el = document.getElementById('syncIndicator');
  if(!el) return;
  const map = {
    offline: ['●','var(--ink-faint)','Offline'],
    syncing: ['●','var(--go-dark)','Syncing…'],
    synced:  ['●','var(--sage-deep)','Synced'],
    error:   ['●','var(--track)','Sync error — saved locally']
  };
  const [dot,color,label] = map[s]||map.offline;
  el.innerHTML = `<span class="${s==='syncing'?'sync-pulse':''}" style="color:${color}">${dot}</span> ${label}`;
}

let syncTimer = null;
function queueSync(){
  if(!sb) return; // no backend configured — localStorage only
  setSyncStatus('syncing');
  clearTimeout(syncTimer);
  // debounce so rapid taps (mark done, feel log, etc) don't spam the network —
  // shortened from 1200ms so a quick refresh right after an edit is far less
  // likely to cancel the pending push before it fires
  syncTimer = setTimeout(pushToSupabase, 400);
}

// Belt-and-suspenders: if the tab is closed, refreshed, or backgrounded while
// a debounced push is still pending, fire it immediately instead of letting
// the timer get killed with the page. Combined with the lastModified check
// in initSync above, this makes a lost edit essentially impossible.
document.addEventListener('visibilitychange', () => {
  if(document.visibilityState === 'hidden' && syncTimer){
    clearTimeout(syncTimer);
    pushToSupabase();
  }
});

async function pushToSupabase(){
  if(!sb) return;
  try {
    const { error } = await sb
      .from('tracker_state')
      .update({ state })
      .eq('athlete_key', ATHLETE_KEY);
    if(error) throw error;
    setSyncStatus('synced');
  } catch(e){
    console.log('Sync failed, staying on local copy', e);
    setSyncStatus('error');
  }
}

async function pullFromSupabase(){
  if(!sb) return null;
  try {
    const { data, error } = await sb
      .from('tracker_state')
      .select('state, updated_at')
      .eq('athlete_key', ATHLETE_KEY)
      .single();
    if(error) throw error;
    return data;
  } catch(e){
    console.log('Could not reach Supabase, using local copy', e);
    return null;
  }
}

let state = { currentWeek:0, sessions:{}, weekLogs:{}, times:[], customBreakdowns:{}, sessionEdits:{}, lastModified:0 };
try{ const s=localStorage.getItem('sprintTracker18'); if(s) state=JSON.parse(s); }catch(e){}
if(!state.lastModified) state.lastModified = 0;

function persist(){
  // Stamp every local save so we can tell, on the next load, whether this
  // device's copy is newer than whatever Supabase has — this is what stops
  // a stale remote pull from silently overwriting a just-made edit.
  state.lastModified = Date.now();
  try{ localStorage.setItem('sprintTracker18', JSON.stringify(state)); }catch(e){}
  queueSync();
}

// On load: try to pull the latest from Supabase (in case it changed elsewhere),
// but only adopt it if it's actually newer than what's already on this device.
// Comparing lastModified timestamps (not just "does remote have any data")
// is what prevents a debounced push that hadn't landed yet from getting
// clobbered by a stale remote copy on refresh.
async function initSync(){
  if(!sb) { setSyncStatus('offline'); return; }
  setSyncStatus('syncing');
  const remote = await pullFromSupabase();
  if(remote && remote.state && Object.keys(remote.state).length){
    const remoteModified = remote.state.lastModified || 0;
    const localModified = state.lastModified || 0;
    if(remoteModified > localModified){
      // Remote genuinely has newer data than this device — adopt it.
      state = remote.state;
      try{ localStorage.setItem('sprintTracker18', JSON.stringify(state)); }catch(e){}
      refresh();
      setSyncStatus('synced');
    } else {
      // This device's copy is the same age or newer — most likely an edit
      // that hadn't finished pushing yet before the reload. Keep it and
      // re-push instead of losing it.
      await pushToSupabase();
    }
  } else if(remote){
    // Remote row exists but is empty — this device has the only copy so far.
    // Push whatever's in local storage up to Supabase now.
    await pushToSupabase();
  } else {
    setSyncStatus('error');
  }
}

function applySessionEdits(){
  if(!state.sessionEdits) return;
  Object.entries(state.sessionEdits).forEach(([key,edit])=>{
    const [w,d]=key.replace('w','').split('d').map(Number);
    if(WEEKS[w]&&WEEKS[w].sessions[d]){
      WEEKS[w].sessions[d].type=edit.type;
      WEEKS[w].sessions[d].detail=edit.detail;
    }
  });
}
applySessionEdits();

function sk(w,d){ return `w${w}d${d}`; }

function buildGrid(){
  const g = document.getElementById('weekGrid');
  g.innerHTML='';
  let totalDone=0;
  WEEKS.forEach((wk,i)=>{
    const nonRest = wk.sessions.filter(s=>s.type!=='Rest');
    const done = wk.sessions.map((_,d)=>sk(i,d)).filter(k=>state.sessions[k]==='done').length;
    totalDone+=done;
    const el=document.createElement('button');
    let cls='wk';
    if(done===wk.sessions.length) cls+=' done';
    else if(i===state.currentWeek) cls+=' active';
    else if(wk.deload&&i>state.currentWeek) cls+=' deload-upcoming';
    el.className=cls;
    el.innerHTML=`Wk ${i+1}<div class="wk-phase">${wk.phase.replace('+End','')}</div>`;
    el.onclick=()=>{ state.currentWeek=i; persist(); refresh(); };
    g.appendChild(el);
  });
  document.getElementById('m-week').textContent=`${state.currentWeek+1} / ${WEEKS.length}`;
  document.getElementById('m-phase').textContent=WEEKS[state.currentWeek].phase;
  document.getElementById('m-done').textContent=totalDone;
  const feels=Object.values(state.weekLogs).filter(l=>l&&l.feel).map(l=>l.feel);
  document.getElementById('m-feel').textContent=feels.length?(feels.reduce((a,b)=>a+b,0)/feels.length).toFixed(1):'—';
}

function buildSessions(){
  const w=state.currentWeek;
  document.getElementById('weekTitle').textContent=`Week ${w+1} — ${WEEKS[w].phase}${WEEKS[w].deload?' (Deload)':''}`;
  document.getElementById('phaseBanner').innerHTML=`<strong>Week ${w+1}:</strong> ${PHASE_NOTES[w]}`;
  const list=document.getElementById('sessionList');
  list.innerHTML='';
  WEEKS[w].sessions.forEach((s,d)=>{
    const key=sk(w,d);
    const status=state.sessions[key]||'pending';
    const bc=status==='done'?'badge-done':status==='skip'?'badge-skip':s.type==='Rest'?'badge-rest':'badge-pending';
    const bl=status==='done'?'Done ✓':status==='skip'?'Skipped':s.type==='Rest'?'Rest':'Upcoming';
    const row=document.createElement('div');
    row.className='session-row';
    row.innerHTML=`
      <span class="day-col">${s.day}</span>
      <span class="detail-col">
        <span class="type-pill type-${s.type}">${TYPE_LABELS[s.type]||s.type}</span>
        <span id="det-${key}">${s.detail}</span>
        ${s.type!=='Rest'?`<div><button class="expand-btn" id="expbtn-${key}" onclick="toggleExpand('${key}',${w},${d})"><i class="ti ti-chevron-down" style="font-size:11px"></i> Expand session</button></div>`:''}
        <div class="expand-panel" id="exp-${key}"></div>
      </span>
      <div style="display:flex;flex-direction:column;gap:5px;align-items:flex-end;flex-shrink:0">
        <span class="badge ${bc}" id="bdg-${key}">${bl}</span>
        ${s.type!=='Rest'?`<div class="sess-actions">
          <button class="sess-btn do-done${status==='done'?' is-active-done':''}" id="btn-done-${key}" onclick="mark('${key}','done')" title="Mark done">✓</button>
          <button class="sess-btn do-skip${status==='skip'?' is-active-skip':''}" id="btn-skip-${key}" onclick="mark('${key}','skip')" title="Mark skipped">✗</button>
          <button class="sess-btn do-edit" onclick="editSession(${w},${d})" title="Edit session"><i class="ti ti-pencil" style="font-size:12px"></i></button>
        </div>`:''}
      </div>`;
    list.appendChild(row);
  });
}

function mark(key,status){
  state.sessions[key]=state.sessions[key]===status?'pending':status;
  persist();
  const bdg=document.getElementById('bdg-'+key);
  const s=state.sessions[key];
  if(bdg){
    bdg.className='badge '+(s==='done'?'badge-done':s==='skip'?'badge-skip':'badge-pending');
    bdg.textContent=s==='done'?'Done ✓':s==='skip'?'Skipped':'Upcoming';
  }
  const doneBtn=document.getElementById('btn-done-'+key);
  const skipBtn=document.getElementById('btn-skip-'+key);
  if(doneBtn) doneBtn.classList.toggle('is-active-done', s==='done');
  if(skipBtn) skipBtn.classList.toggle('is-active-skip', s==='skip');
  buildGrid();
}

function setFeel(val,btn){
  const w=state.currentWeek;
  if(!state.weekLogs[w]) state.weekLogs[w]={};
  state.weekLogs[w].feel=state.weekLogs[w].feel===val?null:val;
  document.querySelectorAll('#feelBtns .feel-btn').forEach((b,i)=>b.classList.toggle('sel',i+1===state.weekLogs[w].feel));
  persist();
}

function saveWeekLog(){
  const w=state.currentWeek;
  if(!state.weekLogs[w]) state.weekLogs[w]={};
  state.weekLogs[w].notes=document.getElementById('weekNotes').value;
  persist();
  buildGrid();
  const m=document.getElementById('saveMsg');
  m.style.opacity='1';
  m.textContent='Saved ✓';
  setTimeout(()=>{ m.style.opacity='0'; }, 1500);
  setTimeout(()=>{ m.textContent=''; m.style.opacity='1'; }, 1850);
}

function loadWeekLog(){
  const w=state.currentWeek;
  const log=state.weekLogs[w]||{};
  document.getElementById('weekNotes').value=log.notes||'';
  document.querySelectorAll('#feelBtns .feel-btn').forEach((b,i)=>b.classList.toggle('sel',i+1===log.feel));
}

function editSession(w,d){
  const s=WEEKS[w].sessions[d];
  document.getElementById('editModalContent').innerHTML=`
    <p style="font-size:15px;font-weight:500;margin-bottom:12px">Edit session — Week ${w+1}, ${s.day}</p>
    <div class="edit-label">Session type</div>
    <select id="eType" style="width:100%;margin-bottom:4px">
      ${Object.keys(TYPE_LABELS).map(t=>`<option ${t===s.type?'selected':''}>${t}</option>`).join('')}
    </select>
    <div class="edit-label">Session detail</div>
    <textarea id="eDetail" class="notes-area" style="height:90px">${s.detail}</textarea>
    <div class="btn-row">
      <button class="btn btn-danger" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveEdit(${w},${d})">Save changes</button>
    </div>`;
  document.getElementById('editModal').classList.add('open');
}

function saveEdit(w,d){
  const key=sk(w,d);
  const type=document.getElementById('eType').value;
  const detail=document.getElementById('eDetail').value;
  WEEKS[w].sessions[d].type=type;
  WEEKS[w].sessions[d].detail=detail;
  if(!state.sessionEdits) state.sessionEdits={};
  state.sessionEdits[key]={type,detail};
  persist();
  closeModal();
  buildSessions();
}

function closeModal(){ document.getElementById('editModal').classList.remove('open'); }

function openSettings(){
  document.getElementById('editModalContent').innerHTML=`
    <p style="font-size:15px;font-weight:500;margin-bottom:12px">Options</p>
    <div class="btn-row" style="flex-direction:column;gap:8px">
      <button class="btn" onclick="exportData()"><i class="ti ti-download"></i> Export all data (JSON)</button>
      <button class="btn btn-danger" onclick="if(confirm('Reset all progress? This cannot be undone.')){resetAll()}">⚠ Reset all progress</button>
      <button class="btn" onclick="closeModal()">Close</button>
    </div>`;
  document.getElementById('editModal').classList.add('open');
}

function exportData(){
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='sprint_tracker_data.json';
  a.click();
}

function resetAll(){
  state={currentWeek:0,sessions:{},weekLogs:{},times:[],customBreakdowns:{},sessionEdits:{}};
  persist();
  closeModal();
  refresh();
}
