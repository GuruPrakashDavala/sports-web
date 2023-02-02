/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";
import AdBlock, { AdBlockVariant } from "../../components/AdBlock";
import SocialIcons from "../../components/News/SocialIcons";
import NewsHeader from "../../components/News/Header";
import AuthorInfoBlock from "../../components/News/AuthorInfoBlock";
import PublishInfo from "../../components/News/PublishInfo";
import ArticleGrid from "../../components/Grids/ArticleGrid";
import { ArticleBlocks, ArticleType } from "../../types/article";
import TwitterTweetEmbed from "../../components/SocialEmbeds/TwitterTweetEmbed";
import { renderImage } from "../../utils/util";
import ArticleCard from "../../components/Cards/ArticleCard";
import { ColorTheme, ComponentVariant } from "../../types/modifier";
import SnackQuote from "../../components/Cards/SnackQuote";
import ImageCarousel from "../../components/CarouselBlocks/ImageCarousel";
import ArticleImage from "../../components/ArticlePrimitives/Image";
import ArticleQuote from "../../components/ArticlePrimitives/Quote";
import RichText from "../../components/ArticlePrimitives/RichText/Index";
import {
  recentArticlesStrapiAPI,
  useArticle,
  useRecentArticles,
} from "../../utils/queries";
import { useRouter } from "next/router";
import { fetchStrapiAPI } from "../../lib/strapi";
import { isNativeMobileApp } from "../../components/Ionic/utils/capacitor";

const articleContainerStyles: ThemeUICSSObject = {
  paddingX: [2, null, null, 7],
  paddingY: [null, null, 5],
};

export const articleBodyWrapperStyles: ThemeUICSSObject = {
  display: "grid",
  gridTemplateColumns: ["100%", null, null, "16.66% 8.3% 50% 25%"],
  // gridTemplateRows: "[row1] auto [row2] auto [row3] auto",
  width: "calc(100 % -80px)",
  marginLeft: "auto",
  marginRight: "auto",
  minHeight: "40vh",
  paddingTop: 0,
  paddingBottom: 0,
  maxWidth: "105rem",
};

const sideAdBlock: ThemeUICSSObject = {
  marginX: 2,
};

type ArticlePageProps = {
  article?: ArticleType;
  recentArticles?: ArticleType[];
  slug: string;
  articleId: string;
  styles?: ThemeUICSSObject;
};

type BlockPickerProps = {
  block: ArticleBlocks;
  index?: number;
  isLastBlock?: boolean;
};

const BlockPicker = ({
  block,
  index,
  isLastBlock,
}: BlockPickerProps): JSX.Element => {
  switch (block.type) {
    case "tweetembed":
      return (
        <div sx={{ paddingY: [2, 3] }} key={index}>
          <TwitterTweetEmbed tweetId={block.tweet_id} />
        </div>
      );
    case "videocarousel":
      return (
        <div key={index}>New section - Video Carousel Block placeholder</div>
      );
    case "imagecarousel": {
      return (
        <ImageCarousel images={block.imagecarousel.data} index={block.id} />
      );
    }
    case "richtext":
      return <RichText richText={block.richtext} index={block.id} />;
    case "article":
      return (
        <div sx={{ paddingY: [3, null, null, 4] }} key={index}>
          <ArticleCard
            label={block.article.data.attributes.title}
            imageSrc={renderImage(
              block.article.data.attributes.coverimage.data
            )}
            date={block.article.data.attributes.createdAt}
            slug={block.article.data.attributes.slug}
            badge={block.article.data.attributes.badge?.data?.attributes.name}
            category={block.article.data.attributes.category}
            theme={ColorTheme.DARK}
            styles={{ paddingX: [2, null] }}
          />
        </div>
      );
    case "image":
      return (
        <ArticleImage
          image={block.image.data}
          source={block.source}
          index={block.id}
        />
      );
    case "quote":
      return (
        <ArticleQuote
          pre={block.pre}
          post={block.post}
          index={block.id}
          quote={block.quote}
        />
      );
    case "snackquote":
      return <SnackQuote block={block} variant={ComponentVariant.SMALL} />;
    default:
      return <></>;
  }
};

type ArticleDetailPageContentProps = {
  article: ArticleType;
  recentArticles?: ArticleType[];
  styles?: ThemeUICSSObject;
};

export const ArticleDetailPageContent = (
  props: ArticleDetailPageContentProps
): JSX.Element => {
  const { article, recentArticles, styles } = props;

  return (
    <Fragment>
      <NewsHeader
        title={article.attributes.title}
        category={article.attributes.category?.data?.attributes.name}
        imageSrc={renderImage(article.attributes.coverimage.data)}
      />

      <div sx={articleContainerStyles}>
        <div sx={articleBodyWrapperStyles}>
          {/* Article author info block */}
          <AuthorInfoBlock createdAt={article.attributes.createdAt} />

          {/* Article m ads */}
          <div></div>

          {/* Article body */}

          <div>
            {/* Create a block picker which can hand pick the components and render inside the body */}
            <AdBlock variant={AdBlockVariant.HORIZONTAL} />

            {article.attributes.blocks?.map((block, i) => {
              const isLastBlock = article.attributes.blocks?.length === i;
              return (
                <Fragment key={i}>
                  <BlockPicker
                    block={block}
                    index={i}
                    isLastBlock={isLastBlock}
                  />
                </Fragment>
              );
            })}

            {/* Published info */}
            <div>
              <PublishInfo
                date={article.attributes.createdAt}
                styles={{
                  variant: "text.label1",
                  color: colors.gray100,
                  paddingY: 3,
                  paddingTop: 4,
                }}
              />
              <SocialIcons />
            </div>
          </div>

          {/* Article side ads */}

          <div sx={sideAdBlock}>
            {/* <AdBlock variant={AdBlockVariant.SQUARE} height={60} />
                <AdBlock variant={AdBlockVariant.SQUARE} height={60} /> */}

            {/* <RelatedArticles recentArticles={recentArticles} /> */}
          </div>
        </div>

        <AdBlock
          variant={AdBlockVariant.HORIZONTAL}
          path={`/assets/big_ad.gif`}
          height={12}
        />
      </div>

      {/* Recent articles */}

      {recentArticles && !isNativeMobileApp && (
        <ArticleGrid
          articleGrid={{
            articles: { data: recentArticles },
            id: 1,
            title: `Recent articles`,
            type: `articlegrid`,
          }}
          theme={ColorTheme.GRAY}
        />
      )}
    </Fragment>
  );
};

const ArticlePage = (props: ArticlePageProps) => {
  const { slug, styles = {} } = props;

  const { data: articleData, isLoading: articleLoading } = useArticle(slug);

  const { isLoading: recentArticlesLoading, data: articles } =
    useRecentArticles();

  const recentArticles =
    !recentArticlesLoading && articles ? articles.data : props.recentArticles;

  const article = articleData ? articleData.data[0] : props.article;

  return (
    <Fragment>
      {article && (
        <ArticleDetailPageContent
          article={article}
          recentArticles={recentArticles}
        />
      )}
    </Fragment>
  );
};

export default ArticlePage;

// #!if isWeb === "true"
export async function getServerSideProps(context: any) {
  const slug = context.params.slug;
  const [article, recentArticles] = await Promise.all([
    fetchStrapiAPI(`/articles?filters[slug][$eq]=${slug}&populate=deep, 4`),
    fetchStrapiAPI(recentArticlesStrapiAPI),
  ]);

  if (!article.data || article.data.length === 0) {
    console.log("articleNotMatchedWithSlug");
    console.log(slug);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article: article.data[0],
      articleId: article.data[0].id,
      slug,
      recentArticles: recentArticles.data,
    },
  };
}
// #!endif
