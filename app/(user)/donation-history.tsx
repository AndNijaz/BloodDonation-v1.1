import { FlatList, Pressable, StyleSheet } from "react-native";

import { supabase } from "@/lib/supabase";
import { Link, useSegments } from "expo-router";
import { Text, View } from "../../components/Themed";
import BigContainer from "@/components/BigContainer";
import SmallContainer from "@/components/SmallContainer";
import { useAuth } from "../context/AuthProvider";
import { Redirect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useFetch } from "../Hooks/useFetch";

import { parseDateToFrontend } from "@/Utils/dates";

export default function TabTwoScreen() {
  // const { data } = useFetch();

  const { session } = useAuth();
  const [donationHistory, setDonationHistory] = useState<any>([{}]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: donationDates, error } = await supabase
          .from("blood_donation")
          .select("*")
          .eq("donator", session?.user.id);

        console.log(session?.user.id);

        console.log("gazenje po mrvama " + donationDates);
        console.log(donationDates);
        if (donationDates?.length === 0) return;
        console.log("gazenje po kurcu " + donationDates);

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
      <BigContainer>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="arrow-right-drop-circle-outline"
            size={18}
            color="white"
          />
          <Text style={styles.whiteText}>Last time you donated</Text>
        </View>
        <Text style={[styles.bigText, styles.whiteText]}>
          {parseDateToFrontend(donationHistory[0].donation_date || "")}
        </Text>
      </BigContainer>

      <FlatList
        data={donationHistory.slice(1)}
        renderItem={({ item }) => (
          <SmallContainer>
            <View style={styles.row}>
              <MaterialCommunityIcons name="history" size={18} color="black" />
              <Text>Donated at</Text>
            </View>
            <Text style={styles.smallText}>
              {/* {parseDateToFrontend(item.donation_date) || ""} */}
            </Text>
          </SmallContainer>
        )}
        keyExtractor={(item, index) => index.toString()} // Add a key extractor
        numColumns={1}
        contentContainerStyle={{ gap: 10 }}
      />
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
  mediumText: {
    fontSize: 30,
  },
  smallText: {
    marginTop: 8,
    fontSize: 24,
  },
  whiteText: {
    color: "white",
  },
});
