import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { supabase } from "@/lib/supabase";
import RedHeader from "@/components/RedHeader";
import InputRow from "@/components/InputRow";
import Subheader from "@/components/Subheader";
import NewButton from "@/components/NewButton";
import AlreadyHaveLabelLink from "@/components/AlreadyHaveLabelLink";
import { useRouter } from "expo-router";
import { useSignUp } from "../context/sign-up-context";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { signUpData, updateEmailPassword } = useSignUp();

  async function handleLogin() {
    const isEmailEmpty = email.trim() === "";
    const isPasswordEmpty = password.trim() === "";

    setEmailError(isEmailEmpty);
    setPasswordError(isPasswordEmpty);

    updateEmailPassword(email, password); //context
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    router.push("/(user)/home");
    if (error) Alert.alert(error.message);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <RedHeader hasBack={true}>Welcome Back!</RedHeader>
      <View style={styles.formContainer}>
        <Subheader>Login to your account</Subheader>

        <InputRow
          value={email}
          setValue={setEmail}
          placeholder="E-mail"
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
      </View>

      <NewButton onSubmit={handleLogin}>Login</NewButton>

      <AlreadyHaveLabelLink path="sign-up" linkText="Sign Up">
        Don't have an account?
      </AlreadyHaveLabelLink>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 48,
  },
  formContainer: {
    paddingTop: 64,
    alignItems: "center",
    paddingStart: 48,
    paddingRight: 48,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});

export default LoginScreen;
