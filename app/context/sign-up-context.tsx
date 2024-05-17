import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

const SignUpContext = createContext({});

const SignUpProvider = ({ children }: PropsWithChildren) => {
  const [signUpData, setSignUpData] = useState({
    lastTimeDonated: "",
  });

  const updateLastTimeDonated = (date: any) => {
    setSignUpData((prevData) => ({
      ...prevData,
      lastTimeDonated: date,
    }));
  };
  return (
    <SignUpContext.Provider
      value={{
        signUpData,
        updateLastTimeDonated,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpProvider;

export const useSignUp = () => useContext(SignUpContext);
