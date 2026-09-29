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
