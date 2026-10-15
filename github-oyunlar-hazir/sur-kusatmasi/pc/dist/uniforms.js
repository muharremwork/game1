// Stylized period clothing: shared geometry keeps portraits and soldiers consistent.
const uniformCache=new Map();
function uniformParts(t){
 const id=t.faction||'ottoman',key=id+':'+t.kind+':'+t.weapon;if(uniformCache.has(key))return uniformCache.get(key);
 const heavy=[0,3,6,8,16,17,19].includes(t.kind),a=t.accent||'#e5c480',metal='#9caeb8',edge='#dce8e9';
 const palettes={ottoman:['#ce3837','#50896c','#387bb3','#b9723c'],seljuk:['#199eaa','#386eaa','#b45f3c','#5c9374'],hun:['#b87536','#a54632','#cc9b47','#6f8060'],byzantine:['#7e58ad','#bd543c','#466bad','#956b46'],austria:['#e5dcc3','#d2d9d3','#d36b56','#b9c9d3'],hungary:['#498640','#a83e39','#438ca8','#af8040'],mongol:['#387ab0','#875846','#429d8d','#9f4737']};
 const c=(palettes[id]||palettes.ottoman)[t.kind%4],body=[],head=[];
 const path=(list,d,fill,stroke='none',width=1)=>list.push({d,fill,stroke,width});
 // Sleeves, skirt and waist sash. No universal vertical cross strap.
 path(body,'M40 48Q59 37 81 48L88 94H35Z',c);
 path(body,'M39 50L27 75L40 80L49 54M78 50L92 72L99 66L83 47Z',c);
 const plates=(start,end,tone)=>{path(body,`M43 ${start}H77V${end}H43Z`,tone,edge,.8);for(let y=start+5;y<end;y+=7){path(body,`M44 ${y}H76`,'none','#394957',1.8);for(let x=47;x<77;x+=7)path(body,`M${x} ${y-4}v4`,'none','#e7d8ac',1)}};
 const cone=(tone)=>{path(head,'M43 34L49 22L61 7L73 22L79 34Z',tone,edge,1.5);path(head,'M61 9V31','none','#edf4ed',2);path(head,'M44 34L45 48L50 52L49 35M77 34L77 48L72 52L72 35Z',tone)};
 const turban=()=>{path(head,'M42 33Q39 18 57 17Q80 14 80 33Z','#f1e3c5');path(head,'M43 25Q61 17 78 26M44 31Q62 23 79 31','none','#bba887',2);path(head,'M55 19L57 10L69 12L71 19Z',c)};
 let pants='#403c32';
 if(id==='ottoman'){
  pants='#e4d8b6';path(body,'M51 46L69 67L77 94M51 46L51 64','none','#eec783',2);path(body,'M39 77H82V84H39Z','#436f69');
  if(t.kind===0){path(head,'M45 34L47 10Q59 4 72 12L74 34Z','#f6ead1');path(head,'M70 12L79 14L80 49L73 52Z','#e0d1b4');path(head,'M48 30H72V36H48Z','#b43831');path(head,'M58 11L60 27L65 20Z','#dab354')}
  else if(heavy){plates(49,73,metal);cone(metal)}else turban();
 }else if(id==='seljuk'){
  path(body,'M40 46L30 86L39 90L48 56Z','#263f6f');path(body,'M49 46L72 71','none',a,2);path(body,'M39 76H82V83H39Z','#bf924d');
  if(heavy){plates(49,74,'#879da6');cone('#b1c3c7')}else{cone('#9aafb3');path(head,'M42 30Q61 25 80 31L79 37H43Z','#efe2c1')}
 }else if(id==='hun'){
  pants='#5c4836';path(body,'M47 44L78 74','none','#e4c598',5);path(body,'M39 77H82V83H39Z','#503629');path(body,'M45 46L39 56M77 45L82 57','none','#d3b78a',5);
  if(heavy)plates(51,75,'#8d7655');path(head,'M43 31L47 19L62 11L74 20L79 31Z','#956847');path(head,'M41 29H81V38H41Z','#d6bb8d');path(head,'M65 12L76 1L78 4L68 19Z','#a54632');
 }else if(id==='mongol'){
  pants='#69513b';path(body,'M48 43L78 62V77','none','#debd76',3);path(body,'M40 77H82V84H40Z','#bb593d');path(body,'M72 64L88 87','none','#533b29',5);
  if(heavy){plates(48,76,'#655549');path(body,'M36 49H46V63H36M76 49H85V63H76Z','#887354','#d4bb86',1);cone('#78888e')}else{path(head,'M44 30L49 15L61 7L74 18L78 30Z','#475c6d');path(head,'M42 29H80V37H42Z','#bba078')}
  path(head,'M62 8V1M62 1L70 4','none','#d95036',3);path(head,'M43 36L42 47L48 48M77 36L81 47L74 48Z','#6f675c');
 }else if(id==='byzantine'){
  pants='#6d3851';path(body,'M34 46L27 89L39 94L46 52Z','#a4423b');if(heavy){plates(48,73,'#ab9367');for(let x=40;x<=76;x+=9)path(body,`M${x} 76h7v16h-7Z`,'#9a764c',a,.8)}else{path(body,'M45 49L75 67','none','#d3ad70',3);path(body,'M39 75H83V82H39Z','#9c794f')}
  path(head,'M42 33Q43 13 61 12Q78 14 80 33Z',metal,edge,1.5);path(head,'M61 13V33M45 33H78','none','#d4b870',3);path(head,'M43 34L44 48L49 50L48 34M78 34L77 48L72 50L73 34Z',metal);
 }else if(id==='austria'){
  pants='#a3b6bd';path(body,'M43 50H48V70H43M74 50H79V70H74Z','#b64437');path(body,'M49 78L43 96H37L40 77M73 78L80 96H87L82 77Z','#b64437');path(body,'M40 76H81V82H40Z','#554538');
  if(heavy){path(body,'M45 47Q61 43 77 47L74 73Q61 78 46 73Z','#6b7b88',edge,2);path(body,'M51 51Q61 45 71 51','none','#c4d1d7',2);cone('#586975')}
  else{path(body,'M50 51L52 69M69 51L67 69','none','#bc8b56',2);path(head,'M47 31L48 16Q61 11 74 16L76 31Z','#443e33');path(head,'M36 32Q60 24 87 32L83 38H39Z','#4e4534');path(head,'M76 24L84 9L88 11L79 29Z','#d57857')}
 }else if(id==='hungary'){
  pants='#a94c3d';path(body,'M41 45L36 80L45 81L49 51Z','#bfaf84');path(body,'M40 77H82V84H40Z','#b3904b');
  if(heavy&&t.kind!==7){plates(48,72,'#929eaa');cone('#8f9da8')}else{path(head,'M45 32L47 13Q61 7 75 15L77 32Z','#985b39');path(head,'M42 29H80V38H42Z','#46392f');path(head,'M73 19L87 4L90 9L78 28Z','#e1d7b7')}
  if(t.kind===7||t.kind===10){for(let y=52;y<74;y+=7)path(body,`M46 ${y}Q58 ${y+6} 75 ${y}`,'none','#edd39a',2)}else path(body,'M48 47L72 70','none','#d7c190',2);
 }
 const spec={body,head,pants,coat:c};uniformCache.set(key,spec);return spec;
}
function uniformSvg(t,part){return uniformParts(t)[part].map(p=>`<path d="${p.d}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="${p.width}"/>`).join('')}
function drawUniform(t,part){ctx.save();ctx.translate(-25.62,-50.3);ctx.scale(.42,.42);for(const p of uniformParts(t)[part]){const shape=new Path2D(p.d);if(p.fill!=='none'){ctx.fillStyle=p.fill;ctx.fill(shape)}if(p.stroke!=='none'){ctx.strokeStyle=p.stroke;ctx.lineWidth=p.width;ctx.stroke(shape)}}ctx.restore()}
