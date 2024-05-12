import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "@/lib/supabase";

export const useFetch = () => {
  const { session } = useAuth();

  const [data, setData] = useState<any>();

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

        setData(data);
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

  return { data };
};
