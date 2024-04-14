import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const Accordion = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.titleContainer} onPress={toggleAccordion}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.icon}>{expanded ? "-" : "+"}</Text>
      </Pressable>
      {expanded && <Text style={styles.content}>{content}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderBottomWidth: 2,
    borderWidth: 2,
    borderColor: "#D61D23",
    marginBottom: 10,
    borderRadius: 16,
  },
  titleContainer: {
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    // backgroundColor: "#EB7C83",
    backgroundColor: "#fff",
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
    // backgroundColor: "#EB7C83",
    padding: 18,
  },
});

export default Accordion;
