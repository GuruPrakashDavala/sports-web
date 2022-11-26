/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";
import AdBlock, { AdBlockVariant } from "../../components/AdBlock";
import SocialIcons from "../../components/News/SocialIcons";
import NewsHeader from "../../components/News/Header";
import AuthorInfoBlock from "../../components/News/AuthorInfoBlock";
import { Fragment } from "react";
import PublishInfo from "../../components/News/PublishInfo";
import ArticleGrid from "../../components/Grids/ArticleGrid";
import { fetchStrapiAPI } from "../../lib/strapi";
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

const articleContainerStyles: ThemeUICSSObject = {
  paddingX: [3, null, null, 7],
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

const articleTitleStyles: ThemeUICSSObject = {
  paddingY: [1, null, null, 4],
  variant: "text.heading2",
  fontSize: [5, null, null, "2rem"],
};

const sideAdBlock: ThemeUICSSObject = {
  marginX: 2,
};

type ArticlePageProps = {
  data: ArticleType;
  recentArticles: ArticleType[];
  styles?: ThemeUICSSObject;
};

type BlockPickerProps = {
  block: ArticleBlocks;
  index?: number;
};

const BlockPicker = ({ block, index }: BlockPickerProps): JSX.Element => {
  switch (block.type) {
    case "tweetembed":
      return (
        <div sx={{ px: [2], py: [4] }} key={index}>
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

const ArticlePage = (props: ArticlePageProps) => {
  const { data, recentArticles, styles = {} } = props;
  console.log(data);

  return (
    <Fragment>
      <NewsHeader
        title={data.attributes.title}
        category={data.attributes.category?.data?.attributes.name}
        imageSrc={renderImage(data.attributes.coverimage.data)}
      />
      <div sx={articleContainerStyles}>
        <div sx={articleBodyWrapperStyles}>
          {/* Article author info block */}
          <AuthorInfoBlock date={data.attributes.createdAt} />

          {/* Article m ads */}
          <div></div>

          {/* Article body */}

          <div>
            {/* Create a block picker which can hand pick the components and render inside the body */}
            <AdBlock variant={AdBlockVariant.HORIZONTAL} />

            {data.attributes.blocks?.map((block, i) => {
              return (
                <Fragment key={i}>
                  <BlockPicker block={block} index={i} />
                </Fragment>
              );
            })}

            {/* Published info */}
            <div>
              <PublishInfo
                date={data.attributes.createdAt}
                styles={{
                  variant: "text.label1",
                  color: colors.gray100,
                  paddingBottom: 3,
                  marginTop: 6,
                }}
              />
              <SocialIcons />
            </div>
          </div>

          {/* Article side ads */}

          <div sx={sideAdBlock}>
            <AdBlock variant={AdBlockVariant.SQUARE} height={60} />
            <AdBlock variant={AdBlockVariant.SQUARE} height={60} />
          </div>
        </div>

        <AdBlock
          variant={AdBlockVariant.HORIZONTAL}
          path={`/assets/big_ad.gif`}
          height={12}
        />
      </div>
      {/* Recent articles */}
      <ArticleGrid
        articleGrid={{
          articles: { data: recentArticles },
          id: 1,
          title: `Recent articles`,
          type: `articlegrid`,
        }}
        theme={ColorTheme.GRAY}
      />
    </Fragment>
  );
};

export default ArticlePage;

// pages/posts/[id].js

// Generates `/posts/1` and `/posts/2`

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { slug: "1" } }, { params: { slug: "2" } }],
//     fallback: false, // can also be true or 'blocking'
//   };
// }

// export async function getStaticProps() {
//   const post = await getPost("");
//   // const post = await res.json();
//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       post,
//     },
//   };
// }

export async function getServerSideProps(context: any) {
  const slug = context.params.slug;
  const [article, recentArticles] = await Promise.all([
    fetchStrapiAPI(`/articles?filters[slug][$eq]=${slug}&populate=deep, 4`),
    fetchStrapiAPI(
      `/articles?pagination[page]=1&pagination[pageSize]=5&populate=deep,2 &sort=updatedAt:desc`
    ),
  ]);

  if (!article.data || article.data.length === 0) {
    console.log(article);
    return {
      notFound: true,
    };
  }

  return {
    props: { data: article.data[0], recentArticles: recentArticles.data },
  };
}
