/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { Fragment, useState } from "react";
import ArticleCard, {
  ArticleVariant,
} from "../../components/Cards/ArticleCard";
import ArticleMicroCard from "../../components/Cards/ArticleMicroCard";
import SectionHeading from "../../components/SectionHeading";
import SectionWrapper from "../../components/Wrappers/SectionWrapper";
import { fetchStrapiAPI } from "../../lib/strapi";
import { ArticleType } from "../../types/article";
import { ColorTheme } from "../../types/modifier";
import { renderImage } from "../../utils/util";
import { selectBtnStyles } from "../schedule";

const NewsPage = (props: { articles: ArticleType[] }) => {
  console.log(props.articles);
  const [articles, setArticles] = useState(props.articles);
  const bp = useBreakpointIndex();
  const categories = ["All", "Mens", "Womens", "Breaking"];

  const categoryChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    const articles =
      selectedCategory === "All"
        ? props.articles
        : props.articles.filter((article) => {
            if (article.attributes.category?.data) {
              return (
                article.attributes.category.data.attributes.name ===
                event.target.value
              );
            }
          });

    setArticles(articles);
    console.log(event.target.value);
    console.log(articles);
  };

  return (
    <SectionWrapper>
      <div
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: [null, 2, null, 3],
        }}
      >
        <SectionHeading
          title={`All news`}
          theme={ColorTheme.LIGHT}
          styles={{ px: [0, 1] }}
        />

        <select
          name="league"
          sx={{ ...selectBtnStyles, width: "fit-content" }}
          onChange={categoryChanged}
        >
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

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
          {articles.map((block, index) => {
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
                  styles={{ height: "100%" }}
                />
              </div>
            );
          })}
        </div>
      )}

      {bp === 0 &&
        articles.map((block) => {
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
                styles={{ height: "100%" }}
              />
            </Fragment>
          );
        })}
    </SectionWrapper>
  );
};

export default NewsPage;

export async function getStaticProps(context: any) {
  const [articles] = await Promise.all([
    fetchStrapiAPI(`/articles?populate=deep, 2`),
  ]);

  return {
    props: { articles: articles.data },
    revalidate: 60 * 30,
  };
}
