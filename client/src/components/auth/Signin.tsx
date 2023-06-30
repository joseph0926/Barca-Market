import BaseFormControl from "./FormController";
import { useInput } from "@/src/hooks/useInput";
import SocialLogin from "./SocialLogin";
import { useSigninMutation } from "@/src/store/store";
import { toast } from "react-toastify";
import { ExtendFetchError } from "./Signup";
import { useRouter } from "next/router";
import { SignFormWrapper } from "./SignFormStyle";

const Signin = (): JSX.Element => {
  const [signin, results] = useSigninMutation();
  const router = useRouter();

  const {
    formState,
    touched,
    isValid,
    handleInputChange,
    handleBlur,
    isLoginFormValid,
  } = useInput();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await signin(formState);
      if (results.isError) {
        throw new Error("");
      }
      const res = await results.data;
      toast.success(res[0].message);
      router.push("/");
    } catch (error) {
      if (results.error) {
        const { data }: ExtendFetchError = results.error;
        toast.error(data.errors[0].message);
      }
    }
  };

  return (
    <SignFormWrapper role="form" onSubmit={submitHandler}>
      <h2>Sign in</h2>
      <BaseFormControl
        id="in-email"
        type="email"
        name="email"
        placeholder="Email"
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
        placeholder="Password"
        value={formState.password}
        handleChange={handleInputChange}
        handleBlur={handleBlur}
        isValid={isValid.password}
        touched={touched.password}
      />
      <button type="submit" disabled={!isLoginFormValid}>
        Login
      </button>
      <SocialLogin />
    </SignFormWrapper>
  );
};

export default Signin;
