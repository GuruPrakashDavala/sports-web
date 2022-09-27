/** @jsxImportSource theme-ui */

import { alpha } from "@theme-ui/color";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";
import { cleanArticleFormattedText } from "../../utils/cleaner";
import { markdownToHtml } from "../../lib/posts";
import AdBlock, { AdBlockVariant } from "../../components/AdBlock";
import SocialIcons from "../../components/News/SocialIcons";
import NewsHeader from "../../components/News/Header";
import AuthorInfoBlock from "../../components/News/AuthorInfoBlock";
import { Fragment } from "theme-ui/jsx-runtime";
import PublishInfo from "../../components/News/PublishInfo";
import ArticleGrid from "../../components/Grids/ArticleGrid";
import { fetchAPI } from "../../lib/strapi";
import { ArticleBlocks, ArticleType } from "../../types/article";
import Image from "next/image";
import Carousel, { CarouselItem } from "../../components/Carousel";
import SectionWrapper from "../../components/Wrappers/SectionWrapper";
import SectionHeading from "../../components/SectionHeading";
import { ColorTheme } from "../../types/modifier";
import TwitterTweetEmbed from "../../components/SocialEmbeds/TwitterTweetEmbed";
import { imageHost, renderImage } from "../../utils/util";

export const formattedTextStyles: ThemeUICSSObject = {
  // px: 2,
  p: {
    variant: "text.body2",
    fontSize: [2, null, null, 3],
    // color: colors.gray100,
    lineHeight: "spaceous",
    ":not(:last-child)": { mb: 4 },
  },
  h2: {
    variant: "text.heading2",
    fontSize: [5, null, null, 6],
    color: colors.black,
    mb: 2,
    ":not(:first-of-type)": { mt: 4 },
  },
  "ul, ol": {
    pl: 3,
    variant: "text.body2",
    fontSize: [2, null, null, 3],
    color: colors.gray100,
    lineHeight: "spaceous",
    ":not(:last-child)": { mb: 4 },
  },
  ul: { listStyle: "disc" },
  ol: { listStyle: "decimal" },
  a: {
    color: colors.red100,
    textDecoration: "underline",
    textDecorationColor: alpha(colors.red300, 0.17),
    textDecorationThickness: "2px",
    textUnderlineOffset: "1px",
  },
  "a:hover": { color: colors.red200, textDecorationColor: colors.red100 },
  // Styles for CTAs inlined in the formatted text that should be rendered as a button.
  // "a.cta": completeButtonStyles(ButtonVariants.PRIMARY, ColorThemeFrontend.BLACK),

  // custom styles
  img: {
    paddingY: 1,
    height: "100%",
    width: "100%",
  },
};

const articleContainerStyles: ThemeUICSSObject = {
  paddingX: [4, null, null, 7],
  paddingY: [null, null, 5],
};

const articleBodyWrapperStyles: ThemeUICSSObject = {
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
};

const addHost = (str: string, host: string) => {
  return str.replaceAll('src="/uploads', `src=\"${host}/uploads`);
};

const BlockPicker = ({ block }: BlockPickerProps): JSX.Element => {
  console.log(block);
  switch (block.type) {
    case "tweetembed":
      return (
        <div sx={{ px: [2], py: [4] }}>
          {/* <p sx={{ variant: "text.heading1" }}> {block.title}</p> */}
          <TwitterTweetEmbed tweetId={block.tweet_id} />
        </div>
      );
    case "videocarousel":
      return <div>New section - Video Carousel Block placeholder</div>;
    case "imagecarousel": {
      const carouselItems: CarouselItem[] = block.imagecarousel.data.map(
        (image, index) => {
          return {
            content: (
              <div key={index} sx={{ px: [null, null, 1], cursor: "pointer" }}>
                <Image
                  src={renderImage(image)}
                  layout="responsive"
                  objectFit="cover"
                  alt="image"
                  height={"100%"}
                  width={"100%"}
                />
              </div>
            ),
            slideStyles: {},
          };
        }
      );

      return (
        <div sx={{ py: [2, null, 4, 5] }}>
          <Carousel swiperId="1" items={carouselItems} styles={{ gap: [1] }} />
        </div>
      );
    }
    case "richtext":
      const { body } = markdownToHtml(block.richtext);
      const html = addHost(body.html, imageHost);
      return (
        <div
          sx={{ ...formattedTextStyles }}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        ></div>
      );
    default:
      return <></>;
  }
};

const ArticlePage = (props: ArticlePageProps) => {
  const { data, recentArticles, styles = {} } = props;
  console.log(data);
  console.log(recentArticles);

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

            {/* <div
              sx={{ ...formattedTextStyles, ...styles }}
              dangerouslySetInnerHTML={{
                __html: htmlText,
              }}
            ></div> */}

            {data.attributes.blocks?.map((block, i) => {
              return (
                <div key={i}>
                  <BlockPicker block={block} />
                </div>
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
    fetchAPI(`/articles?filters[slug][$eq]=${slug}&populate=deep`),
    fetchAPI(`/articles?populate=deep`),
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
