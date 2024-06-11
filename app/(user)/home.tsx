import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
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
  const { data, isLoading, error } = useFetch();
  const [lastDonation, setLastDonation] = useState<string>("");
  const [nextTimeDonated, setNextTimeDonated] = useState<string>("");
  const [activeNotification, setActiveNotification] = useState<boolean>(false);

  const { session } = useAuth();

  useEffect(() => {
    if (data && data[0]) {
      const donationData = data[0];
      setActiveNotification(!!donationData.activeNotification);
      setLastDonation(parseDateToFrontend(donationData.last_time_donated));

      const nextDonationDate = new Date(donationData.next_time_donated);
      const currentDate = new Date();

      setNextTimeDonated(
        nextDonationDate <= currentDate
          ? "Today"
          : parseDateToFrontend(donationData.next_time_donated)
      );
    }
  }, [data]);

  if (!session) return <Redirect href="/" />;

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data</Text>;

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
  container: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
});
