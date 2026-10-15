'use strict';
const types=[
 {name:'Yeniçeri',role:'SEÇKİN PİYADE',cost:3,hp:240,dmg:27,range:32,speed:28,rate:1.05,count:2,cd:4,color:'#b3503e',kind:0,desc:'Güçlü ve dayanıklı ön hat.'},
 {name:'Azap',role:'ÖNCÜ BİRLİK',cost:2,hp:95,dmg:13,range:30,speed:39,rate:.85,count:3,cd:3,color:'#7d8d69',kind:1,desc:'Hızlı, kalabalık ve ekonomik.'},
 {name:'Okçu',role:'MENZİLLİ BİRLİK',cost:3,hp:100,dmg:22,range:185,speed:27,rate:1.4,count:2,cd:5,color:'#b79d62',kind:2,desc:'Ön hattın arkasından ok yağmuru.'},
 {name:'Cebeci',role:'ZIRH DESTEĞİ',cost:3,hp:230,dmg:12,range:32,speed:25,rate:1.2,count:2,cd:7,color:'#638980',kind:3,armorAura:true,desc:'Yakındaki dostlara %30 koruma.'},
 {name:'Humbaracı',role:'ALAN HASARI',cost:4,hp:140,dmg:42,range:155,speed:23,rate:2.4,count:2,cd:8,color:'#bf8755',kind:4,splash:65,desc:'Patlamalar düşman grubunu vurur.'},
 {name:'Şahi Topu',role:'KUŞATMA SİLAHI',cost:6,hp:430,dmg:55,wallDmg:165,range:300,speed:13,rate:3.8,count:1,cd:12,color:'#a7a080',kind:5,splash:45,desc:'Surlara üç kat kuşatma hasarı.'},
 {name:'Sipahi',role:'AĞIR SÜVARİ',cost:5,hp:410,dmg:46,range:42,speed:47,rate:1.25,count:1,cd:8,color:'#a65443',kind:6,mounted:true,desc:'Zırhlı atıyla cepheyi yarar.'},
 {name:'Akıncı',role:'HAFİF SÜVARİ',cost:3,hp:145,dmg:20,range:38,speed:66,rate:.85,count:2,cd:6,color:'#a09258',kind:7,mounted:true,desc:'En hızlı birlik; boş cepheyi aşar.'},
 {name:'Mızrakçı',role:'SÜVARİ AVCISI',cost:3,hp:180,dmg:24,range:55,speed:27,rate:1.1,count:2,cd:5,color:'#7d9971',kind:8,antiCavalry:true,desc:'Süvarilere iki kat hasar verir.'},
 {name:'Tüfekçi',role:'ATEŞLİ SİLAH',cost:4,hp:115,dmg:48,range:215,speed:23,rate:2.3,count:2,cd:7,color:'#9b775e',kind:9,desc:'Uzun menzil, yüksek tekil hasar.'},
 {name:'Mehter',role:'MORAL DESTEĞİ',cost:3,hp:190,dmg:8,range:32,speed:27,rate:1.4,count:1,cd:8,color:'#c18c58',kind:10,moraleAura:true,desc:'Dostların hızını ve saldırısını %25 artırır.'},
 {name:'Lağımcı',role:'SUR SABOTAJI',cost:4,hp:220,dmg:18,wallDmg:120,range:38,speed:33,rate:1.8,count:1,cd:9,color:'#827d63',kind:11,desc:'Sura ulaşınca ağır sabotaj hasarı.'}
];
const byzantineNames=[['Bizans Muhafızı','SARAY PİYADESİ'],['Milis','ŞEHİR SAVUNMASI'],['Bizans Okçusu','MENZİLLİ BİRLİK'],['Zırh Ustası','ZIRH DESTEĞİ'],['Rum Ateşi','ALAN HASARI'],['Mancınık','KUŞATMA SİLAHI'],['Kataphrakt','AĞIR SÜVARİ'],['Hafif Süvari','AKIN BİRLİĞİ'],['Mızrak Muhafızı','SÜVARİ AVCISI'],['Arbaletçi','AĞIR MENZİLLİ'],['Sancaktar','MORAL DESTEĞİ'],['İstihkâmcı','ORDUGÂH SABOTAJI']];
const enemies=types.map((t,i)=>({...t,name:byzantineNames[i][0],role:byzantineNames[i][1],color:['#73698f','#6e7f92','#93839d','#758b9c','#b1766b','#929181','#666e93','#8691aa','#85899b','#8c769d','#b3916f','#738480'][i],desc:i===5?'Ordugâha üç kat kuşatma hasarı.':i===11?'Ordugâha ulaşınca ağır sabotaj hasarı.':t.desc}));
