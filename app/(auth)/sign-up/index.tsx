import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Link } from "expo-router";
import SignUpHeader from "@/components/SignUpHeader";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons";
import { useSignUpContext } from "@/app/context/sign-up-context";

export default function SignUp() {
  const SignUpContext = useSignUpContext();
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSubmit = () => {
    const passwordsMatch = password === confirmPassword;
    setPasswordMatch(passwordsMatch);

    const isEmailEmpty = email.trim() === "";
    const isPasswordEmpty = password.trim() === "";
    const isConfirmPasswordEmpty = confirmPassword.trim() === "";

    setEmailError(isEmailEmpty);
    setPasswordError(isPasswordEmpty);
    setConfirmPasswordError(isConfirmPasswordEmpty);

    if (passwordsMatch && !isEmailEmpty && !isPasswordEmpty && !isConfirmPasswordEmpty) {
      //SignUpContext.Provider({email, password});
      console.log("Submitted data:", { email, password });

      // Nizo skontaj kako da ide dalje navigacija odavde
    }
  };

  return (
    <View>
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
            style={[styles.input, emailError && styles.errorInput]}
            placeholder="Email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setEmailError(false);
            }}
          />
        </View>
        {emailError && <Text style={styles.errorText}>Email is required</Text>}

        <View style={styles.inputBlock}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color="#D93F33"
            />
          </View>
          <TextInput
            style={[styles.input, (passwordError || !passwordMatch) && styles.errorInput]}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={text => {
              setPassword(text);
              setPasswordError(false);
              setPasswordMatch(true);
            }}
          />
        </View>
        {passwordError && <Text style={styles.errorText}>Password is required</Text>}

        <View style={styles.inputBlock}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color="#D93F33"
            />
          </View>
          <TextInput
            style={[styles.input, (confirmPasswordError || !passwordMatch) && styles.errorInput]}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setConfirmPasswordError(false);
              setPasswordMatch(text === password);
            }}
          />
        </View>
        {!passwordMatch && <Text style={styles.errorText}>Passwords must match</Text>}
        {confirmPasswordError && <Text style={styles.errorText}>Confirm Password is required</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
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
    height: "100%",
  },
  iconContainer: {
    borderWidth: 1.5,
    borderColor: "#D93F33",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 5,
  },
  icon: {},
  title: {
    fontSize: 18,
    marginBottom: 32,
    color: "#161616",
  },
  inputBlock: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#ECECEC",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  button: {
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