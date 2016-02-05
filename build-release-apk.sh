gulp clean
gulp build
cordova clean android
cordova build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore st-release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk stkey
/Users/ssilvestri/Library/Android/sdk/build-tools/23.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/strengthTracker.apk 
