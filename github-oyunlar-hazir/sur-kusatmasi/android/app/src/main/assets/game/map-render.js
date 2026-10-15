function background(){const id=currentMap().id;if(id==='dirt'){backgroundDirt();return}if(id==='istanbul'){backgroundIstanbul();return}ctx.clearRect(0,0,W,H);const vienna=id==='vienna';
 const sky=ctx.createLinearGradient(0,0,0,270);sky.addColorStop(0,vienna?'#789aab':'#c9bda3');sky.addColorStop(.65,vienna?'#c0cebf':'#e0c99a');sky.addColorStop(1,vienna?'#d1d7b3':'#d2c599');ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);ellipse(vienna?730:540,vienna?70:86,32,32,vienna?'#f0e8c791':'#f9dfaa98');
 for(let i=0;i<10;i++){const x=80+i*152,y=55+Math.sin(i*2)*19;ellipse(x,y,100,13,vienna?'#e7edda55':'#968d7e25');ellipse(x+30,y-6,60,14,vienna?'#e7edda44':'#968d7e20')}
 if(vienna){poly([[0,249],[0,174],[62,112],[180,80],[315,138],[408,118],[510,179],[645,142],[805,192],[962,160],[1115,219],[1440,206],[1440,270]],'#718d78');poly([[0,250],[0,218],[130,143],[254,181],[371,164],[520,218],[640,180],[790,211],[940,186],[1100,228],[1440,216],[1440,279]],'#658169');
  for(let i=0;i<160;i++){const x=15+i*7.4,y=153+Math.sin(i*.09)*39+Math.abs(noise(i))*35;tree(x,y,13+Math.abs(noise(i+3))*9,'#3d614f88')}
  for(let i=0;i<5;i++)line(32,202+i*7,333,212+i*5,'#aec09c22',2);
  // Danube is represented at the distant edge of the basin.
  poly([[750,238],[898,225],[1064,237],[1195,226],[1440,231],[1440,247],[1210,241],[1060,250],[900,237],[750,248]],'#9eb8ac');
  for(let i=0;i<27;i++){const x=1100+i*15,h=18+Math.abs(noise(i+6))*36;rect(x,240-h,20,h,'#9b9c87');poly([[x-3,240-h],[x+10,230-h],[x+24,240-h]],'#8a7464')}
  // A pointed Gothic spire recalls Vienna's historic city silhouette.
  rect(1350,131,40,93,'#969783');poly([[1345,131],[1370,49],[1397,131]],'#777f71');rect(1364,117,10,39,'#4f655c');line(1370,49,1370,34,'#697b6a',2);line(1364,40,1376,40,'#697b6a',2);
 }else{poly([[0,247],[0,226],[150,219],[350,231],[550,214],[750,226],[950,213],[1180,225],[1440,216],[1440,270]],'#a6ab82');poly([[0,265],[0,239],[245,237],[475,242],[760,229],[1000,240],[1230,233],[1440,238],[1440,278]],'#b4b58a');
  poly([[600,232],[790,221],[984,236],[1160,221],[1440,224],[1440,242],[1156,236],[986,248],[790,235],[600,246]],'#8fa898');for(let i=0;i<30;i++)line(700+i*24,237,715+i*24,237,'#cbd2b16b');
  for(let i=0;i<9;i++){const x=1000+i*40,h=13+Math.abs(noise(i))*17;rect(x,229-h,22,h,'#a99f80');poly([[x-3,229-h],[x+11,219-h],[x+25,229-h]],'#927c65')}
 }
 const ground=ctx.createLinearGradient(0,255,0,H);ground.addColorStop(0,vienna?'#97a382':'#b8ad79');ground.addColorStop(.7,vienna?'#85936c':'#a89b67');ground.addColorStop(1,vienna?'#637b55':'#817e55');ctx.fillStyle=ground;ctx.fillRect(0,254,W,H-254);
 if(vienna){for(let i=0;i<20;i++)tree(10+i*15,244+Math.abs(noise(i))*31,18+Math.abs(noise(i+20))*12,'#3e5e48');poly([[335,254],[720,254],[651,277],[302,278]],'#b5b19340')}
 else{for(let i=0;i<9;i++){const x=230+i*114;poly([[x,255],[x+66,255],[x+91,281],[x-20,281]],i%2?'#9e935d38':'#d0b97635');for(let n=0;n<7;n++)line(x+n*9,257,x+n*11-16,279,'#827c5126')}
  // Marshy ground sits off the playable corridors, not across them.
  poly([[645,499],[782,489],[880,507],[988,491],[1139,496],[1215,477],[1440,487],[1440,530],[620,530]],'#6f87765e');for(let i=0;i<38;i++){const x=640+i*21,y=499+Math.abs(noise(i))*21;ellipse(x,y,12+Math.abs(noise(i+7))*10,3,'#aac0a350');line(x,y+5,x-3,y-12,'#666e46',2);line(x+4,y+5,x+8,y-8,'#798653',2)}
 }
 lanes.forEach((y,i)=>{poly([[0,y-17],[1270,y-17],[1270,y+18],[0,y+19]],vienna?(i%2?'#c1b88b45':'#cbbc9445'):(i%2?'#dfc58f44':'#ccba8344'));line(193,y+23,1230,y+23,vienna?'#cfceac28':'#736f4e35')});
 for(let i=0;i<470;i++){const x=Math.abs(noise(i+40))*1200,y=266+Math.abs(noise(i*3+9))*254;line(x,y,x+2,y-3,vienna?'#3f604230':'#73744445');if(i%5===0)ellipse(x,y,2,1,'#dcc79d66')}
 drawMapCamp(22,256,false,vienna);drawMapStandard(137,224,'#9c4436',true);
 if(vienna){
  // Low stone walls with angular earthen bastions and a dry defensive ditch.
  poly([[1158,243],[1185,255],[1199,530],[1162,530]],'#626e4b');poly([[1185,254],[1205,257],[1210,530],[1199,530]],'#9b9a70');
  poly([[1230,216],[1440,193],[1440,530],[1230,530]],'#b8b297');for(let r=0;r<18;r++){const y=217+r*18;line(1235,y,1440,y-22,'#797c6355');for(let c=0;c<6;c++)line(1245+c*38+(r%2)*16,y-3,1245+c*38+(r%2)*16,y+13,'#8a86684a')}
  for(let i=0;i<3;i++){const y=278+i*99;poly([[1230,y-45],[1300,y-55],[1303,y+12],[1210,y+30],[1175,y-9]],'#8b9371');poly([[1175,y-9],[1210,y+30],[1221,y+61],[1181,y+20]],'#63744f');poly([[1230,y-45],[1300,y-55],[1298,y-42],[1211,y-29],[1175,y-9]],'#c5bc94');line(1210,y+29,1303,y+12,'#606c4b',3)}
  lanes.forEach(y=>{poly([[1147,y-11],[1225,y-10],[1225,y+10],[1147,y+11]],'#ae9972');for(let n=0;n<8;n++)line(1150+n*9,y-9,1150+n*9,y+9,'#776b50',1)});
  drawMapStandard(1350,169,'#d5c89b',false);
 }else{drawMapCamp(1248,265,true,false);for(let i=0;i<8;i++){const x=1218+(i%2)*25,y=283+Math.floor(i/2)*58;line(x,y,x+2,y+34,'#78613f',4);poly([[x-3,y],[x+1,y-9],[x+5,y]],'#a69260')}
  for(let i=0;i<3;i++){const x=1368,y=324+i*64;rect(x-8,y-17,61,16,'#896f49');rect(x-13,y-24,68,7,'#b29968');ellipse(x,y+1,10,10,'#675c40');ellipse(x+38,y+1,10,10,'#675c40');line(x-4,y-17,x+44,y-17,'#ccbb81',2)}drawMapStandard(1320,213,'#a04340',false);
 }
 const vignette=ctx.createRadialGradient(710,280,180,710,280,800);vignette.addColorStop(0,'#15252700');vignette.addColorStop(1,vienna?'#1d383c35':'#4f4c292d');ctx.fillStyle=vignette;ctx.fillRect(0,0,W,H);scenery.getContext('2d').clearRect(0,0,W,H);scenery.getContext('2d').drawImage(canvas,0,0);
}
function tree(x,y,h,color){rect(x-2,y-h*.1,3,h*.2,'#665e4055');ellipse(x,y-h*.5,h*.39,h*.55,color);ellipse(x-5,y-h*.4,h*.3,h*.4,color)}
function drawMapCamp(x,y,enemy,vienna){for(let i=0;i<5;i++){const tx=x+(i%2)*64,ty=y+Math.floor(i/2)*69;poly([[tx,ty+39],[tx+31,ty],[tx+70,ty+39]],enemy?'#e2d5b4':vienna?'#cec8a8':'#ded3ae');poly([[tx+31,ty],[tx+70,ty+39],[tx+89,ty+29],[tx+52,ty-7]],enemy?'#b6b193':'#a5ab86');poly([[tx+26,ty+39],[tx+32,ty+12],[tx+42,ty+39]],'#575a43');line(tx+31,ty,tx+31,ty-10,'#786c4a',2);if(enemy)line(tx+7,ty+30,tx+59,ty+30,'#a65b4a',3)}}
function drawMapStandard(x,y,color,ottoman){rect(x,y,3,111,'#645e43');poly([[x+3,y+3],[x+45,y+7],[x+40,y+40],[x+3,y+37]],color);if(ottoman){ellipse(x+20,y+21,10,10,'#eddeb6');ellipse(x+24,y+18,9,9,color);ellipse(x+35,y+22,2,2,'#eddeb6')}else{line(x+21,y+9,x+22,y+31,'#3d4437',4);line(x+11,y+19,x+32,y+19,'#3d4437',4)}}

function backgroundDirt(){
 ctx.clearRect(0,0,W,H);
 const soil=ctx.createLinearGradient(0,0,0,H);soil.addColorStop(0,'#9b805e');soil.addColorStop(1,'#816243');ctx.fillStyle=soil;ctx.fillRect(0,0,W,H);
 // Five bare roads, without buildings, scenery or historical landmarks.
 lanes.forEach(y=>{rect(0,y-19,W,38,'#bc996b');line(0,y-19,W,y-19,'#73543740');line(0,y+19,W,y+19,'#73543740');line(0,y-10,W,y-10,'#e3c39420');line(0,y+10,W,y+10,'#6c4e3420')});
 for(let i=0;i<580;i++){const x=Math.abs(noise(i+17))*W,y=Math.abs(noise(i*3+83))*H;ellipse(x,y,1+Math.abs(noise(i+2))*2,.7,i%2?'#63472f20':'#e2c59b25')}
 const cached=scenery.getContext('2d');cached.clearRect(0,0,W,H);cached.drawImage(canvas,0,0);
}
