import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import withReduxSaga from "next-redux-saga";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../app/hooks";
import { wrapper } from "../app/store";
import Layout from "../components/Layout";
import createEmotionCache from "../configs/mui/createEmotionCache";
import theme from "../configs/mui/theme";
import { userAction } from "../features/auth/userSlice";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps2 extends AppContext {
  emotionCache?: EmotionCache;
}
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem("login")) {
      dispatch(userAction.getAccessTokenFromRefreshToken());
    }
  }, [dispatch]);
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <div>
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}
class YourApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: MyAppProps2) => {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  };
  render() {
    const { Component, pageProps } = this.props;
    return (
      <CacheProvider value={clientSideEmotionCache}>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>
            <div>
              <Component {...pageProps} />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    );
  }
}
export default wrapper.withRedux(withReduxSaga(MyApp));
