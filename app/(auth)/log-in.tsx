import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";

import { supabase } from "@/lib/supabase";

import { useRouter } from "expo-router";

import RedHeader from "@/components/RedHeader";
import InputRow from "@/components/InputRow";
import Subheader from "@/components/Subheader";
import AlreadyHaveLabelLink from "@/components/AlreadyHaveLabelLink";
import Button from "@/components/Button";
import SafeArea from "@/components/SafeArea";
import { Alert } from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    email: boolean;
    password: boolean;
    credentials: boolean;
  }>({ email: false, password: false, credentials: false });
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async () => {
    const isEmailEmpty = email.trim() === "";
    const isPasswordEmpty = password.trim() === "";

    setErrors({
      email: isEmailEmpty,
      password: isPasswordEmpty,
      credentials: false,
    });

    if (isEmailEmpty || isPasswordEmpty) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrors((prevErrors) => ({ ...prevErrors, credentials: true }));
        Alert.alert("Login Failed", error.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors((prevErrors) => ({ ...prevErrors, credentials: true }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeArea />
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <RedHeader hasBack={true}>Welcome Back!</RedHeader>
      <View style={styles.formContainer}>
        <Subheader marginBottom={32}>Login to your account</Subheader>

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

        {errors.credentials && (
          <Text style={styles.errorText}>Invalid Email or Password</Text>
        )}
      </View>

      {/* Loading funkcionalnost ne zaboraviti {NE ZABORAVITI} */}
      <Button onPress={handleLogin} text="Login" />
      {/* Loading funkcionalnost ne zaboraviti {NE ZABORAVITI}*/}

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
