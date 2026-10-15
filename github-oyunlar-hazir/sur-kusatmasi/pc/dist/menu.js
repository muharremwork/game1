// Menu deck choices refer to the nation's stable twelve combat slots.
function renderArmyPicker(){
 const root=$('army-picker');if(!root)return;
 root.innerHTML=[1,-1].map(side=>{const n=currentNation(side),list=nationUnits(n.id),chosen=armyChoices[side];return `<section class="army-builder"><h3>${side===1?'1. OYUNCU':'RAKİP / 2. OYUNCU'} · ${n.name}</h3><p>Destene 6–12 birlik seç · ${chosen.length} / 12</p><div class="army-options">${list.map((t,i)=>`<button class="army-option" data-army-side="${side}" data-army-slot="${i}" aria-pressed="${chosen.includes(i)}" aria-label="${n.name}: ${t.name} kartını ${chosen.includes(i)?'çıkar':'ekle'}"><span class="army-art">${portrait(t)}</span><b>${t.name}</b><small>◈ ${t.cost} · ⚔ ${t.dmg} · ♥ ${t.hp}</small><span class="army-check">${chosen.includes(i)?'✓':'+'}</span></button>`).join('')}</div></section>`}).join('');
 root.querySelectorAll('[data-army-slot]').forEach(b=>b.onclick=()=>toggleArmyCard(+b.dataset.armySide,+b.dataset.armySlot));
}
function toggleArmyCard(side,slot){
 if(state.playing||!Number.isInteger(slot)||slot<0||slot>=nationUnits(currentNation(side).id).length||![1,-1].includes(side))return;
 const chosen=armyChoices[side];if(chosen.includes(slot)){if(chosen.length<=6){$('army-message').textContent='Her destede en az 6 birlik kalmalı.';return}chosen.splice(chosen.indexOf(slot),1)}else{if(chosen.length>=12){$('army-message').textContent='En fazla 12 kart seçebilirsin. Yeni silah için bir kartı çıkar.';return}chosen.push(slot);chosen.sort((a,b)=>a-b)}
 selected=enemySelected=-1;pages[side]=0;applyNationDecks();state=fresh();renderDeck(1);renderDeck(-1);renderArmyPicker();$('army-message').textContent='Seçtiğin birlikler savaş destesinde kullanılacak.';
}
function bindMainMenu(){document.body.classList.add('menu-open');$('intro').scrollTop=0;renderArmyPicker();$('menu-exit').onclick=exitGame;}
function exitGame(){
 state.playing=false;state.paused=false;state.units=[];selected=enemySelected=-1;particles=[];shots=[];
 if(typeof Soundtrack!=='undefined')Soundtrack.sync();
 document.body.classList.remove('menu-open');document.body.classList.add('game-exited');$('exit-return').focus();
 // Browsers may close script-opened tabs only; the stopped screen is the fallback.
 window.close();
}
