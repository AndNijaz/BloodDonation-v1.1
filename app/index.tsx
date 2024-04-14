import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "./context/AuthProvider";
import { ActivityIndicator } from "react-native-paper";
import * as Notifications from "expo-notifications";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native-elements";
import { supabase } from "@/lib/supabase";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (session) {
    return <Redirect href="/(user)/home" />;
  }

  return (
    <LinearGradient
      colors={["#D61D23", "#EB7C83"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[styles.container]}
    >
      <Image
        source={require("../assets/images/DonoInitial.png")}
        style={styles.image}
      />
      <Text style={styles.heading}>DONO</Text>
      <View style={styles.formContainer}>
        <Link href={"/log-in"} asChild>
          <Button
            text="Log In"
            style={{
              marginBottom: 16,
              backgroundColor: "#fff",
            }}
            textColor="#D61D23"
          />
        </Link>
        <Link href={"/sign-up/"} asChild>
          <Button
            text="Sign Up"
            style={{
              marginBottom: 16,
              backgroundColor: "#fff",
            }}
            textColor="#D61D23"
          />
        </Link>
      </View>

      <Text style={styles.footer}>Dono @ {new Date().getFullYear()}</Text>
    </LinearGradient>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 128,
  },
  formContainer: {
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "auto",
    marginLeft: 96,
    marginEnd: 96,
    aspectRatio: 1,
  },
  heading: {
    color: "#fff",
    fontSize: 52,
    textAlign: "center",
    fontWeight: "300",
    paddingTop: 16,
    marginBottom: 64,
    letterSpacing: -1,
  },
  button: {
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  footer: {
    marginTop: "auto",
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
});
