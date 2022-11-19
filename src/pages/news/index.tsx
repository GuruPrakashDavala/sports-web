/** @jsxImportSource theme-ui */

import { useEffect } from "react";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { useRouter } from "next/router";
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

type ArticleCategories = {
  attributes: {
    name: string;
  };
};

const NewsPage = (props: {
  articles: ArticleType[];
  categories: ArticleCategories[];
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [articles, setArticles] = useState(props.articles);
  const bp = useBreakpointIndex();
  const router = useRouter();
  const categories = props.categories.map((category) => {
    return category.attributes.name;
  });

  useEffect(() => {
    router.query.category
      ? setSelectedCategory(router.query.category as string)
      : setSelectedCategory("All");

    const articles =
      !selectedCategory || selectedCategory === "All"
        ? props.articles
        : props.articles.filter((article) => {
            if (article.attributes.category?.data) {
              return (
                article.attributes.category.data.attributes.name.toLowerCase() ===
                selectedCategory.toLowerCase()
              );
            }
          });
    setArticles(articles);
  }, [router.query.category, selectedCategory]);

  const categoryChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    router.push({ query: { category: event.target.value } });
  };

  return (
    <SectionWrapper styles={{ paddingY: 2 }}>
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
          value={selectedCategory}
        >
          <option value="All">All</option>
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
  try {
    const [articles, categories] = await Promise.all([
      fetchStrapiAPI(`/articles?populate=deep, 2`),
      fetchStrapiAPI(`/categories?fields[0]=name`),
    ]);

    return {
      props: {
        articles: articles.data,
        categories: categories.data,
      },
      revalidate: 60 * 30,
    };
  } catch (err) {
    console.log(err);
    return {};
  }
}
