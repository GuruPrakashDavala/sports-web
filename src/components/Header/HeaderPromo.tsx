/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import Link from "../Primitives/Link";
import { colors } from "../../styles/theme";
import { ThemeUICSSObject } from "theme-ui";

type HeaderPromoProps = {
  promoDescription: string;
  href: string;
  external?: boolean;
  styles?: ThemeUICSSObject;
};

const HeaderPromo = (props: HeaderPromoProps) => {
  const { promoDescription, href, external = false, styles } = props;
  return (
    <div
      sx={{
        padding: 2,
        display: "flex",
        background: colors.yellow,
        color: "black",
        justifyContent: "center",
        ...styles,
      }}
    >
      <Link
        href={href ?? ``}
        external={external}
        styles={{
          variant: "text.subheading4",
          color: "black",
          textDecoration: "underline",
        }}
      >
        <Fragment>{promoDescription}</Fragment>
      </Link>
    </div>
  );
};

export default HeaderPromo;
