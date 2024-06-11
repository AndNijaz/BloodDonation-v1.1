import { View, Text } from "react-native";
import { Pressable, StyleSheet } from "react-native";

import { supabase } from "@/lib/supabase";

import { useAuth } from "./context/AuthProvider";

import { useRouter } from "expo-router";

export default function Logout() {
  const router = useRouter();

  const { session, loading } = useAuth();

  async function removeToken() {
    if (session) {
      // Update profile
      const { data, error } = await supabase
        .from("profiles")
        .update({
          expo_push_token: "",
        })
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.log("Error updating profile:", error.message);
      } else {
        console.log("Profile updated successfully:", data);
        // Alert.alert("Profile updated successfully:", data);
      }
    }
  }

  function handlePress() {
    removeToken();
    supabase.auth.signOut();
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Are you sure you want to log out?</Text>
      <Pressable style={styles.button} onPressIn={handlePress}>
        <Text style={[{ color: "#fff" }]}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
