/** @jsxImportSource theme-ui */

import Image from "next/image";
import { colors } from "../../styles/theme";
import { ArticleVariant } from "../Cards/ArticleCard";

type BasicArticleCardProps = {
  variant?: ArticleVariant;
};

const BasicArticleCard = (props: BasicArticleCardProps): JSX.Element => {
  const { variant = ArticleVariant.SMALL } = props;

  const articleVariantImageSize =
    variant === ArticleVariant.SMALL
      ? 48
      : variant === ArticleVariant.MEDIUM
      ? 64
      : 96;
  return (
    <div sx={{ padding: "10px" }}>
      <header>
        <Image
          src={"/assets/pexel.jpg"}
          layout="responsive"
          objectFit="cover"
          alt="image"
          height={articleVariantImageSize}
          width={100}
        />
      </header>
      <div
        sx={{ padding: "15px", backgroundColor: colors.red200, width: "100%" }}
      >
        <p
          sx={{
            variant: "text.label2",
            color: colors.white,
            paddingY: "10px",
          }}
        >
          March 20 2015
        </p>

        <h2
          sx={{
            variant: "text.subheading4",
            color: colors.white,
          }}
        >
          What happened in Thialand?
        </h2>

        <p
          sx={{
            paddingTop: "20px",
            paddingBottom: "40px",
            variant: "text.heading5",
            color: colors.white,
          }}
        >
          Kayaks crowd Three Sister Springs, where people and manatees maintain
          controversial coexistence
        </p>
      </div>
    </div>
  );
};

export default BasicArticleCard;
