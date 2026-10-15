const FortCards=[
 {id:'shield',name:'Kale Kalkanı',icon:'⬡',color:'#85d8ff',duration:5,cd:35,summary:'Hasarı engeller · 5 sn',desc:'Kalen 5 saniye boyunca gelen tüm saldırı hasarını engeller.'},
 {id:'reflect',name:'Misilleme Surları',icon:'↶',color:'#e6b1ff',duration:5,cd:40,summary:'Hasarı yansıtır · 5 sn',desc:'5 saniye boyunca kalenin aldığı hasarın tamamını saldıran askere veya silaha geri verir. Kalen de bu hasarı alır.'},
 {id:'spikes',name:'Kazıklı Savunma',icon:'▲',color:'#ffc278',duration:5,cd:38,summary:'Yakına kazık · 5 sn',desc:'5 saniye boyunca kalenin yakınındaki beş koridorda kazıklar çıkar. Bu bölgedeki düşmanlar saniyede 40 hasar alır.'}
];
const specialView={1:'army','-1':'army'};
function fortActive(side,id){return (state.fortBuffs?.[side]?.[id]||0)>state.time}
function inFortZone(unit,side){return unit.side!==side&&unit.hp>0&&(side===1?unit.x<=390:unit.x>=1050)}
function useFortCard(slot,side=1,aiUse=false){
 if(!state.playing||state.paused||state.ended||![1,-1].includes(side)||(side===-1&&mode==='solo'&&!aiUse))return false;
 const entry=state.fortHands[side]?.[slot],card=entry&&FortCards.find(c=>c.id===entry.id);if(!card||entry.readyAt>state.time)return false;
 state.fortBuffs[side][card.id]=state.time+5;entry.readyAt=state.time+card.cd;
 status(armyName(side)+' · '+card.name+' · 5 saniye etkin!');beep(350,.1);updateSpecialUI();return true;
}
function hitFort(attacker,amount){
 const side=-attacker.side,received=fortActive(side,'shield')?0:amount;
 if(side===1)state.own-=received;else state.wall-=received;
 if(received>0&&fortActive(side,'reflect')){attacker.hp-=received;attacker.hit=.18;particles.push({x:attacker.x,y:lanes[attacker.lane]+attacker.yoff-25,vx:0,vy:-12,life:.4,max:.4,color:'#e6b1ff',size:9})}
}
function stepFortresses(dt){
 for(const side of [1,-1]){const seconds=Math.max(0,Math.min(dt,(state.fortBuffs[side].spikes||0)-(state.time-dt)));if(seconds>0)for(const u of state.units)if(inFortZone(u,side))damage(u,40*seconds);}
 if(mode!=='solo')return;state.fortAIClock-=dt;if(state.fortAIClock>0)return;state.fortAIClock=1.5;
 const nearby=state.units.filter(u=>inFortZone(u,-1)),incoming=state.units.filter(u=>u.side===1&&u.hp>0&&(Math.abs(1220-u.x)<=u.type.range||(u.x-invasionLimit(1))>=-.001));
 if(incoming.length&&!fortActive(-1,'shield')&&!fortActive(-1,'reflect')){
  const hand=state.fortHands[-1];if(hand[1].readyAt<=state.time&&incoming.some(u=>u.type.wallDmg>=80))useFortCard(1,-1,true);else if(hand[0].readyAt<=state.time)useFortCard(0,-1,true);else if(hand[1].readyAt<=state.time)useFortCard(1,-1,true);
 }
 if(nearby.length&&!fortActive(-1,'spikes'))useFortCard(2,-1,true);
}
function drawFortressEffects(){
 for(const side of [1,-1]){
  const shield=fortActive(side,'shield'),reflect=fortActive(side,'reflect'),spikes=fortActive(side,'spikes');if(!shield&&!reflect&&!spikes)continue;
  if(shield||reflect)drawFortressVeil(side,shield);
  if(spikes)lanes.forEach((y,lane)=>{for(let i=0;i<7;i++){const sx=side===1?244+i*23:1196-i*23,h=12+Math.sin(state.time*8+i+lane)*4;ellipse(sx,y+2,8,3,'#291f1677');poly([[sx-5,y],[sx,y-h],[sx+4,y]],'#ac7953');line(sx,y-h,sx+3,y-2,'#ffe0a9',1.5)}});
 }
}
function drawFortressVeil(side,shield){
 const map=currentMap().id,left=side===1,front=left?224:1166,outer=left?0:W;
 // Follow the whole fortress/camp silhouette rather than encircling a small part.
 const edge=left?[[0,180],[45,190],[110,181],[171,199],[224,242],[224,H],[0,H]]:map==='istanbul'?[[1166,229],[1190,185],[1230,179],[1265,154],[1330,137],[1440,112],[1440,H],[1166,H]]:map==='vienna'?[[1158,225],[1182,207],[1230,186],[1300,174],[1440,157],[1440,H],[1158,H]]:[[1166,247],[1220,228],[1300,217],[1380,220],[1440,241],[1440,H],[1166,H]];
 const outline=map==='dirt'?[[outer,254],[front,254],[front,H],[outer,H]]:edge;
 const tint=shield?'126,208,237':'199,163,232',pulse=.85+Math.sin(state.time*3)*.15;
 ctx.save();ctx.beginPath();outline.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.clip();
 const wash=ctx.createLinearGradient(outer,0,front,0);wash.addColorStop(0,`rgba(${tint},.04)`);wash.addColorStop(.7,`rgba(${tint},.11)`);wash.addColorStop(1,`rgba(${tint},${.25*pulse})`);ctx.fillStyle=wash;ctx.fillRect(Math.min(outer,front),100,Math.abs(front-outer),H-100);
 // A translucent curtain on the outer defensive face covers all five corridors.
 const glow=ctx.createLinearGradient(front-20,0,front+20,0);glow.addColorStop(0,`rgba(${tint},0)`);glow.addColorStop(.5,`rgba(${tint},${.55*pulse})`);glow.addColorStop(1,`rgba(${tint},0)`);ctx.fillStyle=glow;ctx.fillRect(front-20,110,40,H-110);
 ctx.strokeStyle=`rgba(${tint},.24)`;ctx.lineWidth=1;
 for(let row=0;row<13;row++){const y=210+row*27;for(let col=0;col<8;col++){const x=Math.min(outer,front)+col*33+(row%2)*16;ctx.beginPath();ctx.moveTo(x,y-10);ctx.lineTo(x+15,y-2);ctx.lineTo(x+15,y+12);ctx.lineTo(x,y+20);ctx.lineTo(x-15,y+12);ctx.lineTo(x-15,y-2);ctx.closePath();ctx.stroke()}}
 for(let i=0;i<12;i++){const travel=(state.time*24+i*39)%330,x=front+(left?-1:1)*(8+i%4*18),y=H-travel;line(x,y,x+(left?-1:1)*4,y-15,`rgba(${tint},.65)`,1.5)}
 ctx.restore();
 ctx.fillStyle=shield?'#bcecff':'#e6caff';ctx.font='bold 10px DM Sans';ctx.textAlign=left?'left':'right';ctx.fillText(shield?'KALE KALKANI':'HASAR YANSITMA',left?20:W-20,map==='dirt'?249:130);ctx.textAlign='left';
}
function isRangedType(t){return t.range>60&&['bow','crossbow','gun','javelin','cannon','catapult','bomb','firepot'].includes(t.weapon)}
function isHeavySiege(t){return !t.mounted&&['cannon','catapult'].includes(t.weapon)&&(t.kind===5||['heavy-catapult','mortar'].includes(t.siegeStyle)||t.wallDmg>=150)}
function boostedSplash(u){return specialActive(u.side,'siege')&&isHeavySiege(u.type)?Math.max(u.type.splash||0,110):(u.type.splash||0)}
