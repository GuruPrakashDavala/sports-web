/** @jsxImportSource theme-ui */

import type { AppProps } from "next/app";
import Head from "next/head";
import { theme } from "../styles/theme/index";
import { ThemeProvider } from "theme-ui";
import { RobotoFontFace } from "../styles/theme/font-roboto";
import Layout from "../components/Layout/Layout";
import ProgressBarStyles, { useProgressBar } from "../utils/progressbar";
import { QueryClientProvider, QueryClient } from "react-query";
// Global stylesheet
import "../components/Header/Header.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  useProgressBar();
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta name="keywords" content="homepage, Website name" />
          <RobotoFontFace />
          <ProgressBarStyles />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
