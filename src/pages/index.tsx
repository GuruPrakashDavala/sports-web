/** @jsxImportSource theme-ui */

import type { NextPage } from "next";
import Head from "next/head";
import ArticleCard, { ArticleVariant } from "../components/Cards/ArticleCard";
import Carousel, { CarouselItem, CarouselProps } from "../components/Carousel";
import ArticeCarousel from "../components/CarouselBlocks/ArticleCarousel";
import ArticleGrid from "../components/Grids/ArticleGrid";
import ContentGrid from "../components/Grids/ContentGrid";
import SectionHeading from "../components/SectionHeading";
import TwitterTweetEmbed from "../components/SocialEmbeds/TwitterTweetEmbed";
import SectionWrapper from "../components/Wrappers/SectionWrapper";
import { fetchAPI } from "../lib/strapi";
import { ColorTheme } from "../types/modifier";
import { ImageType } from "../types/article";
import { ContentGrid as ContentGridT, HomeBlocks } from "../types/blocks";

type BlockPickerProps = { block: HomeBlocks; index: number };

const BlockPicker = ({ block, index }: BlockPickerProps): JSX.Element => {
  switch (block.type) {
    case "articlecarousel": {
      return (
        <ArticeCarousel
          block={block}
          theme={index % 2 === 0 ? ColorTheme.GRAY : ColorTheme.LIGHT}
        />
      );
    }
    case "videocarousel":
      return <h1>VideoCarouselPlaceholder</h1>;
    case "articlegrid":
      return (
        <ArticleGrid
          articleGrid={block}
          theme={index % 2 === 0 ? ColorTheme.GRAY : ColorTheme.LIGHT}
        />
      );
    default:
      return <></>;
  }
};

export type HomePageProps = {
  attributes: {
    contentGrid: ContentGridT[];
    blocks: HomeBlocks[];
    createdAt: string;
    hero: { id: number; title: string };
    publishedAt: string;
    seo: {
      id: number;
      metaDescription: string;
      metaTitle: string;
      shareImage: { data: ImageType };
    };
    updatedAt: string;
  };
  id: number;
};

const Home: NextPage<{ homeRes: HomePageProps }> = ({
  homeRes,
}): JSX.Element => {
  console.log(homeRes);
  return (
    <section>
      <Head>
        <title>Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ContentGrid blocks={homeRes.attributes.contentGrid} />

      {homeRes.attributes.blocks &&
        homeRes.attributes.blocks.map((block, index) => {
          return (
            <div key={index}>
              <BlockPicker block={block} index={index} />
            </div>
          );
        })}
    </section>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [homeRes] = await Promise.all([
    fetchAPI("/home", {
      populate: "deep",
    }),
  ]);

  return {
    props: {
      homeRes: homeRes.data,
    },
    revalidate: 1,
  };
}

export default Home;
