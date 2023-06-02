import { useState } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const BaseFormControl = ({ id, type, name, placeholder }) => {
  const [formState, setFormState] = useState({ username: "", password: "", email: "" });
  const inputHandler = (e) => {
    setFormState((pervState) => {
      return {
        ...pervState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <FormControl>
      <FormLabel>{name}</FormLabel>
      <Input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={inputHandler}
        value={formState.name}
        borderColor="#0099FF"
        _hover={{ borderColor: "#0099FF" }}
      />
    </FormControl>
  );
};

export default BaseFormControl;
