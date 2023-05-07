/** @jsxImportSource theme-ui */

import Image from "next/legacy/image";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { ColorTheme, ColorThemeAll } from "../../../types/modifier";
import { CategoryType } from "../../../types/article";
import PlayIcon from "../../Icons/Play";
import Link from "../../Primitives/Link";
import Pill from "../../Primitives/Pill";
import { getArticleFormattedDate } from "../../../utils/util";
import { useBreakpointIndex } from "@theme-ui/match-media";

const cardHoverStyles: ThemeUICSSObject = {
  //   backgroundColor: colors.experimental.blue150,
  //   transition:
  //     "background-color 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
  //   "> div .info": {
  //     transform: "translateY(-3px)",
  //     transition: "transform 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
  //     willChange: "transform",
  //   },
};

const cardStyles: ThemeUICSSObject = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  borderBottom: "1px solid",
  borderBottomColor: colors.white200,
};

const imageWrapper: ThemeUICSSObject = {
  position: "relative",
  // height: ["275px", null, null, "325px"],
  // maxHeight: ["300px", null, null, "400px"],
  // height: "100%",
  // width: "100%",
  display: "block",
};

export const imageIconStyles: ThemeUICSSObject = {
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
  paddingTop: [2, 4, 5],
  paddingBottom: [2, null, 3],
};

// card info styles when hovered out of the card
const cardInfoTransition: ThemeUICSSObject = {
  transition: "transform 400ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
  willChange: "transform",
};

export enum VideoCardVariant {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export type VideoCardProps = {
  label: string;
  imageSrc: string;
  date: Date | string;
  slug: string;
  theme?: ColorThemeAll;
  variant?: VideoCardVariant;
  styles?: ThemeUICSSObject;
  badge?: string;
  category?: CategoryType;
  isActive?: boolean;
  cricfanaticOriginals?: boolean;
};

export const getPillColor = (pillText: string) => {
  switch (pillText) {
    case "TV":
      return ColorTheme.DARK;
    case "Live":
      return ColorTheme.DARK;
    default:
      return ColorTheme.LIGHT;
  }
};

const VideoCard = (props: VideoCardProps): JSX.Element => {
  const {
    theme = ColorTheme.LIGHT,
    variant = VideoCardVariant.SMALL,
    styles = {},
    imageSrc,
    label,
    slug,
    badge,
    date,
    cricfanaticOriginals = false,
  } = props;

  const bp = useBreakpointIndex();

  const containerStyles: ThemeUICSSObject = {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: colors.experimental.blue100,
    cursor: "pointer",
    transition: "background-color 400ms cubic-bezier(0.645, 0.045, 0.355, 1)",
    textDecoration: "none",
    willChange: "background-color",
    paddingX: [null, null, 2],
    paddingTop: 2,
    "&:hover": bp > 1 ? cardHoverStyles : null,
  };

  const articlePublishedDate = getArticleFormattedDate(date);

  const articleVariantImageSize =
    variant === VideoCardVariant.SMALL
      ? 48
      : variant === VideoCardVariant.MEDIUM
      ? 64
      : 96;

  const cardContainer: ThemeUICSSObject = {
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

  const cardInfoColor: ThemeUICSSObject = {
    ...(theme === ColorTheme.LIGHT || theme === ColorTheme.GRAY
      ? // light theme colors
        {
          "> p": {
            color: colors.gray100,
          },
          "> h2": {
            color: colors.black,
          },
        }
      : // dark theme colours
        {
          "> p": {
            color: colors.white100,
          },
          "> h2": {
            color: colors.white,
          },
        }),
  };

  const cardBorderColor: ThemeUICSSObject = {
    ...(theme === ColorTheme.LIGHT || theme === ColorTheme.GRAY
      ? {
          borderBottomColor: colors.gray200,
        }
      : {}),
  };

  const path = `videospage/${slug}`;

  return (
    <Link href={path}>
      <div sx={cardContainer}>
        <div sx={{ ...cardStyles, ...cardBorderColor }}>
          <div className="imageWrapper" sx={imageWrapper}>
            <Image
              src={imageSrc}
              layout="responsive"
              objectFit="cover"
              alt={label}
              height={articleVariantImageSize}
              width={100}
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
                <PlayIcon />
                {cricfanaticOriginals && (
                  <Pill label={`cf originals`} theme={ColorTheme.DARK} />
                )}

                {badge && !cricfanaticOriginals && (
                  <Pill label={badge} theme={ColorTheme.LIGHT} />
                )}
              </div>
            </div>
          </div>

          <div sx={cardInfo}>
            <div className="info" sx={cardInfoTransition}>
              <div sx={cardInfoColor}>
                <h2 sx={{ variant: "text.heading4" }}>{label}</h2>
                <p sx={{ variant: "text.label2", paddingTop: "5px " }}>
                  {articlePublishedDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
