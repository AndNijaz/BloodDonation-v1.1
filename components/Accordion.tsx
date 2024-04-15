import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const Accordion = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <View
      style={[
        styles.container,
        expanded && { borderBottomWidth: 0, borderRadius: 24 },
      ]}
    >
      <Pressable style={styles.titleContainer} onPress={toggleAccordion}>
        <Text style={styles.title}>{title}</Text>
        {!expanded && (
          <MaterialCommunityIcons name="chevron-right" size={24} color="#555" />
        )}
        {expanded && (
          <MaterialCommunityIcons name="chevron-up" size={24} color="#D61D23" />
        )}
        {/* <Text style={styles.icon}>{expanded ? "-" : "+"}</Text> */}
      </Pressable>
      {expanded && <Text style={styles.content}>{content}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderBottomWidth: 2,
    borderBottomWidth: 2,
    borderBottomColor: "#D61D23",
    marginBottom: 8,
    // borderRadius: 16,
    // backgroundColor: "#ccc",
    // borderRadius: 24,
    // overflow: "hidden",
    backgroundColor: "#EB7C83",
  },
  titleContainer: {
    backgroundColor: "#F0F0F0",
    // borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 18,
    paddingTop: 18,
    // backgroundColor: "#EB7C83",
  },
  title: {
    color: "#D61D23",
    fontWeight: "600",
    fontSize: 18,
  },
  icon: {
    fontSize: 18,
  },
  content: {
    padding: 18,
    textAlign: "justify",
  },
});

export default Accordion;
