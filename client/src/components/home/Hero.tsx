import TextAnim from "./TextAnim";
import { HeroWrapper } from "./HeroStyle";

const Hero = (): JSX.Element => {
  return (
    <HeroWrapper>
      <div className="left">
        <div className="content">
          <h2>Barcelona Fan Community Platform</h2>
          <p>
            FC Barcelona 팬 커뮤니티 플랫폼입니다. 이 플랫폼은 팬들이 모여
            소통하고 정보를 공유하며, 함께 커뮤니티를 형성할 수 있는 온라인
            공간을 제공합니다. 다양한 정보와 소식을 공유해보세요!
          </p>
          <div className="btn">
            <button>Start now</button>
            <button>About us</button>
          </div>
        </div>
      </div>
      <div className="right">
        <TextAnim />
      </div>
    </HeroWrapper>
  );
};

export default Hero;
