import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import RedHeader from "@/components/RedHeader";
import { Stack } from "expo-router";
import Subheader from "@/components/Subheader";
import InputRow from "@/components/InputRow";
import { useRouter } from "expo-router";
import { useSignUp } from "@/app/context/sign-up-context";
import NewButton from "@/components/NewButton";
import AlreadyHaveLabelLink from "@/components/AlreadyHaveLabelLink";
import { supabase } from "@/lib/supabase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [error, setError] = useState({
    error: false,
    errorType: "",
    errorText: "",
  });

  const [supabaseError, setSupabaseError] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { signUpData, updateEmailPassword } = useSignUp();

  const checkPasswordMatch = () => {
    setPasswordMatch(password === confirmPassword);
  };

  const checkIsEmpty = () => {
    setEmailError(email.trim() === "");
    setPasswordError(password.trim() === "");
    setConfirmPasswordError(confirmPassword.trim() === "");
  };

  function validateRegisterForm() {
    checkPasswordMatch();
    checkIsEmpty();
  }

  function setErrorsFalse() {
    setEmailError(false);
    setConfirmPasswordError(false);
    setConfirmPasswordError(false);
    setPasswordMatch(true);
    setSupabaseError(false);
  }

  async function handleSignUp() {
    setLoading(true);
    setErrorsFalse();
    validateRegisterForm();

    if (emailError && passwordError && confirmPasswordError && !passwordMatch)
      return;

    updateEmailPassword(email, password); //contex
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setSupabaseError(error.message);
      console.log(error);
      return;
    }

    router.push("/(auth)/sign-up/name-surname");
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>

      <RedHeader hasBack={true}>Register</RedHeader>

      <View style={styles.formContainer}>
        <Subheader>Create Your Account</Subheader>

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
        {supabaseError && <Text style={styles.errorText}>{supabaseError}</Text>}
      </View>

      <NewButton onSubmit={handleSignUp}>Sign Up</NewButton>
      <AlreadyHaveLabelLink path="log-in" linkText="Login">
        Already have an account?
      </AlreadyHaveLabelLink>
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
    alignItems: "center",
    paddingStart: 48,
    paddingRight: 48,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});
