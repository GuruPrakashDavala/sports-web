/** @jsxImportSource theme-ui */

import { FaFacebookF } from "react-icons/fa";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";
import { ColorThemeAll, ComponentVariant } from "../../types/modifier";

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

const FacebookIcon = (props: IconProps) => {
  const { styles = {}, variant = ComponentVariant.LARGE } = props;

  return (
    <div sx={{ paddingX: [3], ...styles }}>
      <FaFacebookF
        sx={{ color: colors.white, height: getIconSize(variant), zIndex: 1 }}
      />
    </div>
  );
};

export default FacebookIcon;
