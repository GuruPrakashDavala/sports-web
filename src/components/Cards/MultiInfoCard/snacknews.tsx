/** @jsxImportSource theme-ui */

import Image from "next/image";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { ComponentVariant } from "../../../types/modifier";

type SnackNewsType = {
  styles?: ThemeUICSSObject;
  variant?: ComponentVariant;
};

const containerStyles: ThemeUICSSObject = {
  marginTop: 3,
  borderTop: "1px solid",
  borderColor: colors.white300,
};

const wrapperStyles: ThemeUICSSObject = {
  marginX: -1,
  transition: "background-color 400ms cubic-bezier(0.645, 0.045, 0.355, 1)",
  willChange: "background-color",
  textDecoration: "none",
  cursor: "pointer",
  display: "block",
  padding: 2,
  marginBottom: -3,
  "> div": {
    transition: "transform 400ms cubic-bezier(0.645, 0.045, 0.355, 1)",
    willChange: "transform",
  },
  "&:hover": {
    transition:
      "background-color 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
    backgroundColor: colors.red150,
    "> div": {
      transform: "translateY(-3px)",
      transition: "transform 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
      willChange: "transform",
    },
  },
};

const kickerStyles: ThemeUICSSObject = {
  display: "inline-block",
  marginRight: "0.5rem",
  color: colors.white,
  variant: "text.subheading4",
};

const getInfoTextStyles = (variant: ComponentVariant): ThemeUICSSObject => {
  switch (variant) {
    case ComponentVariant.LARGE:
      return { variant: "text.heading1", color: colors.white };
    case ComponentVariant.MEDIUM:
      return { variant: "text.heading3", color: colors.white };
    default:
      return { variant: "text.heading4", color: colors.white };
  }
};

const getKickerStyles = (variant: ComponentVariant): ThemeUICSSObject => {
  switch (variant) {
    case ComponentVariant.LARGE:
      return { ...kickerStyles, variant: "text.subheading2" };
    case ComponentVariant.MEDIUM:
      return kickerStyles;
    default:
      return kickerStyles;
  }
};

const getWrapperStyles = (variant: ComponentVariant): ThemeUICSSObject => {
  switch (variant) {
    case ComponentVariant.LARGE:
      return { ...wrapperStyles, paddingX: [3, null, 6, 7] };
    case ComponentVariant.MEDIUM:
      return { ...wrapperStyles, paddingX: [3, null, 6, 7] };
    default:
      return wrapperStyles;
  }
};

const imageWrapperStyles = {
  position: "relative",
  display: "block",
  marginRight: 1,
  width: ["120px", null, "160px"],
};

const SnackNews = (props: SnackNewsType) => {
  const { styles = {}, variant = ComponentVariant.LARGE } = props;

  const articleVariantImageSize =
    variant === ComponentVariant.SMALL
      ? 48
      : variant === ComponentVariant.MEDIUM
      ? 64
      : 96;

  return (
    <div sx={containerStyles}>
      <a href="https://liverpoolfc.com" sx={getWrapperStyles(variant)}>
        <div sx={{ display: "flex", alignItems: "center" }}>
          <div sx={imageWrapperStyles}>
            <Image
              src={"/assets/playerimage.png"}
              layout="responsive"
              objectFit="cover"
              alt="image"
              height={articleVariantImageSize}
              width={"100%"}
            />
          </div>
          <h2>
            <span sx={getKickerStyles(variant)}>Press conference</span>
            <span sx={getInfoTextStyles(variant)}>
              Thiago, student and teacher Thiago, student and teacher Thiago,
              student
            </span>
          </h2>
        </div>
      </a>
    </div>
  );
};

export default SnackNews;
