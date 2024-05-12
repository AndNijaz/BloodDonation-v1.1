import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "@/lib/supabase";

export const useFetch = (setName: any) => {
  const { session } = useAuth();

  const [dataa, setDataa] = useState<any>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session?.user.id);

        if (error) {
          throw error;
        }

        setDataa(data);
        setName(data[0].first_name);
        // return dataa;
      } catch (error) {
        // console.log("Error fetching user data:");
        // console.error(error);
      } finally {
        // console.log("muhamed");
      }
    };
    //   // console.log("lala");
    fetchUserData();

    //   // console.log("bibi");
  }, [session]);

  // console.log("daty");
  // console.log(dataa);
  // console.log("daty");
  return { dataa };
};
