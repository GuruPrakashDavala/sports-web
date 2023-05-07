/** @jsxImportSource theme-ui */

import { ComponentVariant } from "../../types/modifier";
import { getIconSize, IconProps } from "./Play";
import { IoIosArrowForward } from "react-icons/io";

const RightArrowIcon = (props: IconProps) => {
  const { styles = {}, variant = ComponentVariant.LARGE } = props;

  return (
    <div sx={{ display: "flex", paddingLeft: "5px", ...styles }}>
      <IoIosArrowForward sx={{ height: getIconSize(variant), zIndex: 1 }} />
    </div>
  );
};

export default RightArrowIcon;
