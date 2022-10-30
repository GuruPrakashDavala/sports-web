/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";
import { ColorThemeAll, ComponentVariant } from "../../types/modifier";
import { BiTennisBall } from "react-icons/bi";

export type IconProps = {
  theme?: ColorThemeAll;
  styles?: ThemeUICSSObject;
  variant?: ComponentVariant;
};

export const getIconSize = (variant: ComponentVariant) => {
  switch (variant) {
    case ComponentVariant.SMALL:
      return 14;
    case ComponentVariant.MEDIUM:
      return 18;
    case ComponentVariant.LARGE:
      return 22;
  }
};

const BallIcon = (props: IconProps) => {
  const { theme, styles = {}, variant = ComponentVariant.LARGE } = props;

  return (
    <div sx={{ paddingX: [3], ...styles }}>
      <BiTennisBall
        sx={{ color: colors.white, height: getIconSize(variant), zIndex: 1 }}
      />
    </div>
  );
};

export default BallIcon;
