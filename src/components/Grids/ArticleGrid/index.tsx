/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import { ColorTheme } from "../../../types/modifier";
import { ArticleGrid } from "../../../types/blocks";
import ArticleCard, { ArticleVariant } from "../../Cards/ArticleCard";
import SectionHeading from "../../SectionHeading";
import SectionWrapper from "../../Wrappers/SectionWrapper";
import { renderImage } from "../../../utils/util";
import ArticleMicroCard from "../../Cards/ArticleMicroCard";
import { useBreakpointIndex } from "@theme-ui/match-media";

type ArticleGridProps = { articleGrid: ArticleGrid; theme?: ColorTheme };

const ArticleGrid = ({ articleGrid, theme }: ArticleGridProps) => {
  const { articles, title } = articleGrid;
  const bp = useBreakpointIndex();
  return (
    <SectionWrapper theme={theme}>
      {title && (
        <SectionHeading
          title={title}
          theme={ColorTheme.LIGHT}
          styles={{ px: [0, 1] }}
          link={{
            href: `/news`,
            external: false,
            label: `View all news`,
          }}
        />
      )}
      {bp > 0 && (
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
                      ? ["100%", null, "calc(100% / 3)"]
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
      )}

      {bp === 0 &&
        articles.data.map((block) => {
          return (
            <Fragment key={block.attributes.slug}>
              <ArticleMicroCard
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
            </Fragment>
          );
        })}
    </SectionWrapper>
  );
};

export default ArticleGrid;
