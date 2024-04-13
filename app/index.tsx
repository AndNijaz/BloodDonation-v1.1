import { View, Text, Alert } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "./context/AuthProvider";
import { ActivityIndicator } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import * as Notifications from "expo-notifications";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NewButton from "@/components/NewButton";
import { useFonts } from "expo-font";

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
  const [fontsLoaded, fontError] = useFonts({
    moj: require("../assets/fonts/VarelaRound-Regular.ttf"),
  });

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
      // style={styles.headerContainer}
      style={[styles.container]}
    >
      <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
        {/* <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link> */}
        <Link href={"/log-in"} asChild>
          <Button text="Log In" />
        </Link>
        <Link href={"/sign-up/"} asChild>
          <Button text="Sign Up" />
        </Link>
      </View>
    </LinearGradient>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
