package com.cokis.surkusatmasi.android;
import android.app.Activity;
import android.os.Bundle;
import android.net.Uri;
import android.view.View;
import android.webkit.*;
import java.io.ByteArrayInputStream;
import java.util.HashMap;
public class MainActivity extends Activity {
 private WebView game;
 private static final String HOST="appassets.androidplatform.net";
 @Override public void onCreate(Bundle saved){
  super.onCreate(saved);game=new WebView(this);setContentView(game);game.setBackgroundColor(0xff192a27);
  WebSettings settings=game.getSettings();settings.setJavaScriptEnabled(true);settings.setDomStorageEnabled(true);settings.setAllowFileAccess(false);settings.setAllowContentAccess(false);settings.setMediaPlaybackRequiresUserGesture(true);settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);settings.setSupportZoom(false);
  game.setWebChromeClient(new WebChromeClient());
  game.setWebViewClient(new WebViewClient(){
   @Override public boolean shouldOverrideUrlLoading(WebView view,WebResourceRequest request){Uri url=request.getUrl();if("surkusatmasi".equals(url.getScheme())&&"exit".equals(url.getHost())){finish();return true;}return !("https".equals(url.getScheme())&&HOST.equals(url.getHost()));}
   @Override public WebResourceResponse shouldInterceptRequest(WebView view,WebResourceRequest request){
    Uri url=request.getUrl();String path=url.getPath();
    if("https".equals(url.getScheme())&&HOST.equals(url.getHost())&&path!=null&&path.startsWith("/assets/game/")&&!path.contains("..")){
     String file=path.substring(8);String mime=file.endsWith(".js")?"text/javascript":file.endsWith(".css")?"text/css":file.endsWith(".html")?"text/html":"application/octet-stream";
     try {HashMap<String,String> headers=new HashMap<>();headers.put("Cache-Control","no-cache");return new WebResourceResponse(mime,"UTF-8",200,"OK",headers,getAssets().open(file));}catch(Exception ignored){}
    }
    return new WebResourceResponse("text/plain","UTF-8",404,"Not Found",new HashMap<>(),new ByteArrayInputStream(new byte[0]));
   }
  });
  immersive();game.loadUrl("https://"+HOST+"/assets/game/index.html");
 }
 private void immersive(){getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN|View.SYSTEM_UI_FLAG_HIDE_NAVIGATION|View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY|View.SYSTEM_UI_FLAG_LAYOUT_STABLE);}
 @Override public void onWindowFocusChanged(boolean focused){super.onWindowFocusChanged(focused);if(focused)immersive();}
 @Override public void onBackPressed(){game.evaluateJavascript("window.AndroidGame && AndroidGame.back()",null);}
 @Override protected void onPause(){game.evaluateJavascript("window.AndroidGame && AndroidGame.background()",null);game.onPause();super.onPause();}
 @Override protected void onResume(){super.onResume();if(game!=null)game.onResume();}
 @Override protected void onDestroy(){if(game!=null){game.stopLoading();game.destroy();}super.onDestroy();}
}