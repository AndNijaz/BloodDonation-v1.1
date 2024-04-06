import { Redirect } from "expo-router";

import { Link } from "expo-router";
import { Text, View } from "../../components/Themed";
import BigContainer from "../../components/BigContainer";
import SmallContainer from "../../components/SmallContainer";
// import { supabase } from "@/src/lib/supabase";
import { useEffect } from "react";

export default function TabIndex() {
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from("users")
  //         .select("*")
  //         .eq("id", 1);
  //       if (error) {
  //         throw error;
  //       }
  //       console.log("User data:", data);
  //     } catch (error) {
  //       console.error("Error fetching user data:");
  //     }
  //   };
  //   console.log("lala");
  //   fetchUserData();
  //   console.log("bibi");
  // }, []);

  return <Redirect href={"/(user)/home"} />;
}
