/** @jsxImportSource theme-ui */

import { useState } from "react";
import { colors } from "../../styles/theme";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Link from "../Primitives/Link";
import Sticky from "react-stickynode";
import { Waypoint } from "react-waypoint";

type LayoutProps = {
  children: JSX.Element;
  globals?: any;
};

const Layout = ({ children, globals }: LayoutProps) => {
  const [sticky, setSticky] = useState<boolean>(false);
  const onWaypointPositionChange = ({ currentPosition, waypointTop }: any) => {
    if (currentPosition === "above") {
      setSticky(true);
    }
    if (currentPosition === "inside") {
      setSticky(false);
    }
  };

  const appHeader = globals.data.attributes.AppHeader;
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

      <Sticky enabled={sticky} innerZ={1000}>
        <Header
          appHeader={appHeader}
          className={`${sticky ? "sticky" : "unSticky"}`}
        />
      </Sticky>

      <Waypoint
        onEnter={() => setSticky(false)}
        onPositionChange={onWaypointPositionChange}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
