/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";
import { ColorTheme } from "../../types/modifier";
import RightArrowIcon from "../Icons/RightArrow";
import Link from "../Primitives/Link";
import Pill from "../Primitives/Pill";

type LinkT = {
  label: string;
  href: string;
  external: boolean;
};

type SectionHeadingProps = {
  title?: string;
  theme?: ColorTheme;
  link?: LinkT;
  styles?: ThemeUICSSObject;
};

const wrapperStyles: ThemeUICSSObject = {
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  px: [3],
  py: [2],
};

const SectionHeading = ({
  title,
  theme = ColorTheme.LIGHT,
  link,
  styles = {},
}: SectionHeadingProps) => {
  return (
    <Fragment>
      {title ? (
        <div sx={{ ...wrapperStyles, ...styles }}>
          <Pill label={title} theme={theme} />
          {link && (
            <Link
              href={link.href}
              styles={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                transition: ".25s ease",
                willChange: "transform",
                "&:hover": {
                  opacity: ".675",
                  "> div": {
                    transition: ".25s ease",
                    transform: "translateX(10%)",
                  },
                },
              }}
            >
              <Fragment>
                <p
                  sx={{
                    color: theme === ColorTheme.DARK ? "white" : colors.gray100,
                    variant: "text.label1",
                    fontWeight: "bold",
                  }}
                >
                  {link.label}
                </p>
                <RightArrowIcon
                  styles={{
                    color: theme === ColorTheme.DARK ? "white" : colors.gray100,
                    alignItems: "center",
                  }}
                />
              </Fragment>
            </Link>
          )}
        </div>
      ) : null}
    </Fragment>
  );
};

export default SectionHeading;
