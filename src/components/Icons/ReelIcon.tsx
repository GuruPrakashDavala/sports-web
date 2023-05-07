/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";
import { ColorThemeAll, ComponentVariant } from "../../types/modifier";
import { BsFilm } from "react-icons/bs";

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

const ReelIcon = (props: IconProps) => {
  const { fontSize, styles = {}, variant = ComponentVariant.LARGE } = props;

  return (
    <div sx={{ paddingRight: [2], ...styles }}>
      <BsFilm
        sx={{ color: colors.white, zIndex: 1 }}
        fontSize={fontSize ?? getIconSize(variant)}
      />
    </div>
  );
};

export default ReelIcon;
