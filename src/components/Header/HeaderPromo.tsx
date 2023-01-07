/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import Link from "../Primitives/Link";
import { colors } from "../../styles/theme";

const HeaderPromo = () => {
  return (
    <div
      sx={{
        padding: 2,
        display: "flex",
        background: colors.yellow,
        color: "black",
        justifyContent: "center",
      }}
    >
      <Link
        href="/"
        styles={{
          variant: "text.subheading4",
          color: "black",
        }}
      >
        <Fragment>Follow all the news and live action now...</Fragment>
      </Link>
    </div>
  );
};

export default HeaderPromo;
