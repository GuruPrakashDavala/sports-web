/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import { ThemeUICSSObject } from "theme-ui";
import { ColorTheme } from "../../types/modifier";
import Button, { ButtonVariants } from "../Primitives/Button";
import Pill from "../Primitives/Pill";

type Link = {
  label: string;
  href: string;
  external: boolean;
};

type SectionHeadingProps = {
  title?: string;
  theme: ColorTheme;
  link?: Link | null;
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
  theme,
  link,
  styles = {},
}: SectionHeadingProps) => {
  return (
    <Fragment>
      {title ? (
        <div sx={{ ...wrapperStyles, ...styles }}>
          <Pill label={title} theme={theme} />
          {link && (
            <Button
              {...link}
              variant={ButtonVariants.TERTIARY}
              theme={ColorTheme.LIGHT}
            />
          )}
        </div>
      ) : null}
    </Fragment>
  );
};

export default SectionHeading;
