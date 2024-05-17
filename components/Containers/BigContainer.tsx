import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function BigContainer({ children }: PropsWithChildren) {
  return (
    <LinearGradient
      colors={["#D61D23", "#EB7C83"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[styles.bigContainer, styles.marginBottomSm]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    paddingTop: 32,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 32,
    borderRadius: 12,
  },
  marginBottomSm: {
    marginBottom: 16,
  },
});
