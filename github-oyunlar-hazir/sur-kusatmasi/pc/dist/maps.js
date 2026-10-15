const BattleMaps=[
 {id:'dirt',name:'Toprak Yol',year:null,region:'SERBEST MEYDAN',enemy:'Rakip',base:'Rakip Üssü',baseLabel:'RAKİP ÜSSÜ',date:'SERBEST SAVAŞ',summary:'Yalnızca toprak zemin ve beş sade yol. Tarihî bir yere bağlı değildir.',goal:'Rakibin üssünü ele geçir.',tag:'SADE TOPRAK ZEMİN'},
 {id:'istanbul',name:'İstanbul Kuşatması',year:1453,region:'KONSTANTİNİYYE',enemy:'Bizans',base:'Bizans Surları',baseLabel:'THEODOSİUS SURLARI',date:'ŞAFAK · 06 NİSAN 1453',summary:'Theodosius surları, taş kuleler ve Osmanlı ordugâhı.',goal:'Surları aş. Şehrin kapılarını aç.',enemyNames:byzantineNames.map(n=>n[0])},
 {id:'vienna',name:'Viyana Kuşatması',year:1683,region:'VİYANA · KAHLENBERG',enemy:'Habsburg',base:'Viyana Savunması',baseLabel:'VİYANA TABYALARI',date:'YAZ SABAHI · TEMMUZ 1683',summary:'Ormanlık Kahlenberg tepeleri, şehir surları ve toprak tabyalar.',goal:'Tabyaları aş. Viyana savunmasını kır.',enemyNames:['Habsburg Piyadesi','Şehir Milisi','Avusturya Okçusu','Zırh Ustası','Bombacı','Meydan Topu','Kürasiyer','Hafif Süvari','Mızrak Muhafızı','Silahşör','Sancaktar','İstihkâmcı']},
 {id:'mohacs',name:'Mohaç Meydan Muharebesi',year:1526,region:'MOHAÇ · TUNA OVASI',enemy:'Macar',base:'Macar Ordugâhı',baseLabel:'MACAR ORDUGÂHI',date:'YAZ ÖĞLEDEN SONRA · 29 AĞUSTOS 1526',summary:'Geniş ova, Tuna çevresindeki sazlıklar ve tarla yolları.',goal:'Ovayı geç. Karşı ordugâhı ele geçir.',enemyNames:['Macar Muhafızı','Köylü Milis','Macar Okçusu','Zırh Ustası','Ateş Atıcısı','Sahra Topu','Ağır Süvari','Keşif Süvarisi','Mızrak Muhafızı','Arbaletçi','Sancaktar','İstihkâmcı']}
];
let selectedMap='istanbul';
function currentMap(){return BattleMaps.find(m=>m.id===selectedMap)||BattleMaps[0]}
function mapThumbnail(id){if(id==='dirt')return '<svg viewBox="0 0 110 76" aria-hidden="true"><rect width="110" height="76" fill="#927451"/><path d="M0 14H110M0 26H110M0 38H110M0 50H110M0 62H110" stroke="#c6a477" stroke-width="8"/><path d="M8 9L19 10M56 32L66 33M80 56L91 57" stroke="#795c40" opacity=".4"/></svg>'; const ground=id==='mohacs'?'#a39868':id==='vienna'?'#879677':'#788b75';const sky=id==='vienna'?'#a7bbc1':id==='mohacs'?'#d2c4a2':'#99abad';const terrain=id==='vienna'?'<path d="M0 42L22 13L43 34L65 9L105 41" fill="#526e62"/><path d="M8 43L15 26L22 43M26 44L34 27L42 44M46 43L55 23L64 43" fill="#314f42"/>':id==='mohacs'?'<path d="M0 43Q20 35 43 39T105 42" fill="#a2aa7b"/><path d="M9 63Q45 51 68 64T109 62" fill="none" stroke="#718e85" stroke-width="7"/>':'<path d="M0 41L22 23L51 40L66 25L105 40" fill="#6a8179"/>';
 const base=id==='mohacs'?'<path d="M72 62L84 42L100 62" fill="#e4dbbf"/><path d="M84 42L109 59L100 62" fill="#bcb894"/><path d="M82 62L85 49L89 62" fill="#554e40"/>':'<path d="M79 28H105V74H79Z" fill="'+(id==='vienna'?'#b0a38c':'#c1b596')+'"/><path d="M77 22H85V32H77ZM92 22H100V32H92Z" fill="#d0c3a5"/><path d="M87 62V48Q93 40 98 48V62" fill="#5a6650"/>';
 return `<svg viewBox="0 0 110 76" aria-hidden="true"><rect width="110" height="76" fill="${sky}"/><circle cx="40" cy="18" r="9" fill="#e8d6ad"/>${terrain}<path d="M0 43H110V76H0Z" fill="${ground}"/><path d="M0 54H110M0 66H110" stroke="#cbbb8960"/>${id==='mohacs'?'<path d="M0 71Q30 64 56 73T110 72" fill="none" stroke="#789688" stroke-width="7"/>':''}${base}</svg>`
}
function bindMaps(){const root=$('map-picker');root.innerHTML=BattleMaps.map(m=>`<button class="map-option" data-map="${m.id}" aria-label="${m.name}${m.year?', '+m.year:''}" aria-pressed="${m.id===selectedMap}">${mapThumbnail(m.id)}<span><b>${m.name}</b><small>${m.year?m.year+' · ':''}${m.tag|| (m.id==='istanbul'?'SUR KUŞATMASI':m.id==='vienna'?'TEPELER & TABYALAR':'OVA & SAZLIKLAR')}</small></span></button>`).join('');root.querySelectorAll('[data-map]').forEach(b=>b.onclick=()=>chooseMap(b.dataset.map));applyMapTheme()}
function chooseMap(id){if(state.playing||!BattleMaps.some(m=>m.id===id))return;selectedMap=id;if(!enemyNationManual&&id!=='dirt'){enemyNationId=id==='vienna'?'austria':id==='mohacs'?'hungary':'byzantine';applyNationDecks()}applyMapTheme();setMode(mode);renderDeck(-1);refreshNationUI();if(typeof renderArmyPicker==='function')renderArmyPicker();if(typeof background==='function')background();updateUI()}
function applyMapTheme(){
 const m=currentMap();
 $('chapter').textContent=m.region+(m.year?' · '+m.year:'');
 $('map-year').textContent=m.year||'TOPRAK YOL';$('map-description').textContent=m.summary;
 $('field-title').textContent=m.name.toLocaleUpperCase('tr');$('field-date').textContent=m.date;
 const foe=currentNation(-1),native=(m.id==='istanbul'&&foe.id==='byzantine')||(m.id==='vienna'&&foe.id==='austria')||(m.id==='mohacs'&&foe.id==='hungary');
 $('enemy-base-title').textContent=native?m.base:foe.name+' '+(m.id==='dirt'?'Üssü':m.id==='mohacs'?'Ordugâhı':'Savunması');$('enemy-base-label').textContent=native?m.baseLabel:foe.name.toLocaleUpperCase('tr')+' ÜSSÜ';
 $('enemy-deck-label').textContent='2. OYUNCU · '+foe.name.toLocaleUpperCase('tr');
 $('enemy-deck-heading').textContent=m.id==='mohacs'?'Ordunu sahaya sür':'Savunmanı sahaya sür';
 $('enemy-cards').setAttribute('aria-label',foe.name+' birlik kartları');
 $('enemy-prev-page').setAttribute('aria-label','Önceki '+foe.name+' kartları');
 $('enemy-next-page').setAttribute('aria-label','Sonraki '+foe.name+' kartları');
 document.querySelectorAll('[data-map]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.map===selectedMap));
 document.title=(m.year?m.year+' · ':'')+m.name+' · Sur Kuşatması';
}
