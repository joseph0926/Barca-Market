import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Signin from "@/src/components/auth/Signin";
import Signup from "@/src/components/auth/Signup";
import { SignWrapper } from "./SignStyle";

const Sign = (): JSX.Element => {
  const [signMode, setSignMode] = useState("up");
  const [anim, setAnim] = useState(false);

  const signModeHandler = () => {
    setAnim(true);
    setTimeout(() => {
      setAnim(false);
    }, 1500);
    setSignMode((pervState) => {
      return pervState === "up" ? "in" : "up";
    });
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <SignWrapper anim={anim}>
      <button className="back">
        <Link href="/">Go Back Home</Link>
      </button>
      <div className="sign">
        <motion.div
          initial="initial"
          animate="animate"
          key={signMode}
          variants={fadeIn}
          transition={{ duration: 1.5 }}
        >
          <div className="sign-form">
            {signMode === "up" ? <Signin /> : <Signup />}
          </div>
          <div className="container">
            {signMode === "up" ? (
              <p>아직 회원이 아니신가요?</p>
            ) : (
              <p>이미 회원이신가요?</p>
            )}
            <button onClick={signModeHandler}>Sign{signMode}</button>
          </div>
        </motion.div>
      </div>
    </SignWrapper>
  );
};

export default Sign;
