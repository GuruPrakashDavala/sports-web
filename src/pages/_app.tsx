/** @jsxImportSource theme-ui */
import type { AppProps } from "next/app";
import Head from "next/head";
import { theme } from "../styles/theme/index";
import { ThemeProvider } from "theme-ui";
import { RobotoFontFace } from "../styles/theme/font-roboto";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <meta name="keywords" content="homepage, Website name" />
          <RobotoFontFace />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
