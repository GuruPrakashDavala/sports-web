/** @jsxImportSource theme-ui */
import React from "react";
import { ThemeUICSSObject } from "theme-ui";
import { default as NextLink } from "next/link";

type LinkProps = {
  children: JSX.Element;
  href: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  styles?: ThemeUICSSObject;
};

const linkStyles: ThemeUICSSObject = { textDecoration: "none" };

const Link = (props: LinkProps): JSX.Element => {
  const { href, children, onClick, styles = {} } = props;
  return (
    <NextLink href={href} onClick={onClick}>
      <a href={href} sx={{ ...linkStyles, ...styles }}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
