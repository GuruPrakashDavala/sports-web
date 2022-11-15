/** @jsxImportSource theme-ui */

import { fetchStrapiAPI } from "../../../lib/strapi";
import { getArticles } from "../../../lib/strapi-utils";
import { ColorTheme, ComponentVariant } from "../../../types/modifier";
import { ContentGrid } from "../../../types/blocks";
import ArticleCard, { ArticleVariant } from "../../Cards/ArticleCard";
import SnackQuote from "../../Cards/SnackQuote";
import SectionWrapper from "../../Wrappers/SectionWrapper";
import { renderImage } from "../../../utils/util";
import SectionHeading from "../../SectionHeading";

type ContentGridProps = {
  blocks: ContentGrid[];
};

type BlockPickerProps = { block: ContentGrid };

const BlockPicker = ({ block }: BlockPickerProps): JSX.Element => {
  switch (block.type) {
    case "article":
      return (
        <ArticleCard
          label={block.article.data.attributes.title}
          imageSrc={renderImage(block.article.data.attributes.coverimage.data)}
          theme={ColorTheme.DARK}
          variant={ArticleVariant.SMALL}
          slug={block.article.data.attributes.slug}
          date={block.article.data.attributes.createdAt}
          badge={block.article.data.attributes.badge?.data?.attributes.name}
          type={block.article.data.attributes.type}
          category={block.article.data.attributes.category}
          styles={{ height: "100%" }}
        />
      );
    case "snackquote": {
      return (
        <SnackQuote
          block={block}
          variant={ComponentVariant.SMALL}
          styles={{ height: "100%" }}
        />
      );
    }

    default:
      return <></>;
  }
};

const ContentGrid = ({ blocks }: ContentGridProps): JSX.Element => {
  // ContentGrid theme should be always dark
  const theme = ColorTheme.DARK;

  return (
    <SectionWrapper theme={theme}>
      {/* <SectionHeading
        title={`Match schedule & results`}
        theme={ColorTheme.DARK}
        link={{
          href: `/schedule`,
          external: false,
          label: `all schedule`,
        }}
      /> */}
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          margin: 0,
          padding: 0,
        }}
      >
        {blocks &&
          blocks.map((block, index) => (
            <div
              sx={{
                flexBasis: ["100%", null, "calc(100% / 3)"],
                marginBottom: [null, null, 2],
              }}
              key={index}
            >
              <BlockPicker block={block} />
            </div>
          ))}
      </div>
    </SectionWrapper>
  );
};

export default ContentGrid;
