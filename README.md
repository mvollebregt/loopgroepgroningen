### Draaien in de browser:

```bash
$ ionic serve
$ ionic serve --lab
```

### Draaien/builden voor iOS:

```bash
$ ionic cordova run ios -lc
$ ionic cordova build ios --prod (--release)
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

