import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import SignUpHeader from "@/components/SignUpHeader";
import { Link } from "expo-router";

export default function inputNameSurname() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleContinue = () => {
    console.log("Name:", name);
    console.log("Surname:", surname);
  };

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Personal Details",
        }}
      />
      <SignUpHeader hasBack={true} path={"/sign-up/index"}>
        Step 2/5:
      </SignUpHeader>

      <View style={styles.container}>
        <Text style={styles.title}>Create your account</Text>

        <View style={styles.inputBlock}>
          <View style={styles.iconContainer}></View>
          <TextInput
            style={[styles.input]}
            placeholder="First Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.inputBlock}>
          <View style={styles.iconContainer}></View>
          <TextInput
            style={[styles.input]}
            placeholder="Last Name"
            value={surname}
            onChangeText={(text) => setSurname(text)}
          />
        </View>
      </View>
      <Link href={"./choose-bloodtype"}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          Continue
        </TouchableOpacity>
      </Link>
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
