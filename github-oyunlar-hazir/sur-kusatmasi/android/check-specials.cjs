const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const elements=new Map();function el(){return {style:{setProperty(){}},dataset:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},addEventListener(){},querySelector(){return el()},querySelectorAll(){return[]},focus(){},getContext(){return context},getBoundingClientRect(){return{top:0,height:530}}}}
const context=new Proxy({createLinearGradient(){return{addColorStop(){}}},createRadialGradient(){return{addColorStop(){}}}},{get(t,p){return p in t?t[p]:()=>{}}});
let seed=1683;const math=Object.create(Math);math.random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
const sandbox={console,Path2D:class{constructor(d){this.d=d}},document:{body:el(),documentElement:el(),getElementById(id){if(!elements.has(id))elements.set(id,el());return elements.get(id)},createElement:el,querySelectorAll(){return[]}},window:{addEventListener(){},close(){}},requestAnimationFrame(){},Math:math};
vm.createContext(sandbox);for(const file of ['units','siege','nations','maps','uniforms','nation-render','menu','specials','difficulty','engine','map-render','sprites','game'])vm.runInContext(fs.readFileSync('app/src/main/assets/game/'+file+'.js','utf8'),sandbox);const run=c=>vm.runInContext(c,sandbox);
run("setMode('versus');start()");
for(const side of [1,-1]){assert.equal(run(`state.specialHands[${side}].length`),3);assert.equal(run(`new Set(state.specialHands[${side}].map(c=>c.id)).size`),3)}
assert.notEqual(run('state.specialHands[1]'),run('state.specialHands[-1]'));
run("state.specialHands[1]=SpecialCards.slice(0,3).map(c=>({id:c.id,readyAt:0}));state.specialHands[-1]=[{id:'fire',readyAt:0},{id:'speed',readyAt:0},{id:'power',readyAt:0}];state.specialClock=100;spawn(types[0],1,0);state.units=state.units.slice(0,1)");
const x=run('state.units[0].x'),speed=run('state.units[0].type.speed');assert.equal(run('useSpecial(0,1)'),true);run('step(1)');assert.ok(Math.abs(run('state.units[0].x')-x-speed*1.4)<.001);
assert.equal(run('useSpecial(0,1)'),false,'cooldown prevents reuse');assert.equal(run("specialActive(-1,'speed')"),false,'buffs independent');
run("spawn(types[0],1,1)");assert.equal(run("specialActive(state.units.at(-1).side,'speed')"),true,'new units receive army buff');
run("useSpecial(1,1);spawn(enemies[0],-1,0);state.units=state.units.filter(u=>u.lane===0).slice(0,2)");
const hp=run('state.units[1].hp');run('attack(state.units[0],state.units[1],false)');assert.ok(Math.abs(hp-run('state.units[1].hp')-27*1.35)<.001);
run('useSpecial(2,1);attack(state.units[0],state.units[1],false)');assert.ok(run('state.units[1].frozenUntil>state.time'));
const enemyX=run('state.units[1].x');run('step(.2)');assert.equal(run('state.units[1].x'),enemyX,'frozen target cannot walk');
const until=run('state.units[1].frozenUntil');run('attack(state.units[0],state.units[1],false)');assert.equal(run('state.units[1].frozenUntil'),until,'freeze immunity stops repeated lock');
run("useSpecial(0,-1);attack(state.units[1],state.units[0],false);state.units[0].attack=100;state.units[1].attack=100");
const ownHP=run('state.units[0].hp');run('step(.5)');assert.ok(Math.abs(ownHP-run('state.units[0].hp')-3)<.001,'burn does six damage per second');
run('state.paused=true');const time=run('state.time');const burnHP=run('state.units[0].hp');run('step(3)');assert.equal(run('state.time'),time);assert.equal(run('state.units[0].hp'),burnHP);assert.equal(run('useSpecial(1,-1)'),false);
run("state.paused=false;state.time=40");assert.equal(run("specialActive(1,'speed')"),false);assert.equal(run('useSpecial(0,1)'),true,'cooldown expires');
run("showMenu();setMode('solo');start();spawn(enemies[0],-1,2);state.specialClock=0;step(.1)");assert.ok(run('state.specialHands[-1].some(c=>c.readyAt>state.time)'),'AI uses its random cards');assert.equal(run('useSpecial(0,-1)'),false,'solo player cannot activate AI cards');
for(const id of ['ottoman','seljuk','hun','byzantine','austria','hungary','mongol']){
 run(`showMenu();selectNation('${id}',1)`);assert.equal(run(`nationUnits('${id}').length`),15);
 run('toggleArmyCard(1,0);toggleArmyCard(1,12);toggleArmyCard(1,1);toggleArmyCard(1,13);toggleArmyCard(1,2);toggleArmyCard(1,14)');assert.equal(run('types.length'),12);
 assert.equal(run('types.filter(t=>t.siegeStyle).length'),3);run('start();for(const t of types.filter(t=>t.siegeStyle)){spawn(t,1,3);drawUnit(state.units.at(-1));portrait(t)}');
}
console.log('PASS: unique three-card hands, independent buffs, speed/damage, new units, freeze/immunity, burn, pause, expiry/cooldowns, AI activation and 21 additional siege cards.');
const profiles=[];
for(const id of ['easy','normal','hard']){
 run(`showMenu();setMode('solo');chooseDifficulty('${id}');start();state.enemySupply=0;state.aiClock=100;state.specialClock=100`);
 run('step(2)');const refill=run('state.enemySupply');
 run('state.enemySupply=12;state.time=100;ai()');
 assert.equal(run('state.units[0].type.hp'),run('Math.round(enemies.find(t=>t.name===state.units[0].type.name).hp*currentDifficulty().hp)'));
 profiles.push({refill,hp:run('currentDifficulty().hp'),wave:run('currentDifficulty().wave'),special:run('currentDifficulty().special')});
 run("chooseDifficulty('invalid');chooseDifficulty('normal')");assert.equal(run('state.difficulty'),id,'difficulty stays fixed during battle');
}
assert.ok(profiles[0].refill<profiles[1].refill&&profiles[1].refill<profiles[2].refill);
assert.ok(profiles[0].hp<profiles[1].hp&&profiles[1].hp<profiles[2].hp);
assert.ok(profiles[0].wave>profiles[1].wave&&profiles[1].wave>profiles[2].wave);
assert.ok(profiles[0].special>profiles[1].special&&profiles[1].special>profiles[2].special);
run("showMenu();setMode('versus');start();state.enemySupply=0;step(2)");assert.equal(run('state.enemySupply'),1,'two-player supplies unaffected');assert.equal(run('state.aiWaves'),0);
run('showMenu()');assert.equal(run('difficultyId'),'hard','menu return retains difficulty');
console.log('PASS: easy/normal/hard strength, supplies, reinforcements, special intervals, battle selection guard and unchanged two-player rules.');
