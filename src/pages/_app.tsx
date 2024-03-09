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
import { fetchStrapiAPI } from "../lib/strapi";
import Script from "next/script";
import WebAnalytics from "../components/GoogleAnalytics/WebAnalytics";
import { Globals } from "../types/header";
import "../components/Header/Header.css";
import "../styles/globals.css";

type MyAppProps = AppProps & { globals: Globals };

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, globals }: MyAppProps) {
  useProgressBar();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta name="keywords" content="homepage, Cricfanatic.com" />
          <meta
            name="viewport"
            content="initial-scale=1.0, maximum-scale=1.0"
          ></meta>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <RobotoFontFace />
          <ProgressBarStyles />
        </Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          id="g-tag-1"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-HW56Q6WWDP`}
        />
        <Script
          id="g-tag-2"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HW56Q6WWDP', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <WebAnalytics />
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
