import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { View } from "./Themed";

export default function SmallContainer({ children }: PropsWithChildren) {
  return <View style={styles.smallContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  smallContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#D9D9D9",
  },
});
