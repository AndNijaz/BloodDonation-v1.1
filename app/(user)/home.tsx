import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import BigContainer from "../../components/BigContainer";
import SmallContainer from "../../components/SmallContainer";

import { useEffect } from "react";
// import { supabase } from "@/src/lib/supabase";

import { useState } from "react";

export default function TabOneScreen() {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      // console.log("zed");
      // try {
      //   const { data, error } = await supabase
      //     .from("users")
      //     .select("*")
      //     .eq("id", 1);
      //   if (error) {
      //     throw error;
      //   }
      //   console.log("User data:", data[0]["email"]);
      //   setUser(data[0].email);
      // } catch (error) {
      //   console.log("Error fetching user data:");
      // } finally {
      //   console.log("muhamed");
      // }
    };
    //   // console.log("lala");
    fetchUserData();
    //   // console.log("bibi");
  }, []);

  return (
    <View style={styles.container}>
      <BigContainer>
        <Text>Next time you can donate</Text>
        <Text style={styles.bigText}>05.05.2024</Text>
      </BigContainer>
      <SmallContainer>
        <Text>Last time you donated</Text>
        <Text style={styles.smallText}>05.02.2024</Text>
      </SmallContainer>
      <Text>{user}</Text>
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
  bigText: {
    fontSize: 44,
  },
  mediumText: {
    fontSize: 30,
  },
  smallText: {
    fontSize: 24,
  },
  marginBottomSm: {
    marginBottom: 16,
  },
});
