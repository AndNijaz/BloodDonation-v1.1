import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthProvider";

import { supabase } from "@/lib/supabase";

export default function index() {
  const { session } = useAuth();

  // supabase.auth.signOut();

  if (session) return <Redirect href="/" />;

  return <Redirect href={"./sign-up"} />;
}
