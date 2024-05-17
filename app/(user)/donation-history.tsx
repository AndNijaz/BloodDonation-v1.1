import { FlatList, StyleSheet, View } from "react-native";

import { supabase } from "@/lib/supabase";
import BigContainer from "@/components/Containers/BigContainer";
import SmallContainer from "@/components/Containers/SmallContainer";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";

import { parseDateToFrontend } from "@/Utils/dates";

export default function TabTwoScreen() {
  const { session } = useAuth();
  const [donationHistory, setDonationHistory] = useState<any>([{}]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: donationDates, error } = await supabase
          .from("blood_donation")
          .select("*")
          .eq("donator", session?.user.id);

        if (donationDates?.length === 0) return;

        setDonationHistory(donationDates);

        if (error) {
          throw error;
        }
      } catch (error) {
      } finally {
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <BigContainer text="Last time you donated">
        {parseDateToFrontend(donationHistory[0].donation_date || "")}
      </BigContainer>

      <FlatList
        data={donationHistory.slice(1)}
        renderItem={({ item }) => (
          <SmallContainer icon="history" label="Donated at">
            {parseDateToFrontend(item.donation_date) || ""}
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
