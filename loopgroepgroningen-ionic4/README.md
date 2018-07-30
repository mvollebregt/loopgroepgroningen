### Draaien in de browser:

```bash
$ ionic serve
$ ionic serve -l -b
```

### Draaien/builden voor iOS / Android:

Zie https://capacitor.ionicframework.com/docs/getting-started/with-ionic

```bash
npm run build
npx cap copy
npx cap open ios
```

### Sign Android app:

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore my_application.apk alias

### Zipalign:

~/lib/build-tools/x.x.x/zipalign -f 4 my_application.apk my_application_final.apk
