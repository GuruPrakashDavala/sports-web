/** @jsxImportSource theme-ui */

import { useRecentArticles } from "../../../utils/queries";
import { Fragment } from "react";
import ArticleMicroCard from "../../Cards/ArticleMicroCard";
import { renderImage } from "../../../utils/util";
import { ArticleVariant } from "../../Cards/ArticleCard";
import { ColorTheme } from "../../../types/modifier";
import { ArticleType } from "../../../types/article";
import { ThemeUICSSObject } from "theme-ui";

const RelatedArticles = (props: {
  recentArticles?: ArticleType[];
  styles?: ThemeUICSSObject;
}): JSX.Element => {
  const styles = props.styles;
  const { isLoading, data: articles } = useRecentArticles();
  const recentArticles =
    !isLoading && articles ? articles.data : props.recentArticles;

  return (
    <Fragment>
      {recentArticles &&
        recentArticles.length > 0 &&
        recentArticles.map((block) => (
          <div key={block.attributes.slug}>
            <ArticleMicroCard
              label={block.attributes.title}
              imageSrc={renderImage(block.attributes.coverimage.data)}
              variant={ArticleVariant.MEDIUM}
              date={block.attributes.createdAt}
              badge={block.attributes.badge?.data?.attributes.name}
              type={block.attributes.type}
              category={block.attributes.category}
              slug={block.attributes.slug}
              theme={ColorTheme.GRAY}
              styles={{ height: "100%", paddingX: 2, ...styles }}
            />
          </div>
        ))}
    </Fragment>
  );
};

export default RelatedArticles;
