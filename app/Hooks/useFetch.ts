import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "@/lib/supabase";

interface UserProfile {
  // Define the structure of your user profile data here
  id: string;
  last_time_donated: string;
  next_time_donated: string;
  activeNotification: boolean;
  // Add other fields as necessary
}

interface UseFetchResult {
  data: UserProfile[] | null;
  error: string | null;
  isLoading: boolean;
}

export const useFetch = (): UseFetchResult => {
  const { session } = useAuth();

  const [data, setData] = useState<UserProfile[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) return;

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id);

        if (error) {
          throw error;
        }

        setData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  return { data, error, isLoading };
};
