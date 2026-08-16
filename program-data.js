const WEEKS = [
  {phase:"Movement",focus:"Ankle+hip mobility. Band activation. Wall drills intro. No running.",deload:false,sessions:[
    {day:"Mon",type:"Gym",detail:"Mobility (15min) → Band Complex A → Upper body (bench, row, shoulder press)"},
    {day:"Tue",type:"Mob",detail:"Full 20min mobility: ankle, hip, thoracic. Assess baseline squat depth — record."},
    {day:"Wed",type:"Gym",detail:"Mobility → Band Complex A → Hip Thrust (BW then light barbell) → Core"},
    {day:"Thu",type:"Drill",detail:"Mobility → Wall Drill Session A (30 min total). No running."},
    {day:"Fri",type:"Gym",detail:"Mobility → Band Complex B → Box Squat (high box) 4×8 light → RDL 3×10"},
    {day:"Sat",type:"Rest",detail:"Easy 20min walk. Pigeon + hip flexor stretch. Foam roll: quads, IT band, calves."},
    {day:"Sun",type:"Rest",detail:"Full rest. Protein target: 134–148g. Sleep 8–9h. Record body weight."}
  ]},
  {phase:"Movement",focus:"Squat depth work begins. Band Complex A+B. First A-skips moving forward.",deload:false,sessions:[
    {day:"Mon",type:"Gym",detail:"Mobility → Band Complex A (+1 set each) → Hip Thrust 4×8 (add load) → Upper push/pull"},
    {day:"Tue",type:"Mob",detail:"Extended ankle protocol: wall stretch (toes 1cm further) + deep squat hold"},
    {day:"Wed",type:"Gym",detail:"Mobility → Box Squat 4×8 (add 5kg, high box) → Nordic Curl 3×6 → Core circuit"},
    {day:"Thu",type:"Drill",detail:"Mobility → Wall Drill Session B. First A-skips moving forward — 3 lanes of 20m."},
    {day:"Fri",type:"Gym",detail:"Mobility → Band Complex B (+1 set) → Hip Thrust 4×8 → SL RDL 3×8/leg → Upper"},
    {day:"Sat",type:"Rest",detail:"20min walk. Foam roll: calves + hip flexors."},
    {day:"Sun",type:"Rest",detail:"Full rest. Weigh-in — record. Target: 67–68 kg."}
  ]},
  {phase:"Movement",focus:"Mobility progresses. Band Complex B. Full Mach drill intro (A, B, C-skip).",deload:false,sessions:[
    {day:"Mon",type:"Gym",detail:"Mobility → Hip Thrust 4×6 @65% → Box Squat 4×6 (lower box 2cm) → Core"},
    {day:"Tue",type:"Drill",detail:"Mobility → Mach Drill Session A: A-skip 4×30m, B-skip 3×20m, C-skip 2×20m"},
    {day:"Wed",type:"Gym",detail:"Mobility → Band Complex A+B combined (3 sets) → Upper: Bench 3×10, Row 3×10"},
    {day:"Thu",type:"Drill",detail:"Mobility → Wall drills warm-up → A-skip + B-skip 3 rounds × 30m → Power Skip 3×20m"},
    {day:"Fri",type:"Gym",detail:"Mobility → Hip Thrust 4×6 (add 5kg) → SL RDL 4×8/leg → Nordic 3×6 → Calf Raise 3×15"},
    {day:"Sat",type:"Rest",detail:"Extended mobility 30min. Ankle focus. Can you hold deep squat 20sec without support?"},
    {day:"Sun",type:"Rest",detail:"Full rest. Reflect: what feels tight? What feels stronger? Note for Phase 2."}
  ]},
  {phase:"Movement",focus:"DELOAD — 50–60% volume. Test squat depth. Light band work only.",deload:true,sessions:[
    {day:"Mon",type:"Gym",detail:"Mobility → Band Complex A (2 sets light) → Hip Thrust 3×5 (70% Wk3 load) → Upper light"},
    {day:"Tue",type:"Mob",detail:"ASSESSMENT: Film squat from side. Measure squat depth. Test wall ankle stretch distance. Record all."},
    {day:"Wed",type:"Drill",detail:"Light Mach drills: A-skip 3×20m, B-skip 3×20m. Easy pace, zero fatigue."},
    {day:"Thu",type:"Rest",detail:"Full rest or 20min easy walk."},
    {day:"Fri",type:"Gym",detail:"Mobility → Box Squat 3×5 (60% Wk3) → SL RDL 2×8/leg → Core light"},
    {day:"Sat",type:"Mob",detail:"30min full mobility session. Extended holds. Enjoy the recovery week."},
    {day:"Sun",type:"Rest",detail:"Full rest. End Phase 1. Plan Phase 2 loads from 1RM estimates."}
  ]},
  {phase:"Strength",focus:"Load shift. Speed bands introduced. Drive phase drills. Mach drills.",deload:false,sessions:[
    {day:"Mon",type:"Gym",detail:"Mobility → Hip Thrust 4×6 @70% → Box Squat 4×6 (box 2cm lower than Wk3) → Nordic 3×6"},
    {day:"Tue",type:"Drill",detail:"Mobility → Speed Band Complex A → Mach drills: A-skip 4×30m, B-skip 3×20m"},
    {day:"Wed",type:"Gym",detail:"Mobility → Trap Bar DL 4×6 @65% → Incline DB Press 3×8 → Cable Row 3×10 → Dead Bug 3×8"},
    {day:"Thu",type:"Drill",detail:"Mobility → Wall drill warm-up → Speed Band resisted drive 10m × 6 → Mach drills"},
    {day:"Fri",type:"Gym",detail:"Mobility → Hip Thrust 5×5 @72% → SL RDL 4×8/leg → Loaded Calf Raise 3×12 → Upper"},
    {day:"Sat",type:"Rest",detail:"Foam roll, 20min walk, extended hip flexor + ankle stretch."},
    {day:"Sun",type:"Rest",detail:"Full rest. Weigh-in. Target: 68–69 kg."}
  ]},
  {phase:"Strength",focus:"Heavy compound. Sled introduced — first horizontal force work.",deload:false,sessions:[
    {day:"Mon",type:"Gym",detail:"Mobility → Hip Thrust 5×5 @75% → Box Squat 5×5 @70% (box 3–4cm lower than Wk1) → Nordic 3×6"},
    {day:"Tue",type:"Drill",detail:"Mobility → Speed Band Complex A (+1 set each) → Sled push 4×20m @10% BW (~6.7kg)"},
    {day:"Wed",type:"Gym",detail:"Mobility → Trap Bar DL 4×5 @70% → Bulgarian Split Squat 3×8/leg (BW or light DB) → Core"},
    {day:"Thu",type:"Drill",detail:"Mobility → Full Mach drills → Speed Band resisted drive 15m × 5 → Power skip 3×20m"},
    {day:"Fri",type:"Gym",detail:"Mobility → Hip Thrust 5×4 @77% → SL RDL 4×8/leg → Calf Raise 3×12 → Upper push+pull"},
    {day:"Sat",type:"Rest",detail:"Light walk 20min. Extended foam roll. Sled causes unusual posterior chain soreness — address it."},
    {day:"Sun",type:"Rest",detail:"Rest. Weigh-in. Mobility check: slightly deeper squat this week?"}
  ]},
  {phase:"Strength",focus:"PAP begins. FIRST 20m sprints on track. Diagnostic and developmental.",deload:false,sessions:[
    {day:"Mon",type:"Gym",detail:"Mobility → Hip Thrust 5×4 @78% → PAP: Box Squat 3×3 @80% → rest 4min → Broad Jump 3×4"},
    {day:"Tue",type:"Track",detail:"Mobility → Full Mach drills → Speed band drive 15m × 4 → FIRST 20m SPRINTS: 5×20m crouch, full recovery"},
    {day:"Wed",type:"Gym",detail:"Mobility → Trap Bar DL 5×4 @75% → Incline Bench 4×6 → Pendlay Row 4×6 → Nordic 4×5"},
    {day:"Thu",type:"Drill",detail:"Mobility → Speed Band Complex B → A-skip + B-skip 4×30m → Straight-leg bounds 3×20m"},
    {day:"Fri",type:"Gym",detail:"Mobility → Hip Thrust 5×4 @78% → Bulgarian Split Squat 4×6/leg → Calf Raise 3×12 → Core"},
    {day:"Sat",type:"Rest",detail:"Full recovery. Legs will feel different after first real sprint work. Walk, stretch, foam roll."},
    {day:"Sun",type:"Rest",detail:"Full rest. How did the 20m sprints feel? Smooth? Stiff? Note for adjustments."}
  ]},
  {phase:"Strength",focus:"Volume peak. 30m accelerations. Time the 30m efforts.",deload:false,sessions:[
    {day:"Mon",type:"Gym",detail:"Mobility → Hip Thrust 5×3 @82% → PAP: Hip Thrust 3×3 @82% → rest 4min → Bounds 4×8"},
    {day:"Tue",type:"Track",detail:"Mobility → Mach drills → 6×20m + 4×30m crouch starts (full recovery 5min). TIME the 30m."},
    {day:"Wed",type:"Gym",detail:"Mobility → Trap Bar DL 5×3 @80% → Incline Bench 4×5 → Weighted Pull-Up 3×5 → Nordic 4×5"},
    {day:"Thu",type:"Drill",detail:"Mobility → Speed band drive 20m × 6 → Full Mach drill set → Power skip 4×20m"},
    {day:"Fri",type:"Gym",detail:"Mobility → Hip Thrust 5×3 @82% → Bulgarian Split Squat 4×5/leg → Calf Raise 3×12 → Core"},
    {day:"Sat",type:"Rest",detail:"Active recovery: light walk, foam roll. Highest cumulative load so far."},
    {day:"Sun",type:"Rest",detail:"Full rest. Weigh-in. Target: 70 kg."}
  ]},
  {phase:"Strength",focus:"DELOAD + 1RM Testing — Hip Thrust, Trap Bar DL, Box Squat.",deload:true,sessions:[
    {day:"Mon",type:"Gym",detail:"Mobility → Light band complex (2 sets) → Hip Thrust warm-up sets → 1RM TEST: Hip Thrust"},
    {day:"Tue",type:"Drill",detail:"Light Mach drills 3×30m each. No sprinting. Let body recover for testing."},
    {day:"Wed",type:"Gym",detail:"Mobility → 1RM TEST: Trap Bar Deadlift → 1RM TEST: Box Squat at current depth"},
    {day:"Thu",type:"Rest",detail:"Full rest. Protect body for Friday."},
    {day:"Fri",type:"Gym",detail:"Mobility → 1RM TEST: Bench Press (3RM → estimate 1RM) → Record ALL results + body weight"},
    {day:"Sat",type:"Mob",detail:"Easy walk 20min. Extended mobility. Reflect on Phase 2."},
    {day:"Sun",type:"Rest",detail:"Full rest. Use 1RM results to calibrate Phase 3 percentage targets precisely."}
  ]},
  {phase:"Power",focus:"Plyometrics dominate. 30–50m sprints begin. Speed band complexes. Sled push+pull maintained.",deload:false,sessions:[
    {day:"Mon",type:"Gym",detail:"Mobility → PAP: Hip Thrust 4×4 @82% → rest 4min → Bounds 4×8 · Jump Squat 4×5 · Nordic 3×5"},
    {day:"Tue",type:"Track",detail:"Mobility → Mach drills → Speed band drive 20m × 4 → 6×30m + 3×50m crouch (full rec)"},
    {day:"Wed",type:"Gym",detail:"Mobility → Trap Bar DL 4×4 @82% → Incline Bench 4×5 → Weighted Pull-Up 3×5 → Core"},
    {day:"Thu",type:"Track",detail:"Mobility → Mach drills → Sled push 4×20m @10%BW → Sled pull 4×20m @10%BW (harness, facing away) → 4×30m flat (contrast: heavy → free)"},
    {day:"Fri",type:"Gym",detail:"Mobility → Box Squat 4×4 @82% → PAP: Box Squat 3×3 → rest 4min → Depth Jump 3×4 (intro)"},
    {day:"Sat",type:"Rest",detail:"Pool recovery 20min or easy cycle. Foam roll. First full sprint week — extra recovery needed."},
    {day:"Sun",type:"Rest",detail:"Full rest. Weigh-in. Target: 70–71 kg."}
  ]},
  {phase:"Power",focus:"Race-specific power. 50–80m sprints. Hill + flat contrast sessions. Alternating sled push/pull.",deload:false,sessions:[
    {day:"Mon",type:"Gym",detail:"Mobility → Hip Thrust 5×3 @84% → PAP complex + Bounds → Hurdle Hops 4×5 (30cm)"},
    {day:"Tue",type:"Track",detail:"Mobility → Mach drills → 5×30m starts + 3×60m @90% crouch (9min rec). TIME the 60m."},
    {day:"Wed",type:"Gym",detail:"Mobility → Trap Bar DL 4×4 @83% → Incline Bench 4×5 → Pendlay Row 4×5 → Nordic 4×5"},
    {day:"Thu",type:"Track",detail:"Contrast: 2×sled push 20m @12%BW + 2×sled pull 20m @12%BW (alternating) → walk back → 20m free sprint × 4. Then 2×80m @88%."},
    {day:"Fri",type:"Gym",detail:"Mobility → Box Squat 4×4 @83% → Depth Jump 4×4 → Med Ball Rotational Throw 3×8/side → Core"},
    {day:"Sat",type:"Rest",detail:"Active recovery. Foam roll full body. Glutes and hamstrings typically very sore."},
    {day:"Sun",type:"Rest",detail:"Full rest."}
  ]},
  {phase:"Power",focus:"First timed 60m and 100m of the program. Race rhythm practice. Sled kept off test days.",deload:false,sessions:[
    {day:"Mon",type:"Gym",detail:"Mobility → Explosive activation: Hip Thrust 3×3 @84%, Jump Squat 3×4, Broad Jump 3×4"},
    {day:"Tue",type:"Track",detail:"Mobility → Mach drills → 4×30m starts → TIMED: 60m × 2 (10min rec). First official times."},
    {day:"Wed",type:"Rest",detail:"Rest. Protect legs before first full 100m attempt."},
    {day:"Thu",type:"Track",detail:"Mobility → Full warm-up → TIMED: 100m × 1 @95%+. First race-distance run of the program."},
    {day:"Fri",type:"Gym",detail:"Light: Hip Thrust 3×5 @78%, Trap Bar DL 3×5 @78%, Bench 3×8, Row 3×8."},
    {day:"Sat",type:"Track",detail:"Sled push 3×20m @12%BW → 3×80m @90% (relaxed finish). Race rhythm + full-distance mechanics practice."},
    {day:"Sun",type:"Rest",detail:"Full rest. Record timed 60m and 100m results. Phase 3 progress check."}
  ]},
  {phase:"Power",focus:"DELOAD + Reassessment. Light sprints. No heavy gym. No sled — protect the taper. Plan Phase 4.",deload:true,sessions:[
    {day:"Mon",type:"Gym",detail:"Mobility → Light: Hip Thrust 3×5 @75%, Box Squat 3×5 @72%. Volume cut to 50%."},
    {day:"Tue",type:"Track",detail:"Mach drills only (A-skip, B-skip 3×30m each). Easy pace. No sprinting."},
    {day:"Wed",type:"Mob",detail:"Full 30min extended mobility. Squat depth reassessment — film and compare to Week 9."},
    {day:"Thu",type:"Track",detail:"3×20m easy starts + 2×40m @85% — controlled, technical. Nothing maximal."},
    {day:"Fri",type:"Gym",detail:"Light upper body: Bench 3×8, Row 3×8, Shoulder Press 3×10. No lower body loading."},
    {day:"Sat",type:"Rest",detail:"Full rest."},
    {day:"Sun",type:"Rest",detail:"Full rest. Plan Phase 4. Athlete should now be running faster than program start."}
  ]},
  {phase:"Speed+End",focus:"SS Endurance begins 2×/week: 2×60sec @86–88%. Sprint quality sessions. Light sled maintenance. Dedicated max-velocity (fly) work begins — goal for this block: high-11s, up from the original low-12s target.",deload:false,sessions:[
    {day:"Mon",type:"Track",detail:"Mach drills → 6×30m starts → 3×60m @93% → 2×20m FLY (30m build-up, max velocity zone only — this is new: raw top-speed work the program hasn't trained directly yet). Sharp, fresh."},
    {day:"Tue",type:"Gym",detail:"Mobility → Hip Thrust 3×4 @82%, Trap Bar DL 3×4 @80%, Nordic 3×5, Jump Squat 3×4. 45min."},
    {day:"Wed",type:"End",detail:"SS ENDURANCE: Warm-up 10min → 60sec @86–88% steady → 4min walk → 60sec @86–88% → cool-down. ~380–400m/rep. Set pace in first 5sec and HOLD."},
    {day:"Thu",type:"Track",detail:"Mach drills → Sled push 3×20m @8–10%BW (maintenance) → Speed band drive 15m × 4 → 4×50m @92% + 2×80m @90%."},
    {day:"Fri",type:"Gym",detail:"Mobility → Box Squat 3×4 @82%, Bench 3×6, Row 3×8. Light and sharp."},
    {day:"Sat",type:"End",detail:"SS ENDURANCE SESSION 2: 2×60sec @86–88%. Is pace consistent between reps and sessions?"},
    {day:"Sun",type:"Rest",detail:"Full rest. Weigh-in. Target: 72 kg."}
  ]},
  {phase:"Speed+End",focus:"SS Endurance 2×70sec @87–89%. Sprint sharpening. No sled — alternating maintenance week off.",deload:false,sessions:[
    {day:"Mon",type:"Track",detail:"Mach drills → 8×30m starts (reaction focus) → 4×60m @93% → 3×20m FLY (30m build-up) @95%+. Second week of dedicated top-speed work — should feel a touch faster through the fly zone than Week 14."},
    {day:"Tue",type:"Gym",detail:"Hip Thrust 3×4 @83%, Bulgarian Split Squat 3×5/leg, Nordic 3×5, Depth Jump 3×4."},
    {day:"Wed",type:"End",detail:"SS ENDURANCE: 2×70sec @87–89% steady. 4min walk recovery. ~440–470m/rep. Pace dropping in final 15sec? Start 5% slower next rep."},
    {day:"Thu",type:"Track",detail:"Mach drills → 3×60m + 2×80m @92%. PAP: Hip Thrust 3×3 @85% → 4min rest → 30m sprint × 3."},
    {day:"Fri",type:"Gym",detail:"Trap Bar DL 3×4 @82%, Bench 3×6, Pull-Up 3×5. 40min total."},
    {day:"Sat",type:"End",detail:"SS ENDURANCE SESSION 2: 2×70sec @87–89%. Should feel slightly easier than Wednesday."},
    {day:"Sun",type:"Rest",detail:"Full rest. Target: 72–73 kg."}
  ]},
  {phase:"Speed+End",focus:"SS Endurance PEAK: 2×90sec @87–89%. Hardest endurance session. Light sled maintenance (pull).",deload:false,sessions:[
    {day:"Mon",type:"Track",detail:"Mach drills → 6×30m starts → 3×80m @93%. Last high-volume sprint week."},
    {day:"Tue",type:"Gym",detail:"Hip Thrust 3×3 @85%, Box Squat 3×3 @84%, Nordic 2×5. Brief, explosive, 35min."},
    {day:"Wed",type:"End",detail:"SS ENDURANCE PEAK: 2×90sec @87–89% steady. 5min walk recovery. ~540–580m/rep. Hardest endurance session. Hold mechanics in final 30sec."},
    {day:"Thu",type:"Track",detail:"Sled pull 3×20m @8–10%BW (maintenance) → 3×60m + 1×100m @90%. Full race distance at race pace. Smooth finish — no strain."},
    {day:"Fri",type:"Rest",detail:"Rest. Two hard sessions this week — protect the body."},
    {day:"Sat",type:"End",detail:"SS ENDURANCE PEAK SESSION 2: 2×90sec @87–89%. 5min walk. Highest endurance point of program."},
    {day:"Sun",type:"Rest",detail:"Full rest. Weigh-in. Target: 73 kg."}
  ]},
  {phase:"Speed+End",focus:"Endurance descent: 2×70sec @90–92% — FASTER than Wk15. Race-pace sessions. No sled — protect peak sprint work.",deload:false,sessions:[
    {day:"Mon",type:"Track",detail:"Mach drills → 6×30m starts → 4×60m @95% — sharpest sprint work of the program."},
    {day:"Tue",type:"Gym",detail:"Hip Thrust 3×3 @86%, Jump Squat 3×4, Broad Jump 3×4. Explosive, 30min."},
    {day:"Wed",type:"End",detail:"SS ENDURANCE DESCENT: 2×70sec @90–92% — FASTER than Week 15 70-sec efforts. The 90-sec base makes this possible. 4min walk recovery."},
    {day:"Thu",type:"Track",detail:"2×20m assisted/downhill sprint (very slight grade, under 2%, or light tow) @97%+ turnover — teaches the body to move faster than it can currently produce unassisted → 5×60m @95% (9min rec). Best 60m times of the entire program."},
    {day:"Fri",type:"Gym",detail:"Trap Bar DL 3×3 @83%, Bench 3×5, Row 3×8. Sharp and brief."},
    {day:"Sat",type:"End",detail:"SS ENDURANCE SESSION 2: 2×70sec @90–92%. This should feel faster than any 70-sec in Phase 4."},
    {day:"Sun",type:"Rest",detail:"Full rest."}
  ]},
  {phase:"Speed+End",focus:"Endurance exit: 40sec → 20sec near-maximal. Final race-prep. No sled — full taper. Program complete.",deload:false,sessions:[
    {day:"Mon",type:"Track",detail:"Activation: Mach drills → 4×30m starts → 2×60m @93% → 1×80m @90%. Feel fast."},
    {day:"Tue",type:"Gym",detail:"Hip Thrust 2×3 @87%, Jump Squat 2×4, Nordic 3×4 (held steady, not tapered — hamstring protection matters most exactly when sprint intensity peaks). 25min — pure activation."},
    {day:"Wed",type:"End",detail:"SS ENDURANCE NEAR-EXIT: 2×40sec @92–94% steady. 3min walk recovery. ~250–270m/rep. Sharp, near-maximal."},
    {day:"Thu",type:"Track",detail:"3×60m @95% + 1×100m @93–95%. FINAL TIMED 100m. Compare to Week 12."},
    {day:"Fri",type:"Rest",detail:"Rest. Protect the body."},
    {day:"Sat",type:"End",detail:"FINAL ENDURANCE SESSION: 2×20sec @94–96%. 3min walk. ~130–150m. EXPLOSIVE. Arc closes here."},
    {day:"Sun",type:"Rest",detail:"Program complete. Full assessment: body weight, all 1RMs, 60m + 100m times, squat depth."}
  ]}
];

const PHASE_NOTES = [
  "No running. No barbell squats below box height. Build the foundation before the sprint begins.",
  "No running. No barbell squats below box height. Dorsiflexion protocol + wall drills.",
  "No running. A-skip, B-skip mechanics. Full Mach drill introduction.",
  "Deload — 50–60% volume. Recovery + assessment. Plan Phase 2 loads.",
  "Drive phase posture. Wall-to-field drills. Speed bands introduced.",
  "First sled work (push) — horizontal force focus. Squat depth target: parallel by this week.",
  "First 10–20m accelerations on track. PAP begins. Diagnostic session.",
  "Acceleration mechanics under load. 30m timed for Phase 3 benchmarks.",
  "Deload + 1RM testing. No sprinting. Calibrate Phase 3 percentages.",
  "First real sprint work — 30–50m. Sled push+pull maintained on contrast day. Sprint mechanics sharpened.",
  "Sprint mechanics sharpened. 60–80m distances. Alternating sled push/pull → free contrast sessions.",
  "First timed runs. 60m and 100m for the first time. Sled kept off test days — light push work moved to Saturday. Race rhythm practice.",
  "Recovery, review, re-plan. Light sprints. No sled — protect the taper. Athlete should now be running faster.",
  "First endurance sessions — 2×60sec. Light sled push maintenance (Thu). Dedicated max-velocity fly work begins — goal for this block is high-11s.",
  "70sec steady-state efforts. Sprint sharpening. Reaction focus. Second week of fly work — top speed should be trending up. Sled off this week (alternating maintenance).",
  "90sec — endurance ceiling. Hardest endurance week. Light sled pull maintenance (Thu). Sprint quality maintained.",
  "Endurance descends, pace rises. Assisted/downhill overspeed work introduced Thu — teaches turnover faster than current unassisted capacity. No sled — protecting peak sprint output. Best 60m times of the program.",
  "Exit arc — speed converts from endurance base. Nordic held steady (not tapered) to protect hamstrings at peak intensity. No sled — full taper. Final 100m timed — target: high-11s."
];

const TYPE_LABELS = {Gym:"Gym",Track:"Track",Mob:"Mobility",Drill:"Drills",End:"Endurance",Rest:"Rest"};
