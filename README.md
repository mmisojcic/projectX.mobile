# ProjectX

1. Install Android SDK and Android Studio
   https://developer.android.com/studio/

    install SDK from Android Studio(Android SDK Build-Tools, Android SDK Tools, Android SDK Platform-Tools)

2. Install Apache Cordova - npm install -g cordova
   https://cordova.apache.org/#getstarted

3. Install Gradle build tool
   https://docs.gradle.org/current/userguide/installation.html

USAGE

Before usage do

-   npm i
-   cordova plugin add cordova-plugin-device --save

    -   ng serve-start angular project
    -   ng build --prod-builds angular project (output folder now is www)
    -   cordova build <platform>(e.g. android)-builds cordova project to specified platform app
        (output folder: <project.path>/platforms/android/app/build/outputs/apk/debug/)
