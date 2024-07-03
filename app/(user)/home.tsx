import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Redirect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { supabase } from "@/lib/supabase";
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
  const [notificationData, setNotificationData] = useState<any>(null);

  const { session } = useAuth();

  //
  const fetchNotificationByUserId = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user", userId)
        .order("notification_start", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      console.log("mufljuz");
      setNotificationData(data);
    } catch (err) {
      // console.error("Error fetching notification:", err);
      console.log("mudaaaa");
      setNotificationData(false);
    }
  };

  useEffect(() => {
    if (data && data[0]) {
      const donationData = data[0];

      setLastDonation(parseDateToFrontend(donationData.last_time_donated));

      const nextDonationDate = new Date(donationData.next_time_donated);
      const currentDate = new Date();

      setNextTimeDonated(
        nextDonationDate <= currentDate
          ? "Today"
          : parseDateToFrontend(donationData.next_time_donated)
      );

      if (donationData.id) {
        fetchNotificationByUserId(donationData.id);
      }
    }
  }, [data]);

  if (!session) return <Redirect href="/" />;

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data</Text>;

  return (
    <View style={styles.container}>
      {/* {!notificationData?.notification_end && <Notificaiton />} */}
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
