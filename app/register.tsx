import { Text, StyleSheet, Image } from "react-native";
import { View } from "../components/Themed";

export default function Register() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://fastly.picsum.photos/id/54/200/200.jpg?hmac=-2_HX5umbAEVPP9CokmPW3Kc8V9iDplneKlS73LWdQQ",
        }}
        style={styles.image}
      />
      <Text style={styles.headingPrimary}>Heading</Text>
      <Text style={styles.subheadingText}>Lorem ipsum dolor sit amet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  image: {
    width: "70%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  headingPrimary: {
    fontSize: 44,
    alignSelf: "center",
  },
  subheadingText: {
    fontSize: 20,
    alignSelf: "center",
  },
});
