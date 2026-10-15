# Özel kartlar ve kuşatma çeşitleri

Her savaşta (yeniden oynama dahil) her tarafa dört türden üç farklı kart karıştırılarak dağıtılır. Tek oyuncuda rakibin kartlarını AI kullanır; iki oyuncuda iki taraf kendi düğmelerini kullanır. İkmal ücreti yoktur.

| Kart | Etki | Süre | Bekleme |
|---|---|---|---|
| Yıldırım Yürüyüşü | Yürüme hızı +%40 | 12 sn | 30 sn |
| Hücum Emri | Birlik ve üs hasarı +%35 | 12 sn | 34 sn |
| Buzlu Vuruş | Vuruşta 0,65 sn hareket ve saldırı durması; hedef 2,5 sn tekrar donmaya dirençli | 12 sn | 38 sn |
| Alevli Vuruş | Vuruşta 4 sn yanma, 6 hasar/sn; süre yenilenir, katlanmaz | 12 sn | 36 sn |

Bekleme kartın kullanıldığı anda başlar. Etki o tarafın mevcut ve yeni çıkan bütün birliklerine uygulanır. Donma ve yanma üslere uygulanmaz. Alan hasarı birden fazla hedefe durum etkisi verir. Zırh desteği yanmayı da azaltır. Duraklatmada zaman, etkiler ve beklemeler durur. Menüye dönünce tüm savaş etkileri temizlenir.

Her devlete üç ek birlik kartı eklenmiştir; seçilebilir havuz 15 kart, savaş destesi 6–12 karttır. Yeni silah seçmek için dolu desteden bir kart çıkarılır. Toplam 105 birlik kartı vardır.

- Osmanlı / Avusturya / Macaristan: Hafif Saha Topu, Kuşatma Havanı, Çok Namlulu Top.
- Selçuklu / Bizans / Moğol: Hafif Mancınık, Ağır Mancınık, Balista.
- Asya Hun: Koçbaşı, Kuşatma Kulesi, Ağır Yaylım Birliği. Ateşli silah yoktur.

İsimler ve görevler oyun için uyarlanmıştır; tüm devletlerde belgelenmiş kesin tarihsel envanter iddiası değildir. Silahların maliyet, dayanıklılık, menzil, alan hasarı, üs hasarı ve saldırı aralığı farklıdır. Portre ve Canvas şekilleri ayrı çizilir.

Doğrulama: `node check-game.cjs` önceki savaş kurallarını (özel kart AI kapalı olarak), `node check-specials.cjs` yeni etkileri, süreleri, cooldown, özel kart AI ve yedi devletin 21 ek kuşatma kartını test eder.
