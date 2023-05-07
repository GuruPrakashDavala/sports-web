/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { ColorThemeAll, ComponentVariant } from "../../types/modifier";
import { keyframes } from "@emotion/react";

export type IconProps = {
  theme?: ColorThemeAll;
  styles?: ThemeUICSSObject;
  variant?: ComponentVariant;
};

export const getIconSize = (variant: ComponentVariant) => {
  switch (variant) {
    case ComponentVariant.SMALL:
      return 16;
    case ComponentVariant.MEDIUM:
      return 18;
    case ComponentVariant.LARGE:
      return 22;
  }
};

// const blinkAnimationStyles: ThemeUICSSObject = {
//   animation: "blinker 1.5s cubic-bezier(.5, 0, 1, 1) infinite alternate;",
//   "@keyframes blinker": {
//     from: { opacity: 1 },
//     to: { opacity: 0.2 },
//   },
// };

const pulse = keyframes`
0% {
  transform: scale(0.95);
  box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
}

70% {
  transform: scale(1);
  box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
}

100% {
  transform: scale(0.95);
  box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
}
`;

const pulseStyles: ThemeUICSSObject = {
  height: "8px",
  width: "8px",
  background: "#dc3021",
  borderRadius: "50%",
  margin: "10px",
  display: "inline-block",
  boxShadow: "0 0 0 0 #dc3021",
  transform: "scale(1)",
  animation: `${pulse} 2s infinite`,
};

const LivePulse = (props: IconProps) => {
  const { styles = {} } = props;

  return (
    <div sx={{ ...pulseStyles, ...styles }}>
      {/* <FaCircle
        sx={{ color: colors.red150, height: getIconSize(variant), zIndex: 1 }}
      /> */}
    </div>
  );
};

export default LivePulse;
