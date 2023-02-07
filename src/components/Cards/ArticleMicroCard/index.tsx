/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import Image from "next/image";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { NEWSPAGE_BASE_URL } from "../../../utils/pages";
import getArticleFormattedDate from "../../../utils/util";
import Link from "../../Primitives/Link";
import { ArticleVariant, NewscardProps } from "../ArticleCard";

const cardHoverStyles: ThemeUICSSObject = {
  transition:
    "background-color 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
  "> div .info": {
    transform: "translateY(-3px)",
    transition: "transform 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
    willChange: "transform",
  },
};

// card info styles when hovered out of the card
const cardInfoTransition: ThemeUICSSObject = {
  transition: "transform 400ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
  willChange: "transform",
};

const imageWrapperStyles: ThemeUICSSObject = {
  position: "relative",
  display: "block",
  flexBasis: "50%",
  marginRight: 1,
};

const ArticleMicroCard = (props: NewscardProps) => {
  const {
    imageSrc,
    variant,
    slug,
    label,
    date,
    badge,
    type,
    category,
    isNewsPage,
    styles = {},
  } = props;

  const bp = useBreakpointIndex();
  const articlePublishedDate = getArticleFormattedDate(date);

  const articleVariantImageSize =
    variant === ArticleVariant.SMALL
      ? 48
      : variant === ArticleVariant.MEDIUM
      ? 64
      : 96;

  const path = isNewsPage ? `${slug}` : `${NEWSPAGE_BASE_URL}/${slug}`;

  const cardWrapperStyles: ThemeUICSSObject = {
    display: "flex",
    height: "100%",
    width: "100%",
    textDecoration: "none",
    borderBottom: "1px solid",
    borderBottomColor: colors.gray200,
    paddingY: 2,
    "&:hover": bp > 1 ? cardHoverStyles : null,
  };

  return (
    <Link href={path} styles={{ cursor: "pointer", paddingTop: 2 }}>
      <div sx={{ ...cardWrapperStyles, ...styles }}>
        <div sx={imageWrapperStyles}>
          <Image
            src={imageSrc}
            layout="responsive"
            objectFit="cover"
            alt="image"
            height={articleVariantImageSize}
            width={"120"}
          />

          {/* <div sx={{ ...imageIconStyles, height: "35px" }}>
            <div
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingX: 1,
                paddingY: 1,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {type === "Video" && (
                <PlayIcon variant={ComponentVariant.SMALL} />
              )}

              {badge && badge !== "None" && (
                <Pill label={badge} theme={getPillColor(badge)} />
              )}
            </div>
          </div> */}
        </div>

        <div className="info" sx={{ flexBasis: "50%", ...cardInfoTransition }}>
          <p
            sx={{
              variant: "text.label2",
              color: colors.gray100,
              paddingBottom: "5px",
            }}
          >
            {articlePublishedDate}
          </p>
          <h3 sx={{ color: colors.black, variant: "text.heading4" }}>
            {category?.data?.attributes.name && (
              <span
                sx={{
                  display: "inline-block",
                  marginRight: "0.5rem",
                  variant: "text.subheading4",
                }}
              >
                {category.data.attributes.name}
              </span>
            )}
            {label}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ArticleMicroCard;
