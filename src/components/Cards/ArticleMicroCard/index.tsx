/** @jsxImportSource theme-ui */

import Image from "next/image";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { ColorTheme, ComponentVariant } from "../../../types/modifier";
import getArticleFormattedDate from "../../../utils/util";
import PlayIcon from "../../Icons/Play";
import Link from "../../Primitives/Link";
import Pill from "../../Primitives/Pill";
import {
  ArticleVariant,
  getPillColor,
  imageIconStyles,
  NewscardProps,
} from "../ArticleCard";

const cardWrapperStyles: ThemeUICSSObject = {
  display: "flex",
  height: "100%",
  width: "100%",
  borderBottom: "1px solid",
  borderBottomColor: colors.gray200,
  paddingY: 2,
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
    theme = ColorTheme.LIGHT,
    slug,
    label,
    date,
    badge,
    type,
    category,
    styles = {},
  } = props;
  const articlePublishedDate = getArticleFormattedDate(date);

  const articleVariantImageSize =
    variant === ArticleVariant.SMALL
      ? 48
      : variant === ArticleVariant.MEDIUM
      ? 64
      : 96;

  const path = `news/${slug}`;

  return (
    <Link href={path} styles={{ cursor: "pointer", paddingTop: 2 }}>
      <div sx={cardWrapperStyles}>
        <div sx={imageWrapperStyles}>
          <Image
            src={imageSrc}
            layout="responsive"
            objectFit="cover"
            alt="image"
            height={articleVariantImageSize}
            width={"170"}
          />

          <div sx={{ ...imageIconStyles, height: "35px" }}>
            <div sx={{ display: "flex", flexDirection: "row", paddingX: 1 }}>
              {type === "Video" ? (
                <PlayIcon variant={ComponentVariant.SMALL} />
              ) : (
                <></>
              )}
              {badge && badge !== "None" ? (
                <Pill label={badge} theme={getPillColor(badge)} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div sx={{ flexBasis: "50%" }}>
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
