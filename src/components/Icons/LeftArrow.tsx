/** @jsxImportSource theme-ui */

import { ComponentVariant } from "../../types/modifier";
import { getIconSize, IconProps } from "./Play";
import { IoIosArrowBack } from "react-icons/io";

const LeftArrowIcon = (props: IconProps) => {
  const { theme, styles = {}, variant = ComponentVariant.LARGE } = props;

  return (
    <div sx={{ display: "flex", paddingLeft: "5px", ...styles }}>
      <IoIosArrowBack sx={{ height: getIconSize(variant), zIndex: 1 }} />
    </div>
  );
};

export default LeftArrowIcon;
