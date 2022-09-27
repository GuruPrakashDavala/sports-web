/** @jsxImportSource theme-ui */

import { ColorTheme } from "../../../types/modifier";
import { ArticleGrid } from "../../../types/blocks";
import ArticleCard, { ArticleVariant } from "../../Cards/ArticleCard";
import SectionHeading from "../../SectionHeading";
import SectionWrapper from "../../Wrappers/SectionWrapper";
import { renderImage } from "../../../utils/util";

type ArticleGridProps = { articleGrid: ArticleGrid; theme?: ColorTheme };

const ArticleGrid = ({ articleGrid, theme }: ArticleGridProps) => {
  const { articles, title } = articleGrid;
  return (
    <SectionWrapper theme={theme}>
      {title && (
        <SectionHeading
          title={title}
          theme={ColorTheme.LIGHT}
          styles={{ px: [0, 1] }}
        />
      )}
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          margin: 0,
          padding: 0,
        }}
      >
        {articles.data.map((block, index) => {
          return (
            <div
              sx={{
                flexBasis:
                  index < 2
                    ? ["100%", null, "calc(100% / 2)"]
                    : ["100%", null, "calc(100% / 2)", "calc(100% / 3)"],
                marginBottom: [null, null, 2],
              }}
              key={index}
            >
              <ArticleCard
                label={block.attributes.title}
                imageSrc={renderImage(block.attributes.coverimage.data)}
                variant={ArticleVariant.MEDIUM}
                date={block.attributes.createdAt}
                badge={block.attributes.badge?.data?.attributes.name}
                type={block.attributes.type}
                category={block.attributes.category}
                slug={block.attributes.slug}
                theme={theme}
                styles={{ height: "100%" }}
              />
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default ArticleGrid;
