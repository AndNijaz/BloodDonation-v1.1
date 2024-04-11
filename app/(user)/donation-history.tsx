import { FlatList, Pressable, StyleSheet } from "react-native";

import { Link, useSegments } from "expo-router";
import { Text, View } from "../../components/Themed";
import BigContainer from "@/components/BigContainer";
import SmallContainer from "@/components/SmallContainer";
import { useAuth } from "../context/AuthProvider";
import { Redirect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const donationHistory = [
  { id: 0, date: "05.05.2024" },
  { id: 1, date: "05.02.2024" },
  { id: 2, date: "05.10.2023" },
  { id: 3, date: "05.08.2023" },
  { id: 4, date: "05.06.2023" },
];

export default function TabTwoScreen() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/" />;
  }
  const segments = useSegments();
  console.log(segments);

  return (
    // <Link href={`/[$id]`} asChild>
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
          {donationHistory[0].date}
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
            <Text style={styles.smallText}>{item.date}</Text>
          </SmallContainer>
        )}
        numColumns={1}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
    // </Link>
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
