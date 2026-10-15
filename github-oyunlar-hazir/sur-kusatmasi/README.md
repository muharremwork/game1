# Sur Kuşatması

Beş koridorlu, birlik kartlarıyla oynanan iki boyutlu strateji oyunu.

## PC’de başlat

Depoyu ZIP olarak indirip çıkart. `sur-kusatmasi/pc/dist/index.html` dosyasını
tarayıcıyla aç. Dosyaları aynı klasör yapısında tut.

PC/web kopyası: yedi devlet, dört harita, 140 asker kartı seçeneği,
üç yapay zekâ zorluğu ve aynı bilgisayarda iki oyuncu.
Özel kartlar zehir ve ağır kuşatma alan hasarını; kale kartları kalkan,
hasar yansıtma ve kazıklı savunmayı içerir. Kaleyi örten kalkan görseli dahildir.

## Android

`android/Sur-Kusatmasi-Android.apk` dosyasını telefonuna kopyalayıp kur.
Android 8.0+ ve güncel System WebView gerekir.
Android sürümü ayrı bir 1.0 kopyasıdır; PC’ye sonradan eklenen kart ve efekt
güncellemeleri bu APK’ya otomatik aktarılmaz. Ayrıntılar: [Kurulum](android/ANDROID-KURULUM.md).

## Geliştirme kontrolü

`pc` klasöründe Node.js ile `node check-game.cjs`, `node check-specials.cjs`,
`node check-combat.cjs` ve `node check-forts.cjs` komutlarını çalıştır.

Android kaynakları `android/app` içindedir; derleme betiği ve açıklamalar
Android klasöründe bulunur. Android SDK/JDK ve imzalama anahtarı depoya dahil edilmez.

## Kaynak sürümü

PC/web: `159f73531f590d5577fa16874aed204a89b2086e`.
Mevcut çevrimiçi oyun: https://sur-kusatmasi-1453-muho.cokis8046.chatgpt.site/
