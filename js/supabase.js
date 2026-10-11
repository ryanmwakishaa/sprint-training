// ===== SUPABASE AUTHENTICATED SYNC =====
// The publishable key is intended for browser use; database RLS is the security boundary.
const SUPABASE_URL = 'https://jmkslokukidwgwcvcsoc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_IMHlk7X_fzA0lsIDVukL4Q_t1Eyt3a2';

let sb = null;
let syncStatus = 'offline'; // 'offline' | 'syncing' | 'synced' | 'error'
try {
  if (SUPABASE_URL !== 'YOUR_SUPABASE_URL' && window.supabase) {
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
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
  el.textContent = '';
  const span = document.createElement('span');
  span.textContent = dot;
  span.style.color = color;
  if(s==='syncing') span.className = 'sync-pulse';
  el.append(span, document.createTextNode(' ' + label));
}

let syncTimer = null;
function queueSync(){
  if(!sb || !activeUserId) return;
  setSyncStatus('syncing');
  clearTimeout(syncTimer);
  syncTimer = setTimeout(pushToSupabase, 500);
}

document.addEventListener('visibilitychange', () => {
  if(document.visibilityState === 'hidden' && syncTimer){
    clearTimeout(syncTimer);
    pushToSupabase();
  }
});

async function pushToSupabase(){
  if(!sb || !activeUserId) return;
  try {
    const { error } = await sb.from('athlete_tracker_state').upsert({
      user_id: activeUserId,
      state,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });
    if(error) throw error;
    setSyncStatus('synced');
  } catch(e){
    console.log('Sync failed, staying on this account\'s local copy', e);
    setSyncStatus('error');
  }
}

async function pullAthleteState(userId){
  if(!sb || !userId) return null;
  const { data, error } = await sb.from('athlete_tracker_state')
    .select('user_id, state, updated_at')
    .eq('user_id', userId)
    .maybeSingle();
  if(error) throw error;
  return data;
}

async function pullFromSupabase(){
  if(!activeUserId) return null;
  try { return await pullAthleteState(activeUserId); }
  catch(e){ console.log('Could not reach Supabase, using this account\'s local copy', e); return null; }
}

async function initSync(){
  if(!sb || !activeUserId){ setSyncStatus('offline'); return; }
  setSyncStatus('syncing');
  try{
    const remote = await pullFromSupabase();
    if(remote && remote.state && Object.keys(remote.state).length){
      const remoteModified = remote.state.lastModified || 0;
      const localModified = state.lastModified || 0;
      if(remoteModified > localModified){
        state = { ...emptyTrackerState(), ...remote.state };
        try{ localStorage.setItem(accountStorageKey(activeUserId), JSON.stringify(state)); }catch(e){}
        refresh();
        setSyncStatus('synced');
      }else{
        await pushToSupabase();
      }
    }else{
      // No remote row yet: create one for this authenticated user only.
      await pushToSupabase();
    }
  }catch(e){
    console.log('Initial sync failed', e);
    setSyncStatus('error');
  }
}
