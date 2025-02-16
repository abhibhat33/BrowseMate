import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  // State variables for email, password, error message, password visibility, and loading state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to validate email format using regex
  const validateEmail = useCallback((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [])

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  // Handle login function
  const handleLogin = useCallback(async () => {
    setErrorMessage('');
    setLoading(true);

    // Check if email and password are entered
    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      setLoading(false);
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setErrorMessage('Enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      // Authenticate user with Firebase
      await signInWithEmailAndPassword(auth, email, password);

      // Store login status in AsyncStorage
      await AsyncStorage.setItem('isLoggedIn', 'true');

      // Navigate to the home screen after successful login
      navigation.replace('Home');
    } catch (error) {
      setErrorMessage('Incorrect email or password.');
      setPassword('');
    } finally {
      setLoading(false);
    }
  }, [email, password, validateEmail, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, loading && styles.disabledInput]}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      {/* Password Input */}
      <View style={[styles.passwordContainer, loading && styles.disabledInput]}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          style={styles.passwordInput}
          editable={!loading}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} disabled={loading}>
          <Text style={styles.emoji}>
            {isPasswordVisible ? '🙈' : '👁️'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      {/* Signup Navigation */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} disabled={loading}>
        <Text style={[styles.signupText, loading && styles.disabledText]}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
    color: '#000',
  },
  disabledInput: {
    backgroundColor: '#e0e0e0',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  emoji: {
    fontSize: 24,
    paddingHorizontal: 15,
  },
  button: {
    width: 300,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  disabledButton: {
    backgroundColor: '#99c2ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    fontSize: 16,
    color: '#007bff',
  },
  disabledText: {
    color: '#999',
  },
});
