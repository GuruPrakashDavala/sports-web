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

const jumpKeyframes = keyframes`
10% {
    transform: scaleY(0.3); /* start by scaling to 30% */
  }

  30% {
    transform: scaleY(1); /* scale up to 100% */
  }

  60% {
    transform: scaleY(0.5); /* scale down to 50% */
  }

  80% {
    transform: scaleY(0.75); /* scale up to 75% */
  }

  100% {
    transform: scaleY(0.6); /* scale down to 60% */
  }`;

const icon: ThemeUICSSObject = {
  display: "flex",
  position: "relative",
  justifyContent: "space-between",
  width: "13px",
  height: "13px",
  "> span": {
    width: "3px",
    height: "100%",
    backgroundColor: "orange",
    borderRadius: "3px",
    transformOrigin: "bottom",
    animation: `${jumpKeyframes} 2.2s ease infinite alternate`,
    content: "''",
    "&:nth-of-type(2)": {
      animationDelay: "-2.2s" /* Start at the end of animation */,
    },
    "&:nth-of-type(3)": {
      animationDelay: "-3.7s" /* Start at the end of animation */,
    },
  },
};

const AnimatingMusicBars = (props: IconProps) => {
  const { styles = {} } = props;

  return (
    <div sx={{ ...icon, ...styles }}>
      <span />
      <span />
      <span />
    </div>
  );
};

export default AnimatingMusicBars;
