/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";

type IconProps = {
  styles?: ThemeUICSSObject;
};

const Arrow = (props: IconProps): JSX.Element => (
  <svg
    sx={{
      width: "15px",
      height: "15px",
      "& > path": {
        stroke: "currentColor",
      },
      ...props.styles,
    }}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default Arrow;
