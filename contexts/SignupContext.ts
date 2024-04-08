import { createContext } from "react";

const SignupContext = createContext({
  email: "",
  password: "",
  surname: "",
  name: "",
  bloodType: "",
  lastTimeDonated: new Date(),
  nextTimeDonated: new Date(),
});

export default SignupContext;
