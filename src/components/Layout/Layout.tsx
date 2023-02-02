/** @jsxImportSource theme-ui */

import { Fragment, useState } from "react";
import Header from "../Header/Header";
import Sticky from "react-stickynode";
import { Waypoint } from "react-waypoint";
import { isNativeMobileApp } from "../Ionic/utils/capacitor";

type LayoutProps = {
  children: JSX.Element;
  globals?: any;
};

const Layout = ({ children, globals }: LayoutProps) => {
  const [isSticky, setSticky] = useState<boolean>(false);
  const onWaypointPositionChange = ({ currentPosition }: any) => {
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
      {!isNativeMobileApp && (
        <Fragment>
          <Sticky enabled={isSticky} innerZ={1000} enableTransforms={false}>
            <Header
              appHeader={appHeader}
              className={`${isSticky ? "sticky" : "unSticky"}`}
            />
          </Sticky>
          <Waypoint
            onEnter={() => setSticky(false)}
            onPositionChange={onWaypointPositionChange}
          />
        </Fragment>
      )}

      <main>{children}</main>
    </div>
  );
};

export default Layout;
