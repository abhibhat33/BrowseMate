import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignupScreen({ navigation }) {
  // State variables for email, password, and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to validate email format
  const validateEmail = useCallback((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), []);
  // Function to check password
  const validatePassword = useCallback((password) => password.length >= 6, []);

  // Function to handle user signup
  const handleSignup = useCallback(async () => {
    setErrorMessage("");
    setIsLoading(true);

    // Validations for empty fields, email format, and password match
    if (!email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Enter a valid email address.");
      setIsLoading(false);
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      // Create user with Firebase authentication
      await createUserWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem("isLoggedIn", "true"); // Store login status in AsyncStorage
      navigation.replace("Home"); // Navigate to Home screen after successful signup
    } catch (error) {
      setErrorMessage(
        error.code === "auth/email-already-in-use"
          ? "This email is already registered. Please login instead."
          : error.message
      );
    } finally {
      setIsLoading(false);
    }
  }, [email, password, confirmPassword, navigation, validateEmail, validatePassword]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        value={email}
        placeholderTextColor="#888"
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          placeholderTextColor="#888"
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          style={styles.passwordInput}
          editable={!isLoading}
        />
        {/* Toggle password visibility */}
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} disabled={isLoading}>
           <Text style={styles.emoji}>
              {isPasswordVisible ? '🙈' : '👁️'}
           </Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          placeholderTextColor="#888"
          onChangeText={setConfirmPassword}
          secureTextEntry={!isConfirmPasswordVisible}
          style={styles.passwordInput}
          editable={!isLoading}
        />
        {/* Toggle confirm password visibility */}
        <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} disabled={isLoading}>
           <Text style={styles.emoji}>
              {isConfirmPasswordVisible ? '🙈' : '👁️'}
           </Text>
        </TouchableOpacity>
      </View>

      {/* Display error message if any */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Signup Button */}
      <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={handleSignup} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Navigate to Login screen if the user already has an account */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")} disabled={isLoading}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the signup screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
  },
  emoji: {
    paddingHorizontal: 15,
    fontSize: 20,
  },
  button: {
    width: 300,
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#a0a0a0",
  },
  loginText: {
    fontSize: 16,
    color: "#007bff",
  },
});
