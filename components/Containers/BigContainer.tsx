import { PropsWithChildren } from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function BigContainer({
  children,
  text,
}: {
  children: any;
  text: String;
}) {
  return (
    <LinearGradient
      colors={["#D61D23", "#EB7C83"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[styles.bigContainer, styles.marginBottomSm]}
    >
      <View style={styles.row}>
        <MaterialCommunityIcons
          name="arrow-right-drop-circle-outline"
          size={18}
          color="white"
        />
        <Text style={styles.whiteText}>Last time you donated</Text>
      </View>

      <Text style={[styles.bigText, styles.whiteText]}>{children}</Text>
      {/* {children} */}
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
  whiteText: {
    color: "white",
  },
  bigText: {
    marginTop: 24,
    fontSize: 44,
    color: "white",
  },
  row: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
