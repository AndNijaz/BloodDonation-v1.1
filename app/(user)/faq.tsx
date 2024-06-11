import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Redirect } from "expo-router";

import { useAuth } from "../context/AuthProvider";

import Accordion from "@/components/Accordion";
import { FAQ } from "../../constants/Constats";

const Faq: React.FC = () => {
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
      keyExtractor={(item) => item.title}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
});

export default Faq;
