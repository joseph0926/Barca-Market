import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { SocialWrapper } from "./SocialLoginStyle";

const SocialLogin = (): JSX.Element => {
  return (
    <SocialWrapper>
      <button onClick={() => signIn("google")} className="google">
        Sign in with Google{" "}
        <div className="icon">
          <FaGoogle color="red" size={25} />
        </div>
      </button>
      <button onClick={() => signIn("github")} className="github">
        Sign in with GitHub{" "}
        <div className="icon">
          <FaGithub color="blue" size={25} />
        </div>
      </button>
    </SocialWrapper>
  );
};

export default SocialLogin;
