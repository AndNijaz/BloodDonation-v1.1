import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import RedHeader from "@/components/RedHeader";
// import RedHeader from "@/components/RedHeader";
import { Link } from "expo-router";
import InputRow from "@/components/InputRow";
import { useRouter } from "expo-router";

export default function inputNameSurname() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const router = useRouter();

  const handleContinue = () => {
    console.log("Name:", name);
    console.log("Surname:", surname);

    router.push("/(auth)/sign-up/choose-bloodtype");
  };

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Personal Details",
        }}
      />
      <RedHeader hasBack={true}>Step 2/5:</RedHeader>

      <View style={styles.container}>
        <Text style={styles.title}>Create your account</Text>

        <InputRow
          value={name}
          setValue={setName}
          placeholder="Name"
          icon="account-outline"
        ></InputRow>

        <InputRow
          value={surname}
          setValue={setSurname}
          placeholder="Last Name"
          icon="account-circle-outline"
        ></InputRow>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        Continue
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingStart: 48,
    paddingRight: 48,
    alignItems: "center",
    height: "100%",
  },
  iconContainer: {
    borderWidth: 1.5,
    borderColor: "#D93F33",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 32,
    color: "#161616",
  },
  inputBlock: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#ECECEC",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF5733",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
