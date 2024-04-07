import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import SignUpHeader from "@/components/SignUpHeader";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons";

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

        <View style={styles.inputBlock}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="at"
              size={24}
              color="#D93F33"
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputBlock}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color="#D93F33"
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputBlock}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color="#D93F33"
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingStart: 48,
    paddingRight: 48,
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    borderWidth: 1.5,
    borderBlockColor: "#D93F33",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 5, // Higher elevation
  },
  icon: {
    // paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 32,
    color: "#161616",
  },
  // ----------------------------
  inputBlock: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    // flex: 1,

    // borderWidth: 2, // Border width
    // borderColor: "black", // Border color
    borderRadius: 10, // Border radius (for rounded corners)
    marginBottom: 16,
  },
  input: {
    flex: 1,
    // width: "80%",

    height: 50,
    backgroundColor: "#ECECEC",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    // borderRadius: 20,
    paddingHorizontal: 16,
  },
  button: {
    marginTop: "auto",
    width: "100%",
    height: 50,
    backgroundColor: "#FF5733",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
