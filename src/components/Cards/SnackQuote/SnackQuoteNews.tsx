/** @jsxImportSource theme-ui */

import { useIonRouter } from "@ionic/react";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { ComponentVariant } from "../../../types/modifier";
import { NEWSPAGE_BASE_URL } from "../../../utils/pages";
import { isNativeMobileApp } from "../../Ionic/utils/capacitor";
import Link from "../../Primitives/Link";

type SnackNewsType = {
  description: string;
  description_uri: string;
  imageSrc: string;
  slug: string;
  category?: string;
  styles?: ThemeUICSSObject;
  variant?: ComponentVariant;
};

const containerStyles: ThemeUICSSObject = {
  marginTop: 3,
  borderTop: "1px solid",
  borderColor: colors.white300,
};

const wrapperStyles: ThemeUICSSObject = {
  //// marginX: -1,
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

const imageWrapperStyles: ThemeUICSSObject = {
  position: "relative",
  display: "block",
  marginRight: 1,
  width: ["120px", null, "160px"],
};

const SnackQuoteNews = (props: SnackNewsType) => {
  const {
    imageSrc,
    description,
    slug,
    category,
    styles = {},
    variant = ComponentVariant.LARGE,
  } = props;

  const articleVariantImageSize =
    variant === ComponentVariant.SMALL
      ? 48
      : variant === ComponentVariant.MEDIUM
      ? 64
      : 96;

  const router = useRouter();
  const ionRouter = useIonRouter();
  const newspageSlug = isNativeMobileApp ? `/newspage/` : `/news/`;
  const currentPageURL = isNativeMobileApp
    ? ionRouter.routeInfo.pathname
    : router.route;

  const isNewsPage = currentPageURL.startsWith(newspageSlug);

  const descriptionArticleSlug = slug;

  const descriptionArticleRoute = isNewsPage
    ? `${descriptionArticleSlug}`
    : `${NEWSPAGE_BASE_URL}/${descriptionArticleSlug}`;

  return (
    <div sx={containerStyles}>
      <Link
        href={`${descriptionArticleRoute}`}
        styles={getWrapperStyles(variant)}
      >
        <div sx={{ display: "flex", alignItems: "center" }}>
          <div sx={imageWrapperStyles}>
            <Image
              src={imageSrc}
              layout="responsive"
              objectFit="cover"
              alt={slug}
              height={articleVariantImageSize}
              width={100}
            />
          </div>
          <h2>
            {category ? (
              <span sx={getKickerStyles(variant)}>{category}</span>
            ) : (
              <></>
            )}
            <span sx={getInfoTextStyles(variant)}>{description}</span>
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default SnackQuoteNews;
