// Poses use simulation time, so walking, wind-up and recoil stop when paused.
function combatPose(u){
 if((u.frozenUntil||0)>state.time)return {p:0,striking:false,recoil:0,idle:true};
 const action=u.attackPose,elapsed=action?state.time-action.start:Infinity;
 if(action&&elapsed>=0&&elapsed<action.duration)return {p:.35+.65*elapsed/action.duration,striking:true,recoil:Math.max(0,1-elapsed/.22)};
 if(u.inCombat&&u.attack>0&&u.attack<.25)return {p:.35*(1-u.attack/.25),striking:false,recoil:0};
 return {p:0,striking:false,recoil:0,idle:true};
}
function drawCombatWeapon(u){const t=u.type,w=t.weapon,p= combatPose(u),phase=p.p,attack=!p.idle,skin='#c2a078',metal='#e0e8df';
 if(w==='bow'){
  const pull=attack&&phase<.35?phase/.35*10:0;
  line(2,-25,15,-25,skin,3);ctx.strokeStyle='#d0ad73';ctx.lineWidth=2;ctx.beginPath();ctx.arc(16,-25,15,-1.15,1.15);ctx.stroke();
  line(22,-39,12-pull,-25,'#ede1ba');line(12-pull,-25,22,-11,'#ede1ba');line(-6,-26,12-pull,-25,skin,3);
  if(!p.striking)line(9-pull,-25,33,-25,'#ddd4ae',1.5);
 }else if(w==='crossbow'||w==='gun'){
  const kick=w==='gun'?-p.recoil*5:0;line(-3,-24,17+kick,-25,skin,3);line(4+kick,-25,30+kick,-28,w==='gun'?'#b9c4c8':'#8c6741',4);rect(1+kick,-27,12,5,'#785b3c');
  if(w==='crossbow'){ctx.strokeStyle='#d7b982';ctx.lineWidth=2;ctx.beginPath();ctx.arc(22+kick,-26,12,-1.2,1.2);ctx.stroke();line(27+kick,-37,27+kick,-15,'#eee1bb')}
 }else if(w==='bomb'||w==='firepot'||w==='javelin'){
  const angle=attack?(phase<.35?-1.6:phase<.65?-.9+(phase-.35)*5:.6-(phase-.65)*2):-.5;
  ctx.save();ctx.translate(5,-26);ctx.rotate(angle);line(0,0,12,0,skin,3);
  if(!p.striking||phase>.8){if(w==='javelin'){line(-5,0,29,0,'#bf9567',2);poly([[29,-2],[36,0],[29,2]],metal)}else{ellipse(14,0,5,5,w==='firepot'?'#a77a43':'#32383c');line(15,-5,18,-8,'#c2a579')}}ctx.restore();
 }else if(w==='drum'){ellipse(7,-18,12,9,'#bb945c');const tap=attack?Math.sin(phase*Math.PI*3)*5:0;line(-8,-33,4,-23+tap,'#e2c48c',2);line(17,-34,10,-23-tap,'#e2c48c',2);
 }else if(w==='banner'){line(14,-3,14,-59,'#bf9d67',3);poly([[16,-57],[35,-54],[33,-35],[16,-39]],t.color);
 }else{
  const thrust=w==='spear'||w==='shield',extension=attack?Math.sin(Math.min(1,phase/.7)*Math.PI)*14:0;
  ctx.save();ctx.translate(7,-24);
  if(thrust){line(-6,2,14+extension,0,skin,3);line(-12+extension,-2,31+extension,-5,'#b99b6d',2.5);poly([[30+extension,-8],[40+extension,-6],[31+extension,-3]],metal)}
  else{const angle=attack?-.9+Math.sin(phase*Math.PI)*1.8:-.55;ctx.rotate(angle);line(-1,4,5,-3,skin,3);line(4,3,4,-28,w==='sword'?metal:'#b78b55',3);if(w==='axe')poly([[3,-27],[16,-32],[17,-20],[4,-17]],'#a6b9c2');else if(w==='pick')line(-5,-29,15,-27,metal,3);else line(-2,-3,10,-3,'#d2ae70',2)}ctx.restore();
  if(w==='shield'||t.selfArmor||u.kind===3){ellipse(-10,-23,8,11,t.color);ellipse(-10,-23,3,3,'#d5bd88');line(-10,-33,-10,-13,t.accent,1.5)}
 }
}
function muzzleEffect(u){const weapon=u.type.weapon;if(!['gun','cannon'].includes(weapon))return;
 const y=lanes[u.lane]+u.yoff-(u.type.mounted?17:0)-28,x=u.x+u.side*30;
 for(let i=0;i<8;i++)particles.push({x,y,vx:u.side*(40+Math.random()*45),vy:(Math.random()-.5)*28,life:.12,max:.12,color:i%2?'#fff2b0':'#ffad4c',size:2+Math.random()*2});
 for(let i=0;i<6;i++)particles.push({x,y,vx:u.side*10+Math.random()*13,vy:-12-Math.random()*15,life:.55,max:.55,color:'#b7b3a1',size:3+Math.random()*3});
}
function drawCombatShot(s,k,x,y){
 if(['bow','crossbow','javelin'].includes(s.weapon)){const angle=Math.atan2(s.ty-s.y-Math.cos(k*Math.PI)*Math.PI*s.arc,s.tx-s.x);ctx.save();ctx.translate(x,y);ctx.rotate(angle);line(-12,0,5,0,'#dec99a',s.weapon==='javelin'?2:1.5);poly([[5,-2],[10,0],[5,2]],'#e5ebe5');if(s.weapon!=='javelin'){line(-11,0,-15,-3,'#c5d5be');line(-11,0,-15,3,'#c5d5be')}ctx.restore();}
 else if(s.weapon==='gun'){line(x-s.side*9,y,x,y,'#fff0b2',1.4)}
 else ellipse(x,y,s.weapon==='cannon'?5:4,s.weapon==='cannon'?5:4,s.weapon==='firepot'?'#bf8544':'#353b36');
}
