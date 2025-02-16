import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve stored login status from AsyncStorage when the app starts
    AsyncStorage.getItem('isLoggedIn')
      .then((storedLoginStatus) => {
        if (storedLoginStatus === 'true') {
          setIsLoggedIn(true);
        }
      })
      .catch((error) => console.error("Error retrieving login state:", error))
      .finally(() => setIsLoading(false));

    // Listen for authentication state changes using Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is authenticated, store login state and update state
        AsyncStorage.setItem('isLoggedIn', 'true')
          .then(() => setIsLoggedIn(true))
          .catch((error) => console.error("Error setting login state:", error));
      } else {
        // If user is not authenticated, check AsyncStorage after a short delay
        setTimeout(() => {
          AsyncStorage.getItem('isLoggedIn')
            .then((storedLoginStatus) => {
              setIsLoggedIn(storedLoginStatus === 'true');
            })
            .catch((error) => console.error("Error retrieving login state:", error));
        }, 1000);
      }
    });

    return () => unsubscribe(); // Cleanup Firebase listener when component unmounts
  }, []);

  // loading indicator while checking authentication status
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    // Provide Redux store to the entire app
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            // If user is logged in, show Home and Details screens
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Details" component={DetailsScreen} />
            </>
          ) : (
            // If user is not logged in, show Login and Signup screens
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
