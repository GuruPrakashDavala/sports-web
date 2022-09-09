import { heading } from "./textStyles";

/* Themed element styles - these are only used with the Themed component */
export const themedElements = {
  h1: {
    ...heading,
    fontSize: 5,
  },
  h2: {
    ...heading,
    fontSize: 4,
  },
  h3: {
    ...heading,
    fontSize: 3,
  },
  h4: {
    ...heading,
    fontSize: 2,
  },
  h5: {
    ...heading,
    fontSize: 1,
  },
  h6: {
    ...heading,
    fontSize: 0,
  },
  p: {
    color: "black",
    fontFamily: "roboto",
    fontWeight: "body",
    lineHeight: "body",
  },
  a: {
    color: "primary",
    cursor: "pointer",
  },
};
