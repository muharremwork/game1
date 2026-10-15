// Additional selectable troop roles; names describe game-adapted formations.
function extraTroops(n){
 const names={ottoman:['Solak Okçu','Baltacı','Kalkanlı Azap','Ciritçi','Deli Süvarisi'],seljuk:['Hassa Okçusu','Baltalı Türkmen','Kalkanlı Gulâm','Ciritli Türkmen','Hassa Süvarisi'],hun:['Seçkin Bozkır Okçusu','Baltalı Bozkır Savaşçısı','Kalkanlı Muhafız','Ciritli Atlı','Kağan Hücum Birliği'],byzantine:['Saray Okçusu','Varang Muhafızı','Kalkanlı Bizans Piyadesi','Ciritli Piyade','Seçkin Kataphrakt'],austria:['Habsburg Nişancısı','Baltalı Muhafız','Kalkanlı Milis','Ciritli Keşifçi','Seçkin Kürasiyer'],hungary:['Seçkin Macar Okçusu','Baltalı Macar Piyadesi','Kalkanlı Muhafız','Ciritli Huszár','Seçkin Huszár'],mongol:['Han Okçusu','Baltalı Moğol Yayası','Kalkanlı Moğol Piyadesi','Ciritli Moğol Atlısı','Han Hücum Süvarisi']}[n.id];
 const mounted=['hun','mongol','hungary'].includes(n.id);
 const roles=[
  {weapon:n.id==='austria'?'gun':'bow',cost:5,hp:150,dmg:40,range:255,speed:26,rate:2.2,cd:10,count:2,role:'UZUN MENZİL',desc:'Uzun menzil; korunan arka hattan güçlü tekil atış.'},
  {weapon:'axe',cost:4,hp:250,dmg:38,range:36,speed:27,rate:1.4,cd:8,count:2,armorBreaker:true,role:'ZIRH KIRICI',desc:'Kendi zırhı veya zırh desteği olan hedefe %40 ek hasar.'},
  {weapon:'shield',cost:4,hp:335,dmg:15,range:33,speed:22,rate:1.2,cd:9,count:2,selfArmor:.2,role:'KALKAN DUVARI',desc:'Kendi aldığı doğrudan hasarı %20 azaltır; dayanıklı ön hat.'},
  {weapon:'javelin',cost:3,hp:mounted?130:110,dmg:30,range:125,speed:mounted?58:38,rate:1.6,cd:7,count:2,mounted,role:'CİRİT ATICISI',desc:'Orta menzilden cirit fırlatır; hızlı ve hareketli.'},
  {weapon:'spear',cost:6,hp:390,dmg:43,range:42,speed:61,rate:1.8,cd:12,count:1,mounted:true,charge:true,role:'DARBE SÜVARİSİ',desc:'Kesintisiz 60 adım ilerleyince ilk yakın dövüş darbesi %50 güçlü.'}
 ];
 return roles.map((t,i)=>({...t,kind:15+i,name:names[i],faction:n.id,skin:n.skin,color:n.color,accent:n.accent,mounted:!!t.mounted}));
}
