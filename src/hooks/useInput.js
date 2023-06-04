import { useState } from "react";
import { validateEmail, validatePassword, validateName } from "../utils/validation.js";

export const useInput = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false, username: false });
  const [isValid, setIsValid] = useState({ email: true, password: true, username: true });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prevState) => ({
      ...prevState,
      [name]: true,
    }));
    if (name === "email") {
      setIsValid((prevState) => ({
        ...prevState,
        [name]: validateEmail(value),
      }));
    }
    if (name === "password") {
      setIsValid((prevState) => ({
        ...prevState,
        [name]: validatePassword(value),
      }));
    }
    if (name === "username") {
      setIsValid((prevState) => ({
        ...prevState,
        [name]: validateName(value),
      }));
    }
  };

  const isLoginFormValid = Object.values(isValid).every((v) => v === true);

  return {
    formState,
    touched,
    isValid,
    handleInputChange,
    handleBlur,
    isLoginFormValid,
  };
};
