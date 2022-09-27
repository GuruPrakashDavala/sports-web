/** @jsxImportSource theme-ui */
import type { AppProps } from "next/app";
import Head from "next/head";
import { theme } from "../styles/theme/index";
import { ThemeProvider } from "theme-ui";
import { RobotoFontFace } from "../styles/theme/font-roboto";
import Layout from "../components/Layout/Layout";
import ProgressBarStyles, { useProgressBar } from "../utils/progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  useProgressBar();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <meta name="keywords" content="homepage, Website name" />
          <RobotoFontFace />
          <ProgressBarStyles />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
