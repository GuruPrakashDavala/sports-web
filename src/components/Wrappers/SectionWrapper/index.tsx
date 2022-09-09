/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { ColorTheme, ColorThemeAll } from "../../../types/modifier";

type SectionWrapperProps = {
  children: JSX.Element;
  theme?: ColorThemeAll;
  styles?: ThemeUICSSObject;
};

const SectionWrapper = (props: SectionWrapperProps): JSX.Element => {
  const { theme = ColorTheme.LIGHT, styles = {} } = props;
  return (
    <div
      sx={{
        display: "flex",
        paddingX: [2, null, 5, 6],
        paddingY: [2, null, 6, 7],
        background: theme === ColorTheme.DARK ? colors.red100 : colors.white,
        ...styles,
      }}
    >
      {props.children}
    </div>
  );
};

export default SectionWrapper;
