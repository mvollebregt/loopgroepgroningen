### Draaien in de browser:

```bash
$ ionic serve
$ ionic serve --lab
```

### Draaien/builden voor iOS:

```bash
$ ionic cordova run ios -lc
$ ionic cordova build ios --prod (--release) -- --buildFlag="-UseModernBuildSystem=0"
```

Build openen in xcode en draaien.

### Draaien op Android:

Verwijder eerst een eventuele oude versie van de app van het device!
De eerste drie commando's dienen alle drie uitgevoerd te worden omdat je anders oude versies van de app krijgt.

```
$ ionic cordova prepare
$ ionic cordova build android --prod (--release)
$ ionic cordova prepare
$ cd platforms/android
$ gradle assemble
$ ~/Library/Android/sdk/platform-tools/adb install build/outputs/apk/android-armv7-debug.apk
$ cd ../..
```

### Sign Android app:

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore my_application.apk michel

### Zipalign:

~/lib/build-tools/x.x.x/zipalign -f 4 my_application.apk my_application_final.apk
