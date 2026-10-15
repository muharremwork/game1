"""Build standalone APK with Google's build-tools and a JDK, no Gradle required."""
from pathlib import Path
import subprocess,zipfile,os
root=Path(__file__).resolve().parent
tools=Path(os.environ.get('SUR_ANDROID_TOOLS',str(root.parent/'sur-kusatmasi-android-tools')))
jdk=next((tools/'jdk').glob('*/bin'));sdk=next((tools/'platform').glob('*/android.jar'));bt=next((tools/'build-tools').glob('*/aapt2.exe')).parent
out=root/'build';out.mkdir(exist_ok=True)
env=os.environ.copy();env['JAVA_HOME']=str(jdk.parent);env['PATH']=str(jdk)+os.pathsep+env.get('PATH','')
def run(*args):subprocess.run([str(x) for x in args],check=True,env=env)
run(bt/'aapt2.exe','compile','--dir',root/'app/src/main/res','-o',out/'resources.zip')
run(bt/'aapt2.exe','link','-o',out/'base.apk','-I',sdk,'--manifest',root/'app/src/main/AndroidManifest.xml','-A',root/'app/src/main/assets',out/'resources.zip')
classes=out/'classes';classes.mkdir(exist_ok=True)
run(jdk/'javac.exe','-encoding','UTF-8','-source','8','-target','8','-bootclasspath',sdk,'-d',classes,*list((root/'app/src/main/java').rglob('*.java')))
dex=out/'dex';dex.mkdir(exist_ok=True)
run(jdk/'java.exe','-cp',bt/'lib/d8.jar','com.android.tools.r8.D8','--min-api','26','--lib',sdk,'--output',dex,*list(classes.rglob('*.class')))
with zipfile.ZipFile(out/'base.apk') as base,zipfile.ZipFile(out/'unsigned.apk','w') as apk:
 for entry in base.infolist():apk.writestr(entry.filename,base.read(entry),compress_type=entry.compress_type)
 apk.write(dex/'classes.dex','classes.dex',compress_type=zipfile.ZIP_DEFLATED)
run(bt/'zipalign.exe','-f','-p','4',out/'unsigned.apk',out/'aligned.apk')
key=root/'local-signing.jks'
if not key.exists():run(jdk/'keytool.exe','-genkeypair','-keystore',key,'-storepass','android','-keypass','android','-alias','sur-local','-keyalg','RSA','-keysize','2048','-validity','10000','-dname','CN=Sur Kusatmasi Local, O=Cokis, C=TR')
target=root/'Sur-Kusatmasi-Android.apk'
run(jdk/'java.exe','-jar',bt/'lib/apksigner.jar','sign','--ks',key,'--ks-key-alias','sur-local','--ks-pass','pass:android','--key-pass','pass:android','--out',target,out/'aligned.apk')
run(jdk/'java.exe','-jar',bt/'lib/apksigner.jar','verify','--verbose',target)
run(bt/'aapt2.exe','dump','badging',target)
print('APK ready: '+str(target))
