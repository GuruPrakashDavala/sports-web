/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../../styles/theme";

const BallInfoCircle = (props: {
  ball: string | number;
  color?: string;
  runs?: number;
}) => {
  const { ball, color, runs } = props;

  const ballInfoCircleStyles: ThemeUICSSObject = {
    background: color ? color : colors.gray200,
    color: colors.white,
    border: "none",
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    display: "flex",
    padding: "1.25em",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    lineHeight: "16px",
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 10%)",
  };

  return (
    <div sx={ballInfoCircleStyles}>
      {runs ? runs : ""}
      {ball}
    </div>
  );
};

export default BallInfoCircle;
