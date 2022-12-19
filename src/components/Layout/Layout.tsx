/** @jsxImportSource theme-ui */

import { colors } from "../../styles/theme";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navbar from "../Header/Navbar";

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      {/* <Navbar /> */}
      <div
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "center",
          background: colors.experimental.blue100,
          color: "white",
        }}
      >
        Promo item
      </div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
