import { FaAngleLeft } from "react-icons/fa";

const MobileMenuHead = (props) => {
  const { hideSubMenu, toggleMenu, title, mobileMenuHeadRef } = props;
  return (
    <div className="mobile-menu-head" ref={mobileMenuHeadRef}>
      <div className="go-back" onClick={hideSubMenu}>
        <FaAngleLeft />
      </div>
      <div className="current-menu-title">{title}</div>
      <div className="mobile-menu-close" onClick={toggleMenu}>
        &times;
      </div>
    </div>
  );
};

MobileMenuHead.displayName = `MobileMenuHead`;

export default MobileMenuHead;
