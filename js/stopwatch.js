// ===== BUILT-IN STOPWATCH =====
let swRunning=false, swStart=0, swElapsed=0, swRAF=null, swSplits=[];

function toggleStopwatch(){
  const btn=document.getElementById('swStartBtn');
  if(!swRunning){
    swStart = performance.now() - swElapsed;
    swRunning = true;
    btn.innerHTML = '<i class="ti ti-player-pause"></i> Stop';
    document.getElementById('swUseHint').style.display='none';
    tickStopwatch();
  } else {
    swRunning = false;
    if(swRAF) cancelAnimationFrame(swRAF);
    btn.innerHTML = '<i class="ti ti-player-play"></i> Start';
    const finalVal = (swElapsed/1000).toFixed(2);
    document.getElementById('timeVal').value = finalVal;
    const dateEl = document.getElementById('timeDate');
    if(!dateEl.value) dateEl.valueAsDate = new Date();
    document.getElementById('swUseHint').style.display='block';
  }
}

function tickStopwatch(){
  if(!swRunning) return;
  swElapsed = performance.now() - swStart;
  document.getElementById('swDisplay').textContent = (swElapsed/1000).toFixed(2);
  swRAF = requestAnimationFrame(tickStopwatch);
}

function lapStopwatch(){
  if(!swRunning) return;
  swSplits.push((swElapsed/1000).toFixed(2));
  document.getElementById('swSplits').innerHTML = swSplits.map((s,i)=>
    `<span class="type-pill type-Track" style="margin:2px 3px 0 0">Split ${i+1}: ${s}s</span>`
  ).join('');
}

function resetStopwatch(){
  swRunning=false;
  if(swRAF) cancelAnimationFrame(swRAF);
  swElapsed=0; swSplits=[];
  document.getElementById('swDisplay').textContent='0.00';
  document.getElementById('swStartBtn').innerHTML='<i class="ti ti-player-play"></i> Start';
  document.getElementById('swSplits').innerHTML='';
  document.getElementById('swUseHint').style.display='none';
}

function logTime(){
  const ev=document.getElementById('timeEvent').value;
  const val=document.getElementById('timeVal').value.trim();
  const date=document.getElementById('timeDate').value;
  if(!val) return;
  if(!state.times) state.times=[];
  state.times.push({ev,val,date,week:state.currentWeek+1});
  persist();
  document.getElementById('timeVal').value='';
  resetStopwatch();
  buildTimes();
}

function deleteTime(i){ state.times.splice(i,1); persist(); buildTimes(); }

function buildTimes(){
  const el=document.getElementById('timesLog');
  if(!state.times||!state.times.length){
    el.innerHTML='<p style="font-size:13px;color:#6b6b68">No times logged yet.</p>';
    return;
  }
  el.innerHTML=state.times.slice().reverse().map((t,ri)=>{
    const i=state.times.length-1-ri;
    return `<div style="display:flex;gap:8px;align-items:center;padding:6px 0;border-bottom:0.5px solid rgba(0,0,0,.08);font-size:13px">
      <span class="type-pill type-Track" style="min-width:36px;text-align:center">${t.ev}</span>
      <span style="font-weight:500">${t.val}s</span>
      <span style="color:#6b6b68">Wk ${t.week}${t.date?' · '+t.date:''}</span>
      <button class="btn btn-sm btn-danger" onclick="deleteTime(${i})" style="margin-left:auto">✕</button>
    </div>`;
  }).join('');
}

function buildProgress(){
  const bars=document.getElementById('progressBars');
  bars.innerHTML='';
  WEEKS.forEach((wk,i)=>{
    const nonRest=wk.sessions.filter(s=>s.type!=='Rest');
    const done=nonRest.filter((_,d)=>{
      const origIdx=wk.sessions.findIndex((ss,di)=>ss===nonRest[d]);
      return state.sessions[sk(i,origIdx)]==='done';
    }).length;
    const pct=nonRest.length?Math.round(done/nonRest.length*100):100;
    const barCls=i<4?'bar-mov':i<9?'bar-str':i<13?'bar-pow':i<18?'bar-spe':'bar-race';
    bars.innerHTML+=`<div class="progress-row">
      <span class="progress-wk">Wk ${i+1}${wk.deload?' ⚡':''}</span>
      <div class="progress-bar-wrap"><div class="progress-bar ${barCls}" style="width:${Math.max(pct,2)}%">${pct>15?pct+'%':''}</div></div>
      <span class="${done===nonRest.length&&nonRest.length>0?'dot dot-done':'dot dot-empty'}"></span>
    </div>`;
  });

  const fh=document.getElementById('feelHistory');
  const feelLabels=['','Tired','Okay','Good','Great','Peak'];
  const entries=[];
  for(let i=0;i<WEEKS.length;i++){
    const log=state.weekLogs[i]||{};
    if(log.feel||log.notes) entries.push({i,log});
  }
  fh.innerHTML=entries.length?entries.map(({i,log})=>`
    <div style="padding:8px 0;border-bottom:0.5px solid rgba(0,0,0,.08);font-size:13px">
      <div style="display:flex;align-items:center;gap:8px">
        <span style="font-weight:500">Wk ${i+1}</span>
        ${log.feel?`<span class="badge badge-done">${feelLabels[log.feel]}</span>`:''}
      </div>
      ${log.notes?`<p style="color:#5f5e5a;margin-top:4px;line-height:1.5">${log.notes}</p>`:''}
    </div>`).join('')
    :'<p style="font-size:13px;color:#6b6b68">No week logs yet — log in the Sessions tab.</p>';

  buildTimes();
}
