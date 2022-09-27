import { Global, css } from "@emotion/react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export const useProgressBar = (): void => {
  Router.events.on("routeChangeStart", () => void NProgress.start());
  Router.events.on("routeChangeComplete", () => void NProgress.done());
  Router.events.on("routeChangeError", () => void NProgress.done());
};

const ProgressBarStyles = (): JSX.Element => {
  return (
    <Global
      styles={css`
        #nprogress .bar {
          background: #fff !important;
          box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
        }

        #nprogress .peg {
          box-shadow: 0 0 10px #fff, 0 0 5px #fff;
        }

        #nprogress .spinner {
          display: none;
        }
      `}
    />
  );
};

export default ProgressBarStyles;
