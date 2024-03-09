/** @jsxImportSource theme-ui */

import { colors } from "../../../styles/theme";
import { ColorTheme } from "../../../types/modifier";
import { NEWSPAGE_BASE_URL } from "../../../utils/pages";
import { getArticleFormattedDate } from "../../../utils/util";
import { ArticleVariant, NewscardProps, imageIconStyles } from "../ArticleCard";
import PlayIcon from "../../Icons/Play";
import Pill from "../../Primitives/Pill";
import { ThemeUICSSObject } from "theme-ui";
import { BsFilm } from "react-icons/bs";
import Image from "next/image";

type BasicArticleCardProps = NewscardProps & {
  cricfanaticOriginals?: boolean;
  cardType?: "Video" | "Article";
  reelVideo?: boolean;
};

const BasicArticleCard = (props: BasicArticleCardProps) => {
  const {
    theme = ColorTheme.LIGHT,
    variant = ArticleVariant.SMALL,
    styles = {},
    imageSrc,
    label,
    slug,
    badge,
    date,
    category,
    cricfanaticOriginals,
    cardType,
    reelVideo,
  } = props;

  const articlePublishedDate = getArticleFormattedDate(date);

  const path =
    cardType === "Video"
      ? reelVideo
        ? `reelvideos/${slug}`
        : `videospage/${slug}`
      : `${NEWSPAGE_BASE_URL}/${slug}`;

  const smVariant = ["140px", "160px", "210px"];
  const mdVariant = ["180px", "230px", "280px"];
  const lgVariant = ["210px", "260px", "310px"];

  const articleVariantImageSize =
    variant === ArticleVariant.SMALL
      ? smVariant
      : variant === ArticleVariant.MEDIUM
      ? mdVariant
      : lgVariant;

  const cardBorderColor: ThemeUICSSObject = {
    ...(theme === ColorTheme.LIGHT || theme === ColorTheme.GRAY
      ? {
          // borderBottomColor: colors.gray200,
          borderBottomColor: "rgba(12, 12, 12, 0.17)",
        }
      : {}),
  };

  const cardStyles: ThemeUICSSObject = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxShadow: "none",
    borderBottom: "1px solid",
    borderBottomColor: colors.white200,
    ...cardBorderColor,
    backgroundColor:
      theme === ColorTheme.GRAY
        ? colors.gray300
        : theme === ColorTheme.LIGHT
        ? colors.white
        : colors.experimental.blue100,
    margin: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // borderRadius: 0,
  };

  const cardInfoColor: ThemeUICSSObject = {
    ...(theme === ColorTheme.LIGHT || theme === ColorTheme.GRAY
      ? {
          "> p": {
            color: colors.black,
          },
          "> h2": {
            color: colors.black,
          },
        }
      : {
          "> p": {
            color: colors.white100,
          },
          "> h2": {
            color: colors.white,
          },
        }),
  };

  return (
    <div sx={{ padding: 1, height: "100%", ...styles }}>
      {/* routerLink={path} */}
      <div sx={cardStyles}>
        <div sx={{ position: "relative", display: "block" }}>
          <Image
            src={imageSrc}
            alt={slug}
            sx={{
              height: articleVariantImageSize,
              maxWidth: "100%",
              objectFit: "cover",
            }}
          />

          <div sx={imageIconStyles}>
            <div
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingX: 2,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {cardType === "Video" ? (
                reelVideo ? (
                  <div sx={{ paddingRight: 2 }}>
                    <BsFilm color="white" fontSize={22} />
                  </div>
                ) : (
                  <PlayIcon />
                )
              ) : (
                <></>
              )}

              {cricfanaticOriginals && (
                <Pill label={`cf originals`} theme={ColorTheme.DARK} />
              )}

              {cardType === "Video" && badge && !cricfanaticOriginals && (
                <Pill label={badge} theme={ColorTheme.LIGHT} />
              )}
            </div>
          </div>
        </div>

        <div
          sx={{
            paddingLeft: 0,
            paddingTop: "15px",
            paddingBottom: "15px",
          }}
        >
          <div
            sx={{ display: "flex", flexDirection: "column", ...cardInfoColor }}
          >
            {category?.data?.attributes.name && (
              <p
                sx={{
                  variant: "text.subheading4",
                }}
              >
                {category.data.attributes.name}
              </p>
            )}

            <h2
              sx={{
                variant: "text.heading4",
                paddingTop: "5px",
              }}
            >
              {label}
            </h2>

            <p
              sx={{
                variant: "text.label2",
                paddingTop: "5px",
              }}
            >
              {articlePublishedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicArticleCard;
