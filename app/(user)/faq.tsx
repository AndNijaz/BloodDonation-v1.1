import { FlatList, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthProvider";
import { Redirect } from "expo-router";
import Accordion from "@/components/Accordion";
import { FAQ } from "../../constants/Constats";

export default function Faq() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/" />;
  }
  return (
    <FlatList
      style={styles.container}
      data={FAQ}
      renderItem={({ item }) => (
        <Accordion title={item.title} content={item.description} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
});
