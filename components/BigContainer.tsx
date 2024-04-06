import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { View } from "./Themed";

export default function BigContainer({ children }: PropsWithChildren) {
  return (
    <View style={[styles.bigContainer, styles.marginBottomSm]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#D9D9D9",
    marginBottom: 32,
  },
  marginBottomSm: {
    marginBottom: 16,
  },
});
