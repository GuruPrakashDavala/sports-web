/** @jsxImportSource theme-ui */

import { FaTrophy } from "react-icons/fa";
import { ComponentVariant } from "../../types/modifier";
import { getIconSize, IconProps } from "./Play";

const TrophyIcon = (props: IconProps) => {
  const { theme, styles = {}, variant = ComponentVariant.LARGE } = props;

  return (
    <div
      sx={{
        display: "flex",
        paddingLeft: "5px",
        alignItems: "center",
        ...styles,
      }}
    >
      <FaTrophy sx={{ height: getIconSize(variant), zIndex: 1 }} />
    </div>
  );
};

export default TrophyIcon;
