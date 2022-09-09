/** @jsxImportSource theme-ui */

import { ReactNode } from "react";

const VisuallyHidden = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <span
      sx={{
        clip: "react(0 0 0 0)",
        clipPath: "inset(50%)",
        height: "1px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "1px",
      }}
    >
      {children}
    </span>
  );
};

export default VisuallyHidden;
