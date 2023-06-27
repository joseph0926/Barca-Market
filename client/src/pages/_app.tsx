import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "../store/store";
import ThemeLayout from "../components/layouts/ThemeLayout";

import "react-toastify/dist/ReactToastify.css";
import "@/src/styles/globals.css";

export default function App({ Component, pageProps }) {
  const isExempt =
    Component.displayName === "Sign" || Component.name === "Sign";
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (router.pathname === "/") {
      return;
    }

    const checkUser = async () => {
      try {
        const { data } = await axios.get("/api/users/currentuser");
        setCurrentUser(data);
      } catch (err) {
        router.push("/sign");
      }
    };

    checkUser();
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>Barcelona Fan Community</title>
      </Head>
      <SessionProvider session={pageProps}>
        <Provider store={store}>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="dark"
          />
          <ThemeLayout isExempt={isExempt} user={currentUser}>
            <Component {...pageProps} />
          </ThemeLayout>
        </Provider>
      </SessionProvider>
    </>
  );
}
