import { FlatList, Pressable, StyleSheet } from "react-native";

import { Link, useSegments } from "expo-router";
import { Text, View } from "../../../components/Themed";
import BigContainer from "@/components/BigContainer";
import SmallContainer from "@/components/SmallContainer";

const donationHistory = [
  { id: 0, date: "05.05.2024" },
  { id: 1, date: "05.02.2024" },
  { id: 2, date: "05.10.2023" },
  { id: 3, date: "05.08.2023" },
  { id: 4, date: "05.06.2023" },
];

export default function TabTwoScreen() {
  const segments = useSegments();
  console.log(segments);

  return (
    // <Link href={`/[$id]`} asChild>
    <View style={styles.container}>
      <Link href={`./${segments[0]}/donationHistory/0`} asChild>
        <Pressable>
          <BigContainer>
            <Text>Last time you donated</Text>
            <Text style={styles.bigText}>{donationHistory[0].date}</Text>
          </BigContainer>
        </Pressable>
      </Link>
      <FlatList
        data={donationHistory.slice(1)}
        renderItem={({ item }) => (
          <Link href={`./${segments[0]}/donationHistory/${item.id}`} asChild>
            <Pressable>
              <SmallContainer>
                <Text>Donated at</Text>
                <Text style={styles.smallText}>{item.date}</Text>
              </SmallContainer>
            </Pressable>
          </Link>
        )}
        numColumns={1}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
    // </Link>
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
});
