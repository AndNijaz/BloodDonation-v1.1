import { Stack } from "expo-router";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

export default function DonationHistoryLayout() {
  // console.error(Colors[colorScheme ?? "light"].text);

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="../../logout" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="sign-out"
                  size={25}
                  color="light"
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Donation History" }} />
    </Stack>
  );
}
