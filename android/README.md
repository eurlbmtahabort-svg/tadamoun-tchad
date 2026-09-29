# Tadamoun Tchad (تضامن تشاد) - Android APK Source Project

Mobile application wrapper for the Chadian community in Southern Algeria (Tamanrasset, In Guezzam, In Salah, Djanet, Bordj Badji Mokhtar, Adrar, Illizi).

## Features
- **SOS Hotline:** Floating and prominent Emergency Call button targeting candidate honorary consul line `+213661168561`.
- **WhatsApp Direct & Voice Notes:** Native intent routing for `https://wa.me/213661168561`.
- **Desert GPS Locator:** Real-time coordinates retrieval with permissions handled natively.
- **Administrative Guidance:** Laissez-Passer, passport renewal, and consular registration checklists.
- **Confidential & Anonymous Forms:** Legal consultations with offline LocalStorage vault.
- **Newborn Registration Intake:** Protection against statelessness (Apatridie).
- **100% Offline Capability:** Bundled in `app/src/main/assets/index.html`.

---

## How to Build the APK

### Method 1: Using Android Studio (GUI)
1. Open **Android Studio**.
2. Select **Open an Existing Project** and browse to the `/android` directory.
3. Wait for Gradle sync to complete.
4. Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
5. The generated APK will be in:
   `app/build/outputs/apk/debug/app-debug.apk`

### Method 2: Command Line (CLI)
```bash
cd android
./gradlew assembleDebug
```

For a release APK:
```bash
./gradlew assembleRelease
```

### Method 3: Direct Web2APK / WebView Builder
If you are using online Web2APK converters, simply upload the standalone single file:
`app/src/main/assets/index.html`
- App Name: `Tadamoun Tchad`
- Package Name: `org.tadamoun.tchad`
- Orientation: `Portrait`
- Status Bar Color: `#002654`
- Hardware Acceleration: `Enabled`
