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
