/** @jsxImportSource theme-ui */
import { ThemeUICSSObject } from "theme-ui";

const LogoIcon = (props: { styles?: ThemeUICSSObject }) => {
  const { styles = { width: "24px", height: "24px" } } = props;
  return (
    <svg
      sx={styles}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      viewBox="0 0 24 24"
    >
      <path
        d="M 62.117188 163.59375 L 110 163.59375 L 110 212 L 62.117188 212 Z M 62.117188 163.59375 "
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export default LogoIcon;
