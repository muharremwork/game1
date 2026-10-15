# Sur Kuşatması — ayrı Android sürümü

`Sur-Kusatmasi-Android.apk` dosyasını telefonuna kopyalayıp açarak kur.
Android sorarsa, dosyayı açtığın uygulamaya bu APK için kurulum izni ver.
Android 8.0 ve üzeri gerekir. Güncel Android System WebView önerilir.

Oyun yatay açılır. Kartına dokun, ardından I–V yol düğmelerinden birine dokun.
Deste oklarıyla diğer kartlara geç. İki oyuncu aynı telefonda kendi destesini kullanır;
son seçilen oyuncunun birliği yerleştirilir. Bu mod internet üzerinden çok oyunculu değildir.
Üstteki Ⅱ savaşı duraklatır. Geri tuşu savaşta ana menü onayını, menüde çıkışı açar.
Uygulamadan ayrılınca savaş duraklar; dönünce ▶ ile devam et. Çıkış uygulamayı kapatır.

Yedi devlet, dört harita, asker desteleri, özel kartlar, zorluklar ve özgün müzikler dahil.
Oyun ve müzik çevrimdışıdır; internet izni, reklam, hesap ve sunucu bağlantısı bulunmaz.
Web sürümü ayrı kalır: https://sur-kusatmasi-1453-muho.cokis8046.chatgpt.site/
Bu Android sürümü mevcut web oyununun bağımsız kopyasıdır; güncellemeler ayrı paketlenir.

APK yerel kurulum için imzalanmıştır; Google Play yayını yapılmamıştır.
`local-signing.jks` yerel deneme imzasıdır. Mağaza yayını için ayrı güvenli yayın anahtarı gerekir.

## Kaynağı yeniden derleme

`app/src/main/assets/game` oyunun Android kopyasıdır.
`android.css` ve `android.js` yalnızca telefona ait düzen ve davranışları içerir.
`MainActivity.java` oyunu yerel HTTPS varlık adresinden WebView içinde çalıştırır.

Google Android SDK platform 35 ve build-tools 35.0.0 ile JDK 21 kullanılır.
Araçlar `../sur-kusatmasi-android-tools` içinde bulunur. Başka konum için
`SUR_ANDROID_TOOLS` ortam değişkenini ayarla. `python build-apk.py` APK üretir.
Geliştirme kontrolü: `node check-game.cjs` ve `node check-specials.cjs`.
Telefon düzeninin tarayıcı önizlemesi: `node preview.cjs` → http://127.0.0.1:8766/

Yerel kaynak yükleme yaklaşımı: https://developer.android.com/develop/ui/views/layout/webapps/load-local-content
