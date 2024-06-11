import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";

import { supabase } from "@/lib/supabase";

import { useAuth } from "../context/AuthProvider";

import BigContainer from "@/components/Containers/BigContainer";
import SmallContainer from "@/components/Containers/SmallContainer";

import { parseDateToFrontend } from "@/Utils/dates";

interface Donation {
  donation_date: string;
}

export default function TabTwoScreen() {
  const { session } = useAuth();
  const [donationHistory, setDonationHistory] = useState<Donation[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) return;

      try {
        const { data: donationDates, error } = await supabase
          .from("blood_donation")
          .select("*")
          .eq("donator", session.user.id);

        if (error) {
          console.error("Error fetching donation history:", error);
          return;
        }

        if (donationDates?.length) {
          setDonationHistory(donationDates);
        }
      } catch (error) {
        console.error("Unexpected error fetching donation history:", error);
      }
    };
    fetchUserData();
  }, [session]);

  if (!donationHistory.length) {
    return (
      <View style={styles.container}>
        <BigContainer text="Last time you donated">
          <Text>No donation history available</Text>
        </BigContainer>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BigContainer text="Last time you donated">
        {parseDateToFrontend(donationHistory[0].donation_date)}
      </BigContainer>

      <FlatList
        data={donationHistory.slice(1)}
        renderItem={({ item }) => (
          <SmallContainer icon="history" label="Donated at">
            {parseDateToFrontend(item.donation_date)}
          </SmallContainer>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        contentContainerStyle={{ gap: 10 }}
      />
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
