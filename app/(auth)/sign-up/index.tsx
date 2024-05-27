import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import RedHeader from "@/components/RedHeader";
import { Stack } from "expo-router";
import Subheader from "@/components/Subheader";
import InputRow from "@/components/InputRow";
import { useRouter } from "expo-router";
import { useSignUp } from "@/app/context/sign-up-context";
import AlreadyHaveLabelLink from "@/components/AlreadyHaveLabelLink";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCriteriaError, setPasswordCriteriaError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [supabaseError, setSupabaseError] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { signUpData, updateEmailPassword }: any = useSignUp();

  const checkPasswordMatch = () => {
    setPasswordMatch(password === confirmPassword);
  };

  const checkIsEmpty = () => {
    setEmailError(email.trim() === "");
    setPasswordError(password.trim() === "");
    setConfirmPasswordError(confirmPassword.trim() === "");
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  function validateRegisterForm() {
    checkPasswordMatch();
    checkIsEmpty();
    setPasswordCriteriaError(!validatePassword(password));
  }

  function setErrorsFalse() {
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setPasswordMatch(true);
    setPasswordCriteriaError(false);
    setSupabaseError(false);
  }

  async function handleSignUp() {
    setLoading(true);
    setErrorsFalse();
    validateRegisterForm();

    if (emailError || passwordError || confirmPasswordError || !passwordMatch || passwordCriteriaError)
      return;

    // updateEmailPassword(email, password); // context
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

      <RedHeader>Register</RedHeader>

      <View style={styles.formContainer}>
        <Subheader marginBottom={32}>Create Your Account</Subheader>

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
          error={passwordError || passwordCriteriaError}
          icon="lock-outline"
        />
        {passwordError && (
          <Text style={styles.errorText}>Password is required</Text>
        )}
        {passwordCriteriaError && (
          <Text style={styles.errorText}>
            Password must be at least 8 characters long, contain upper and lower case letters, numbers, and special characters.
          </Text>
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

      <Button onPress={handleSignUp} text="Sign Up" />
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
