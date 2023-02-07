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
import { setupIonicReact } from "@ionic/react";
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */

// import "@ionic/react/css/normalize.css";
// import "@ionic/react/css/structure.css";

import "../styles/ionictheme/variables.css";
import "../components/Header/Header.css";
import "../styles/globals.css";
import { TabBarProvider } from "../components/Ionic/contexts/tabBarContext";
import Script from "next/script";
import { isNativeMobileApp } from "../components/Ionic/utils/capacitor";
import WebAnalytics from "../components/GoogleAnalytics/WebAnalytics";

setupIonicReact();

const queryClient = new QueryClient();

type MyAppProps = AppProps & { globals: any };

function MyApp({ Component, pageProps, globals }: MyAppProps) {
  useProgressBar();

  return (
    <TabBarProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Head>
            <meta name="keywords" content="homepage, Cricfanatic.com" />
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
          {!isNativeMobileApp && <WebAnalytics />}
          <Layout globals={globals}>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </ThemeProvider>
    </TabBarProvider>
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
