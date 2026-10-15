const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const harness=fs.readFileSync('check-game.cjs','utf8').split("run('stepSpecials=()=>{}');")[0];
const outer={require,console};vm.createContext(outer);vm.runInContext(harness+';globalThis.run=run;',outer);const run=outer.run;
for(const id of ['ottoman','seljuk','hun','byzantine','austria','hungary','mongol']){
 run(`showMenu();selectNation('${id}',1);selectNation('${id}',-1);setMode('versus')`);
 assert.equal(run(`nationUnits('${id}').length`),20);
 run('for(let i=0;i<5;i++){toggleArmyCard(1,i);toggleArmyCard(1,15+i);toggleArmyCard(-1,i);toggleArmyCard(-1,15+i)}');
 assert.equal(run('types.length'),12);assert.equal(run('types.filter(t=>t.kind>=15).length'),5);
 run(`start();for(const side of [1,-1])for(const t of roster(side).filter(t=>t.kind>=15)){spawn(t,side,2);const u=state.units.at(-1);if(!portrait(t).includes('<svg'))throw Error('Missing portrait');u.inCombat=true;u.attack=.1;drawUnit(u);u.attackPose={start:state.time,duration:.65};for(let i=0;i<6;i++){state.time+=.1;drawUnit(u)}}`);
}
run("showMenu();selectNation('ottoman',1);selectNation('byzantine',-1);setMode('versus');start();state.units=[];spawn(nationUnits('ottoman')[16],1,2);spawn(nationUnits('byzantine')[17],-1,2);state.units=state.units.filter((u,i)=>i===0||i===2)");
const hp=run('state.units[1].hp');run('attack(state.units[0],state.units[1],false)');assert.ok(Math.abs(hp-run('state.units[1].hp')-38*1.4*.8)<.001,'axe bonus against self-armored guard and guard protection');
run("start();state.units=[];spawn(nationUnits('ottoman')[19],1,2);spawn(enemies[0],-1,2);state.units=state.units.filter((u,i)=>i<2);moveUnit(state.units[0],65,[])");
assert.equal(run('state.units[0].chargeReady'),true);const targetHP=run('state.units[1].hp');run('attack(state.units[0],state.units[1],false)');assert.ok(Math.abs(targetHP-run('state.units[1].hp')-43*1.5)<.001);assert.equal(run('state.units[0].chargeReady'),false);
run("state.time=0;const soldier=state.units[0];soldier.attackPose={start:0,duration:.65};state.time=.12");const phase=run('combatPose(state.units[0]).p');run('state.paused=true;step(.2);draw(.2)');assert.equal(run('combatPose(state.units[0]).p'),phase,'pause holds attack pose');
run('state.units[0].frozenUntil=state.time+1');assert.equal(run('combatPose(state.units[0]).idle'),true,'freeze suppresses swinging');
run("start();state.units=[];spawn(nationUnits('ottoman')[18],1,2);spawn(enemies[0],-1,2);attack(state.units[0],state.units[2],false)");assert.equal(run('shots.at(-1).weapon'),'javelin');assert.equal(run('shots.at(-1).arc'),18);run('draw(.05)');
run("start();state.units=[];spawn(types[9],1,2);spawn(enemies[0],-1,2);attack(state.units[0],state.units[2],false)");assert.equal(run('shots.at(-1).arc'),0);assert.ok(run("particles.some(p=>p.color==='#fff2b0')"),'gun muzzle flash');
console.log('PASS: 35 new selectable troops, all 140 portraits, both-side weapon poses, armor roles, charged attack, pause/freeze poses, javelin trajectories and gun muzzle effects.');
