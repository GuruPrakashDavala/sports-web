/** @jsxImportSource theme-ui */

import App from "next/app";
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
import { fetchStrapiAPI } from "../lib/strapi";

const queryClient = new QueryClient();

type MyAppProps = AppProps & { globals: any };

function MyApp({ Component, pageProps, globals }: MyAppProps) {
  useProgressBar();
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta name="keywords" content="homepage, Website name" />
          <RobotoFontFace />
          <ProgressBarStyles />
        </Head>
        <Layout globals={globals}>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (context: any) => {
  const pageProps = await App.getInitialProps(context); // Retrieves page's `getInitialProps`
  const globals = await fetchStrapiAPI("/global", {
    populate: "deep, 7",
  });

  return {
    ...pageProps,
    globals,
  };
};

export default MyApp;
