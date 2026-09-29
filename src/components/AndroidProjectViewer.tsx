import React, { useState } from 'react';
import { 
  FolderTree, 
  FileCode2, 
  Copy, 
  Check, 
  Download, 
  Smartphone, 
  ShieldAlert, 
  Terminal, 
  Layers, 
  ExternalLink,
  Code
} from 'lucide-react';
import { Language } from '../types';

interface AndroidProjectViewerProps {
  lang: Language;
}

interface ProjectFile {
  id: string;
  name: string;
  path: string;
  language: string;
  descriptionAr: string;
  descriptionFr: string;
  content: string;
}

const ANDROID_FILES: ProjectFile[] = [
  {
    id: 'main_activity',
    name: 'MainActivity.kt',
    path: 'app/src/main/java/org/tadamoun/tchad/MainActivity.kt',
    language: 'kotlin',
    descriptionAr: 'كود النشاط الرئيسي بلغة Kotlin للتحكم في WebView، توجيه اتصالات الطوارئ، روابط واتساب، وأذونات GPS والكاميرا.',
    descriptionFr: 'Activité principale en Kotlin: configuration WebView, gestion des intents d\'urgence (tel:), WhatsApp, GPS et sélection de fichiers.',
    content: `package org.tadamoun.tchad

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.WindowManager
import android.webkit.GeolocationPermissions
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ProgressBar
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat

/**
 * MainActivity for "Tadamoun Tchad" (تضامن تشاد)
 * Production Android WebView Wrapper designed for Chadian Community in Southern Algeria.
 */
class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var progressBar: ProgressBar
    private var fileUploadCallback: ValueCallback<Array<Uri>>? = null

    // Activity Result Launcher for Camera/File upload
    private val filePickerLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            val data = result.data
            val results = when {
                data?.dataString != null -> arrayOf(Uri.parse(data.dataString))
                data?.clipData != null -> {
                    val count = data.clipData!!.itemCount
                    Array(count) { i -> data.clipData!!.getItemAt(i).uri }
                }
                else -> null
            }
            fileUploadCallback?.onReceiveValue(results)
        } else {
            fileUploadCallback?.onReceiveValue(null)
        }
        fileUploadCallback = null
    }

    // Permission launcher for Location / GPS
    private val requestLocationPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val fineLocationGranted = permissions[Manifest.permission.ACCESS_FINE_LOCATION] ?: false
        val coarseLocationGranted = permissions[Manifest.permission.ACCESS_COARSE_LOCATION] ?: false
        if (fineLocationGranted || coarseLocationGranted) {
            webView.reload()
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Set status bar color to Chadian Deep Blue (#002654)
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
        window.statusBarColor = ContextCompat.getColor(this, R.color.chad_deep_blue)

        webView = findViewById(R.id.webView)
        progressBar = findViewById(R.id.progressBar)

        setupWebViewSettings()
        setupWebViewClients()
        setupBackNavigation()

        // Load local offline single-file application from assets
        webView.loadUrl("file:///android_asset/index.html")

        checkAndRequestPermissions()
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebViewSettings() {
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            useWideViewPort = true
            loadWithOverviewMode = true
            displayZoomControls = false
            builtInZoomControls = false
            setSupportZoom(false)

            // Cache & Offline Mode: prefer cache for desert areas without 4G
            cacheMode = WebSettings.LOAD_DEFAULT

            // Geolocation enable
            setGeolocationEnabled(true)

            // Mixed content allowed for local asset handling
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        }

        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)
    }

    private fun setupWebViewClients() {
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return false

                // 1. Intercept SOS Phone Calls (+213661168561, 14, 17, 3015)
                if (url.startsWith("tel:")) {
                    val dialIntent = Intent(Intent.ACTION_DIAL, Uri.parse(url))
                    try {
                        startActivity(dialIntent)
                    } catch (e: Exception) {
                        Toast.makeText(this@MainActivity, "Impossible de composer le numéro", Toast.LENGTH_SHORT).show()
                    }
                    return true
                }

                // 2. Intercept WhatsApp Messaging & Voice Note Links
                if (url.contains("wa.me") || url.contains("whatsapp.com") || url.startsWith("whatsapp://")) {
                    try {
                        val whatsappIntent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                        whatsappIntent.setPackage("com.whatsapp")
                        startActivity(whatsappIntent)
                        return true
                    } catch (e: Exception) {
                        val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                        startActivity(browserIntent)
                        return true
                    }
                }

                // 3. Intercept Maps GPS Links
                if (url.startsWith("geo:") || url.contains("maps.google.com")) {
                    val mapIntent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                    startActivity(mapIntent)
                    return true
                }

                // Internal asset navigation
                if (url.startsWith("file:///android_asset/")) {
                    return false
                }

                // External browser for other external links
                return try {
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                    startActivity(intent)
                    true
                } catch (e: Exception) {
                    false
                }
            }
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                if (newProgress < 100) {
                    progressBar.visibility = View.VISIBLE
                    progressBar.progress = newProgress
                } else {
                    progressBar.visibility = View.GONE
                }
            }

            override fun onGeolocationPermissionsShowPrompt(
                origin: String?,
                callback: GeolocationPermissions.Callback?
            ) {
                callback?.invoke(origin, true, false)
            }

            override fun onShowFileChooser(
                webView: WebView?,
                filePathCallback: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
            ): Boolean {
                fileUploadCallback?.onReceiveValue(null)
                fileUploadCallback = filePathCallback

                val intent = fileChooserParams?.createIntent() ?: Intent(Intent.ACTION_GET_CONTENT).apply {
                    type = "image/*"
                    addCategory(Intent.CATEGORY_OPENABLE)
                }

                try {
                    filePickerLauncher.launch(intent)
                } catch (e: Exception) {
                    fileUploadCallback = null
                    return false
                }
                return true
            }
        }
    }

    private fun setupBackNavigation() {
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    finish()
                }
            }
        })
    }

    private fun checkAndRequestPermissions() {
        val permissionsToRequest = mutableListOf<String>()

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
            != PackageManager.PERMISSION_GRANTED) {
            permissionsToRequest.add(Manifest.permission.ACCESS_FINE_LOCATION)
            permissionsToRequest.add(Manifest.permission.ACCESS_COARSE_LOCATION)
        }

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CALL_PHONE)
            != PackageManager.PERMISSION_GRANTED) {
            permissionsToRequest.add(Manifest.permission.CALL_PHONE)
        }

        if (permissionsToRequest.isNotEmpty()) {
            requestLocationPermissionLauncher.launch(permissionsToRequest.toTypedArray())
        }
    }

    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }
}`
  },
  {
    id: 'manifest',
    name: 'AndroidManifest.xml',
    path: 'app/src/main/AndroidManifest.xml',
    language: 'xml',
    descriptionAr: 'ملف بيان التطبيق يحتوي على أذونات الاتصال، تحديد الموقع الجغرافي، الكاميرا والوصول للإنترنت.',
    descriptionFr: 'Manifest Android avec permissions d\'appel (CALL_PHONE), géolocalisation désertique (ACCESS_FINE_LOCATION), et caméra.',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="org.tadamoun.tchad">

    <!-- Permissions for Consular Aid, SOS Hotline, GPS, and Document Uploads -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.CALL_PHONE" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <uses-feature android:name="android.hardware.telephony" android:required="false" />
    <uses-feature android:name="android.hardware.location.gps" android:required="false" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.TadamounTchad"
        android:usesCleartextTraffic="true">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|keyboardHidden"
            android:windowSoftInputMode="adjustResize"
            android:screenOrientation="portrait">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="tadamoun" />
            </intent-filter>
        </activity>
    </application>
</manifest>`
  },
  {
    id: 'layout',
    name: 'activity_main.xml',
    path: 'app/src/main/res/layout/activity_main.xml',
    language: 'xml',
    descriptionAr: 'واجهة العرض الخاصة بنشاط أندرويد مع شريط تقدم تحميل متدرج بألوان العلم التشادي.',
    descriptionFr: 'Layout XML de l\'activité principale avec ProgressBar tricolore et composant WebView pleine page.',
    content: `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/chad_background_dark">

    <ProgressBar
        android:id="@+id/progressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="match_parent"
        android:layout_height="4dp"
        android:layout_alignParentTop="true"
        android:indeterminate="false"
        android:max="100"
        android:progressDrawable="@drawable/progress_bar_custom"
        android:visibility="gone" />

    <WebView
        android:id="@+id/webView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_below="@id/progressBar"
        android:overScrollMode="never" />

</RelativeLayout>`
  },
  {
    id: 'gradle',
    name: 'app/build.gradle.kts',
    path: 'app/build.gradle.kts',
    language: 'kotlin',
    descriptionAr: 'ملف إعدادات البناء Gradle لإنتاج حزمة APK مع دعم نظام أندرويد الحديث ومكتبات WebKit.',
    descriptionFr: 'Fichier de build Gradle (KTS) configuré pour Android SDK 34 et dépendances WebView.',
    content: `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "org.tadamoun.tchad"
    compileSdk = 34

    defaultConfig {
        applicationId = "org.tadamoun.tchad"
        minSdk = 23
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("debug")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.11.0")
    implementation("androidx.activity:activity-ktx:1.8.2")
    implementation("androidx.webkit:webkit:1.10.0")
}`
  },
  {
    id: 'readme',
    name: 'README.md (دليل التجميع)',
    path: 'android/README.md',
    language: 'markdown',
    descriptionAr: 'دليل تجميع ملف APK بواسطة Android Studio أو موجه الأوامر (Gradle).',
    descriptionFr: 'Guide d\'instructions pour compiler le fichier APK sous Android Studio ou terminal.',
    content: `# Tadamoun Tchad (تضامن تشاد) - Android APK Source Project

## How to Build the APK

### Method 1: Using Android Studio (GUI)
1. Open Android Studio.
2. Select "Open an Existing Project" and choose the \`/android\` folder.
3. Wait for Gradle sync to complete.
4. Go to: Build > Build Bundle(s) / APK(s) > Build APK(s).
5. The generated APK will be placed in:
   \`app/build/outputs/apk/debug/app-debug.apk\`

### Method 2: Command Line (CLI)
\`\`\`bash
cd android
./gradlew assembleDebug
\`\`\`

For signed release:
\`\`\`bash
./gradlew assembleRelease
\`\`\`

### Method 3: Online Web2APK Converter
Upload \`app/src/main/assets/index.html\` directly to any Web2APK compiler:
- Package: \`org.tadamoun.tchad\`
- Name: \`Tadamoun Tchad\`
- Color: \`#002654\``
  },
  {
    id: 'github_actions',
    name: '.github/workflows/build-apk.yml',
    path: '.github/workflows/build-apk.yml',
    language: 'yaml',
    descriptionAr: 'سير عمل GitHub Actions لبناء ونشر ملف الـ APK تلقائياً في صفحة Releases عند كل Push للفرع الرئيسي.',
    descriptionFr: 'Workflow GitHub Actions compilant et publiant automatiquement l\'APK dans les Releases lors de chaque push.',
    content: `name: Build & Release Android APK

on:
  push:
    branches:
      - main
      - master
    paths-ignore:
      - '**.md'
      - '.gitignore'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-apk:
    name: Build & Publish Android APK
    runs-on: ubuntu-latest

    steps:
      - name: 📥 Checkout Repository
        uses: actions/checkout@v4

      - name: ☕ Set up JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: 🐘 Set up Gradle
        uses: gradle/actions/setup-gradle@v4
        with:
          gradle-version: '8.2'

      - name: 📱 Set up Android SDK
        uses: android-actions/setup-android@v3

      - name: 🛠️ Ensure Web Assets are Up to Date
        run: |
          mkdir -p android/app/src/main/assets
          if [ -f public/tadamoun_standalone.html ]; then
            cp public/tadamoun_standalone.html android/app/src/main/assets/index.html
          fi

      - name: 🔨 Compile Android APK
        working-directory: android
        run: |
          # Generate gradle-wrapper.jar if not committed in git
          gradle wrapper --gradle-version 8.2 || true
          chmod +x gradlew || true

          # Build APK directly using gradle or generated gradlew
          gradle assembleRelease --no-daemon --stacktrace || \
          gradle assembleDebug --no-daemon --stacktrace || \
          ./gradlew assembleRelease --no-daemon --stacktrace || \
          ./gradlew assembleDebug --no-daemon --stacktrace

      - name: 📦 Locate & Prepare APK Artifact
        run: |
          mkdir -p release-output
          APK_FILE=$(find android/app/build/outputs/apk -name "*.apk" | head -n 1)
          cp "$APK_FILE" release-output/Tadamoun-Tchad-v1.0.0.apk
          echo "APK_PATH=release-output/Tadamoun-Tchad-v1.0.0.apk" >> $GITHUB_ENV

      - name: 📤 Upload APK as Build Artifact
        uses: actions/upload-artifact@v4
        with:
          name: Tadamoun-Tchad-Android-APK
          path: \${{ env.APK_PATH }}
          retention-days: 90

      - name: 🚀 Publish GitHub Release & Attach APK
        uses: softprops/action-gh-release@v2
        if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
        with:
          tag_name: v1.0.\${{ github.run_number }}
          name: "تضامن تشاد - Tadamoun Tchad v1.0.\${{ github.run_number }}"
          files: \${{ env.APK_PATH }}
          draft: false
          prerelease: false
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`
  }
];

export const AndroidProjectViewer: React.FC<AndroidProjectViewerProps> = ({ lang }) => {
  const [selectedFileId, setSelectedFileId] = useState<string>('main_activity');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedFile = ANDROID_FILES.find(f => f.id === selectedFileId) || ANDROID_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-[#001D45] via-[#002654] to-slate-900 border border-blue-900/60 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">
              {lang === 'ar' ? 'مشروع تطبيق أندرويد الأصلي (Android APK Source)' : 'Code Source du Projet Android APK'}
            </h2>
            <p className="text-xs text-blue-200/80">
              {lang === 'ar' 
                ? 'الهيكل الكامل لكود أندرويد (Kotlin + AndroidManifest + Gradle + Assets) الجاهز للترجمة إلى APK.' 
                : 'Structure complète du code Android prêt pour compilation immédiate en fichier APK.'}
            </p>
          </div>
        </div>

        {/* Quick specs pill */}
        <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
          <span className="px-2.5 py-1 rounded-full bg-slate-800 text-gray-300 border border-slate-700">
            Package: <strong className="text-amber-400 font-mono">org.tadamoun.tchad</strong>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-800 text-gray-300 border border-slate-700">
            Target SDK: <strong className="text-emerald-400 font-mono">Android 14 (API 34)</strong>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-800 text-gray-300 border border-slate-700">
            Min SDK: <strong className="text-blue-400 font-mono">API 23 (Android 6.0+)</strong>
          </span>
        </div>
      </div>

      {/* File Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {ANDROID_FILES.map((file) => {
          const isActive = file.id === selectedFileId;
          return (
            <button
              key={file.id}
              onClick={() => setSelectedFileId(file.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-mono font-bold whitespace-nowrap transition flex items-center gap-2 border ${
                isActive
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                  : 'bg-slate-900 text-gray-300 hover:bg-slate-800 border-slate-800'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>{file.name}</span>
            </button>
          );
        })}
      </div>

      {/* Code Viewer Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Top bar with path & actions */}
        <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden text-xs">
            <span className="font-mono text-gray-400 truncate">{selectedFile.path}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-gray-200 flex items-center gap-1.5 transition active:scale-95 border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (lang === 'ar' ? 'تم النسخ' : 'Copié') : (lang === 'ar' ? 'نسخ الكود' : 'Copier')}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-xs font-bold text-white flex items-center gap-1.5 transition active:scale-95 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تحميل الملف' : 'Télécharger'}</span>
            </button>
          </div>
        </div>

        {/* File Description */}
        <div className="p-3 bg-blue-950/30 border-b border-slate-800/80 text-xs text-blue-200">
          {lang === 'ar' ? selectedFile.descriptionAr : selectedFile.descriptionFr}
        </div>

        {/* Preformatted Code Content */}
        <div className="p-4 overflow-x-auto max-h-[500px] text-xs font-mono leading-relaxed bg-[#020617] text-slate-200 selection:bg-amber-400 selection:text-slate-950" dir="ltr">
          <pre>{selectedFile.content}</pre>
        </div>
      </div>

      {/* Build Quick Guide */}
      <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          {lang === 'ar' ? 'أوامر سريعة لبناء الـ APK عبر الطرفية' : 'Commandes rapides de compilation (CLI)'}
        </h4>

        <div className="p-3 rounded-2xl bg-black/60 border border-slate-800 font-mono text-xs text-emerald-400" dir="ltr">
          <div className="text-gray-500"># 1. Naviguer vers le dossier android</div>
          <div>cd android</div>
          <div className="text-gray-500 mt-2"># 2. Compiler l'APK de débogage / test</div>
          <div>./gradlew assembleDebug</div>
          <div className="text-gray-500 mt-2"># 3. Emplacement de l'APK généré:</div>
          <div className="text-amber-300">app/build/outputs/apk/debug/app-debug.apk</div>
        </div>
      </div>
    </div>
  );
};
