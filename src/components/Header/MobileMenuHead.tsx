/** @jsxImportSource theme-ui */

import { RefObject } from "react";
import { FaAngleLeft } from "react-icons/fa";

type MobileMenuHeadProps = {
  hideSubMenu: () => void;
  toggleMenu: () => void;
  mobileMenuHeadRef: RefObject<HTMLDivElement>;
  subMenuTitle?: string;
};

const MobileMenuHead = (props: MobileMenuHeadProps) => {
  const { hideSubMenu, toggleMenu, subMenuTitle, mobileMenuHeadRef } = props;
  return (
    <div className="mobile-menu-head" ref={mobileMenuHeadRef}>
      <div className="go-back" onClick={hideSubMenu}>
        <FaAngleLeft />
      </div>

      <div className="current-menu-title">
        {subMenuTitle ?? (
          // Here the logo should be in blue variant
          <img
            src="/assets/bat_logo.png"
            alt="cricfanatic"
            sx={{ height: "35px", width: "auto" }}
          />
        )}
      </div>

      <div className="mobile-menu-close" onClick={toggleMenu}>
        &times;
      </div>
    </div>
  );
};

MobileMenuHead.displayName = `MobileMenuHead`;

export default MobileMenuHead;
