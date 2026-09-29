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
    row.className='session-row session-card';
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
    row.addEventListener('click', (e)=>{
      if(e.target.closest('button')) return;
      row.classList.toggle('is-focused');
    });
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
