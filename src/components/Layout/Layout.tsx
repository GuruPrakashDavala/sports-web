/** @jsxImportSource theme-ui */

import { colors } from "../../styles/theme";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navbar from "../Header/Navbar";
import Link from "../Primitives/Link";

type LayoutProps = {
  children: JSX.Element;
  globals?: any;
};

const Layout = ({ children, globals }: LayoutProps) => {
  const appHeader = globals.data.attributes.AppHeader;
  console.log(appHeader);
  return (
    <div>
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
          <>Follow all the news and live action now...</>
        </Link>
      </div>
      <Header appHeader={appHeader} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
