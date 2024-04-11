import { View, Text } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";

export default function Logout() {
  return (
    <View style={styles.container}>
      {/* ?!!! figure out logout */}
      <Text style={styles.heading}>Are you sure you want to log out?</Text>
      <Pressable
        style={styles.button}
        onPressIn={() => {
          supabase.auth.signOut();
        }}
        // text="Sign Out"
      >
        <Text style={[{ color: "#fff" }]}>Sign Out</Text>
      </Pressable>

      {/* <Text>logout</Text> */}

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 24,
  },
  heading: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 48,
    paddingEnd: 48,
    borderRadius: 120,
    backgroundColor: "#D61D23",
  },
});
