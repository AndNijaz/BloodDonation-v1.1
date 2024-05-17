import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Notificaiton() {
  return (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationHeader}>
        <MaterialCommunityIcons name="bell-outline" size={24} color="#D61D23" />
        <Text style={styles.text}>Attention</Text>
      </View>
      <Text style={[styles.text, styles.heading]}>Time to donate!</Text>
      {/* <View style={styles.buttons}>
        <Button
          text={"Accept"}
          style={[
            { marginLeft: 8, marginRight: 8, paddingLeft: 32, paddingEnd: 32 },
          ]}
        />
        <Button
          text={"Reject"}
          style={[
            { marginLeft: 8, marginRight: 8, paddingLeft: 32, paddingEnd: 32 },
          ]}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#D61D23",
    borderRadius: 12,
    marginBottom: 16,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#D61D23",
  },
  text: { color: "#D61D23" },
  heading: {
    fontSize: 42,
    textAlign: "center",
    letterSpacing: 3,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
