/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import { ColorTheme } from "../../../types/modifier";
import { ArticleGrid as ArticleGridT } from "../../../types/blocks";
import ArticleCard, { ArticleVariant } from "../../Cards/ArticleCard";
import SectionHeading from "../../SectionHeading";
import SectionWrapper from "../../Wrappers/SectionWrapper";
import { renderImage } from "../../../utils/util";
import ArticleMicroCard from "../../Cards/ArticleMicroCard";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { NEWSPAGE_BASE_URL } from "../../../utils/pages";
import { useRouter } from "next/router";

type ArticleGridProps = { articleGrid: ArticleGridT; theme?: ColorTheme };

const ArticleGrid = ({ articleGrid, theme }: ArticleGridProps) => {
  const { articles, title } = articleGrid;
  const bp = useBreakpointIndex();

  const router = useRouter();
  const newspageSlug = `/news/`;
  const currentPageURL = router.route;

  const isNewsPage = currentPageURL.startsWith(newspageSlug);

  return (
    <SectionWrapper theme={theme}>
      {title && (
        <SectionHeading
          title={title}
          theme={ColorTheme.LIGHT}
          styles={{ px: [0, 1] }}
          link={{
            href: `/${NEWSPAGE_BASE_URL}`,
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
                      : ["100%", null, "calc(100% / 3)", "calc(100% / 3)"],
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
                  isNewsPage={isNewsPage}
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
                isNewsPage={isNewsPage}
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
