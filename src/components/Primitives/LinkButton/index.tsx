/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import { colors } from "../../../styles/theme";
import { ColorThemeFrontend } from "../../../types/modifier";
import RightArrowIcon from "../../Icons/RightArrow";
import Link from "../Link/index";

type CTAButtonProps = {
  href: string;
  variant: ColorThemeFrontend;
  ctaLabel: string;
};

const CTAButton = (props: CTAButtonProps) => {
  const { href, variant, ctaLabel } = props;
  const ctaBackgroundColor =
    variant === ColorThemeFrontend.RED ? colors.red200 : colors.black;

  return (
    <Link
      href={href}
      styles={{
        padding: 2,
        background: ctaBackgroundColor,
        marginTop: "auto",
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
        <p sx={{ variant: "text.subheading4", color: colors.white }}>
          {ctaLabel}
        </p>

        <RightArrowIcon
          styles={{
            color: colors.white,
            alignItems: "center",
          }}
        />
      </Fragment>
    </Link>
  );
};

export default CTAButton;
