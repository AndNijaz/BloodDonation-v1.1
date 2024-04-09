import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

// const SignUpContext = createContext({});

// export const Provider = () => {
//   const [signUpData, setSignUpData] = useState({
//     email: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//     bloodType: "",
//     date: "",
//     donatedBefore: "",
//   });

//   const updateEmailPassword = (data: { email: string; password: string }) => {
//     setSignUpData((prevData) => ({
//       ...prevData,
//       email: data.email,
//       password: data.password,
//     }));
//   };

//   return (
//     <SignUpContext.Provider
//       value={{ signUpData, updateEmailPassword }}
//     ></SignUpContext.Provider>
//   );
// };

// export const useSignUpContext = () => useContext(SignUpContext);

type SignUpType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bloodType: string;
  lastTimeDonated: string;
  nextTimeDonated: string;
  gender: string;
};

const SignUpContext = createContext({}); //preko useContexta dobijamo datu iz contexta zato ga i exportamo

const SignUpProvider = ({ children }: PropsWithChildren) => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    bloodType: "",
    lastTimeDonated: "",
    nextTimeDonated: "",
    gender: "",
  });

  const updateEmailPassword = (email: string, password: string) => {
    setSignUpData((prevData) => ({
      ...prevData,
      email: email,
      password: password,
    }));
  };

  const updateFirstLastName = (firstName: string, lastName: string) => {
    setSignUpData((prevData) => ({
      ...prevData,
      firstName: firstName,
      lastName: lastName,
    }));
  };

  const updateBloodType = (bloodType: string) => {
    setSignUpData((prevData) => ({
      ...prevData,
      bloodType,
    }));
  };

  const updateLastTimeDonated = (date) => {
    setSignUpData((prevData) => ({
      ...prevData,
      lastTimeDonated: date,
    }));
  };

  const updateNextTimeDonated = (date) => {
    setSignUpData((prevData) => ({
      ...prevData,
      nextTimeDonated: date,
    }));
  };

  const updateGender = (gender: string) => {
    setSignUpData((prevData) => ({
      ...prevData,
      gender,
    }));
  };

  return (
    <SignUpContext.Provider
      value={{
        signUpData,
        updateEmailPassword,
        updateFirstLastName,
        updateBloodType,
        updateGender,
        updateLastTimeDonated,
        updateNextTimeDonated,
      }}
    >
      {/* value usvari šaljemo consumeru */}
      {children}
      {/* svhi childreni će imati accces cart contextu*/}
    </SignUpContext.Provider>
  );
};

export default SignUpProvider;

export const useSignUp = () => useContext(SignUpContext);
