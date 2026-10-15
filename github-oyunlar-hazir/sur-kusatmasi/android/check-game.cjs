const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const elements=new Map();
function el(){return {style:{setProperty(){}},dataset:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},addEventListener(){},querySelector(){return el()},querySelectorAll(){return[]},focus(){},showModal(){this.open=true},close(){this.open=false},getContext(){return context},getBoundingClientRect(){return {top:0,height:530}}}}
const context=new Proxy({createLinearGradient(){return{addColorStop(){}}},createRadialGradient(){return{addColorStop(){}}}},{get(t,p){return p in t?t[p]:()=>{}}});
const events={};let seed=1453;const math=Object.create(Math);math.random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
const sandbox={console,Path2D:class{constructor(d){this.d=d}},document:{body:el(),documentElement:el(),getElementById(id){if(!elements.has(id))elements.set(id,el());return elements.get(id)},createElement:el,querySelectorAll(){return[]}},window:{close(){},addEventListener(name,fn){events[name]=fn}},requestAnimationFrame(){},Math:math};
vm.createContext(sandbox);for(const file of ['units','siege','nations','maps','uniforms','nation-render','menu','specials','difficulty','engine','map-render','sprites','game'])vm.runInContext(fs.readFileSync('app/src/main/assets/game/'+file+'.js','utf8'),sandbox);
const run=c=>vm.runInContext(c,sandbox);
run('stepSpecials=()=>{}');
run('start(); select(0); deploy(1)');assert.equal(run('state.units.length'),2);assert.equal(run('state.supply'),4);assert.equal(run('state.units[0].lane'),1);
run('deploy(1)');assert.equal(run('state.units.length'),2,'cooldown prevents repeat');
run('select(5);deploy(0)');assert.equal(run('state.units.length'),2,'insufficient supply prevents spawn');
run('state.cooldowns[0]=0;state.supply=12;select(0);deploy(0);select(2);deploy(2)');assert.equal(run('state.units.length'),6);assert.equal(run('state.supply'),6);
run('state.enemySupply=12;ai()');assert.ok(run('state.units.some(u=>u.side===-1)'),'AI spawns');
run('start();spawn(types[5],1,1,5);state.units[0].x=1000;state.units[0].attack=0;step(.05)');assert.equal(run('state.wall'),5035,'cannon damages wall');
run('start();spawn(types[0],1,0,0);spawn(types[3],1,0,3);damage(state.units[0],100)');assert.equal(run('state.units[0].hp'),170,'cebeci armor aura');
run('start();state.wall=1;spawn(types[5],1,1,5);state.units[0].x=1000;state.units[0].attack=0;step(.05)');assert.ok(run('state.ended&&state.wall<=0'),'victory');
run('start();state.own=1;spawn(enemies[0],-1,1);state.units[0].x=155;state.units[0].attack=0;step(.05)');assert.ok(run('state.ended&&state.own<=0'),'defeat');
run('start();for(let i=0;i<6000&&!state.ended;i++)step(.05)');assert.ok(run('state.ended&&state.own<=0'),'idle player loses');
// Run the actual simulation with a deliberate strategy: protect artillery, sustain a main front.
run(`start();let next=0;for(let i=0;i<16000&&!state.ended;i++){if(state.time>=next){const threat=state.units.filter(u=>u.side===-1&&u.x<750&&!state.units.some(f=>f.side===1&&f.lane===u.lane&&f.kind!==5)).sort((a,b)=>a.x-b.x)[0];const front=state.units.filter(u=>u.side===1&&u.lane===1);let lane=threat?threat.lane:1;let choice=threat?0:front.filter(u=>u.kind===0).length<4?0:front.filter(u=>u.kind===5).length<2?5:4;if(state.supply>=types[choice].cost&&state.cooldowns[choice]<=0){select(choice);deploy(lane);next=state.time+.5}}step(.05)}`);
assert.ok(run('state.ended&&state.wall<=0'),'defend other corridors while advancing protected artillery');
console.log('PASS: deployment, lanes, cost, cooldown, AI, artillery, armor, victory, defeat, idle loss, strategic victory.');
assert.equal(run('types.length'),12);assert.equal(run('enemies.length'),12);assert.equal(run('lanes.length'),5);
run('showMenu();setMode("versus");start()');assert.equal(run('state.own'),5200);assert.equal(run('state.wall'),5200);
run('select(0,1);deploy(4,1);select(2,-1);deploy(0,-1)');assert.equal(run('state.units.length'),4);assert.equal(run('state.supply'),4);assert.equal(run('state.enemySupply'),4);assert.equal(run('selected'),0);assert.equal(run('enemySelected'),2);assert.equal(run('state.units[0].lane'),4);assert.equal(run('state.units[2].lane'),0);
run('deploy(0,-1)');assert.equal(run('state.units.length'),4,'independent cooldown');
run('start();for(let i=0;i<600;i++)step(.05)');assert.equal(run('state.units.length'),0,'no AI in versus');assert.equal(run('state.aiWaves'),0);
run('start();togglePause();step(1)');assert.equal(run('state.time'),0,'pause stops simulation');run('togglePause();step(2)');assert.equal(run('state.supply'),8);assert.equal(run('state.enemySupply'),8);
run('start();spawn(types[8],1,2);spawn(enemies[6],-1,2);attack(state.units[0],state.units[2],false)');assert.equal(run('state.units[2].hp'),run('enemies[6].hp-types[8].dmg*2'),'spears deal double cavalry damage');
run('start();spawn(types[0],1,2);spawn(types[10],1,2);step(1)');assert.equal(run('state.units[0].x'),255,'morale increases speed');
run('start();spawn(types[11],1,4);state.units[0].x=1200;state.units[0].attack=0;step(.05)');assert.equal(run('state.wall'),5080,'sapper damages wall');
run('start();spawn(types[0],1,0);spawn(enemies[0],-1,4);state.units.forEach(u=>{u.x=700;u.attack=0});step(.05)');assert.equal(run('state.units[0].hp'),240,'separate lanes isolate combat');
run('start()');events.keydown({code:'KeyD',key:'d',preventDefault(){}});events.keydown({code:'Digit1',key:'1',preventDefault(){}});events.keydown({code:'KeyT',key:'t',preventDefault(){}});assert.equal(run('state.units[0].kind'),6,'new page selects sipahi');assert.equal(run('state.units[0].lane'),4);
events.keydown({code:'KeyK',key:'k',preventDefault(){}});events.keydown({code:'Digit7',key:'7',preventDefault(){}});events.keydown({code:'KeyP',key:'p',preventDefault(){}});assert.equal(run('state.units[1].kind'),6,'P2 selects kataphrakt');assert.equal(run('state.units[1].side'),-1);assert.equal(run('state.units[1].lane'),4);assert.equal(run('state.paused'),false,'P is P2 lane five');
for(let i=0;i<5;i++)assert.equal(run('pointerLane({clientY:lanes['+i+']})'),i);
run('start();state.own=1;spawn(enemies[5],-1,2);state.units[0].x=300;state.units[0].attack=0;step(.05)');assert.ok(run('state.ended&&state.own<=0'),'P2 victory');
run('start();state.wall=1;spawn(types[5],1,2);state.units[0].x=1000;state.units[0].attack=0;step(.05)');assert.ok(run('state.ended&&state.wall<=0'),'P1 victory');
console.log('PASS: 12 units per side, five lanes, two-player controls, separate resources/selections/cooldowns, no AI in duel, pause, cavalry counters, morale, sabotage, lane isolation, both winners.');
assert.equal(run('BattleMaps.length'),4);
for(const id of ['vienna','mohacs','istanbul','dirt']){
 run(`showMenu();chooseMap('${id}')`);assert.equal(run('currentMap().id'),id);
 assert.equal(run('enemies[0].name'),run('currentNation(-1).names[0]'));
 assert.equal(elements.get('enemy-base-title').textContent,id==='dirt'?run('currentNation(-1).name')+' Üssü':run('currentMap().base'));
 if(id==='dirt'){assert.equal(run('currentMap().year'),null);assert.equal(elements.get('chapter').textContent,'SERBEST MEYDAN');assert.equal(elements.get('field-date').textContent,'SERBEST SAVAŞ');assert.ok(!run('document.title').includes('null'))}
 run('background();setMode("versus");start();select(0,1);deploy(4,1);select(0,-1);deploy(0,-1);step(.05);draw(.05)');
 assert.equal(run('state.units.length'),4);assert.equal(run('state.own'),5200);assert.equal(run('state.wall'),5200);
 run('chooseMap("invalid")');assert.equal(run('currentMap().id'),id,'battle map cannot change during play');
 run('state.wall=1;spawn(types[5],1,2);state.units.at(-1).x=1000;state.units.at(-1).attack=0;step(.05)');assert.ok(run('state.ended'));
 run('showMenu()');assert.equal(run('currentMap().id'),id,'return to menu keeps chosen map');
}
console.log('PASS: four map backgrounds including nonhistorical dirt roads, target labels, five lanes and both players on every map, victory and menu return.');
assert.equal(run('Nations.length'),7);
assert.equal(run('Nations.reduce((n,f)=>n+f.names.length,0)'),84);
for(const id of run('Nations.map(n=>n.id)')){
 run(`showMenu();selectNation('${id}',1);selectNation('${id}',-1);setMode('versus')`);
 assert.equal(run('types.length'),12);assert.equal(run('enemies.length'),12);
 assert.equal(run('types[0].faction'),id);assert.equal(run('enemies[0].faction'),id);
 assert.equal(run('types[0].name'),run('currentNation(1).names[0]'));
 assert.equal(run('enemies[0].name'),run('currentNation(-1).names[0]'));
 run(`for(let n=0;n<12;n++){start();state.supply=12;state.enemySupply=12;select(n,1);deploy(n%5,1);select(n,-1);deploy((n+1)%5,-1);draw(.01);if(state.units.length!==types[n].count+enemies[n].count)throw Error('deployment');if(!portrait(types[n]).includes('<svg'))throw Error('portrait');}`);
 run('selectNation("ottoman",1)');assert.equal(run('ownNationId'),id,'nation cannot change during battle');
 run('showMenu();chooseMap("vienna")');assert.equal(run('enemyNationId'),id,'chosen opponent survives map change');
}
run('showMenu();selectNation("hun",1);selectNation("mongol",-1);setMode("solo");start();state.enemySupply=12;ai();');assert.ok(run('state.units.some(u=>u.side===-1&&u.type.faction==="mongol")'));
assert.ok(run('nationUnits("hun").every(t=>t.weapon!=="gun"&&t.weapon!=="cannon")'),'Hun deck has no firearms');
assert.ok(run('nationUnits("seljuk").every(t=>t.weapon!=="gun"&&t.weapon!=="cannon")'),'Seljuk deck has no firearms');
assert.ok(run('nationUnits("mongol")[2].mounted&&nationUnits("mongol")[2].range>100'),'mounted Mongol archers');
assert.ok(run('nationUnits("austria")[7].weapon==="gun"&&nationUnits("austria")[7].mounted'),'dragoon is a mounted gunner');
console.log('PASS: seven nations, 84 cards, every card on both sides, correct nation sprites and names, opponent preservation, AI faction choice, mounted archers and era-appropriate equipment.');

run("showMenu(); selectNation('ottoman',1); selectNation('mongol',-1); for(let i=0;i<6;i++){toggleArmyCard(1,i);toggleArmyCard(-1,i)}");
assert.equal(run('types.length'),6);assert.equal(run('enemies.length'),6);
run('toggleArmyCard(1,6)');assert.equal(run('types.length'),6,'minimum six soldiers');
assert.equal(run('types[0].kind'),6,'selected cards keep original combat identity');
run("start(); state.time=90;state.enemySupply=12;ai();select(0);deploy(2)");
assert.ok(run('state.units.some(u=>u.side===-1)'),'AI handles custom deck');
assert.equal(run('state.units.find(u=>u.side===1).kind'),6);
run('exitGame()');assert.equal(run('state.playing'),false);assert.equal(run('state.units.length'),0);
run('showMenu()');assert.equal(run('types.length'),6,'menu preserves chosen cards');
run('toggleArmyCard(1,0)');assert.equal(run('types.length'),7);
console.log('PASS: custom decks, six-card minimum, original unit identity, custom AI, exit stops battle, menu preserves choices.');

for(const side of [1,-1]){
 run("showMenu();setMode('versus');start();state.aiClock=999;state.specialClock=999");
 run(`spawn(roster(${side})[1],${side},2);state.units=state.units.slice(0,1);state.units[0].type={...state.units[0].type,speed:10000};state.units[0].x=${side===1?1120:280};step(.05)`);
 assert.equal(run('state.units[0].x'),side===1?1156:244,'invader stops before opposing spawn');
 const health=run(side===1?'state.wall':'state.own');run('state.units[0].attack=0;step(.05)');assert.ok(run(side===1?'state.wall':'state.own')<health,'blocked melee can still damage base');
 run(`spawn(roster(${-side})[0],${-side},2)`);
 assert.ok(run('Math.abs(state.units[0].x-state.units[1].x)')>=24,'new defenders do not overlap invader');
 const hp=run('state.units[0].hp');run('state.units[1].attack=0;step(.05)');assert.ok(run('state.units[0].hp')<hp,'spawned defenders can fight at the gap');
}
run("showMenu();setMode('versus');start();spawn(types[1],1,0);spawn(enemies[1],-1,0);state.units=[state.units.find(u=>u.side===1),state.units.find(u=>u.side===-1)];state.units[0].x=650;state.units[1].x=730;for(const u of state.units)u.type={...u.type,speed:10000};step(.05)");
assert.ok(run('state.units[1].x-state.units[0].x')>=24,'fast opposing units cannot cross in one frame');
console.log('PASS: small symmetric spawn exclusion, base damage remains possible, new defenders can fight, fast units cannot cross.');
