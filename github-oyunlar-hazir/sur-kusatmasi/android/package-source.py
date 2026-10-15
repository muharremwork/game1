from pathlib import Path
import zipfile,hashlib,json
root=Path(__file__).resolve().parent
apk=root/'Sur-Kusatmasi-Android.apk'
with zipfile.ZipFile(apk) as package:
 assert package.testzip() is None
 assert 'classes.dex' in package.namelist()
 assert 'AndroidManifest.xml' in package.namelist()
 for f in (root/'app/src/main/assets').rglob('*'):
  if f.is_file():assert package.read('assets/'+f.relative_to(root/'app/src/main/assets').as_posix())==f.read_bytes(),str(f)
hash=hashlib.sha256(apk.read_bytes()).hexdigest()
(root/'APK-SHA256.txt').write_text(hash+'  '+apk.name+'\n')
with zipfile.ZipFile(root.parent/'Sur-Kusatmasi-Android-Kaynak.zip','w',zipfile.ZIP_DEFLATED) as target:
 for f in root.rglob('*'):
  if f.is_file() and 'build' not in f.relative_to(root).parts and f.suffix not in ['.apk','.jks','.idsig']:
   target.write(f,'sur-kusatmasi-android/'+f.relative_to(root).as_posix())
print(json.dumps({'apk_bytes':apk.stat().st_size,'sha256':hash,'assets_match':True,'source_zip':str(root.parent/'Sur-Kusatmasi-Android-Kaynak.zip')},indent=2))
