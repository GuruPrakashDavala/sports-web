/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { ComponentVariant } from "../../../types/modifier";
import SnackNews from "./SnackNews";
import ForwardArrow from "../../Icons/ForwardArrow";
import { SnackQuoteComponent } from "../../../types/blocks";
import Link from "../../Primitives/Link";
import { renderImage } from "../../../utils/util";
import { NEWSPAGE_BASE_URL } from "../../../utils/pages";
import { useRouter } from "next/router";
import { useIonRouter } from "@ionic/react";
import { isNativeMobileApp } from "../../Ionic/utils/capacitor";

type SnackQuoteProps = {
  block: SnackQuoteComponent;
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
  // "&:hover": {
  //   backgroundColor: colors.experimental.blue150,
  //   transition:
  //     "background-color 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
  //   willChange: "transform",
  // },
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
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "fit-content",
  textDecoration: "none",
  cursor: "pointer",
  color: colors.white,
  background: "linear-gradient(to bottom, #CA0E14 0%, #CA0E14 100%)",
  backgroundPosition: "0 100%",
  transition: "background-size 400ms cubic-bezier(0.200, 0.045, 0.355, 1)",
  willChange: "background-size",
  backgroundRepeat: "repeat-x",
  backgroundSize: "2px 0",
  "&:hover": {
    backgroundSize: "2px 6px",
    transition:
      "background-size 150ms cubic-bezier(0.200, 0.045, 0.355, 1) 100ms",
    "> span": {
      transform: "translateX(5px)",
      transition: "transform 150ms cubic-bezier(0.200, 0.045, 0.355, 1) 100ms",
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

const SnackQuote = (props: SnackQuoteProps) => {
  const { block, styles = {}, variant = ComponentVariant.LARGE } = props;
  const { title_article, description_article } = block;

  const router = useRouter();
  const ionRouter = useIonRouter();
  const newspageSlug = isNativeMobileApp ? `/newspage/` : `/news/`;
  const currentPageURL = isNativeMobileApp
    ? ionRouter.routeInfo.pathname
    : router.route;
  const isNewsPage = currentPageURL.startsWith(newspageSlug);

  const titleArticleSlug = title_article.data.attributes.slug;
  const descriptionArticleSlug = description_article.data.attributes.slug;

  const titleArticleRoute = isNewsPage
    ? `${titleArticleSlug}`
    : `${NEWSPAGE_BASE_URL}/${titleArticleSlug}`;

  return (
    <div sx={{ ...containerStyles, ...styles }}>
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          paddingY: 3,
          background: colors.experimental.blue150,
        }}
      >
        <q sx={getQuoteStyles(variant)}>
          <Link href={`${titleArticleRoute}`} styles={quoteAnchorStyles}>
            <Fragment>
              {title_article.data.attributes.title}
              <span sx={iconContainerStyles}>
                <ForwardArrow variant={variant} styles={{}} />
              </span>
            </Fragment>
          </Link>
        </q>

        <SnackNews
          imageSrc={renderImage(
            description_article.data.attributes.coverimage.data
          )}
          slug={description_article.data.attributes.slug}
          description={description_article.data.attributes.title}
          description_uri={description_article.data.attributes.slug}
          category={
            description_article.data.attributes.category?.data?.attributes.name
          }
          variant={variant}
        />
      </div>
    </div>
  );
};

export default SnackQuote;
