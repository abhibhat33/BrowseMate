# React Native Browse Mate App

## Overview
Browse Mate is a React Native mobile application implementing Firebase Authentication and a data-driven interface with search and filter functionalities. The app is developed for both iOS and Android and consists of four main screens:

- **Login Screen** - Firebase authentication for login.
- **Signup Screen** - User registration with Firebase.
- **Home Screen** - Displays a list of items from dummy JSON.
- **Details Screen** - Shows detailed information about a selected item.

The project follows best coding practices, including **Redux** for state management and middleware for API calls.

## 🔒 Security Note
This project uses **dotenv** to manage sensitive environment variables securely. To ensure the security of API keys and Firebase credentials, store them in a `.env` file and never commit them to version control.

---

## 🚀 Installation & Setup

### Prerequisites
Ensure you have the following installed:

- **Node.js**
- **React Native CLI**
- **Android Studio** (for Android emulation)
- **Xcode** (for iOS development - Mac only)
- **Firebase Project** (Setup required, see below)

### Clone the Repository
```bash
git clone https://github.com/abhibhat33/BrowseMate.git
cd BrowseMate
```

### Install Dependencies
```bash
npm install
# OR
yarn install
```

---

## 🔥 Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** and select **Email/Password** as the sign-in method.
3. Download `google-services.json` (for Android) and place it inside:
   ```bash
   android/app/google-services.json
   ```
4. Download `GoogleService-Info.plist` (for iOS) and place it inside:
   ```bash
   ios/GoogleService-Info.plist
   ```

---

## 📱 Run the App

### Android
```bash
npx react-native run-android
```

### iOS (Mac Only)
```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

---

## 🛠 Technologies Used
- **React Native** - Framework for mobile development
- **Firebase Authentication** - User authentication
- **Redux Toolkit** - State management
- **Redux Thunk** - Middleware for handling async API calls



APK is available on this repositories Release section

Thank you
