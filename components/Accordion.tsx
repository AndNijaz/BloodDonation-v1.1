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
      </Pressable>
      {expanded && <Text style={styles.content}>{content}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: "#D61D23",
    marginBottom: 8,
    backgroundColor: "#EB7C83",
  },
  titleContainer: {
    justifyContent: "space-between",
    backgroundColor: "#F0F0F0",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 18,
    paddingTop: 18,
    paddingLeft: 18,
    paddingEnd: 18,
  },
  title: {
    color: "#D61D23",
    fontWeight: "600",
    fontSize: 18,
    width: "90%",
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
