import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthProvider";
import { Alert } from "react-native";

const index = () => {
  const { session } = useAuth();

  Alert.alert(session?.user + "");
  if (session) {
    return <Redirect href="/" />;
  }

  return <Redirect href={"./sign-up"} />;
};

export default index;
