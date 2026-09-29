// ===== REFERENCE GLOSSARY — all named protocols from the program doc =====
const GLOSSARY = [
  {
    id:'mobility',
    name:'Daily Mobility Routine',
    tag:'Every session · 12–15 min',
    color:'sage',
    intro:"Performed every single day before gym, track, or drill sessions. Not optional — for this athlete's restricted ankle dorsiflexion and limited hip mobility, this is the difference between a squat that reaches parallel and one that doesn't.",
    rows:[
      ['Ankle Dorsiflexion — Wall Stretch','3 × 45sec/leg','Toes 5cm from wall, knee drives forward over toes. Primary fix for squat depth. Add 1cm distance per week as range improves.'],
      ['Ankle Circles','2 × 30sec/leg','Seated or lying, full circles with the foot. Warms the ankle joint through full range before loading.'],
      ['Half-Kneeling Hip Flexor Stretch','3 × 45sec/leg','Posterior tilt the pelvis before shifting forward. Tight hip flexors kill drive phase.'],
      ['90/90 Hip Rotation','3 × 40sec/side','Both legs at 90° on the floor. Lean into front hip, then rotate to back hip. Addresses internal + external rotation.'],
      ['Pigeon Pose','2 × 60sec/leg','Targets deep hip external rotators. Important for a tall athlete where femur angle creates hip impingement in deep positions.'],
      ['Deep Squat Hold + T-Spine Rotation','3 × 30sec','Sit into deep squat, heels down. One arm up, open the chest while balancing.'],
      ['Thoracic Rotation (seated)','2 × 10 reps/side','Hands behind head, rotate through the mid-back only. A stiff mid-back collapses the drive phase.'],
      ['Hip Flexor Activation — Banded March','2 × 10 reps/leg','Light band above knees, march driving the knee to 90°. Wakes the hip flexors in the sprint-specific pattern before training.']
    ],
    note:"Weeks 1–4: focus on feel and range — never force a position. From Week 5: begin adding small overload (band tension, depth, longer holds). By Week 10 the squat hold should sit at or near parallel without support."
  },
  {
    id:'bandA',
    name:'Band Complex A',
    tag:'Glute & Hip Activation · Weeks 1–4+',
    color:'purple',
    intro:"Opens Mon/Wed gym sessions through the foundation phase. Teaches the glutes, hip rotators, and stabilisers to fire in the correct sequence before any heavy loading begins.",
    rows:[
      ['Banded Glute Bridge','3 × 15 reps','Band above knees, drive knees out at top. Builds the glute activation pattern critical for hip thrust and sprint drive.'],
      ['Banded Clamshell','3 × 15/side','Side-lying, band above knees, rotate top knee up without rotating the pelvis. Builds hip external rotators that stabilise the pelvis on ground contact.'],
      ['Banded Lateral Walk','3 × 12 steps each way','Band above ankles, slight squat, small sideways steps. Activates glute medius — controls pelvic drop in single-leg stance.'],
      ['Banded Hip Flexion (standing)','3 × 12 reps/leg','Band anchored at ground, looped at ankle. Drive knee to 90°. Directly mimics the sprint knee-drive pattern.'],
      ['Banded Pull-Apart','3 × 15 reps','Light band, arms extended forward, pull apart to a T. Builds upper back posture for sprint arm drive.']
    ],
    note:null
  },
  {
    id:'bandB',
    name:'Band Complex B',
    tag:'Single-Leg Stability & Drive Prep · Weeks 2–4+',
    color:'purple',
    intro:"Layered in from Week 2 alongside Complex A. Shifts the focus to single-leg stability and the specific muscle actions of sprint ground contact and drive.",
    rows:[
      ['Banded Single-Leg Glute Bridge','3 × 10/leg','Band above knees, one foot flat, other leg extended. Full hip extension at top. Sprint power is single-leg — this is the base pattern.'],
      ['Banded Terminal Knee Extension (TKE)','3 × 15/leg','Band anchored behind at knee height. Slight knee flexion, extend against band. Strengthens VMO and knee stability for ground contact.'],
      ['Banded Hip Extension — Kickback','3 × 12/leg','Band at ankle, anchored forward. Stand on one leg, kick the other back while staying upright. Fires glute max in hip extension — the sprint drive position.'],
      ['Banded Ankle Dorsiflexion (seated)','3 × 15/leg','Band around foot, anchored forward. Pull toes toward shin against resistance. Strengthens dorsiflexors — critical for foot strike mechanics.'],
      ['Banded High Knees — Slow','3 × 10/leg','Band above knees, standing high-knee march, slow and controlled. Sprint-specific hip flexion under resistance.']
    ],
    note:null
  },
  {
    id:'wallA',
    name:'Wall Drill Session A',
    tag:'Sprint Posture Introduction · Week 1',
    color:'gold',
    intro:"The athlete's first introduction to sprint drive-phase body position — performed entirely static or on-the-spot, with zero speed pressure.",
    rows:[
      ['Wall Lean (static)','3 × 20sec','Hands flat on wall at shoulder height, body straight at 45°. This IS the drive phase body angle — feel it, memorise it. Head neutral, eyes down.'],
      ['Wall March (alternating)','3 × 10 reps/leg','Same lean position. Drive one knee to hip height while on the ball of the other foot. Do not let the hips drop.'],
      ['Wall Drive — Rapid','4 × 8 reps/leg','As above, faster. Goal is rhythm, not speed. Arms mirror the legs — opposite arm drives forward as knee drives up.'],
      ['Standing A-Skip (on the spot)','3 × 20 reps total','No forward movement. Alternate knee drives with arm swing. This IS the A-skip — absorb the pattern before moving through space.'],
      ['Sprint Posture Hold','3 × 15sec','Stand tall, chest up, slight forward lean from the ankles (not the waist), arms relaxed at 90°. This is upright sprint posture.']
    ],
    note:null
  },
  {
    id:'wallB',
    name:'Wall Drill Session B',
    tag:'Drive Pattern + A-Skip Forward · Week 2',
    color:'gold',
    intro:"Builds directly on Session A — the same drive position now starts moving through space for the first time, plus the first introduction to B-skip mechanics.",
    rows:[
      ['Wall Drive — Single-Leg Hold','4 × 10sec/leg','Drive one knee to 90° and hold. Standing leg on the ball of the foot, body at 45°. Teaches the athlete to feel the drive position statically before making it dynamic.'],
      ['Wall March + Arm Drive','4 × 12 reps/leg','Focus on arms: elbow drives back to hip, hand comes to cheek. Opposite arm, opposite leg — always.'],
      ['A-Skip — Moving Forward','4 × 20m','First time moving through space. Short ground contact, rhythmic knee drive, coordinated arms. Not fast — correct. Hips stay high throughout.'],
      ['B-Skip — On the Spot','3 × 10 reps/leg','Drive the knee as in A-skip, then kick the lower leg forward and strike down. Mimics the ground-contact phase of top-speed running. Don\'t rush it.'],
      ['High Knee Run — Slow (20m)','3 × 20m','Walk-speed high knee run. Every step: full knee drive to 90°, dorsiflexed foot, ball-of-foot contact. This is not a race.']
    ],
    note:null
  },
  {
    id:'mach',
    name:'Complete Mach Drill Reference',
    tag:'Every drill & track session · All 24 weeks',
    color:'gold',
    intro:"Mach drills run through the entire program. Each isolates one component of the sprint stride and teaches it in isolation before it gets expressed at full speed.",
    rows:[
      ['A-Skip','20–30m','Rhythmic knee drive to hip height, arms coordinated, ball-of-foot contact, hip stays high. Common error: knee driven too high, flat-footed contact, arms crossing the midline.','a-skip'],
      ['B-Skip','20–30m','A-skip drive, then extend the lower leg forward and strike down — the pawing action of top-speed running. Common error: kicking forward without the initial knee drive.','b-skip'],
      ['C-Skip','20–30m','Rear-leg drive emphasis — the push-off leg extends fully before the next stride, like an exaggerated running stride. Common error: not completing full triple extension at push-off.','c-skip'],
      ['Power Skip','20m','Maximum height per skip — explosive knee drive, jump off the standing leg, land softly on the ball of the foot. Common error: collapsing the ankle on landing.','power-skip'],
      ['Straight-Leg Bound','20m','Stiff straight legs, forward lean, ball-of-foot contact only. Rapid, elastic ground contact for ankle stiffness. Common error: bending the knees defeats the purpose.','straight-leg-bound'],
      ['High Knee Run','40m','Continuous A-skip rhythm at running speed — full knee drive, dorsiflexed foot, fast contact. Common error: technique breaking down as speed increases — slow down before mechanics fail.','high-knee-run'],
      ['Arm Drive Drill (walking)','20m','Walking pace, focus only on arms — elbow drives back past the hip, hand forward to cheek height. Common error: crossing the midline, tensing shoulders and fists.']
    ],
    note:null
  },
  {
    id:'speedA',
    name:'Speed Band Complex A',
    tag:'Drive Phase Mechanics · Week 5+',
    color:'red',
    intro:"The bridge between gym strength and track expression — non-transferable by any other method. Teaches the body to produce force against resistance in the exact sprint drive pattern.",
    rows:[
      ['Speed Band — Wall March (resisted)','4 × 10 reps/leg','Band anchored at waist behind, wall-march position. Band adds horizontal resistance to each knee drive.'],
      ['Speed Band — Drive Drill (10m)','6 × 10m','Band anchored behind. Sprint forward 10m — explosive drive phase only, no upright running. Full recovery between reps.'],
      ['Speed Band — Knee Drive Hold (kneeling)','3 × 8 reps/leg','Half-kneeling, band around waist anchored behind. Drive front foot forward and up into sprint knee-drive position against resistance.'],
      ['Speed Band — Standing High Knee March','3 × 20m','Band anchored at waist behind, exaggerated high knee march forward. Resistance teaches the hip flexor to fire harder and earlier.']
    ],
    note:null
  },
  {
    id:'speedB',
    name:'Speed Band Complex B',
    tag:'Acceleration Mechanics · Week 7+',
    color:'red',
    intro:"Builds on Complex A once the athlete is sprinting on the track — shifting from pure drive-phase mechanics into acceleration-stride power and arm drive.",
    rows:[
      ['Speed Band — A-Skip (resisted)','4 × 20m','Band anchored behind at waist, A-skip forward against resistance. Exaggerates the need for active knee drive.'],
      ['Speed Band — Bound (resisted)','3 × 5 bounds','Band at waist anchored behind, broad-jump-style bounds against resistance. Develops single-leg push-off power for acceleration stride length.'],
      ['Speed Band — Arm Drive (stationary)','3 × 20 reps','Band in one hand, anchored behind. Drive the arm through sprint mechanics against resistance — arm drive contributes 30–40% of sprint speed.'],
      ['Speed Band — Resisted Calf Raise','3 × 12 reps','Band under foot, held at shoulder height, single-leg calf raise against resistance. Ankle stiffness and plantarflexion power for ground contact.']
    ],
    note:null
  },
  {
    id:'sled',
    name:'Sled Work',
    tag:'Horizontal Force Tool · Push + Pull · Weeks 6, 10–12, 14, 16',
    color:'red',
    intro:"The most sprint-specific gym tool available. At roughly 10% bodyweight, it overloads the drive phase without disrupting sprint mechanics — research confirms loads at or below this threshold show no negative effect on technique. Push and pull variants train opposite ends of the acceleration mechanic: push emphasises the forward drive/extension phase, pull (harness, facing away from the sled) emphasises the reach-back and hip extension pattern. This is a strength tool, not a conditioning tool.",
    rows:[
      ['Sled Push','Typically 3–8 × 20m @ 8–15% BW','Stay low through the push, maintain the same shin angle as a real drive phase. Drive through the whole foot, full recovery between reps.'],
      ['Sled Pull','Typically 3–4 × 20m @ 8–15% BW','Harness around the waist, facing away from the sled, walking or running backward-facing drive. Emphasises hip extension and the reach-back portion of the stride that push work doesn\'t train.']
    ],
    note:"Expect unusual soreness in the 24–48 hours after sled sessions — posterior chain (glutes, hamstrings) after push work, and additionally through the upper back and grip after pull work. This is normal and worth addressing with foam rolling and extra recovery, not a sign of injury. Sled is deliberately kept off timed-test days (Week 12's 60m/100m) and out of deload weeks (Weeks 9, 13, 17–18) to protect testing and taper quality."
  },
  {
    id:'pap',
    name:'PAP Complex',
    tag:'Post-Activation Potentiation · Week 7+',
    color:'blue',
    intro:"Pairs a heavy strength movement with an explosive movement shortly after — the heavy lift primes the nervous system to produce a more powerful subsequent jump, bound, or sprint.",
    rows:[
      ['Structure','Heavy lift → 3–5min full rest → explosive movement','E.g. Box Squat 3×3 @80% → rest 4min → Broad Jump 3×4. The rest period is what makes PAP work — skipping it removes the effect entirely.']
    ],
    note:"The explosive movement should feel noticeably snappier than usual — that's the potentiation effect showing up. If it doesn't, the rest period was likely too short."
  },
  {
    id:'ssendurance',
    name:'Steady-State (SS) Endurance Arc',
    tag:'Weeks 14–18 · 2×/week',
    color:'green',
    intro:"Begins only at Week 14 — deliberately late, after 13 weeks of pure strength and power work, to avoid the interference effect between endurance training and the lean-mass gains built earlier in the program. The arc rises to a peak then descends at higher intensity.",
    rows:[
      ['Week 14','2 × 60sec @86–88%','~380–400m/rep. Set the pace in the first 5 seconds and hold it — do not go out fast and fade.'],
      ['Week 15','2 × 70sec @87–89%','~440–470m/rep. If pace drops in the final 15 seconds, start the next rep 5% slower.'],
      ['Week 16','2 × 90sec @87–89%','~540–580m/rep. Endurance peak of the program — hold mechanics through the final 30 seconds.'],
      ['Week 17','2 × 70sec @90–92%','Faster than Week 15\'s 70-second efforts — the Week 16 base makes this possible.'],
      ['Week 18','2 × 40sec → 2 × 20sec @92–96%','Endurance exit — sharp, near-maximal efforts as the arc closes into final race prep.']
    ],
    note:"Walk (don't jog) between reps for proper recovery. Going out too hard on the first rep is the classic beginner endurance mistake — the goal is consistent pace, not a fast start."
  },
  {
    id:'flyzones',
    name:'Flying Sprint Zones',
    tag:'Max-Velocity Development · Weeks 19–24',
    color:'red',
    intro:"The most direct way to develop raw top-speed — not fatigue management, not endurance, but the ability to move fast in the first place. Every flying sprint is built from three zones, and a rolling-start variant targets specifically the back half of the race, which is the most common place a 100m time actually stalls.",
    rows:[
      ['Build-up Zone','20–30m','Accelerate progressively — never sprint all-out from a standstill here. The goal is to arrive at the fly zone already at (or very near) full speed, without having strained to get there.'],
      ['Fly Zone','20–30m','The actual max-velocity effort. Cues: run tall — head, shoulders, and hips stacked with minimal forward lean; strike the ground under the hips, not out in front; keep ground contact short and quick; relax the jaw, hands, and shoulders.'],
      ['Deceleration Zone','15–20m','Let the sprint shut down naturally over this distance — never stop abruptly. Protects the hamstrings and lets the nervous system come back down gradually.'],
      ['Rolling Fly — back-half variant','40m from the 60m mark','Same build-up-then-fly structure, but the fly zone begins around the point (~60m) where 100m times are typically lost to fatigue rather than a lack of raw speed. Directly trains holding mechanics through the back half of the race.']
    ],
    note:"Full recovery between reps (4–5min) is non-negotiable — fatigue is the enemy of technical max-velocity work; a tired fly rep just grooves in bad habits at high speed. Two classic verbal cues worth using during reps: 'run tall' for posture, and Carl Lewis's famous arm cue — 'elbow to the sky, thumb to the eye.'"
  },
  {
    id:'reactionstarts',
    name:'Reaction & Block-Start Work',
    tag:'Race-Start Speed · Weeks 19–24',
    color:'blue',
    intro:"New to the program in Phase 5 — dedicated practice reacting to a start signal, rather than always self-initiating a 'ready, set, go' on one's own timing. Reaction time itself is only trainable by a small margin (roughly 10–15 milliseconds with repeated practice), so the real value here is a fast, confident, repeatable start under real signal pressure — not chasing an unrealistic reaction-time gain.",
    rows:[
      ['Signal-Reaction Starts','4–6 reps','A partner or coach gives an unpredictable signal (whistle, clap, \"go\") while the athlete holds a set position — 3-point stance, or blocks if available. Focus on reacting cleanly, not anticipating the signal — jumping the gun defeats the entire purpose of the drill.'],
      ['Block Starts (or 3-point equivalent)','4–6 reps','If starting blocks aren\'t available, a 3-point stance works as the substitute. Front foot roughly 1.5–2 shoe-lengths from the line, rear foot 1–1.5 shoe-lengths further back. First few steps stay low and driving — resist the urge to stand up early.']
    ],
    note:"Keep this drill fresh — it's a skill/speed quality, not a conditioning one. A handful of quality reps with full recovery beats a large volume of tired, sloppy starts."
  }
];

function machAnimSVG(type){
  return `<svg class="mach-fig mach-${type}" viewBox="0 0 100 130" aria-hidden="true">
    <line x1="4" y1="122" x2="96" y2="122" stroke="var(--clay-line)" stroke-width="2"/>
    <g class="m-rig">
      <circle class="m-head" cx="50" cy="22" r="7" fill="var(--ink)"/>
      <line x1="50" y1="29" x2="50" y2="64" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
      <g class="m-arm-back"><line x1="50" y1="38" x2="37" y2="52" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round"/></g>
      <g class="m-arm-front"><line x1="50" y1="38" x2="63" y2="52" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round"/></g>
      <g class="m-leg-support">
        <line x1="50" y1="64" x2="45" y2="93" stroke="var(--track)" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="45" y1="93" x2="47" y2="118" stroke="var(--track)" stroke-width="4.5" stroke-linecap="round"/>
      </g>
      <g class="m-thigh">
        <line x1="50" y1="64" x2="66" y2="78" stroke="var(--track-dark)" stroke-width="4.5" stroke-linecap="round"/>
        <g class="m-shin"><line x1="66" y1="78" x2="61" y2="108" stroke="var(--track-dark)" stroke-width="4.5" stroke-linecap="round"/></g>
      </g>
    </g>
  </svg>`;
}

function buildGlossary(){
  const el=document.getElementById('glossary');
  el.innerHTML=GLOSSARY.map(g=>`
    <div class="gloss-item">
      <button class="gloss-header" onclick="toggleGloss('${g.id}')">
        <span class="gloss-dot gloss-${g.color}"></span>
        <span class="gloss-name">${g.name}</span>
        <span class="gloss-tag">${g.tag}</span>
        <i class="ti ti-chevron-down gloss-chevron" id="chev-${g.id}"></i>
      </button>
      <div class="gloss-body" id="gbody-${g.id}">
        <p class="gloss-intro">${g.intro}</p>
        <div class="gloss-table">
          ${g.rows.map(r=>`${r[3]?`<div class="gloss-anim-wrap">${machAnimSVG(r[3])}<span class="gloss-anim-label">${r[0]}</span></div>`:''}<div class="gloss-row"><span class="gloss-ex">${r[0]}</span><span class="gloss-sets">${r[1]}</span><span class="gloss-cue">${r[2]||''}</span></div>`).join('')}
        </div>
        ${g.note?`<p class="gloss-note"><i class="ti ti-bulb"></i> ${g.note}</p>`:''}
      </div>
    </div>`).join('');
}

function toggleGloss(id){
  const body=document.getElementById('gbody-'+id);
  const chev=document.getElementById('chev-'+id);
  const open=body.classList.toggle('open');
  chev.style.transform=open?'rotate(180deg)':'rotate(0deg)';
}

function buildProgram(){
  const phases=[
    {name:'Phase 1 — Movement foundation',range:[0,3],cls:'bar-mov'},
    {name:'Phase 2 — Strength build',range:[4,8],cls:'bar-str'},
    {name:'Phase 3 — Power expression',range:[9,12],cls:'bar-pow'},
    {name:'Phase 4 — Speed + endurance',range:[13,17],cls:'bar-spe'},
    {name:'Phase 5 — Max velocity & race conversion',range:[18,23],cls:'bar-race'}
  ];
  const tl=document.getElementById('timeline');
  tl.innerHTML=phases.map(p=>`
    <div style="margin-bottom:14px">
      <p style="font-size:12px;font-weight:500;color:#6b6b68;margin-bottom:6px">${p.name}</p>
      ${WEEKS.slice(p.range[0],p.range[1]+1).map((w,j)=>`
        <div class="progress-row">
          <span class="progress-wk">Wk ${p.range[0]+j+1}${w.deload?' ⚡':''}</span>
          <div class="progress-bar-wrap"><div class="progress-bar ${p.cls}" style="width:100%;font-size:10px">${w.focus.substring(0,58)}${w.focus.length>58?'…':''}</div></div>
        </div>`).join('')}
    </div>`).join('');

  const st=document.getElementById('strengthTable');
  const rows=[
    ['Hip Thrust','3×8 @60%','5×5 @70–78%','5×3 @80–84%','3×3 @82–87%','2–3×3–5 @70–82%'],
    ['Box Squat','4×8 HIGH BOX','4×5 @68–76%','4×4 @80–84%','3×3 @82–84%','—'],
    ['Trap Bar DL','—','4×5 @65–75%','4×4 @78–83%','3×4 @80–82%','3–4×4–5 @75–78%'],
    ['Nordic Curl','3×6','3×5–6','4×5','2×4–5','3×4–5 (held steady)'],
    ['Calf Raise','BW','3×12','3×12','3×10','—'],
    ['Bench Press','3×10 @60%','3×8 @65–72%','4×5 @75–80%','3×5 @78–82%','3×6 (maintenance)']
  ];
  st.innerHTML=`<div class="strength-grid">
    <span class="hdr"></span>
    <span class="hdr">Wks 1–4</span><span class="hdr">Wks 5–9</span><span class="hdr">Wks 10–13</span><span class="hdr">Wks 14–18</span><span class="hdr">Wks 19–24</span>
    ${rows.map(r=>`<span class="lbl">${r[0]}</span>${r.slice(1).map(v=>`<span class="val">${v}</span>`).join('')}`).join('')}
  </div>`;

  buildGlossary();
}

function switchTab(idx,btn){
  [0,1,2,3,4].forEach(i=>{const t=document.getElementById('tab'+i);if(t)t.style.display=i===idx?'':'none';});
  const active=document.getElementById('tab'+idx);
  if(active){ active.classList.remove('tab-active-enter'); void active.offsetWidth; active.classList.add('tab-active-enter'); }
  document.querySelectorAll('.tab').forEach((t,i)=>t.classList.toggle('active',i===idx));
  if(idx===1) buildProgress();
  if(idx===2) buildProgram();
  if(idx===3) buildChatSuggestions();
  if(idx===4) openCoachTab(); else stopCoachPolling();
}

function refresh(){ buildGrid(); buildSessions(); loadWeekLog(); }

document.getElementById('editModal').addEventListener('click',function(e){ if(e.target===this) closeModal(); });

const ATHLETE_NOTE = "Long femurs and restricted ankle dorsiflexion mean squat depth and drive-phase mechanics need extra attention — this is fixable, not structural. As a gym-strong, sprint-beginner athlete, the biggest early risk is the nervous system and connective tissue lagging behind raw strength, which is exactly why this program builds mobility and mechanics before loading speed.";

// Pattern-matched static breakdown library — keyed by detection rules against session detail text
const BREAKDOWN_RULES = [
  {
    test: s => /FLY/i.test(s.detail),
    title: "Flying sprint (max velocity)",
    what: "A sprint with a build-up run (typically 20–30m) before hitting maximum speed for a short measured distance — the build-up removes the acceleration phase so the body trains pure top-end mechanics in isolation.",
    why: "Max velocity capability is one of the strongest predictors of 100m performance, and it's a skill that needs direct, repeated exposure to convert into race-day speed — a program that's mostly built acceleration and strength can leave this specific quality undertrained.",
    how: ["Full recovery between reps (6–8min minimum) — max velocity work is a neural quality, not a conditioning one; fatigue defeats the purpose", "Cue 'Up, Scissor, Bounce, Strike' at the top of the knee drive: tall hips, a quick scissoring action, then an active pawing strike back under the hips", "Keep the face, jaw, and hands relaxed — tension there bleeds directly into leg speed", "Land with a stiff ankle directly under the center of mass, not reaching out in front"],
    watch: ["Reaching or overstriding as fatigue sets in — cue 'step down, not reach' if this appears", "Tension creeping into the shoulders or face on later reps — a sign recovery wasn't full enough"],
    note: ATHLETE_NOTE
  },
  {
    test: s => /REACTION START|from blocks/i.test(s.detail),
    title: "Reaction / block starts",
    what: "Very short sprints (often 10m or less) focused purely on the first movement out of the blocks — reaction to the signal and the initial low drive, not on reaching top speed.",
    why: "The first phase of a 100m is frequently an overlooked limiter — strength and top-end speed can both be excellent while a slow or high first step still costs real time before the rest of the race even begins.",
    how: ["Full recovery between reps — this is a reaction-speed and power quality, not a conditioning one", "Drive low and long on the first few steps rather than popping up — an abrupt rise to upright wastes the drive phase's momentum", "Push the ground back, not down — horizontal force is what actually accelerates the body forward"],
    watch: ["Standing up too early — a very common pattern that costs acceleration distance", "Anticipating the start signal rather than reacting to it — this is a habit, not a talent, and it's trainable"],
    note: ATHLETE_NOTE
  },
  {
    test: s => /SPLIT-TIMED/i.test(s.detail),
    title: "Split-timed testing",
    what: "A full-effort 100m with intermediate times recorded at 30m and 60m as well as the finish, rather than just one final number.",
    why: "A single 100m time says the result changed (or didn't) — it doesn't say why. Splits reveal whether the limiter is the start/acceleration, the max-velocity phase, or holding form through the finish, which is the difference between guessing at the next block of training and actually targeting it.",
    how: ["Use a second timer/phone for the 30m and 60m marks, started at the same gun/signal as the main watch", "Warm up fully — a cold split-timed test gives misleading numbers", "Compare the splits to earlier timed sessions where distances match (a Week 8 30m time vs. this 30m split, for example), not just to the overall 100m number"],
    watch: ["Reading too much into a single test — one run's splits are a data point, not a verdict", "A big gap between the 60m split and the finish usually points at the speed-endurance/relaxation quality (holding form) rather than raw top speed"],
    note: ATHLETE_NOTE
  },
  {
    test: s => /1RM TEST/i.test(s.detail),
    title: "1RM testing",
    what: "A maximal-effort strength test on a key lift to find the current one-rep max. This recalibrates every percentage-based load in the next phase.",
    why: "Without an accurate 1RM, every '@75%' or '@82%' in the program is a guess. Testing now means Phase 3 or 4 loading is based on real, current numbers — not the numbers from week one.",
    how: ["Warm up thoroughly — several submaximal sets building toward the test weight", "Allow full recovery (3–5 min) between attempts", "Stop adding weight once bar speed or form breaks down — that's the ceiling, not failure", "If true 1RM testing feels risky, a 3RM with an estimation formula is safer and nearly as useful"],
    watch: ["Technical breakdown under heavy load — form matters more than the number on the bar", "Testing fatigue carrying into the next 1–2 days — this is normal, plan lighter sessions after"],
    note: ATHLETE_NOTE
  },
  {
    test: s => /DELOAD|Deload/i.test(s.detail) || /deload/i.test(s.day),
    title: "Deload session",
    what: "A deliberately reduced-volume session — roughly 50–70% of normal load or intensity. The movements stay familiar; the stress goes down.",
    why: "Adaptation happens during recovery, not training. After 3–4 weeks of accumulating fatigue, a deload lets the body consolidate strength and mobility gains before the next loading block begins.",
    how: ["Treat the lighter loads as genuinely light — this is not the week to test limits", "Use the extra recovery capacity for mobility work and technical refinement", "If something planned for testing or assessment is on this day, prioritise quality over fatigue"],
    watch: ["The temptation to push harder because it feels easy — that defeats the purpose", "Any pain or restriction that hasn't resolved — deload weeks are the time to flag it, not push through it"],
    note: ATHLETE_NOTE
  },
  {
    test: s => /TIMED:/i.test(s.detail),
    title: "Timed effort",
    what: "An official, recorded time trial over a set distance. This is a benchmark, not just training stimulus.",
    why: "Timed runs validate whether the strength and mechanics work is translating into actual speed. They also give honest data for adjusting the next phase of the program.",
    how: ["Full warm-up including mobility, drills, and progressive build-up sprints before the timed effort", "Treat the first attempt as the real one — fatigue accumulates fast on max-effort sprints", "Use a stopwatch or phone timer consistently so results are comparable week to week"],
    watch: ["Over-trying — tension in the face, shoulders, or hands usually slows sprinters down, not speeds them up", "Comparing this number harshly against elite benchmarks — track progress against her own baseline"],
    note: ATHLETE_NOTE
  },
  {
    test: s => /FLYING SPRINT|ROLLING.{0,12}FLY|FLY ZONE/i.test(s.detail),
    title: "Flying sprint / max-velocity zone work",
    what: "A three-zone sprint: a build-up to reach full speed without straining, a 'fly' zone where the real maximum-velocity effort happens, and a deceleration zone to shut down safely. A rolling-start variant begins the fly zone partway into the run (e.g. from the 60m mark) to target the back half of the race specifically.",
    why: "This is the single most direct way to develop raw top-speed rather than just fatigue tolerance — many beginner-to-intermediate sprint programs under-expose athletes to genuine top-speed-specific work, which is often exactly where a stalled 100m time comes from.",
    how: ["Accelerate progressively through the build-up — arrive at the fly zone already near full speed, not straining to get there", "In the fly zone: run tall, strike under the hips, relax the jaw/hands/shoulders", "Let the sprint decelerate naturally afterward — never stop abruptly", "Full recovery (4–5min) between reps — fatigue ruins the technical value of this work"],
    watch: ["Straining to reach the fly zone instead of arriving there relaxed — defeats the entire purpose", "Fatigue creeping in on the final rep of a session — cut the session short rather than grinding through a sloppy rep"],
    note: ATHLETE_NOTE
  },
  {
    test: s => /REACTION|BLOCK-START/i.test(s.detail),
    title: "Reaction / block-start work",
    what: "Practicing the actual race start — reacting to an unpredictable signal from a set position, rather than always self-initiating.",
    why: "Reaction time itself only improves by roughly 10–15 milliseconds with practice — the real value is building a fast, confident, repeatable start under real signal pressure, which self-paced starts never train.",
    how: ["Hold the set position steady — no anticipatory movement before the signal", "React to the signal, don't try to predict it — jumping the gun defeats the drill", "Stay low and driving through the first few steps — resist standing up early"],
    watch: ["Anticipating or jumping the signal instead of reacting to it", "Standing up too early out of the start — a very common pattern under pressure"],
    note: ATHLETE_NOTE
  },
  {
    test: s => /Mach Drill|A-skip|B-skip|C-skip|Power Skip|Wall Drill/i.test(s.detail),
    title: "Mach drills / wall drills",
    what: "Isolated technical drills that break the sprint stride into its component parts — knee drive, ground contact, posture — and groove them without the complexity of full-speed running.",
    why: "Sprint mechanics learned in isolation transfer more reliably than mechanics 'corrected' while already at speed. These drills build the movement vocabulary that high-speed sprinting later draws on.",
    how: ["Prioritise the cue (rhythm, hip height, posture) over speed — these drills are not a race", "Film a rep or two if possible — mechanics are often invisible to the athlete in the moment", "Keep ground contacts light and quick rather than pounding through each rep"],
    watch: ["Knee drive collapsing as fatigue sets in late in a set — quality drops before the athlete notices", "Arms crossing the body's midline — very common and worth a specific cue"],
    note: ATHLETE_NOTE
  },
  {
    test: s => /Speed Band/i.test(s.detail),
    title: "Speed band work",
    what: "Resistance band drills that overload specific sprint positions — typically the drive phase — teaching the body to produce force in sprint-specific patterns under load.",
    why: "This is the bridge between gym strength and track speed. Raw strength from squats and hip thrusts doesn't automatically show up in sprint mechanics — speed bands force the nervous system to express that strength in the right movement pattern.",
    how: ["Anchor the band securely — a loose anchor undermines the whole drill", "Move with control on the eccentric, explosive on the concentric", "Match the resistance to the athlete's current strength — too much band tension distorts technique"],
    watch: ["Mechanics breaking down because the band resistance is too high for clean technique", "Rushing through reps instead of feeling the specific muscles the drill targets"],
    note: ATHLETE_NOTE
  },
  {
    test: s => /SS ENDURANCE|SS Endurance/i.test(s.detail),
    title: "Steady-state endurance run",
    what: "A sustained, controlled-pace run for a fixed duration (not distance) at a percentage of max effort — building the capacity to hold speed and mechanics under fatigue.",
    why: "By this point in the program, raw speed and strength are established. This work builds the engine to sustain mechanics across a full race distance instead of fading in the final third.",
    how: ["Set the pace within the first 5 seconds and hold it — don't go out fast and fade", "Walk (don't jog) between reps to allow proper lactate clearance", "If pace drops noticeably in the final seconds of a rep, start the next rep 5% slower"],
    watch: ["Going out too hard on the first rep — the classic beginner endurance mistake", "Mechanics collapsing in the final third of each rep — that's exactly what this training is meant to fix over time"],
    note: ATHLETE_NOTE
  },
  {
    test: s => /Sled/i.test(s.detail),
    title: "Sled work (push + pull)",
    what: "Pushing or pulling a loaded sled over a set distance — a strength tool that overloads the sprint drive phase specifically. Push loads the forward drive/extension pattern; pull (harness, facing away from the sled) loads the reach-back and hip extension pattern that push work alone doesn't train.",
    why: "At light loads (around 8–15% bodyweight), sled work overloads horizontal force production without disrupting sprint technique — making it one of the most direct strength-to-speed transfer tools available. Using both push and pull covers both halves of the acceleration mechanic instead of just the drive phase.",
    how: ["Push: stay low through the push, maintaining the same shin angle as a real drive phase, driving through the whole foot", "Pull: harness at the waist, facing away from the sled, focus on full hip extension through each stride rather than just leaning into the harness", "Full recovery between reps either way — this is a strength stimulus, not a conditioning one"],
    watch: ["Excessive posterior chain soreness in the 24–48h after — common and expected on push days, but worth tracking", "Upper body or grip tension on pull days — the torso angle should stay consistent with sprint posture, not hunched forward"],
    note: ATHLETE_NOTE
  },
  {
    test: s => /PAP|Box Squat 3×3|Hip Thrust 3×3/i.test(s.detail) && /Jump|Bound|Broad/i.test(s.detail),
    title: "PAP complex (post-activation potentiation)",
    what: "A heavy strength movement paired with an explosive movement shortly after — the heavy lift primes the nervous system for a more powerful subsequent jump or bound.",
    why: "PAP complexes train maximal power output by combining near-maximal strength with explosive plyometric work, directly targeting the rate of force development that sprinting demands.",
    how: ["Full recovery (3–5 min) between the heavy lift and the explosive movement — that gap is what makes PAP work", "The explosive movement should feel snappier than usual — that's the potentiation effect", "Don't rush this superset structure; the rest periods are part of the prescription, not dead time"],
    watch: ["Skipping the rest period to save time — this removes the entire PAP effect", "Fatigue accumulating across the session — PAP work is demanding on the nervous system"],
    note: ATHLETE_NOTE
  },
  {
    test: s => /Hip Thrust|Box Squat|Trap Bar|RDL|Bulgarian|Nordic|Bench|Row|Pull-Up|Calf Raise/i.test(s.detail) && s.type==='Gym',
    dynamic: 'gym',
    title: "Gym / strength session"
  },
  {
    test: s => s.type==='Track' && /sprint|crouch|m\b/i.test(s.detail),
    dynamic: 'track',
    title: "Track / sprint session"
  },
  {
    test: s => s.type==='Mob' || /[Mm]obility/i.test(s.detail),
    title: "Mobility / assessment",
    what: "Dedicated mobility work, often paired with measuring or recording progress — squat depth, ankle range, or general movement quality.",
    why: "For this athlete specifically, ankle dorsiflexion and hip mobility are the primary limiters on squat depth and sprint mechanics — not strength, not bone structure. This work directly targets that bottleneck.",
    how: ["Hold stretches for their full prescribed duration rather than rushing through them", "If this is an assessment day, film or measure consistently so progress is comparable week to week", "Treat range-of-motion gains as gradual — weekly, not daily, progress is the realistic expectation"],
    watch: ["Forcing a stretched position rather than working within a comfortable range — especially in weeks 1–4", "Skipping mobility work when short on time — this is foundational, not optional, for this athlete's profile"],
    note: ATHLETE_NOTE
  },
  {
    test: () => true,
    title: "Training session",
    what: "A scheduled session within the current phase of the program, combining elements of strength, mechanics, or conditioning work appropriate to this stage.",
    why: "Every session in this program builds toward the next phase — this one fits into the broader progression toward race-readiness.",
    how: ["Complete the mobility protocol first, as with every session in the program", "Follow the prescribed loads, sets, and reps as closely as possible", "Note how it felt in the week log — that data shapes future adjustments"],
    watch: ["Fatigue carrying over from previous sessions this week", "Technique drifting under fatigue toward the end of the session"],
    note: ATHLETE_NOTE
  }
];

// ===== PER-EXERCISE CUE LIBRARY — makes the "Expand session" breakdown for
// Gym days reflect the ACTUAL lifts in that session instead of one generic
// paragraph reused for all ~50 gym days in the program. =====
const EXERCISE_CUES = {
  'Weighted Pull-Up': {cue:"Full range, dead-hang start — quality over added weight.", watch:"Kipping or partial-range reps to hit the number."},
  'Pull-Up': {cue:"Full range, dead-hang start.", watch:"Kipping or partial-range reps."},
  'Bulgarian Split Squat': {cue:"Front foot does the work — the back foot is just for balance, not pushing.", watch:"Pushing off the back foot instead of loading the front leg."},
  'Depth Jump': {cue:"Minimal ground contact on landing — think 'hot floor,' not a big absorbing squat.", watch:"Sinking too deep into the landing instead of a quick rebound."},
  'Broad Jump': {cue:"Full triple extension (hip-knee-ankle) at takeoff, stick the landing.", watch:"Landing off-balance or too heavy on the heels."},
  'Jump Squat': {cue:"Land soft, reset fully between reps — this is a power exercise, not a conditioning one.", watch:"Rushing between reps instead of resetting."},
  'Hurdle Hops': {cue:"Quick, reactive ground contact over each hurdle — arms help drive the rhythm.", watch:"Excessive knee bend turning it into squat-jumps instead of a reactive hop."},
  'Med Ball Rotational Throw': {cue:"Power comes from the hips rotating first, arms follow.", watch:"Throwing purely with the arms/shoulders instead of initiating from the hips."},
  'Incline DB Press': {cue:"Control the dumbbells through the full range — don't let them drift forward.", watch:"Losing shoulder position as the set gets heavy."},
  'Incline Bench': {cue:"Same bar-path discipline as flat bench, just a shallower angle.", watch:"Excessive elbow flare straining the shoulder."},
  'Pendlay Row': {cue:"Dead-stop each rep off the floor — no momentum, strict form.", watch:"Using hip drive/momentum to move the weight instead of the back."},
  'Cable Row': {cue:"Pull with the back, not just the arms — squeeze the shoulder blades together at the finish.", watch:"Leaning back excessively to move more weight."},
  'SL RDL': {cue:"Single-leg version — balance and hip control matter as much as the hamstring stretch.", watch:"Rotating the hips open instead of staying square."},
  'Loaded Calf Raise': {cue:"Full range — a deep stretch at the bottom, a real pause at the top.", watch:"Bouncing through a partial range instead of a controlled full rep."},
  'Hip Thrust': {cue:"Drive through the heels, squeeze at lockout — the single biggest horizontal-force builder in the program.", watch:"Hyperextending the lower back at the top instead of finishing through the glutes."},
  'Box Squat': {cue:"Sit back onto the box under control, brief pause, then drive up — box height tracks the program's progression toward parallel depth.", watch:"Losing tension on the box (fully relaxing) instead of a brief controlled pause."},
  'Trap Bar DL': {cue:"Push the floor away through mid-foot — a squat-pattern deadlift, not a hip-hinge.", watch:"Rounding the upper back under heavier loads."},
  'Nordic': {cue:"Control the eccentric (lowering) as long as possible before catching yourself — that's where the hamstring protection actually comes from.", watch:"Letting the hips pike/break early instead of staying in a straight line."},
  'Calf Raise': {cue:"Full range — a deep stretch at the bottom, a real pause at the top.", watch:"Bouncing through a partial range instead of a controlled full rep."},
  'Bench': {cue:"Feet planted, shoulder blades pulled back and down, consistent bar path.", watch:"Bouncing the bar off the chest instead of a controlled touch."},
  'Row': {cue:"Pull with the back, not just the arms.", watch:"Using momentum instead of controlled pulling."},
  'RDL': {cue:"Hinge from the hips, bar stays close to the legs — this is not a squat.", watch:"Rounding the lower back to chase more range."},
  'Shoulder Press': {cue:"Brace the core, press straight overhead.", watch:"Excessive lower-back arch to get the weight up."},
  'Dead Bug': {cue:"Lower back stays pinned to the floor the whole time — slow and controlled.", watch:"The lower back lifting off the floor as the limbs extend."}
};

function matchExercises(detail){
  const keys = Object.keys(EXERCISE_CUES).sort((a,b)=>b.length-a.length);
  let consumed = detail;
  const matched = [];
  keys.forEach(k=>{
    if(consumed.includes(k)){
      matched.push(k);
      consumed = consumed.split(k).join('');
    }
  });
  return matched.sort((a,b)=>detail.indexOf(a)-detail.indexOf(b));
}

const GYM_PHASE_WHY = {
  'Movement': "This early in the program, gym work is about building a safe strength base under the mobility restrictions already flagged — squat depth and hip mechanics come before load.",
  'Strength': "This is the strength-accumulation phase — heavier compound loading here raises the ceiling everything else in the program gets built on.",
  'Power': "Strength is already banked from the previous phase; the gym work here shifts toward expressing it explosively (often paired with a plyometric in the same session) rather than chasing more load.",
  'Speed+End': "Gym work is now secondary to the sprint and endurance sessions — the goal is to hold strength, not chase new numbers, without adding fatigue that bleeds into track work.",
  'MaxV+Race': "This is maintenance-only. Capacity has shifted almost entirely to sprint-specific work — the gym's only job now is to stop strength leaking away before the final test, not to build anything new."
};

const TRACK_PHASE_WHY = {
  'Strength': "One of the program's earliest exposures to real sprint work — the goal is establishing clean mechanics under low fatigue, not chasing a fast time yet.",
  'Power': "Sprint distance and intensity are climbing toward the program's first official timed benchmarks — this session is direct preparation for that.",
  'Speed+End': "Sprint quality is being held or sharpened alongside the endurance arc — the emphasis is holding mechanics, not adding more volume.",
  'MaxV+Race': "This sits inside the block built specifically to close the remaining gap to the high-11s target — every rep here should be about quality and the cues from that block, not just effort."
};

function buildGymBreakdown(s, w){
  const phase = WEEKS[w].phase;
  const deload = WEEKS[w].deload;
  const matched = matchExercises(s.detail);
  const why = (GYM_PHASE_WHY[phase] || GYM_PHASE_WHY['Strength']) + (deload ? " This is also a deload week — the load is deliberately lighter than the surrounding weeks." : "");
  const how = ["Always complete the mobility protocol before loading — this protects squat depth and hip mechanics"];
  const watch = [];
  matched.slice(0,4).forEach(name=>{
    const c = EXERCISE_CUES[name];
    how.push(`${name}: ${c.cue}`);
    watch.push(`${name}: ${c.watch}`);
  });
  if(!matched.length){
    how.push("Track the actual weights used each week — this is what makes the 1RM percentages meaningful over time");
  }
  if(!watch.length){
    watch.push("Form breaking down on the final set of heavier days — better to leave a rep in reserve than grind through bad technique");
  }
  return {
    title: `Gym / strength session — ${phase.replace('+End',' + Endurance').replace('+Race',' + Race')} phase${deload?' (deload)':''}`,
    what: `A barbell and accessory strength session${matched.length?` built around ${matched.slice(0,4).join(', ')}`:''}, targeting the specific muscle groups and movement patterns that underpin sprint performance.`,
    why,
    how,
    watch,
    note: ATHLETE_NOTE
  };
}

function buildTrackBreakdown(s, w){
  const phase = WEEKS[w].phase;
  const distances = (s.detail.match(/(\d+)m\b/g) || []).map(x=>parseInt(x));
  const maxDist = distances.length ? Math.max(...distances) : 0;
  const why = TRACK_PHASE_WHY[phase] || "On-track sprint work at a specified distance and intensity — the direct expression of the strength and mechanics work being built in the gym.";
  let how, watch, emphasis;
  if(maxDist && maxDist<=30){
    emphasis = "acceleration";
    how = ["Full warm-up before any maximal effort", "Stay low and driving through the first several steps — resist standing up early", "Full recovery between reps — quality over volume at this intensity"];
    watch = ["Standing up too early in the acceleration phase — a very common beginner pattern", "Visible tension in the face, shoulders, or hands"];
  } else if(maxDist && maxDist>=60){
    emphasis = "top-speed / race-distance";
    how = ["Full warm-up including build-up strides before any maximal rep", "Run tall once out of the drive phase — minimal forward lean, relaxed shoulders and hands", "Full recovery between reps — this distance at this intensity is demanding"];
    watch = ["Tensing up chasing a time instead of staying relaxed — relaxed sprinting is faster sprinting", "Mechanics breaking down in the final third of the rep as fatigue sets in"];
  } else {
    emphasis = "mixed";
    how = ["Full warm-up: mobility, drills, then progressive build-up runs before any maximal effort", "Full recovery between reps at this intensity — quality over volume", "Stay low through early acceleration steps rather than standing up too soon"];
    watch = ["Standing up too early in the acceleration phase — a very common beginner pattern", "Visible tension in the face, shoulders, or hands — relaxed sprinting is faster sprinting"];
  }
  return {
    title: `Track / sprint session — ${emphasis} emphasis`,
    what: `On-track sprint work${maxDist?` up to ${maxDist}m`:''} at a specified distance and intensity — the direct expression of the strength and mechanics work being built in the gym.`,
    why,
    how,
    watch,
    note: ATHLETE_NOTE
  };
}

function getBreakdown(w,d){
  const key=sk(w,d);
  if(state.customBreakdowns && state.customBreakdowns[key]) return state.customBreakdowns[key];
  const s=WEEKS[w].sessions[d];
  const rule=BREAKDOWN_RULES.find(r=>r.test(s));
  if(rule && rule.dynamic==='gym') return buildGymBreakdown(s, w);
  if(rule && rule.dynamic==='track') return buildTrackBreakdown(s, w);
  return rule;
}

function renderBreakdown(b){
  return `<h4>What you're doing</h4><p>${b.what}</p>
    <h4>Why it matters</h4><p>${b.why}</p>
    <h4>How to execute it</h4><ul>${b.how.map(h=>`<li>${h}</li>`).join('')}</ul>
    <h4>Watch for</h4><ul>${b.watch.map(h=>`<li>${h}</li>`).join('')}</ul>`;
}

function toggleExpand(key,w,d){
  const panel=document.getElementById('exp-'+key);
  const btn=document.getElementById('expbtn-'+key);
  const isOpen=panel.classList.contains('open');
  if(isOpen){
    panel.classList.remove('open');
    btn.innerHTML='<i class="ti ti-chevron-down" style="font-size:11px"></i> Expand session';
    return;
  }
  const b=getBreakdown(w,d);
  panel.innerHTML=renderBreakdown(b)+`<div class="btn-row" style="margin-top:8px"><button class="btn btn-sm" onclick="editBreakdown(${w},${d})"><i class="ti ti-edit"></i> Edit this breakdown</button></div>`;
  panel.classList.add('open');
  btn.innerHTML='<i class="ti ti-chevron-up" style="font-size:11px"></i> Collapse';
}

function editBreakdown(w,d){
  const b=getBreakdown(w,d);
  document.getElementById('editModalContent').innerHTML=`
    <p style="font-size:15px;font-weight:500;margin-bottom:12px">Edit breakdown — Week ${w+1}, ${WEEKS[w].sessions[d].day}</p>
    <div class="edit-label">What you're doing</div>
    <textarea id="bWhat" class="notes-area" style="height:54px">${b.what}</textarea>
    <div class="edit-label">Why it matters</div>
    <textarea id="bWhy" class="notes-area" style="height:54px">${b.why}</textarea>
    <div class="edit-label">How to execute it (one per line)</div>
    <textarea id="bHow" class="notes-area" style="height:64px">${b.how.join('\n')}</textarea>
    <div class="edit-label">Watch for (one per line)</div>
    <textarea id="bNote" class="notes-area" style="height:54px">${b.note}</textarea>
    <div class="btn-row">
      <button class="btn btn-danger" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveBreakdown(${w},${d})">Save breakdown</button>
    </div>`;
  document.getElementById('editModal').classList.add('open');
}

function saveBreakdown(w,d){
  const key=sk(w,d);
  if(!state.customBreakdowns) state.customBreakdowns={};
  state.customBreakdowns[key]={
    title:'Custom',
    what:document.getElementById('bWhat').value,
    why:document.getElementById('bWhy').value,
    how:document.getElementById('bHow').value.split('\n').filter(x=>x.trim()),
    watch:document.getElementById('bWatch').value.split('\n').filter(x=>x.trim()),
    note:document.getElementById('bNote').value
  };
  persist();
  closeModal();
  const panel=document.getElementById('exp-'+key);
  if(panel) { panel.innerHTML=renderBreakdown(state.customBreakdowns[key])+`<div class="btn-row" style="margin-top:8px"><button class="btn btn-sm" onclick="editBreakdown(${w},${d})"><i class="ti ti-edit"></i> Edit this breakdown</button></div>`; }
}
