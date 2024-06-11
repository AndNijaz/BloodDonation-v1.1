import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link, Redirect } from "expo-router";

import { supabase } from "@/lib/supabase";

import { useAuth } from "./context/AuthProvider";

import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator } from "react-native-paper";
import { Image } from "react-native-elements";

interface UserData {
  first_name: string;
  last_name: string;
  blood_type: string;
  last_time_donated: string;
  gender: string;
}

const index = () => {
  const { session, loading } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (session) {
      setLoadingUserData(true);

      // supabase.auth.signOut();

      const fetchUserData = async () => {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session?.user.id);

          if (error) {
            setError(error.message);
          }

          setUserData(data);
        } catch (err) {
          setError(err);
        } finally {
          setLoadingUserData(false);
        }
      };
      fetchUserData();
    }
  }, [session, supabase, loading]);

  if (loading) return <ActivityIndicator />;

  if (session) {
    if (loadingUserData || userData.length === 0) return <ActivityIndicator />;

    if (!userData[0].first_name || !userData[0].last_name)
      return <Redirect href="./sign-up/name-surname" />;

    if (!userData[0].last_name)
      return <Redirect href="./sign-up/name-surname" />;

    if (!userData[0].blood_type)
      return <Redirect href="./sign-up/choose-bloodtype" />;

    if (!userData[0].last_time_donated)
      return <Redirect href="./sign-up/donated-before" />;

    if (!userData[0].gender) return <Redirect href="./sign-up/select-gender" />;

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
  footer: {
    marginTop: "auto",
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
});
