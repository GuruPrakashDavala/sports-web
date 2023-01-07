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
import { useInfiniteArticles } from "../../utils/queries";
import { colors } from "../../styles/theme";
import RightArrowIcon from "../../components/Icons/RightArrow";
import ArticleCardSkeleton from "../../components/Loaders/Cards/ArticleCard";
import { ThemeUICSSObject } from "theme-ui";

type ArticleCategories = {
  attributes: {
    name: string;
    slug: string;
  };
};

export type InfiniteArticlesResponseType = {
  pages: { data: ArticleType[]; meta: any }[];
  pageParams: any;
};

const headerTitleContainerStyles: ThemeUICSSObject = {
  display: "flex",
  flexDirection: ["column", "row"],
  justifyContent: [null, "space-between"],
  alignItems: [null, "center"],
  paddingRight: [null, 2, null, 3],
};

const loaderContainerStyles: ThemeUICSSObject = {
  display: "flex",
  margin: 0,
  padding: 0,
  flexDirection: "row",
  flexWrap: "wrap",
};

export const loadMoreBtnStyles = (hasNextPage?: boolean): ThemeUICSSObject => {
  return {
    display: "flex",
    backgroundColor: !hasNextPage ? colors.gray200 : colors.black,
    padding: 1,
    width: "200px",
    height: "50px",
    justifyContent: "center",
    alignItems: "center",
    ...(hasNextPage && {
      "&:hover": {
        opacity: ".675",
        "> div": {
          transition: ".25s ease",
          transform: "translateX(10%)",
        },
      },
    }),
  };
};

const NewsPage = (props: {
  articles: ArticleType[];
  categories: ArticleCategories[];
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const bp = useBreakpointIndex();
  const router = useRouter();
  const newsCategories = props.categories.filter(
    (category) => category.attributes.slug !== "All"
  );

  const initialData: InfiniteArticlesResponseType = {
    pages: [{ data: props.articles, meta: undefined }],
    pageParams: [undefined],
  };

  const {
    isLoading,
    isError,
    error,
    data: articlesData,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteArticles({
    category: selectedCategory,
    initialData,
  });

  const articles = articlesData
    ? (articlesData as unknown as InfiniteArticlesResponseType)
    : initialData;

  useEffect(() => {
    if (router.query.category) {
      setSelectedCategory(router.query.category as string);
    }
  }, [router.query.category]);

  const categoryChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    router.push({ query: { category: event.target.value } });
  };

  const loadMore = () => {
    fetchNextPage();
  };

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <SectionWrapper styles={{ paddingY: 2 }}>
      <div sx={headerTitleContainerStyles}>
        <SectionHeading
          title={`News`}
          theme={ColorTheme.LIGHT}
          styles={{ px: [0, 1] }}
        />

        <select
          name="category"
          sx={{ ...selectBtnStyles, marginBottom: 1 }}
          onChange={categoryChanged}
          value={selectedCategory}
        >
          <option value="All">All topics</option>
          {newsCategories.map((category) => (
            <option
              value={category.attributes.slug}
              key={category.attributes.slug}
            >
              {category.attributes.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading state */}
      {!articles && isLoading && (
        <div sx={loaderContainerStyles}>
          {new Array(8).fill(0).map((_item, index) => (
            <Fragment key={index}>
              <ArticleCardSkeleton
                styles={{
                  flexBasis: ["100%", "calc(100% / 2)", "calc(100% / 3)"],
                }}
              />
            </Fragment>
          ))}
        </div>
      )}

      {/* Tablets/Desktop layout articles */}

      {bp > 0 && articles ? (
        <div
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            margin: 0,
            padding: 0,
          }}
        >
          {articles.pages.map((group, index) => {
            return (
              <Fragment key={index}>
                {group.data.map((article, index) => (
                  <div
                    sx={{
                      // flexBasis:
                      //   index < 2
                      //     ? ["100%", null, "calc(100% / 2)"]
                      //     : ["100%", null, "calc(100% / 2)", "calc(100% / 3)"],
                      flexBasis: [
                        "100%",
                        null,
                        "calc(100% / 2)",
                        "calc(100% / 3)",
                      ],
                      marginBottom: [null, null, 2],
                    }}
                    key={article.attributes.slug}
                  >
                    <ArticleCard
                      label={article.attributes.title}
                      imageSrc={renderImage(article.attributes.coverimage.data)}
                      variant={ArticleVariant.MEDIUM}
                      date={article.attributes.createdAt}
                      badge={article.attributes.badge?.data?.attributes.name}
                      type={article.attributes.type}
                      category={article.attributes.category}
                      slug={article.attributes.slug}
                      styles={{ height: "100%" }}
                    />
                  </div>
                ))}
              </Fragment>
            );
          })}
        </div>
      ) : (
        //  bp === 0: Mobile layout articles
        articles.pages.map((group, index) => {
          return (
            <Fragment key={index}>
              {group.data.map((article) => (
                <Fragment key={article.attributes.slug}>
                  <ArticleMicroCard
                    label={article.attributes.title}
                    imageSrc={renderImage(article.attributes.coverimage.data)}
                    variant={ArticleVariant.MEDIUM}
                    date={article.attributes.createdAt}
                    badge={article.attributes.badge?.data?.attributes.name}
                    type={article.attributes.type}
                    category={article.attributes.category}
                    slug={article.attributes.slug}
                    styles={{ height: "100%" }}
                  />
                </Fragment>
              ))}
            </Fragment>
          );
        })
      )}

      {/* Load more button component */}

      {articles && (
        <div
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingY: 2,
          }}
        >
          <button
            type="button"
            sx={loadMoreBtnStyles(hasNextPage)}
            onClick={loadMore}
            disabled={!hasNextPage}
          >
            <p
              sx={{
                variant: "text.subheading4",
                color: !hasNextPage ? colors.black : colors.white,
              }}
            >
              {!hasNextPage
                ? `All caught up!`
                : isFetching
                ? `Loading`
                : `Load more`}
            </p>

            {hasNextPage && (
              <RightArrowIcon
                styles={{
                  color: colors.white,
                  alignItems: "center",
                }}
              />
            )}
          </button>
        </div>
      )}
    </SectionWrapper>
  );
};

export default NewsPage;

export async function getStaticProps(context: any) {
  try {
    const [articles, categories] = await Promise.all([
      fetchStrapiAPI(
        `/articles?pagination[page]=1&pagination[pageSize]=10&populate=deep, 2&sort=createdAt:desc`
      ),
      fetchStrapiAPI(`/categories?fields[0]=name,slug`),
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
