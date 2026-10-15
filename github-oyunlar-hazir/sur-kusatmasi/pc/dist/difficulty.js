const Difficulties={
 easy:{name:'Kolay',hp:.65,damage:.65,baseDamage:.7,refill:3.5,firstWave:5,wave:6.5,jitter:2.5,randomLane:.55,counter:.3,area:.25,rosterAt:90,counterAt:50,areaAt:90,special:14,specialJitter:6,desc:'Daha zayıf birlikler, yavaş takviye ve daha az karşı hamle.'},
 normal:{name:'Orta',hp:.8,damage:.85,baseDamage:1,refill:2.7,firstWave:3.8,wave:4.5,jitter:2,randomLane:.18,counter:.7,area:.6,rosterAt:60,counterAt:30,areaAt:60,special:8,specialJitter:4,desc:'Dengeli birlik gücü ve düzenli takviye. Standart zorluk.'},
 hard:{name:'Zor',hp:1.05,damage:1.05,baseDamage:1.15,refill:2,firstWave:2.2,wave:3.2,jitter:1,randomLane:.04,counter:.9,area:.85,rosterAt:20,counterAt:0,areaAt:20,special:4,specialJitter:2,desc:'Güçlü birlikler, hızlı takviye ve erken karşı hamleler.'}
};
let difficultyId='normal';
try{const saved=localStorage.getItem('sur-kusatmasi-difficulty-v1');if(Object.hasOwn(Difficulties,saved))difficultyId=saved}catch{}
function currentDifficulty(){return Difficulties[state?.difficulty||difficultyId]||Difficulties.normal}
function chooseDifficulty(id){if(state.playing||!Object.hasOwn(Difficulties,id))return;difficultyId=id;try{localStorage.setItem('sur-kusatmasi-difficulty-v1',id)}catch{}setMode(mode)}
function refreshDifficultyUI(){
 const root=$('difficulty-picker');if(!root)return;root.hidden=mode==='versus';
 root.querySelectorAll('[data-difficulty]').forEach(b=>{b.setAttribute('aria-pressed',b.dataset.difficulty===difficultyId);b.disabled=mode==='versus'});
 $('difficulty-description').textContent=Difficulties[difficultyId].desc;
}
function bindDifficulty(){const root=$('difficulty-picker');if(!root)return;root.querySelectorAll('[data-difficulty]').forEach(b=>b.onclick=()=>chooseDifficulty(b.dataset.difficulty));refreshDifficultyUI()}
