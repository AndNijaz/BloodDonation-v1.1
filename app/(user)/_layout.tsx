import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

// import Colors from '@/constants/Colors';
import Colors from "../../constants/Colors";
import { useColorScheme } from "../../components/useColorScheme";
import { useClientOnlyValue } from "../../components/useClientOnlyValue";
import { useAuth } from "../context/AuthProvider";
import { Redirect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from "@/components/Themed";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
  focused: boolean;
  text: string;
}) {
  let tabBarContainer = {
    // color: "blue",
    backgroundColor: "transparent",
    padding: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    borderRadius: 12,
    gap: 6,
  };
  if (props.focused) {
    tabBarContainer.backgroundColor = "white";

    tabBarContainer.paddingTop = 8;
    tabBarContainer.paddingBottom = 8;
    tabBarContainer.paddingLeft = 16;
    tabBarContainer.paddingEnd = 16;
  }

  const derivedColor = props.focused ? "#D61D23" : "#fff";
  return (
    <View style={tabBarContainer}>
      <MaterialCommunityIcons
        size={28}
        style={[{ marginBottom: -3, color: derivedColor }]}
        {...props}
      />
      <Text style={[{ color: derivedColor }]}>{props.text}</Text>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />

      <Tabs.Screen
        name="faq"
        options={{
          headerStyle: {
            backgroundColor: "#D61D23",
          },
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: "white",
          },

          // tabBarActiveBackgroundColor: "",

          // tabBarActiveTintColor: "#fff",
          // tabBarInactiveTintColor: "#fff",
          tabBarShowLabel: false,

          tabBarStyle: {
            backgroundColor: "#D61D23",
            height: 110,
            paddingTop: 12,
          },

          title: "Faq",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="progress-question"
              color={color}
              focused={focused}
              text="Faq"
            />
          ),
          // tabBarActiveBackgroundColor: "",

          headerRight: () => (
            <Link href="/logout" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="sign-out"
                    size={25}
                    color="white"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          headerStyle: {
            backgroundColor: "#D61D23",
          },
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: "white",
          },
          title: "Home",

          tabBarShowLabel: false,

          tabBarStyle: {
            backgroundColor: "#D61D23",
            height: 110,
            paddingTop: 12,
          },

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="home-outline"
              color={color}
              focused={focused}
              text="Home"
            />
          ),
          headerRight: () => (
            <Link href="/logout" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="sign-out"
                    size={25}
                    color="white"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="donation-history"
        options={{
          headerStyle: {
            backgroundColor: "#D61D23",
          },
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: "white",
          },

          tabBarShowLabel: false,

          tabBarStyle: {
            backgroundColor: "#D61D23",
            height: 110,
            paddingTop: 12,
          },

          title: "Donation History",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="history"
              color={color}
              focused={focused}
              text="History"
            />
          ),
          headerRight: () => (
            <Link href="/logout" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="sign-out"
                    size={25}
                    color="white"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
