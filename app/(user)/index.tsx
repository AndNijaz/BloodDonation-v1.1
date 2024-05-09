import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthProvider";

export default function TabIndex() {
  const { session } = useAuth();

  if (!session) return <Redirect href="/" />;

  return <Redirect href={"/(auth)/"} />;
}
