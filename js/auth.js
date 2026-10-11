// ===== AUTHENTICATION + ACCOUNT BOOTSTRAP =====
let currentUser = null;
let currentUserRole = 'athlete';
let activeAccountBoot = null;

function showAuthMessage(message, isError=false){
  const el=document.getElementById('authMessage');
  if(!el) return;
  el.textContent=message;
  el.style.color=isError?'var(--track)':'var(--sage-deep)';
}

async function handleSignIn(){
  if(!sb) return showAuthMessage('Authentication is unavailable. Check the Supabase configuration.', true);
  const email=document.getElementById('authEmail').value.trim();
  const password=document.getElementById('authPassword').value;
  if(!email||!password) return showAuthMessage('Enter your email and password.', true);
  const btn=document.getElementById('signInBtn');
  btn.disabled=true;
  try{
    const {error}=await sb.auth.signInWithPassword({email,password});
    if(error) throw error;
    showAuthMessage('Signed in. Loading your tracker…');
  }catch(e){ showAuthMessage(e.message||'Could not sign in.',true); }
  finally{ btn.disabled=false; }
}

async function handleSignUp(){
  if(!sb) return showAuthMessage('Authentication is unavailable. Check the Supabase configuration.', true);
  const name=document.getElementById('authName').value.trim();
  const email=document.getElementById('authEmail').value.trim();
  const password=document.getElementById('authPassword').value;
  if(!name||!email||password.length<8) return showAuthMessage('Enter your name, email, and a password of at least 8 characters.',true);
  const btn=document.getElementById('signUpBtn');
  btn.disabled=true;
  try{
    const {data,error}=await sb.auth.signUp({email,password,options:{data:{full_name:name}}});
    if(error) throw error;
    if(data.session) showAuthMessage('Account created. Opening your tracker…');
    else showAuthMessage('Account created. Check your email to confirm it, then sign in.');
  }catch(e){ showAuthMessage(e.message||'Could not create account.',true); }
  finally{ btn.disabled=false; }
}

async function signOutAccount(){
  if(!sb) return;
  await sb.auth.signOut();
}

async function activateAccount(user){
  if(!user || !sb) return;
  if(activeAccountBoot===user.id) return;
  activeAccountBoot=user.id;
  currentUser=user;
  try{
    const {data:profile,error}=await sb.from('profiles').select('id,full_name,role').eq('id',user.id).single();
    if(error) throw error;
    currentUserRole=profile.role||'athlete';
    loadStateForUser(user.id);
    document.getElementById('authScreen').style.display='none';
    document.querySelector('.app').style.display='block';
    document.getElementById('accountLabel').textContent=profile.full_name||user.email||'Account';
    const coachBtn=document.getElementById('coachTabBtn');
    if(coachBtn) coachBtn.style.display=currentUserRole==='coach'?'':'none';
    refresh();
    await initSync();
    if(currentUserRole==='coach') await loadCoachRoster();
  }catch(e){
    console.error('Account setup failed',e);
    showAuthMessage('Your account signed in, but its profile could not load. Run the Supabase setup SQL and confirm your profile exists.',true);
    document.getElementById('authScreen').style.display='block';
    document.querySelector('.app').style.display='none';
    activeAccountBoot=null;
  }
}

function handleAuthStateChange(session){
  if(session&&session.user) activateAccount(session.user);
  else{
    activeAccountBoot=null;
    currentUser=null;
    currentUserRole='athlete';
    activeUserId=null;
    document.querySelector('.app').style.display='none';
    document.getElementById('authScreen').style.display='block';
    document.getElementById('accountLabel').textContent='';
    if(typeof stopCoachPolling==='function') stopCoachPolling();
  }
}

async function initAuthentication(){
  if(!sb){
    showAuthMessage('Supabase is not configured, so sign-in is unavailable.',true);
    return;
  }
  sb.auth.onAuthStateChange((_event,session)=>handleAuthStateChange(session));
  const {data,error}=await sb.auth.getSession();
  if(error) showAuthMessage(error.message,true);
  if(data.session) await activateAccount(data.session.user);
}
