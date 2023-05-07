/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { ColorThemeAll, ColorTheme } from "../../../types/modifier";

export type PillProps = {
  label: string;
  title?: string;
  theme?: ColorThemeAll;
  styles?: ThemeUICSSObject;
};

const Pill = ({
  label,
  title,
  theme = ColorTheme.LIGHT,
  styles = {},
}: PillProps): JSX.Element => {
  return (
    <div
      title={title ?? label}
      aria-label={label}
      tabIndex={0}
      sx={{
        display: "inline-block",
        py: "5px",
        px: 2,
        // mx: 2,
        backgroundColor:
          theme === ColorTheme.LIGHT || theme === ColorTheme.GRAY
            ? "black"
            : colors.red200,
        borderRadius: 20,
        ":focus-visible": {
          outline: "2px solid",
          outlineColor: "gray200",
          outlineOffset: "1px",
        },
        ...styles,
      }}
    >
      <span sx={{ variant: "text.subheading4", color: colors.white }}>
        {label}
      </span>
    </div>
  );
};

export default Pill;
