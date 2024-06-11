import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <View style={[styles.container, expanded && styles.accordionExpanded]}>
      <Pressable style={styles.titleContainer} onPress={toggleAccordion}>
        <Text style={styles.title}>{title}</Text>
        <MaterialCommunityIcons
          name={expanded ? "chevron-up" : "chevron-right"}
          size={24}
          color={expanded ? "#D61D23" : "#555"}
        />
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
  content: {
    padding: 18,
    textAlign: "justify",
    color: "#fff",
    lineHeight: 20,
    fontWeight: "500",
  },
  accordionExpanded: {
    borderBottomWidth: 0,
    borderRadius: 24,
  },
});

export default Accordion;
