/** @jsxImportSource theme-ui */

import React, { Fragment } from "react";
import { ThemeUICSSObject } from "theme-ui";
import { default as NextLink } from "next/link";
import { Link as ReactLink } from "react-router-dom";
import { isNativeMobileApp } from "../../Ionic/utils/capacitor";

type LinkProps = {
  children: JSX.Element;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  styles?: ThemeUICSSObject;
};

const linkStyles: ThemeUICSSObject = { textDecoration: "none" };

const Link = (props: LinkProps): JSX.Element => {
  const { href, children, onClick, styles = {} } = props;

  return (
    <Fragment>
      {isNativeMobileApp ? (
        <ReactLink to={href} sx={{ ...linkStyles, ...styles }}>
          {children}
        </ReactLink>
      ) : (
        <NextLink href={href}>
          <a href={href} sx={{ ...linkStyles, ...styles }}>
            {children}
          </a>
        </NextLink>
      )}
    </Fragment>
  );
};

export default Link;
