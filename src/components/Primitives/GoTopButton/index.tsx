/** @jsxImportSource theme-ui */

import { FaChevronCircleUp } from "react-icons/fa";
import { ThemeUICSSObject } from "theme-ui";
import { MutableRefObject } from "react";

const outerStyles: ThemeUICSSObject = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  position: "fixed",
  top: "10%",
  zIndex: 99,
  cursor: "pointer",
};

export const goTopStyles: ThemeUICSSObject = {
  display: "flex",
  gap: "5px",
  alignItems: "center",
  padding: 1,
  background: "gray100",
  boxShadow: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`,
  color: "white",
  borderRadius: "10px",
};

const GoTop = (props: {
  contentRef: MutableRefObject<HTMLIonContentElement | null>;
  showGoTop: boolean;
}) => {
  const { contentRef, showGoTop } = props;

  const handleScrollUp = () => {
    contentRef.current && contentRef.current.scrollToTop(1000);
  };

  return (
    <>
      {showGoTop && (
        <div sx={outerStyles}>
          <button sx={goTopStyles} onClick={handleScrollUp}>
            Move to top
            <FaChevronCircleUp />
          </button>
        </div>
      )}
    </>
  );
};

export default GoTop;
