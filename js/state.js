// ===== ACCOUNT-SCOPED ATHLETE STATE =====
// Never share one browser storage key between different athlete accounts.
function emptyTrackerState(){
  return { currentWeek:0, sessions:{}, weekLogs:{}, times:[], customBreakdowns:{}, sessionEdits:{}, lastModified:0 };
}
let state = emptyTrackerState();
let activeUserId = null;

function accountStorageKey(userId){
  return 'sprintTracker18:user:' + userId;
}

function loadStateForUser(userId){
  activeUserId = userId || null;
  state = emptyTrackerState();
  if(!activeUserId) return;
  try{
    const saved = localStorage.getItem(accountStorageKey(activeUserId));
    if(saved){
      const parsed = JSON.parse(saved);
      if(parsed && typeof parsed === 'object') state = { ...emptyTrackerState(), ...parsed };
    }
  }catch(e){ console.warn('Could not load this account\'s local tracker state', e); }
  if(!state.lastModified) state.lastModified = 0;
}

function persist(){
  state.lastModified = Date.now();
  try{
    if(activeUserId) localStorage.setItem(accountStorageKey(activeUserId), JSON.stringify(state));
  }catch(e){}
  queueSync();
}
