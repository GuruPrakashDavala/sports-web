/** @jsxImportSource theme-ui */

import React, { Fragment } from "react";
import { ThemeUICSSObject } from "theme-ui";
import { default as NextLink } from "next/link";
import { Link as ReactLink } from "react-router-dom";
import { isNativeMobileApp } from "../../Ionic/utils/capacitor";

type LinkProps = {
  children: JSX.Element;
  href: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  styles?: ThemeUICSSObject;
};

const linkStyles: ThemeUICSSObject = { textDecoration: "none" };

const Link = (props: LinkProps): JSX.Element => {
  const { href, children, external, onClick, styles = {} } = props;

  return (
    <Fragment>
      {external ? (
        <a
          href={href}
          onClick={onClick}
          sx={{ ...linkStyles, ...styles }}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      ) : isNativeMobileApp ? (
        <ReactLink to={href} sx={{ ...linkStyles, ...styles }}>
          {children}
        </ReactLink>
      ) : (
        <NextLink href={href} sx={{ ...linkStyles, ...styles }}>
          {children}
        </NextLink>
      )}
    </Fragment>
  );
};

export default Link;
