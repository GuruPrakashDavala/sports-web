/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { ColorThemeAll, ComponentVariant } from "../../../types/modifier";
import SnackNews from "./snacknews";
import RightArrowIcon from "../../Icons/RightArrow";

type MultiInfoCardType = {
  label: string;
  theme?: ColorThemeAll;
  styles?: ThemeUICSSObject;
  variant?: ComponentVariant;
};

const containerStyles = {
  display: "flex",
  // height: "100%",
  width: "100%",
  paddingTop: 2,
  // Hover effect - transition color
  paddingX: [null, null, null, 2],
  transition: "background-color 400ms cubic-bezier(0.645, 0.045, 0.355, 1)",
  willChange: "background-color",
  "&:hover": {
    backgroundColor: colors.red150,
    transition:
      "background-color 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
    willChange: "transform",
  },
};

const quoteStyles = {
  display: "block",
  flexGrow: "2",
  marginTop: "5px",
  lineHeight: "1.2",
  quotes: "none",
  color: colors.white,
  variant: "text.quote3",
  paddingX: 1,
};

const quoteAnchorStyles = {
  textDecoration: "none",
  cursor: "pointer",
  color: colors.white,
  background: "linear-gradient(to bottom, #CA0E14 0%, #CA0E14 100%)",
  backgroundPosition: "0 100%",
  transition: "background-size 400ms cubic-bezier(0.645, 0.045, 0.355, 1)",
  willChange: "background-size",
  backgroundRepeat: "repeat-x",
  backgroundSize: "2px 0",
  "&:hover": {
    backgroundSize: "2px 10px",
    transition:
      "background-size 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
    "> span": {
      transform: "translateX(5px)",
      transition: "transform 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
      willChange: "transform",
    },
  },
};

const iconContainerStyles = {
  transition: "transform 400ms cubic-bezier(0.645, 0.045, 0.355, 1)",
  willChange: "transform",
  display: "inline-block",
};

const getQuoteStyles = (variant: ComponentVariant): ThemeUICSSObject => {
  switch (variant) {
    case ComponentVariant.LARGE:
      return {
        ...quoteStyles,
        variant: "text.quote1",
        paddingX: [2, null, 5, 6],
        paddingY: [2, null, 6, 8],
      };
    case ComponentVariant.MEDIUM:
      return {
        ...quoteStyles,
        variant: "text.quote2",
        paddingX: [2, null, 5],
        paddingY: [2, null, 5],
      };
    default:
      return quoteStyles;
  }
};

const MultiInfoCard = (props: MultiInfoCardType) => {
  const { label, styles = {}, variant = ComponentVariant.LARGE } = props;

  return (
    <div sx={{ ...containerStyles, ...styles }}>
      <div
        sx={{
          display: "flex",
          // paddingX: 1,
          flexWrap: "wrap",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          paddingY: 3,
          background: colors.red200,
        }}
      >
        <q sx={getQuoteStyles(variant)}>
          <a sx={quoteAnchorStyles} href="https://liverpoolfc.com">
            {label}
            <span sx={iconContainerStyles}>
              <RightArrowIcon variant={variant} styles={{ marginLeft: -1 }} />
            </span>
          </a>
        </q>
        <SnackNews variant={variant} />
      </div>
    </div>
  );
};

export default MultiInfoCard;
