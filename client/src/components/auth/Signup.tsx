import { Box, Button, Heading } from "@chakra-ui/react";
import BaseFormControl from "./FormController";
import { useInput } from "../../hooks/useInput";
import { UseInputReturn } from "@/src/models/user";

const Signup = (): JSX.Element => {
  const { formState, touched, isValid, handleInputChange, handleBlur, isLoginFormValid }: UseInputReturn = useInput();

  return (
    <Box as="form" role="form" w="30vw">
      <Heading mb="1rem">회원 가입</Heading>
      <BaseFormControl
        id="username"
        type="text"
        name="username"
        placeholder="사용자명"
        value={formState.username}
        handleChange={handleInputChange}
        handleBlur={handleBlur}
        isValid={isValid.username}
        touched={touched.username}
      />
      <BaseFormControl
        id="in-email"
        type="email"
        name="email"
        placeholder="이메일"
        value={formState.email}
        handleChange={handleInputChange}
        handleBlur={handleBlur}
        isValid={isValid.email}
        touched={touched.email}
      />
      <BaseFormControl
        id="in-password"
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formState.password}
        handleChange={handleInputChange}
        handleBlur={handleBlur}
        isValid={isValid.password}
        touched={touched.password}
      />
      <Button bg="transparent" w="100%" my="1rem" disabled={!isLoginFormValid}>
        가입하기
      </Button>
    </Box>
  );
};

export default Signup;
