import Rate from "../forum/Rate";
import Sidebar from "../forum/Sidebar";
import { ForumLayoutWrapper } from "./ForumLayoutStyle";

const ForumLayout = ({ children }: BoxProps): JSX.Element => {
  return (
    <ForumLayoutWrapper>
      <div className="left">
        <Sidebar />
      </div>
      <div className="main">{children}</div>
      <div className="right">
        <Rate />
      </div>
    </ForumLayoutWrapper>
  );
};

export default ForumLayout;
