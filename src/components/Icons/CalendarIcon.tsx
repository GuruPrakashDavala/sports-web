/** @jsxImportSource theme-ui */
import { ThemeUICSSObject } from "theme-ui";

const CalendarIcon = (props: { styles?: ThemeUICSSObject }) => {
  const { styles = { width: "24px", height: "24px" } } = props;
  return (
    <svg
      sx={styles}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1"
      ></path>
    </svg>
  );
};

export default CalendarIcon;
