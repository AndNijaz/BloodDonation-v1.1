import { StyleSheet } from "react-native";

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

function parseDate(date: any) {
  return date.split("-").reverse().join("/");
}

export default function TabOneScreen() {
  const [user, setUser] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [lastDonation, setLastDonation] = useState();
  const [nextTimeDonated, setNextTimeDonated] = useState();
  const [bloodtype, setBloodtype] = useState();
  const [gender, setGender] = useState();

  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/" />;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session?.user.id);

        if (error) {
          throw error;
        }

        setFirstName(data[0].first_name);
        setLastName(data[0].last_name);
        setBloodtype(data[0].blood_type);
        setGender(data[0].gender);
        setLastDonation(parseDate(data[0].last_time_donated));
        //setNextTimeDonated(parseDate(data[0].next_time_donated));
        const nextDonationDate = parseDate(data[0].next_time_donated);
        setNextTimeDonated(
          nextDonationDate < new Date() ? "Today" : nextDonationDate
        );
        // Alert.alert(data + "");
        setUser(data[0].email);
      } catch (error) {
        // console.log("Error fetching user data:");
        // console.error(error);
      } finally {
        // console.log("muhamed");
      }
    };
    //   // console.log("lala");
    fetchUserData();
    //   // console.log("bibi");
  }, []);

  return (
    <View style={styles.container}>
      {/* <RedHeader hasBack={true} /> */}
      <Notificaiton />
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
      {lastDonation && (
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
  mediumText: {
    fontSize: 30,
  },
  smallText: {
    marginTop: 8,
    fontSize: 24,
  },
  marginBottomSm: {
    marginBottom: 16,
  },
});
