/** @jsxImportSource theme-ui */
import { ThemeUICSSObject } from "theme-ui";
import { default as NextLink } from "next/link";

type LinkProps = {
  children: JSX.Element;
  href: string;
  styles?: ThemeUICSSObject;
};

const linkStyles: ThemeUICSSObject = { textDecoration: "none" };

const Link = (props: LinkProps): JSX.Element => {
  const { href, children, styles = {} } = props;
  return (
    <NextLink href={href}>
      <a href={href} sx={{ ...linkStyles, ...styles }}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
