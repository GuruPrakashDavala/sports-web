/** @jsxImportSource theme-ui */

import { FaArrowCircleRight } from "react-icons/fa";
import { colors } from "../../styles/theme";
import { ComponentVariant } from "../../types/modifier";
import { getIconSize, IconProps } from "./Play";

const RightArrowIcon = (props: IconProps) => {
  const { theme, styles = {}, variant = ComponentVariant.LARGE } = props;

  return (
    <div sx={{ paddingX: [3], ...styles }}>
      <FaArrowCircleRight
        sx={{ color: colors.white, height: getIconSize(variant), zIndex: 1 }}
      />
    </div>
  );
};

export default RightArrowIcon;
