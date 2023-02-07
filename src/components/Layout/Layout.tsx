/** @jsxImportSource theme-ui */

import { Fragment, useState } from "react";
import Header from "../Header/Header";
import Sticky from "react-stickynode";
import { Waypoint } from "react-waypoint";
import { isNativeMobileApp } from "../Ionic/utils/capacitor";
import { Globals as GlobalsT } from "../../types/header";
import { useGlobals } from "../../utils/queries";
import HeaderPromo from "../Header/HeaderPromo";

type LayoutProps = {
  children: JSX.Element;
  globals: GlobalsT;
};

const Layout = ({ children, globals }: LayoutProps) => {
  const { data: globalsRes, isLoading: globalsLoading } = useGlobals();
  const appGlobals =
    !globalsLoading && globalsRes ? globalsRes.data : globals.data;

  const [isSticky, setSticky] = useState<boolean>(false);
  const onWaypointPositionChange = ({ currentPosition }: any) => {
    if (currentPosition === "above") {
      setSticky(true);
    }
    if (currentPosition === "inside") {
      setSticky(false);
    }
  };

  const appHeader = appGlobals.attributes.AppHeader;
  const promo = appGlobals.attributes.Promo;

  return (
    <div>
      {!isNativeMobileApp && (
        <Fragment>
          <HeaderPromo
            promoDescription={promo.promo_description}
            href={promo.web_href}
            external={promo.external}
          />

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
