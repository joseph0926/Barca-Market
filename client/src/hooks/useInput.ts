import { useState, ChangeEvent, FocusEvent } from "react";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../utils/validation";

type UseInputReturn = {
  formState: RequireOnly<User, "email" | "password" | "name">;
  touched: isUserValid;
  isValid: isUserValid;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoginFormValid: boolean;
};

export const useInput = (): UseInputReturn => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    username: false,
  });
  const [isValid, setIsValid] = useState({
    email: true,
    password: true,
    username: true,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
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
