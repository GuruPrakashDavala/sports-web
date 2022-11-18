/** @jsxImportSource theme-ui */

import { FaArrowCircleRight } from "react-icons/fa";
import { ComponentVariant } from "../../types/modifier";
import { getIconSize, IconProps } from "./Play";

const RightArrowIcon = (props: IconProps) => {
  const { theme, styles = {}, variant = ComponentVariant.LARGE } = props;

  return (
    <div sx={{ display: "flex", paddingLeft: "5px", ...styles }}>
      <FaArrowCircleRight sx={{ height: getIconSize(variant), zIndex: 1 }} />
    </div>
  );
};

export default RightArrowIcon;
