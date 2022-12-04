/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { keyframes } from "@emotion/react";

const skeletonKeyframes = keyframes`
0% {
background-position: -200px 0;
}
100% {
background-position: calc(200px + 100%) 0;
}
`;

const skeletonStyles = (loading: boolean): ThemeUICSSObject => ({
  backgroundColor: "gray200",
  backgroundImage: loading
    ? `linear-gradient(
90deg,
rgba(12, 12, 12, 0.01),
rgba(12, 12, 12, 0.02),
rgba(12, 12, 12, 0.03),
rgba(12, 12, 12, 0.02),
rgba(12, 12, 12, 0.01)
)`
    : "none",
  backgroundSize: "200px 100%",
  backgroundRepeat: "no-repeat",
  borderRadius: "4px",
  display: "inline-block",
  lineHeight: 1,
  width: "100%",
});

const skeletonCircleStyles: ThemeUICSSObject = {
  borderRadius: "50%",
};

export type SkeletonProps = {
  circle?: boolean;
  styles?: ThemeUICSSObject;
  width?: ThemeUICSSObject["width"];
  height?: ThemeUICSSObject["height"];
  loading?: boolean;
};

const Skeleton = ({
  circle = false,
  styles = {},
  width,
  height,
  loading = true,
}: SkeletonProps): JSX.Element => {
  return (
    <span
      sx={{
        ...skeletonStyles(loading),
        animation: loading
          ? `${skeletonKeyframes} 1.2s ease-in-out infinite`
          : "none",
        ...(width ? { width } : {}),
        ...(height ? { height } : {}),
        ...(circle ? skeletonCircleStyles : {}),
        ...styles,
      }}
    >
      &zwnj;
    </span>
  );
};

export default Skeleton;
