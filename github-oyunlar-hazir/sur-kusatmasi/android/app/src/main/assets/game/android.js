// Android-only touch controls. The desktop source is a separate snapshot.
document.body.classList.add('android-game');
const touchLanes=document.createElement('section');touchLanes.className='touch-lanes';touchLanes.setAttribute('aria-label','Dokunmatik koridor seçimi');touchLanes.innerHTML=lanes.map((_,i)=>`<button data-touch-lane="${i}">${roman[i]}<small>${laneNames[i]}</small></button>`).join('');document.querySelector('.battlefield').after(touchLanes);
touchLanes.querySelectorAll('button').forEach(b=>b.onclick=()=>deploy(+b.dataset.touchLane,activeSide));
document.querySelector('.deck-grid').prepend($('special-cards'));
const nativeStart=start;start=function(){nativeStart();$('instruction').textContent='Kart seç → I–V yol düğmesine dokun';};
const nativePause=togglePause;togglePause=function(){nativePause();if(state.playing)$('instruction').textContent=state.paused?'DURAKLATILDI · ▶ ile devam et':'Kart seç → I–V yol düğmesine dokun';};$('pause').onclick=togglePause;
const nativeBindMenu=bindMenu;bindMenu=function(){nativeBindMenu();$('start').onclick=start;$('mode-versus').querySelector('small').textContent='Aynı ekranda karşılıklı';if(mode==='versus')$('mode-note').textContent='Her oyuncu kendi destesinden kart seçip bir yol düğmesine dokunur. Son seçilen ordu yerleştirilir.';};
const nativeSetMode=setMode;setMode=function(value){nativeSetMode(value);if(value==='versus')$('mode-note').textContent='Aynı ekranda iki oyuncu: kendi kartını seç, ardından I–V yollarından birine dokun.';};
exitGame=function(){if(location.hostname==='appassets.androidplatform.net'){location.href='surkusatmasi://exit';return;}state.playing=false;state.paused=true;document.body.classList.remove('menu-open');document.body.classList.add('game-exited');Soundtrack.sync();};
$('exit-game').onclick=exitGame;
window.AndroidGame={background(){if(state.playing&&!state.paused)togglePause();Soundtrack.sync();},back(){if($('help-dialog').open){$('help-dialog').close();return;}if(document.body.classList.contains('menu-open')){exitGame();return;}if(state.playing){$('restart').onclick();return;}showMenu();}};
document.addEventListener('visibilitychange',()=>{if(document.hidden)AndroidGame.background();});
$('help-dialog').innerHTML=$('help-dialog').innerHTML.replace(/Aynı bilgisayarda/g,'Aynı dokunmatik ekranda').replace(/<p class="muted">[\s\S]*?<\/p>/,'<p class="muted">Kartına dokun, ardından I–V yol düğmelerinden birine dokun. Deste okları diğer kartları açar. İki oyuncu modunda iki taraf kendi destesini kullanır. Üstteki Ⅱ düğmesi savaşı duraklatır.</p>');
guide=$('help-dialog').innerHTML;
bindMenu();
