/** @jsxImportSource theme-ui */

import Image from "next/image";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { ColorTheme, ColorThemeAll } from "../../../types/modifier";
import { CategoryType } from "../../../types/article";
import PlayIcon from "../../Icons/Play";
import Link from "../../Primitives/Link";
import Pill from "../../Primitives/Pill";
import getArticleFormattedDate from "../../../utils/util";

const cardHoverStyles: ThemeUICSSObject = {
  backgroundColor: colors.red150,
  transition:
    "background-color 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
  "> div .info": {
    transform: "translateY(-3px)",
    transition: "transform 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
    willChange: "transform",
  },
};

// Experimental card hover styles
const simpleCardHoverStyles: ThemeUICSSObject = {
  backgroundColor: colors.red150,
  transition: ".25s ease",
  willChange: "transform",
  "&:hover": {
    //opacity: ".875",
    transform: "scale(0.985)",
  },
};

const containerStyles: ThemeUICSSObject = {
  display: "flex",
  flexWrap: "wrap",
  backgroundColor: colors.red100,
  cursor: "pointer",
  transition: "background-color 400ms cubic-bezier(0.645, 0.045, 0.355, 1)",
  textDecoration: "none",
  willChange: "background-color",
  paddingX: [null, null, 2],
  paddingTop: 2,
  "&:hover": cardHoverStyles,
};

const cardStyles: ThemeUICSSObject = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  borderBottom: "1px solid",
  borderBottomColor: "rgba(255, 255, 255, 0.4)",
};

const imageContainer: ThemeUICSSObject = {
  // relative needed for icons and gradient
  // position: "relative",
  // height: "100%",
  // width: "100%",
};

const imageWrapper: ThemeUICSSObject = {
  position: "relative",
  // height: ["275px", null, null, "325px"],
  // maxHeight: ["300px", null, null, "400px"],
  // height: "100%",
  // width: "100%",
  display: "block",
};

const imageIconStyles: ThemeUICSSObject = {
  position: "absolute",
  background: "linear-gradient(rgba(12, 12, 12, 0), rgba(12, 12, 12, 0.6))",
  width: "100%",
  height: "45px",
  bottom: 0,
  left: 0,
};

const cardInfo: ThemeUICSSObject = {
  flexGrow: 1,
  gap: 1,
  color: colors.white,
  paddingTop: 5,
  paddingBottom: 3,
};

// card info styles when hovered out of the card
const cardInfoTransition: ThemeUICSSObject = {
  transition: "transform 400ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
  willChange: "transform",
};

export enum ArticleVariant {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

type NewscardProps = {
  label: string;
  imageSrc: string;
  date: Date | string;
  slug: string;
  theme?: ColorThemeAll;
  variant?: ArticleVariant;
  styles?: ThemeUICSSObject;
  badge?: string;
  type?: string;
  category?: CategoryType;
};

const getPillColor = (pillText: string) => {
  switch (pillText) {
    case "TV":
      return ColorTheme.DARK;
    default:
      return ColorTheme.LIGHT;
  }
};

const ArticleCard = (props: NewscardProps): JSX.Element => {
  const {
    theme = ColorTheme.LIGHT,
    variant = ArticleVariant.SMALL,
    styles = {},
    imageSrc,
    label,
    slug,
    badge,
    type,
    date,
    category,
  } = props;

  const articlePublishedDate = getArticleFormattedDate(date);

  const articleVariantImageSize =
    variant === ArticleVariant.SMALL
      ? 48
      : variant === ArticleVariant.MEDIUM
      ? 64
      : 96;

  const cardContainer = {
    ...containerStyles,
    ...(theme === ColorTheme.GRAY
      ? {
          backgroundColor: colors.gray300,
          "&:hover": {
            ...cardHoverStyles,
            backgroundColor: colors.gray300,
          },
        }
      : theme === ColorTheme.LIGHT
      ? {
          backgroundColor: colors.white,
          "&:hover": {
            ...cardHoverStyles,
            backgroundColor: colors.gray300,
          },
        }
      : {}),
    ...styles,
  };

  const cardInfoColor = {
    ...(theme === ColorTheme.LIGHT || theme === ColorTheme.GRAY
      ? // light theme colors
        {
          "> p": {
            color: colors.gray100,
          },
          "> h2 span": {
            color: colors.black,
          },
        }
      : // dark theme colours
        {
          "> p": {
            color: colors.white100,
          },
          "> h2 span": {
            color: colors.white,
          },
        }),
  };

  const cardBorderColor = {
    ...(theme === ColorTheme.LIGHT || theme === ColorTheme.GRAY
      ? {
          borderBottomColor: colors.gray200,
        }
      : {}),
  };

  const path = `news/${slug}`;

  return (
    <Link href={path}>
      <div sx={cardContainer}>
        <div sx={{ ...cardStyles, ...cardBorderColor }}>
          <div sx={imageContainer}>
            <div className="imageWrapper" sx={imageWrapper}>
              <Image
                src={imageSrc}
                layout="responsive"
                objectFit="cover"
                alt="image"
                height={articleVariantImageSize}
                width={"100%"}
              />

              <div sx={imageIconStyles}>
                <div sx={{ display: "flex", flexDirection: "row" }}>
                  {type === "Video" ? <PlayIcon /> : <></>}
                  {/* Here badge should be a enum of categories */}
                  {badge && badge !== "None" ? (
                    <Pill label={badge} theme={getPillColor(badge)} />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div sx={cardInfo}>
            <div className="info" sx={cardInfoTransition}>
              <div sx={cardInfoColor}>
                <p sx={{ variant: "text.label2" }}>{articlePublishedDate}</p>
                <h2>
                  <span
                    sx={{
                      display: "inline-block",
                      marginRight: "0.5rem",
                      color: colors.white,
                      variant: "text.subheading4",
                    }}
                  >
                    {category?.data?.attributes.name && (
                      <>{category.data.attributes.name}</>
                    )}
                  </span>
                  <span sx={{ variant: "text.heading5" }}>{label}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
