/** @jsxImportSource theme-ui */

import Image from "next/image";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { ColorTheme } from "../../../types/modifier";
import Link from "../../Primitives/Link";
import { ArticleVariant, NewscardProps } from "../ArticleCard";

const cardWrapperStyles: ThemeUICSSObject = {
  display: "flex",
  borderBottom: "1px solid",
  borderBottomColor: colors.gray200,
  paddingBottom: 2,
};

const imageWrapperStyles: ThemeUICSSObject = {
  position: "relative",
  display: "block",
  width: "165px",
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
  const articleVariantImageSize =
    variant === ArticleVariant.SMALL
      ? 48
      : variant === ArticleVariant.MEDIUM
      ? 64
      : 96;
  const path = `news/${slug}`;

  return (
    <Link href={path} styles={{ cursor: "pointer" }}>
      <div sx={cardWrapperStyles}>
        {
          <div sx={imageWrapperStyles}>
            <Image
              src={imageSrc}
              layout="responsive"
              objectFit="cover"
              alt="image"
              height={articleVariantImageSize}
              width={"100%"}
            />
          </div>
        }

        <div>
          {/* <span
            sx={{
              display: "inline-block",
              variant: "text.label2",
            }}
          >
            {}
          </span> */}
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
