import Link from "next/link";

import { links } from "@/src/utils/links";
import { toggleMode } from "@/src/features/ui/uiSlice";
import { useAppDispatch, useAppSelect } from "@/src/hooks/useReduxHook";
import { useSignoutMutation } from "@/src/store/store";
import { removeUser } from "@/src/features/user/userSlice";
import { toast } from "react-toastify";
import { Bar, NavWrapper } from "./NavbarStyle";

const Navbar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelect((state) => state.user);
  const { mode } = useAppSelect((state) => state.ui);

  const [signout, results] = useSignoutMutation();

  const signoutHandler = () => {
    signout(undefined);
    dispatch(removeUser());
    toast.success("로그아웃 되셨습니다.");
  };

  return (
    <NavWrapper mode={mode}>
      <h1>
        <Link href="/" passHref>
          Logo
        </Link>
      </h1>
      <ul>
        <div className="list">
          {links.map((link) => {
            return (
              <li key={link.title}>
                <Link href={link.path} passHref>
                  {link.title}
                </Link>
              </li>
            );
          })}
        </div>
      </ul>
      <div className="ham">
        <Bar />
        <Bar />
        <Bar />
      </div>
      <div className="btn">
        {user ? (
          <button type="submit" onClick={signoutHandler}>
            <Link href="/">Logout</Link>
          </button>
        ) : (
          <button>
            <Link href="/sign">Login</Link>
          </button>
        )}
        <button onClick={() => dispatch(toggleMode())}>DarkMode</button>
      </div>
    </NavWrapper>
  );
};

export default Navbar;
