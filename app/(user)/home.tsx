import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Redirect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAuth } from "../context/AuthProvider";

import Notificaiton from "@/components/notificaiton";

import { useFetch } from "../Hooks/useFetch";

import BigContainer from "../../components/Containers/BigContainer";
import SmallContainer from "../../components/Containers/SmallContainer";

import { parseDateToFrontend } from "../../Utils/dates";

import Push from "../../components/Push";

export default function TabOneScreen() {
  const { data } = useFetch();

  const [user, setUser] = useState();
  const [lastDonation, setLastDonation] = useState("");
  const [nextTimeDonated, setNextTimeDonated] = useState("");
  const [activeNotification, setActiveNotification] = useState(false);

  const { session } = useAuth();

  if (!session) return <Redirect href="/" />;

  useEffect(() => {
    if (!data) return;
    if (!data[0]) return;

    if (data[0].activeNotification) setActiveNotification(true);

    setLastDonation(parseDateToFrontend(data[0].last_time_donated));

    const nextDonationDate = data[0].next_time_donated;
    const nextDonationDateDateFormat = new Date(data[0].next_time_donated);
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

      <BigContainer text="Next time you can donate">
        {nextTimeDonated}
      </BigContainer>

      {!lastDonation.includes("1900") && (
        <SmallContainer label="Last time you donated" icon="history">
          {lastDonation}
        </SmallContainer>
      )}

      <Push session={session} />
    </View>
  );
}

const styles = StyleSheet.create({
  whiteText: {
    color: "#fff",
  },
  container: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
});
