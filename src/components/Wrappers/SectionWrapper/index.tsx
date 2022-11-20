/** @jsxImportSource theme-ui */

import { ReactNode } from "react";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { ColorTheme, ColorThemeAll } from "../../../types/modifier";

type SectionWrapperProps = {
  children: ReactNode;
  theme?: ColorThemeAll;
  styles?: ThemeUICSSObject;
};

const SectionWrapper = (props: SectionWrapperProps): JSX.Element => {
  const { theme = ColorTheme.LIGHT, styles = {} } = props;
  return (
    <div
      sx={{
        paddingX: [2, null, 5, 6],
        paddingY: [2, null, 5, 6],
        background:
          theme === ColorTheme.GRAY
            ? colors.gray300
            : theme === ColorTheme.DARK
            ? colors.experimental.blue100
            : colors.white,
        ...styles,
      }}
    >
      {props.children}
    </div>
  );
};

export default SectionWrapper;
