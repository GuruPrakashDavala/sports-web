import { Theme, ThemeUIStyleObject } from "theme-ui";
import { rootStyles } from "./rootStyles";
import { textStyles } from "./textStyles";
import { themedElements } from "./themedStyles";

export const colors = {
  black: "#0c0c0c",
  white: "#fff",
  white100: "rgba(255, 255, 255, 0.88)",
  white200: "rgba(255, 255, 255, 0.4)",
  white300: "rgba(255, 255, 255, 0.2)",
  red50: "#FFEFEF",
  red100: "#DC0714",
  red150: "#CA0E14",
  red200: "#B71515",
  red300: "#911712",
  gray100: "rgba(12, 12, 12, 0.7)",
  gray200: "rgba(12, 12, 12, 0.17)",
  gray300: "#F6F6F6",
  yellow: "#FFD700",
  yellow200: "#FFE140",
  yellow300: "#FFB025",
  mint: "#007E6B",
  extramint: "#00A88D",
  green: "#00634D",
  experimental: {
    blue100: "#001d3d",
    blue150: "#003049",
  },
};

export const fonts = {
  roboto:
    'Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
  robotoCondensed:
    'Roboto Condensed, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
};

export const easings = {
  easeOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  easeIn: "cubic-bezier(0.75, 0, 1, 1)",
  easeInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  ease: "cubic-bezier(0.44, 0.21, 0, 1)",
};

export const easingsFramer = {
  easeOut: [0.215, 0.61, 0.355, 1],
  easeIn: [0.75, 0, 1, 1],
  easeInOut: [0.645, 0.045, 0.355, 1],
  ease: [0.44, 0.21, 0, 1],
};

export const breakpoints = [
  "576px", // small
  "768px", // medium
  "992px", // large
  "1200px", // xlarge
  "1680px",
];

export const theme: Theme = {
  breakpoints,
  space: [0, 10, 15, 20, 30, 40, 60, 90, 120, 150],
  fonts,
  fontSizes: [12, 14, 16, 18, 20, 21, 26, 48, 64, 96],
  fontWeights: {
    body: 400,
    regular: 400,
    medium: 500,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    spaceous: 1.5,
    body: 1.3,
    heading: 1.2,
    label: 1.2,
    quote: 1.05,
    meta: 1.5,
  },
  colors,
  text: {
    ...(textStyles as Record<string, ThemeUIStyleObject>),
  },
  styles: {
    ...rootStyles,
    ...themedElements,
  },
};
