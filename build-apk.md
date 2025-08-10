# Building APK with Capacitor

## Setup Complete ✅

Your Lion's Café PWA is now configured for Capacitor Android builds with:

- **App ID**: `com.lionscafe.app`
- **App Name**: "Lion's Café & Bakery"
- **Build Directory**: `dist/public`
- **Android Platform**: Added and configured

## Build Commands

### 1. Build the Web App
```bash
npm run build
```

### 2. Sync Capacitor
```bash
npx cap sync
```

### 3. Open in Android Studio
```bash
npx cap open android
```

### 4. Build APK (Alternative via CLI)
```bash
npx cap run android
```

## Files Configured

- ✅ `capacitor.config.ts` - Main Capacitor configuration
- ✅ `android/app/src/main/AndroidManifest.xml` - Android app permissions and settings
- ✅ `android/app/src/main/res/values/strings.xml` - App name and package info
- ✅ PWA manifest with proper icons configured

## Next Steps

1. Run `npm run build` to build your React app
2. Run `npx cap sync` to copy web assets to Android
3. Run `npx cap open android` to open Android Studio
4. In Android Studio: Build → Generate Signed Bundle/APK
5. Follow Android Studio's APK generation wizard

## App Features in APK

Your native Android app will include:
- Full PWA functionality 
- Lion's Café logo as app icon
- Offline capabilities
- Push notification support (configured)
- Splash screen with brand colors
- Native Android integration

## Troubleshooting

If you encounter issues:
- Ensure Android Studio and Android SDK are installed
- Check that `dist/public` folder exists after build
- Verify your Lion's Café logo is accessible in the assets folder