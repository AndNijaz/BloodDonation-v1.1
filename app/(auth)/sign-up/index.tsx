import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Link } from "expo-router";
import RedHeader from "@/components/RedHeader";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons";
import Subheader from "@/components/Subheader";
import InputRow from "@/components/InputRow";
// import { useSignUpContext } from "@/app/context/sign-up-context";
import { useRouter } from "expo-router";

// import { useContext } from "react";
// import { SignUpContext } from "@/app/context/sign-up-context";
import { useSignUp } from "@/app/context/sign-up-context";
import NewButton from "@/components/NewButton";

export default function SignUp() {
  // const SignUpContext = useSignUpContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const router = useRouter();

  const { signUpData, updateEmailPassword } = useSignUp();

  const handleSubmit = () => {
    const passwordsMatch = password === confirmPassword;
    setPasswordMatch(passwordsMatch);

    const isEmailEmpty = email.trim() === "";
    const isPasswordEmpty = password.trim() === "";
    const isConfirmPasswordEmpty = confirmPassword.trim() === "";

    setEmailError(isEmailEmpty);
    setPasswordError(isPasswordEmpty);
    setConfirmPasswordError(isConfirmPasswordEmpty);

    if (
      passwordsMatch &&
      !isEmailEmpty &&
      !isPasswordEmpty &&
      !isConfirmPasswordEmpty
    ) {
      //SignUpContext.Provider({email, password});
      // console.log("Submitted data:", { email, password });

      updateEmailPassword(email, password);
      // Nizo skontaj kako da ide dalje navigacija odavde
      router.push("/(auth)/sign-up/name-surname");
    } else {
      updateEmailPassword(email, password);
      // Nizo skontaj kako da ide dalje navigacija odavde
      router.push("/(auth)/sign-up/name-surname");
    }
  };

  console.log(signUpData);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <RedHeader>Register</RedHeader>
      <View style={styles.formContainer}>
        <Subheader>Create Your Account</Subheader>

        <InputRow
          value={email}
          setValue={setEmail}
          placeholder="Email"
          error={emailError}
          icon="at"
        />
        {emailError && <Text style={styles.errorText}>Email is required</Text>}

        <InputRow
          value={password}
          setValue={setPassword}
          placeholder="Password"
          error={passwordError}
          icon="lock-outline"
        />
        {passwordError && (
          <Text style={styles.errorText}>Password is required</Text>
        )}

        <InputRow
          value={confirmPassword}
          setValue={setConfirmPassword}
          placeholder="Confirm Password"
          error={confirmPasswordError}
          icon="lock-outline"
        />
        {!passwordMatch && (
          <Text style={styles.errorText}>Passwords must match</Text>
        )}
        {confirmPasswordError && (
          <Text style={styles.errorText}>Confirm Password is required</Text>
        )}
      </View>

      <NewButton onSubmit={handleSubmit}>Sign Up</NewButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 48,
  },
  formContainer: {
    paddingTop: 64,
    // paddingTop: 48,
    alignItems: "center",
    paddingStart: 48,
    paddingRight: 48,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});
