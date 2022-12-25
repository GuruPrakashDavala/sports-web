/** @jsxImportSource theme-ui */

import { FaAngleLeft } from "react-icons/fa";

const MobileMenuHead = (props) => {
  const { hideSubMenu, toggleMenu, title, mobileMenuHeadRef } = props;
  return (
    <div className="mobile-menu-head" ref={mobileMenuHeadRef}>
      <div className="go-back" onClick={hideSubMenu}>
        <FaAngleLeft />
      </div>
      <div className="current-menu-title">
        {title ?? (
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
