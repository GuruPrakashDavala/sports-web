import { forwardRef } from "react";
import { FaAngleLeft } from "react-icons/fa";

const MobileMenuHead = forwardRef((props, ref) => {
  const { hideSubMenu, toggleMenu, title } = props;
  return (
    <div className="mobile-menu-head" ref={ref}>
      <div className="go-back" onClick={hideSubMenu}>
        <FaAngleLeft />
      </div>
      <div className="current-menu-title">{title}</div>
      <div className="mobile-menu-close" onClick={toggleMenu}>
        &times;
      </div>
    </div>
  );
});

MobileMenuHead.displayName = `MobileMenuHead`;

export default MobileMenuHead;
