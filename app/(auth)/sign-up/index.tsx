import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

import { useRouter } from "expo-router";

import { supabase } from "@/lib/supabase";

import RedHeader from "@/components/RedHeader";
import Subheader from "@/components/Subheader";
import InputRow from "@/components/InputRow";
import AlreadyHaveLabelLink from "@/components/AlreadyHaveLabelLink";
import Button from "@/components/Button";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
    passwordMatch: boolean;
  }>({
    email: false,
    password: false,
    confirmPassword: false,
    passwordMatch: true,
  });
  const [supabaseError, setSupabaseError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      passwordMatch: password === confirmPassword,
    }));
  }, [password, confirmPassword]);

  const validateForm = () => {
    const emailError = email.trim() === "";
    const passwordError = password.trim() === "";
    const confirmPasswordError = confirmPassword.trim() === "";
    const passwordMatch = password === confirmPassword;

    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      passwordMatch,
    });

    return !(
      emailError ||
      passwordError ||
      confirmPasswordError ||
      !passwordMatch
    );
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      setSupabaseError(error.message);
    } else {
      router.push("/(auth)/sign-up/name-surname");
    }
  };

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
          error={errors.email}
          icon="at"
        />
        {errors.email && (
          <Text style={styles.errorText}>Email is required</Text>
        )}

        <InputRow
          value={password}
          setValue={setPassword}
          placeholder="Password"
          error={errors.password}
          icon="lock-outline"
        />
        {errors.password && (
          <Text style={styles.errorText}>Password is required</Text>
        )}

        <InputRow
          value={confirmPassword}
          setValue={setConfirmPassword}
          placeholder="Confirm Password"
          error={errors.confirmPassword}
          icon="lock-outline"
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>Confirm Password is required</Text>
        )}
        {!errors.passwordMatch && (
          <Text style={styles.errorText}>Passwords must match</Text>
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
