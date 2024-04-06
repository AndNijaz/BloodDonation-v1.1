import { View, Text } from "@/components/Themed";
import { StyleSheet } from "react-native";

export default function Faq() {
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
