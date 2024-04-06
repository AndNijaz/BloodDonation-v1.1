import { useLocalSearchParams } from "expo-router";
import { View, Text } from "../../../components/Themed";
import { Stack } from "expo-router";

export default function DonationHistoryRecord() {
  const { id } = useLocalSearchParams();

  if (!id) {
    return <Text>Donation not found</Text>;
  }

  return (
    <View>
      <Stack.Screen options={{ title: `Donation ${id}` }} />

      <Text>Blood donation for id: {id}</Text>
    </View>
  );
}
