import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Button } from "react-native";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('isLoggedIn');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
      <View style={styles.container}>

        <Button title="Logout" onPress={handleLogout} />
      </View>
  );
}

const styles = StyleSheet.create({

});
