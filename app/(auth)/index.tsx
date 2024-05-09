import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthProvider";

export default function index() {
  const { session } = useAuth();

  if (session) return <Redirect href="/" />;

  return <Redirect href={"./sign-up"} />;
}
