import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { StyleSheet } from "react-native";

export default function SmallContainer({
  icon,
  label,
  children,
}: {
  icon: any;
  label?: String;
  children: any;
}) {
  return (
    <View style={styles.smallContainer}>
      <View style={styles.row}>
        <MaterialCommunityIcons name={icon} size={18} color="black" />
        <Text>{label}</Text>
      </View>
      <Text style={styles.smallText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  smallContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#D2D2D2",
    borderRadius: 12,
  },
  row: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  smallText: {
    marginTop: 8,
    fontSize: 24,
  },
});
