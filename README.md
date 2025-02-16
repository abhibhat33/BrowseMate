 # React Native Browse Mate App

## Overview
This is a React Native mobile application implementing Firebase Authentication and a data-driven interface with search and filter functionalities. The app consists of four main screens:

1. **Login Screen** - Firebase authentication for login.
2. **Signup Screen** - User registration with Firebase.
3. **Home Screen** - Displays a list of items from dummy json.
4. **Details Screen** - Shows detailed information about a selected item.

The project follows best coding practices, including Redux for state management and middleware for API calls.

Security Note 🛡️

This project uses dotenv to manage sensitive environment variables securely. To ensure the security of API keys and Firebase credentials:
---

## Installation & Setup

### **Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) (for Android emulation)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development - Mac only)
- Firebase Project (Setup required, see below)

### **Clone the Repository**

bash
git clone https://github.com/abhibhat33/BrowseMate.git
cd BrowseMate



### **Install Dependencies**

bash
npm install
# OR
yarn install



### **Firebase Setup**
1. Create a Firebase project at Firebase Console
2. Enable **Authentication** and select **Email/Password** as the sign-in method.
3. Download google-services.json (for Android) and place it inside android/app/.
4. Download GoogleService-Info.plist (for iOS) and place it inside ios/.

### **Run the App**
#### **Android**

bash
npx react-native run-android


#### **iOS** (Mac Only)

bash
cd ios && pod install && cd ..
npx react-native run-ios



---

## **Technologies Used**
- **React Native** -  framework
- **Firebase Authentication** - User authentication
- **Redux Toolkit** - State management
- **Redux Thunk** - Middleware for API calls
- **React Navigation** - Screen navigation
- **React Native Vector Icons** - UI enhancements

## Features & Functionality

### 1. **Login Screen (Firebase Authentication)**
- Users can log in with their **email/username and password**.
- Firebase Authentication handles user verification.
- If logged in previously, the app does not ask for credentials again.
- A link to the **Signup Screen** is provided for new users.

### 2. **Signup Screen (Firebase Authentication)**
- Users can register with **email, password, and confirm password**.
- Upon successful registration, the user is authenticated and redirected to the **Home Screen**.
- A link to the **Login Screen** is provided for existing users.

### 3. **Home Screen**
- Fetched and displayed a list of items from dummy json -- https://dummyjson.com/products?
- Each item shows **Title, Image, category and price **.
- **Pagination** is implemented (maximum **10 items per page**).
- Uses **Redux Middleware** for API calls and state management.
- Implements **search and filter functionalities**
- Displays a **loading indicator** while fetching data.
- Navigates to the **Details Screen** when an item is clicked.

### 4. **Details Screen**
- Displays full details of a selected item.
- Users can navigate back to the **Home Screen**.

 Features
- **Logout functionality**: Users can log out from the app.

---

## **APK Download**
Download the APK file from directly from the GitHub releases section.

---
