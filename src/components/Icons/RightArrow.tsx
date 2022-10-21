/** @jsxImportSource theme-ui */

import { FaArrowCircleRight } from "react-icons/fa";
import { colors } from "../../styles/theme";
import { ComponentVariant } from "../../types/modifier";
import { getIconSize, IconProps } from "./Play";
import { IoIosArrowForward } from "react-icons/io";

const RightArrowIcon = (props: IconProps) => {
  const { theme, styles = {}, variant = ComponentVariant.LARGE } = props;

  return (
    <div sx={{ display: "flex", paddingLeft: "5px", ...styles }}>
      <IoIosArrowForward sx={{ height: getIconSize(variant), zIndex: 1 }} />
      {/* <FaArrowCircleRight sx={{ height: getIconSize(variant), zIndex: 1 }} /> */}
    </div>
  );
};

export default RightArrowIcon;
