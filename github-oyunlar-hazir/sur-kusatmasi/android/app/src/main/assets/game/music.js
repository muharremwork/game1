/* Original melodies and synthesized instruments for Sur Kuşatması.
 * No third-party recording, sample, or quoted melody is used. */
const Soundtrack=(()=>{
 const tracks=[
  {name:'Sefer Yürüyüşü',bpm:108,voice:'zurna',scale:[0,1,4,5,7,8,10,12,13,16],root:62,
   bars:[[0,0,2,3,4,4,3,2],[3,4,5,4,3,2,1,0],[4,4,6,7,6,5,4,3],[2,3,4,2,1,0,0,-1],[7,7,6,5,4,3,4,5],[6,5,4,3,2,3,4,-1],[3,2,1,0,2,3,2,1],[0,-1,0,-1,0,0,0,-1]]},
  {name:'Şafak Divanı',bpm:78,voice:'ney',scale:[0,2,3,5,7,8,10,12,14,15],root:62,
   bars:[[0,-1,2,-1,3,4,3,-1],[2,-1,1,0,1,-1,0,-1],[4,-1,5,-1,6,5,4,-1],[3,2,3,-1,2,-1,0,-1],[7,-1,6,5,4,-1,3,-1],[4,3,2,-1,1,2,3,-1],[2,1,0,-1,1,-1,2,-1],[0,-1,-1,-1,0,-1,-1,-1]]},
  {name:'Sur Önünde',bpm:96,voice:'zurna',scale:[0,1,4,5,7,8,10,12,13,16],root:57,
   bars:[[0,2,3,2,0,0,1,2],[4,3,2,1,0,-1,0,-1],[3,4,5,4,3,2,3,4],[6,5,4,3,2,-1,1,0],[7,6,7,5,4,3,2,-1],[4,5,6,4,3,2,1,-1],[2,3,2,0,1,2,1,0],[0,0,2,1,0,-1,0,-1]]},
  {name:'Kervan Yolu',label:'Ud & def',bpm:88,voice:'oud',scale:[0,2,3,5,7,8,10,12,14,15],root:60,soft:true,
   bars:[[0,2,4,-1,3,2,1,-1],[2,3,5,4,2,-1,0,-1],[4,5,7,-1,6,4,3,-1],[2,4,3,1,0,-1,2,-1],[7,6,5,-1,4,3,2,-1],[3,5,4,2,1,-1,0,-1],[2,1,3,2,0,2,1,-1],[0,-1,2,-1,0,-1,0,-1]]},
  {name:'Bozkır Atlıları',label:'Dombra & atlı ritmi',bpm:112,voice:'dombra',scale:[0,2,4,7,9,12,14,16,19,21],root:55,
   bars:[[0,2,3,2,0,1,2,1],[3,4,3,2,1,0,2,-1],[4,5,4,3,2,3,4,2],[3,2,1,0,1,2,0,-1],[5,6,5,4,3,2,3,4],[4,3,2,1,0,2,3,-1],[2,3,4,2,1,2,1,0],[0,2,0,1,0,-1,0,-1]]},
  {name:'Zafer Alayı',label:'Zurna & güçlü davul',bpm:92,voice:'zurna',scale:[0,1,4,5,7,8,10,12,13,16],root:60,march:true,
   bars:[[0,0,4,-1,3,2,3,4],[5,4,3,2,0,-1,2,-1],[4,4,7,-1,6,5,4,3],[2,3,4,2,0,-1,0,-1],[7,6,7,4,5,4,3,-1],[4,5,4,3,2,1,2,-1],[3,4,2,3,1,2,0,-1],[0,4,3,2,0,-1,0,-1]]}

 ];
 let choice=0,volume=.35,enabled=true,unlocked=false,source=null,gain=null,context=null,timer=null,lastRunning=false,ready=false;
 const buffers=new Map(),key='sur-kusatmasi-music-v1';
 try{const pref=JSON.parse(localStorage.getItem(key)||'null');if(pref){choice=Number.isInteger(pref.track)&&pref.track>=0&&pref.track<tracks.length?pref.track:0;volume=Number.isFinite(pref.volume)?Math.max(0,Math.min(1,pref.volume)):.35;enabled=pref.enabled!==false}}catch{}
 function save(){try{localStorage.setItem(key,JSON.stringify({track:choice,volume,enabled}))}catch{}}
 function compose(track,sampleRate=22050){
  const beat=60/track.bpm,duration=32*beat,length=Math.round(duration*sampleRate),left=new Float32Array(length),right=new Float32Array(length);let seed=1453;
  const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296*2-1};
  function note(at,dur,midi,kind,amp,pan=0){const frequency=440*2**((midi-69)/12),start=Math.round(at*sampleRate),count=Math.ceil(dur*sampleRate),l=Math.sqrt((1-pan)/2),r=Math.sqrt((1+pan)/2);let lowNoise=0;
   for(let i=0;i<count;i++){const t=i/sampleRate,p=t/dur,w=2*Math.PI*frequency*t;let value;
    if(kind==='davul'){value=(Math.sin(2*Math.PI*(53*t+17*(1-Math.exp(-t*20))/20))*Math.exp(-t*9)+rnd()*.18*Math.exp(-t*35))*amp}
    else if(kind==='cymbal'){value=rnd()*Math.exp(-t*13)*Math.min(1,t*400)*amp}
    else if(kind==='dombra'){value=(Math.sin(w)+.65*Math.sin(w*2)+.3*Math.sin(w*4))*Math.exp(-t*12)*Math.min(1,t*300)*amp}
    else if(kind==='oud'){value=(Math.sin(w)+.45*Math.sin(w*2)+.19*Math.sin(w*3))*Math.exp(-t*8)*Math.min(1,t*200)*amp}
    else{lowNoise=lowNoise*.8+rnd()*.2;const vibrato=1+.0025*Math.sin(2*Math.PI*5*t),phase=w*vibrato;const wave=kind==='ney'?Math.sin(phase)+.17*Math.sin(phase*2)+.09*Math.sin(phase*3)+lowNoise*.18:Math.sin(phase)+.42*Math.sin(phase*2)+.28*Math.sin(phase*3)+.13*Math.sin(phase*4);const envelope=Math.min(1,t/(kind==='ney'?.06:.025))*Math.min(1,(dur-t)/.08)*(1-p*.25);value=wave*envelope*amp}
    const index=(start+i)%length;left[index]+=value*l;right[index]+=value*r;
   }
  }
  for(let bar=0;bar<8;bar++){
   const notes=track.bars[bar];notes.forEach((degree,slot)=>{if(degree<0)return;let hold=1;while(slot+hold<8&&notes[slot+hold]===-1)hold++;note((bar*4+slot*.5)*beat,hold*.5*beat*.92,track.root+track.scale[degree]+12,track.voice,track.voice==='ney'?.13:track.voice==='oud'||track.voice==='dombra'?.20:.11,-.12)});
   for(let j=0;j<8;j++){const degree=[0,4,2,4,0,3,2,1][(j+bar)%8];note((bar*4+j*.5)*beat,.38,track.root+track.scale[degree], 'oud',track.voice==='ney'?.10:track.soft?.055:.065,.35)}
   note(bar*4*beat,4*beat,track.root-12,'ney',.025,0);
   const drums=track.voice==='ney'||track.soft?[0,2.5]:track.voice==='dombra'?[0,.75,1.5,2,2.75,3.5]:track.march?[0,1,1.5,2,3,3.5]:[0,1.5,2,3.5];drums.forEach((v,i)=>note((bar*4+v)*beat,.52,38,'davul',track.voice==='ney'||track.soft?.15:i%2?.15:track.march?.29:.24));
   if(track.voice!=='ney'){note((bar*4+1)*beat,.28,0,'cymbal',.048,-.4);note((bar*4+3)*beat,.28,0,'cymbal',.048,.4)}
  }
  let peak=.001;for(let i=0;i<length;i++)peak=Math.max(peak,Math.abs(left[i]),Math.abs(right[i]));const normalize=.8/peak;for(let i=0;i<length;i++){left[i]*=normalize;right[i]*=normalize}return {channels:[left,right],sampleRate,duration:length/sampleRate};
 }
 function buffer(index){if(buffers.has(index))return buffers.get(index);const score=compose(tracks[index]),b=context.createBuffer(2,score.channels[0].length,score.sampleRate);b.copyToChannel(score.channels[0],0);b.copyToChannel(score.channels[1],1);buffers.set(index,b);return b}
 function running(){return unlocked&&enabled&&volume>0&&typeof state!=='undefined'&&state.playing&&!state.paused&&!state.ended&&!document.hidden}
 function caption(){if(!ready)return;const label=!enabled?'Ses kapalı':!unlocked?'Kuşatmayla başlayacak':running()?'Çalıyor':'Beklemede';$('music-status').textContent=label+' · '+tracks[choice].name;$('sound').textContent=enabled?'♪':'♫';$('sound').setAttribute('aria-label',enabled?'Sesi kapat':'Sesi aç');$('sound').setAttribute('aria-pressed',String(enabled));$('sound').title=enabled?'Müzik ve savaş seslerini kapat':'Müzik ve savaş seslerini aç';$('sound').style.color=enabled?'#d5b478':'';muted=!enabled;$('music-volume-value').textContent=Math.round(volume*100)+'%'}
 function sync(){if(!ready)return;const play=running();if(play===lastRunning){caption();return}lastRunning=play;if(gain){gain.gain.cancelScheduledValues(context.currentTime);gain.gain.setTargetAtTime(play?volume:0,context.currentTime,.06)}caption()}
 async function begin(){unlocked=true;try{if(!context){audioCtx??=new(window.AudioContext||window.webkitAudioContext)();context=audioCtx;gain=context.createGain();gain.gain.value=0;gain.connect(context.destination)}await context.resume();if(!source){source=context.createBufferSource();source.buffer=buffer(choice);source.loop=true;source.connect(gain);source.start()}lastRunning=false;sync()}catch{unlocked=false;$('music-status').textContent='Sesi açmak için ♪ düğmesine tıkla'}}
 function choose(index){if(!Number.isInteger(index)||index<0||index>=tracks.length)return;choice=index;save();if(source){source.stop();source.disconnect();source=null}if(unlocked)void begin();else caption()}
 function setVolume(value){volume=Math.max(0,Math.min(1,value));save();if(gain){gain.gain.cancelScheduledValues(context.currentTime);gain.gain.setTargetAtTime(running()?volume:0,context.currentTime,.06)}lastRunning=running();caption()}
 function mount(){ready=true;$('music-track').innerHTML=tracks.map((t,i)=>`<option value="${i}">${t.name} · ${t.label||(t.voice==='ney'?'Ney & ud':'Mehter esintisi')}</option>`).join('');$('music-track').value=String(choice);$('music-volume').value=String(Math.round(volume*100));$('music-track').onchange=e=>choose(Number(e.target.value));$('music-volume').oninput=e=>setVolume(Number(e.target.value)/100);$('sound').onclick=()=>{enabled=!enabled;save();caption();if(enabled)void begin();else sync()};$('music-settings').onclick=()=>{const panel=$('music-panel');panel.hidden=!panel.hidden;$('music-settings').setAttribute('aria-expanded',String(!panel.hidden))};$('music-close').onclick=()=>{$('music-panel').hidden=true;$('music-settings').setAttribute('aria-expanded','false');$('music-settings').focus()};document.addEventListener('visibilitychange',sync);timer=setInterval(sync,150);window.addEventListener('pagehide',()=>{clearInterval(timer);if(source){source.stop();source=null}});window.addEventListener('pageshow',()=>{clearInterval(timer);timer=setInterval(sync,150);if(unlocked)void begin()});caption()}
 return {begin,sync,mount,tracks,compose,choose,setVolume};
})();
