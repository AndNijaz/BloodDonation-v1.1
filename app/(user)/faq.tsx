import { View, Text } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { useAuth } from "../context/AuthProvider";
import { Redirect } from "expo-router";

export default function Faq() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/" />;
  }
  return (
    <View style={styles.container}>
      <Text>faq</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
