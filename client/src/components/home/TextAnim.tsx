import { TypeAnimation } from "react-type-animation";

const TextAnim = (): JSX.Element => {
  return (
    <TypeAnimation
      sequence={["Barca", 1000, "Barcelona Community", 2000]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: "4em", fontWeight: "700", display: "inline-block" }}
    />
  );
};

export default TextAnim;
