/** @jsxImportSource theme-ui */

import { FaPlay } from "react-icons/fa";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";
import { ColorThemeAll, ComponentVariant } from "../../types/modifier";

export type IconProps = {
  theme?: ColorThemeAll;
  styles?: ThemeUICSSObject;
  variant?: ComponentVariant;
  fontSize?: number;
};

export const getIconSize = (variant: ComponentVariant) => {
  switch (variant) {
    case ComponentVariant.SMALL:
      return 16;
    case ComponentVariant.MEDIUM:
      return 18;
    case ComponentVariant.LARGE:
      return 22;
  }
};

const PlayIcon = (props: IconProps) => {
  const { fontSize, styles = {}, variant = ComponentVariant.LARGE } = props;

  return (
    <div sx={{ paddingRight: [2], ...styles }}>
      <FaPlay
        sx={{ color: colors.white, zIndex: 1 }}
        fontSize={fontSize ?? getIconSize(variant)}
      />
    </div>
  );
};

export default PlayIcon;
