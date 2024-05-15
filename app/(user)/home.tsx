import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import BigContainer from "../../components/BigContainer";
import SmallContainer from "../../components/SmallContainer";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Redirect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Notificaiton from "@/components/notificaiton";
import React from "react";

import { parseDateToFrontend } from "../../Utils/dates";
import { useFetch } from "../Hooks/useFetch";

export default function TabOneScreen() {
  const { data } = useFetch();

  const [user, setUser] = useState();
  const [lastDonation, setLastDonation] = useState("");
  const [nextTimeDonated, setNextTimeDonated] = useState("");
  const [activeNotification, setActiveNotification] = useState(false);

  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/" />;
  }

  useEffect(() => {
    if (!data) return;
    if (!data[0]) return;

    console.log(data[0]);
    if (data[0].activeNotification) setActiveNotification(true);

    // console.log(parseDateToFrontend(data[0].last_time_donated));
    setLastDonation(parseDateToFrontend(data[0].last_time_donated));

    // console.log("dino merlin " + data[0].next_time_donated);
    const nextDonationDate = data[0].next_time_donated;
    const nextDonationDateDateFormat = new Date(data[0].next_time_donated);
    // console.log(parseDateToFrontend(nextDonationDate));
    const currentDate = new Date();

    setNextTimeDonated(
      nextDonationDateDateFormat.getFullYear() <= currentDate.getFullYear() &&
        nextDonationDateDateFormat.getMonth() <= currentDate.getMonth() &&
        nextDonationDateDateFormat.getDate() <= currentDate.getDate()
        ? "Today"
        : parseDateToFrontend(nextDonationDate)
    );
  }, [data]);

  return (
    <View style={styles.container}>
      {activeNotification && <Notificaiton />}
      <BigContainer>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="arrow-right-drop-circle-outline"
            size={18}
            color="white"
          />
          <Text style={styles.whiteText}>Next time you can donate</Text>
        </View>
        <Text style={[styles.bigText, styles.whiteText]}>
          {nextTimeDonated}
        </Text>
      </BigContainer>
      {!lastDonation.includes("1900") && (
        <SmallContainer>
          <View style={styles.row}>
            <MaterialCommunityIcons name="history" size={18} color="black" />
            <Text>Last time you donated</Text>
          </View>
          <Text style={styles.smallText}>{lastDonation}</Text>
        </SmallContainer>
      )}

      <Text>{user}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  whiteText: {
    color: "white",
  },
  container: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  bigText: {
    marginTop: 24,
    fontSize: 44,
    color: "white",
  },
  smallText: {
    marginTop: 8,
    fontSize: 24,
  },
});
