const SpecialCards=[
 {id:'speed',name:'Yıldırım Yürüyüşü',summary:'+%40 hız · 12 sn',icon:'➤',color:'#85f2b2',duration:12,cd:30,desc:'Ordunun yürüme hızı 12 sn boyunca %40 artar.'},
 {id:'power',name:'Hücum Emri',summary:'+%35 hasar · 12 sn',icon:'⚔',color:'#ffd875',duration:12,cd:34,desc:'Ordunun saldırı hasarı 12 sn boyunca %35 artar.'},
 {id:'frost',name:'Buzlu Vuruş',summary:'Vuruşta donma · 12 sn',icon:'❄',color:'#87dcff',duration:12,cd:38,desc:'12 sn boyunca vuruşlar rakibi 0,65 sn dondurur. Tekrar donmaya 2,5 sn direnç.'},
 {id:'fire',name:'Alevli Vuruş',summary:'Vuruşta yanma · 12 sn',icon:'♨',color:'#ff9163',duration:12,cd:36,desc:'12 sn boyunca vuruşlar rakibi 4 sn yakar: saniyede 6 ek hasar. Yanma birikmez.'}
];
function specialActive(side,id){return (state.buffs?.[side]?.[id]||0)>state.time}
function dealSpecials(){
 for(const side of [1,-1]){const pool=SpecialCards.map(t=>t.id);for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}state.specialHands[side]=pool.slice(0,3).map(id=>({id,readyAt:0}));}
 renderSpecials();
}
function useSpecial(slot,side=1,aiUse=false){
 if(!state.playing||state.paused||state.ended||![1,-1].includes(side)||(side===-1&&mode==='solo'&&!aiUse))return false;
 const hand=state.specialHands[side],entry=hand[slot];if(!entry||entry.readyAt>state.time)return false;
 const card=SpecialCards.find(t=>t.id===entry.id);state.buffs[side][card.id]=state.time+card.duration;entry.readyAt=state.time+card.cd;
 status(armyName(side)+' · '+card.name+' etkin!');beep(card.id==='frost'?620:340,.12);updateSpecialUI();return true;
}
function renderSpecials(){
 const root=$('special-cards');if(!root)return;
 root.innerHTML=[1,-1].map(side=>`<section class="special-hand"><div class="special-heading"><span>${side===1?'1. OYUNCU':mode==='versus'?'2. OYUNCU':'YAPAY ZEKÂ'} · ${armyName(side)}</span><small>3 rastgele kart · ikmal harcamaz</small></div><div class="special-row">${state.specialHands[side].map((entry,i)=>{const c=SpecialCards.find(t=>t.id===entry.id);return `<button class="special-card" title="${c.desc} Bekleme: ${c.cd} sn." data-special-side="${side}" data-special-slot="${i}" style="--special-color:${c.color}" aria-label="${armyName(side)}: ${c.name}. ${c.desc} Bekleme: ${c.cd} saniye."><span class="special-icon">${c.icon}</span><span><b>${c.name}</b><small>${c.summary}</small><em>${c.cd} sn bekleme</em></span><strong class="special-state">HAZIR</strong></button>`}).join('')}</div></section>`).join('');
 root.querySelectorAll('[data-special-slot]').forEach(b=>b.onclick=()=>useSpecial(+b.dataset.specialSlot,+b.dataset.specialSide));updateSpecialUI();
}
function updateSpecialUI(){
 const root=$('special-cards');if(!root)return;root.hidden=!state.playing;
 root.querySelectorAll('[data-special-slot]').forEach(b=>{const side=+b.dataset.specialSide,entry=state.specialHands[side]?.[+b.dataset.specialSlot];if(!entry)return;const active=Math.max(0,(state.buffs[side][entry.id]||0)-state.time),wait=Math.max(0,entry.readyAt-state.time);b.disabled=state.paused||state.ended||wait>0||(side===-1&&mode==='solo');b.classList.toggle('special-active',active>0);b.querySelector('.special-state').textContent=active>0?'ETKİN · '+Math.ceil(active)+' sn':wait>0?Math.ceil(wait)+' sn':'HAZIR';});
}
function applyHitEffects(attacker,target){
 if(target.hp<=0)return;
 if(specialActive(attacker.side,'frost')&&(target.frostResistUntil||0)<=state.time){target.frozenUntil=state.time+.65;target.frostResistUntil=state.time+2.5;}
 if(specialActive(attacker.side,'fire'))target.burningUntil=state.time+4;
}
function stepSpecials(dt){
 if(mode==='solo'){state.specialClock-=dt;if(state.specialClock<=0){if(state.units.some(u=>u.side===-1&&u.hp>0)){const ready=state.specialHands[-1].map((t,i)=>i).filter(i=>state.specialHands[-1][i].readyAt<=state.time);if(ready.length)useSpecial(ready[Math.floor(Math.random()*ready.length)],-1,true)}state.specialClock=currentDifficulty().special+Math.random()*currentDifficulty().specialJitter;}}
}
function drawSpecialStatus(u){
 const x=u.x,y=lanes[u.lane]+u.yoff;
 if((u.frozenUntil||0)>state.time){ellipse(x,y-25,16,25,'#77dfff55');line(x-9,y-46,x+9,y-4,'#bef3ff',2);line(x+9,y-46,x-9,y-4,'#bef3ff',2)}
 if((u.burningUntil||0)>state.time){poly([[x-10,y],[x-13,y-15],[x-5,y-10],[x,y-26],[x+5,y-10],[x+11,y-17],[x+10,y]],'#ff7035bb');poly([[x-4,y],[x,y-15],[x+5,y]],'#ffd65c')}
 const buff=SpecialCards.find(c=>specialActive(u.side,c.id));if(buff){ctx.strokeStyle=buff.color;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x,y+2,17,4,0,0,Math.PI*2);ctx.stroke();}
}
