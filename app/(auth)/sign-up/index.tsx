import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import SignUpHeader from "@/components/SignUpHeader";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Handle form submission (e.g., send data to server)
    console.log("Submitted data:", { name, email, password });
  };

  const handleLogin = () => {
    // Handle login logic (e.g., validate credentials)
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Register",
        }}
      />
      <SignUpHeader>Register</SignUpHeader>
      {/* <Text>SignUp</Text> */}

      <View style={styles.container}>
        <Text style={styles.title}>Create your account</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    paddingTop: 24,
    paddingStart: 48,
    paddingRight: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 32,
    color: "#161616",
  },
  // ----------------------------
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF5733",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
