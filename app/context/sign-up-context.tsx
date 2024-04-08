import React, { createContext, useContext, useState } from 'react';

const SignUpContext = createContext({});

export const Provider = () => {
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    name:'',
    surname:'',
  });

  const updateEmailPassword = (data: { email: string; password: string; }) =>{
    setSignUpData((prevData) => ({
        ...prevData,
        email: data.email,
        password: data.password,
      }));
    };

    return (
    <SignUpContext.Provider value={{ signUpData, updateEmailPassword }}>
    </SignUpContext.Provider>
  );
};

export const useSignUpContext = () => useContext(SignUpContext);