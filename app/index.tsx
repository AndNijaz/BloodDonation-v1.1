import { View, Text } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "./context/AuthProvider";
import { ActivityIndicator } from "react-native-paper";
import { supabase } from "@/lib/supabase";

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href="/sign-up/" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/log-in"} asChild>
        <Button text="Log In" />
      </Link>
      <Link href={"/sign-up/"} asChild>
        <Button text="Sign Up" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Sign Out" />
    </View>
  );
};

export default index;
