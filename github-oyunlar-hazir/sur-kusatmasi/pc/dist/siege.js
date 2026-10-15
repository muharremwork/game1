// Additional battlefield equipment. Names and roles are adapted for game balance.
function extraSiegeUnits(n){
 const medieval=['seljuk','byzantine','mongol'].includes(n.id),hun=n.id==='hun';
 const stats=[
  {cost:5,hp:270,dmg:36,wallDmg:85,range:245,speed:18,rate:2.5,cd:9,splash:28},
  {cost:7,hp:510,dmg:70,wallDmg:190,range:350,speed:9,rate:4.8,cd:15,splash:85},
  {cost:6,hp:310,dmg:24,wallDmg:65,range:225,speed:15,rate:1.2,cd:11,splash:50}
 ];
 const names=hun?['Koçbaşı','Kuşatma Kulesi','Ağır Yaylım Birliği']:medieval?['Hafif Mancınık','Ağır Mancınık','Balista']:['Hafif Saha Topu','Kuşatma Havanı','Çok Namlulu Top'];
 const styles=hun?['ram','tower','volley']:medieval?['light-catapult','heavy-catapult','ballista']:['field-cannon','mortar','organ'];
 return stats.map((t,i)=>({...t,name:names[i],role:i===1?'AĞIR KUŞATMA':i===2?'YAYLIM DESTEĞİ':'HAFİF KUŞATMA',kind:12+i,count:1,mounted:false,faction:n.id,skin:n.skin,color:n.color,accent:n.accent,weapon:hun?(i===2?'bow':'ram'):medieval?(i===2?'crossbow':'catapult'):'cannon',siegeStyle:styles[i],...(hun&&i<2?{range:44,speed:i===0?18:10,splash:0}:{}),desc:i===1?'Yavaş ve dayanıklı; üslere ağır alan hasarı.':i===2?'Hızlı yaylım; kalabalık birliklere ateş desteği.':'Daha ucuz ve hareketli kuşatma desteği.'}));
}
function siegeShape(t){
 const s=t.siegeStyle,c=t.color,a=t.accent;
 if(s==='mortar')return `<path d="M28 80h65l-4 14H24Z" fill="${c}"/><path d="M45 79L27 38L47 29L69 75Z" fill="#cda45b" stroke="${a}" stroke-width="3"/><ellipse cx="37" cy="34" rx="12" ry="5" fill="#283c39"/>`;
 if(s==='organ')return `<path d="M22 85h70v8H22Z" fill="${c}"/>${[0,1,2,3,4].map(i=>`<path d="M${30+i*10} 77L${50+i*10} 35" stroke="#d2ac62" stroke-width="7"/>`).join('')}<path d="M24 82l68-4" stroke="${a}" stroke-width="4"/>`;
 if(s==='field-cannon')return `<path d="M25 74L104 54L108 66L30 85Z" fill="#d2ac62" stroke="${a}" stroke-width="2"/><path d="M26 85h64" stroke="${c}" stroke-width="8"/>`;
 if(s==='ballista')return `<path d="M27 85h62L63 49Z" fill="${c}"/><path d="M61 80L86 28" stroke="#ac8154" stroke-width="8"/><path d="M46 36Q83 14 111 43" fill="none" stroke="${a}" stroke-width="6"/><path d="M46 36L111 43M62 76L91 19" stroke="#f5e1ad" stroke-width="2"/>`;
 if(s==='ram')return `<path d="M25 84V40h63v44" fill="none" stroke="${c}" stroke-width="8"/><path d="M14 39L57 13L99 39Z" fill="${c}" stroke="${a}" stroke-width="2"/><path d="M23 65h82" stroke="#bb915b" stroke-width="13"/><path d="M101 57h11v16h-11" fill="#c7d6d8"/>`;
 if(s==='tower')return `<path d="M29 87L34 13h50l5 74Z" fill="${c}" stroke="${a}" stroke-width="3"/><path d="M36 24h40M34 48h46M31 73h50" stroke="#a7784c" stroke-width="6"/><path d="M43 83V31M62 83V31" stroke="#d6b782" stroke-width="3"/><path d="M83 18l25 6" stroke="${a}" stroke-width="5"/>`;
 if(s==='volley')return `<path d="M26 90L42 40L85 89Z" fill="${c}"/><path d="M45 20Q88 49 45 80" fill="none" stroke="${a}" stroke-width="6"/><path d="M45 20v60M29 44h78M29 53h78M29 62h78" stroke="#e8d8ac" stroke-width="2"/>`;
 const heavy=s==='heavy-catapult';return `<path d="M25 87L52 38L83 87M52 38L96 8" fill="none" stroke="${c}" stroke-width="${heavy?12:7}"/><path d="M17 91h79" stroke="#b39561" stroke-width="8"/><path d="M90 6h23v9H90" fill="${a}"/>${heavy?'<path d="M40 45v40h22V45Z" fill="#a7a58a"/>':''}`;
}
function siegePortrait(t){return `<svg viewBox="0 0 120 110"><ellipse cx="60" cy="103" rx="48" ry="4" fill="#0003"/>${siegeShape(t)}<circle cx="32" cy="94" r="10" fill="#504b3e" stroke="${t.accent}" stroke-width="3"/><circle cx="85" cy="94" r="10" fill="#504b3e" stroke="${t.accent}" stroke-width="3"/></svg>`}
function drawExtraSiege(u){const x=u.x,y=lanes[u.lane]+u.yoff,s=u.type.siegeStyle;ctx.save();ctx.translate(x,y);ctx.scale(u.side,1);ctx.translate(-combatPose(u).recoil*5,0);ellipse(0,2,28,4,'#15332e66');const c=u.type.color,a=u.type.accent;[-18,18].forEach(v=>{ellipse(v,-4,7,7,'#574a37');ctx.strokeStyle=a;ctx.lineWidth=2;ctx.stroke()});
 if(s==='mortar'){poly([[-22,-10],[19,-10],[23,-2],[-23,-2]],c);line(-3,-13,-15,-43,'#d5b16a',13);ellipse(-16,-45,8,4,'#20332e')}
 else if(s==='organ'){rect(-21,-17,43,7,c);for(let i=0;i<5;i++)line(-17+i*7,-19,-10+i*7,-40,'#d5b16a',4)}
 else if(s==='field-cannon'){rect(-20,-14,40,7,c);line(-19,-24,29,-31,'#d5b16a',8)}
 else if(s==='ballista'){line(-20,-10,20,-10,c,8);line(-7,-12,24,-42,'#bf9b68',6);ctx.strokeStyle=a;ctx.lineWidth=4;ctx.beginPath();ctx.arc(16,-30,19,-2.5,.5);ctx.stroke();line(4,-44,30,-23,'#f5e1ad',1)}
 else if(s==='ram'){line(-20,-9,-20,-39,c,5);line(18,-9,18,-39,c,5);poly([[-27,-40],[0,-55],[27,-40]],c);line(-22,-23,30,-23,'#b99560',10);rect(26,-30,8,13,'#d0dfe0')}
 else if(s==='tower'){poly([[-21,-9],[-15,-63],[15,-63],[21,-9]],c);[-18,-38,-58].forEach(v=>line(-16,v,16,v,a,3));line(-5,-14,-5,-53,'#b8a378',2);line(6,-14,6,-53,'#b8a378',2)}
 else if(s==='volley'){poly([[-18,-10],[0,-38],[18,-10]],c);ctx.strokeStyle=a;ctx.lineWidth=3;ctx.beginPath();ctx.arc(5,-27,20,-1.4,1.4);ctx.stroke();[-34,-27,-20].forEach(v=>line(-9,v,27,v,'#efdbac',2))}
 else{const heavy=s==='heavy-catapult';line(-23,-9,23,-9,c,7);line(-16,-10,0,-43,c,heavy?8:5);line(16,-10,0,-43,c,heavy?8:5);ctx.save();ctx.translate(0,-43);ctx.rotate(combatPose(u).recoil*.9);line(0,0,24,-15,'#bfa26d',5);rect(20,-19,14,5,a);ctx.restore();if(heavy)rect(-5,-37,10,22,'#aaab8b')}
 ctx.restore();drawSpecialHealth(u,x,y-72);
}
