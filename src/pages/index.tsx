/** @jsxImportSource theme-ui */

import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
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
import Quote from "../components/Quote";
import PromoBlock from "../components/PromoBlock";
import PromoBlockFlex from "../components/PromoBlock/PromoBlock";
import BasicArticleCard from "../components/BasicArticleCard";
import MultiInfoCard from "../components/Cards/MultiInfoCard";
import FixtureCard from "../components/Cards/FixtureCard";
import { arrayBuffer } from "stream/consumers";
import { differenceInCalendarDays, format } from "date-fns";

type BlockPickerProps = { block: HomeBlocks; index: number };

const BlockPicker = ({ block, index }: BlockPickerProps): JSX.Element => {
  console.log(block.type);
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
    case "quote":
      return <Quote quote={block.quote} pre={block.pre} post={block.post} />;
    // case "multiinfocomponent":
    //   return <MultiInfoCard block={block} />;
    default:
      return <></>;
  }
};

export type HomePageProps = {
  attributes: {
    contentGrid: ContentGridT[];
    pageblocks: HomeBlocks[];
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

const Home: NextPage<{ homeRes: HomePageProps; fixtures: any }> = ({
  homeRes,
  fixtures,
}): JSX.Element => {
  console.log(homeRes);
  console.log(fixtures);

  // Expected format - 2022-10-12
  // Year-Month-Date
  const now = new Date();
  const currentDate = format(now, "yyyy-MM-d");

  // WIP: fixtures date sorting

  // const date1 = new Date("2022-10-05T08:10:00.000000Z");
  // const date2 = new Date("2022-10-07T08:10:00.000000Z");
  // const differenceInCalendarD = differenceInCalendarDays(date1, date2);
  // console.log(date1);
  // console.log(date2);
  // console.log(differenceInCalendarD);
  // if ("geolocation" in navigator) {
  //   console.log("geolocation available");
  //   /* geolocation is available */
  //   // navigator.geolocation.getCurrentPosition((position) => {
  //   //   console.log(position.coords.latitude, position.coords.longitude);
  //   // });
  // } else {
  //   console.log("geolocation not available");
  //   /* geolocation IS NOT available */
  // }
  return (
    <section>
      <Head>
        <title>Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {homeRes.attributes.contentGrid &&
      homeRes.attributes.contentGrid.length > 0 ? (
        <ContentGrid blocks={homeRes.attributes.contentGrid} />
      ) : (
        <Fragment />
      )}

      <SectionWrapper>
        <SectionHeading
          title={`Match schedule & results`}
          theme={ColorTheme.LIGHT}
          styles={{ px: [0, 1] }}
          link={{
            href: `/schedule`,
            external: false,
            label: `all schedule`,
          }}
        />
        <Carousel
          swiperId={`1`}
          items={fixtures.map((fixtureItem: any) => {
            return { content: <FixtureCard fixture={fixtureItem} /> };
          })}
        />
      </SectionWrapper>

      {homeRes.attributes.pageblocks &&
      homeRes.attributes.pageblocks.length > 0 ? (
        homeRes.attributes.pageblocks.map((block, index) => {
          return (
            <div key={index}>
              <BlockPicker block={block} index={index} />
            </div>
          );
        })
      ) : (
        <Fragment />
      )}

      {/* WIP */}

      {/* <PromoBlock /> */}
      {/* <PromoBlockFlex /> */}

      {/* <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          margin: 0,
          padding: 0,
        }}
      >
        <div
          sx={{
            flexBasis: ["100%", null, "calc(100% / 3)"],
            marginBottom: [null, null, 2],
          }}
        >
          <BasicArticleCard />
        </div>
        <div
          sx={{
            flexBasis: ["100%", null, "calc(100% / 3)"],
            marginBottom: [null, null, 2],
          }}
        >
          <BasicArticleCard />
        </div>
        <div
          sx={{
            flexBasis: ["100%", null, "calc(100% / 3)"],
            marginBottom: [null, null, 2],
          }}
        >
          <BasicArticleCard />
        </div>
        <div
          sx={{
            flexBasis: ["100%", null, "calc(100% / 3)"],
            marginBottom: [null, null, 2],
          }}
        >
          <BasicArticleCard />
        </div>
        <div
          sx={{
            flexBasis: ["100%", null, "calc(100% / 3)"],
            marginBottom: [null, null, 2],
          }}
        >
          <BasicArticleCard />
        </div>
        <div
          sx={{
            flexBasis: ["100%", null, "calc(100% / 3)"],
            marginBottom: [null, null, 2],
          }}
        >
          <BasicArticleCard />
        </div>
      </div> */}
    </section>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const now = new Date();
  // now.setDate(now.getDate() - 1);
  const currentDate = format(now, "yyyy-MM-d");
  const [homeRes, fixtures] = await Promise.all([
    fetchAPI("/home", {
      populate: "deep, 4",
    }),
    (async () => {
      // const response = await fetch(
      //   `https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=arQupbeQwcFvjafCxxqydm2XgMRbqRhWjUNJaINkNSG8n75Np9wNPG7aQu2f&include=visitorteam, localteam, league, venue, scoreboards, scoreboards.team&filter[season_id]=932`
      // );

      const response = await fetch(
        `https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=arQupbeQwcFvjafCxxqydm2XgMRbqRhWjUNJaINkNSG8n75Np9wNPG7aQu2f&include=visitorteam, localteam, league, venue,venue.country, tosswon, scoreboards, scoreboards.team, odds, stage, runs, season&filter[starts_between]=${currentDate},2023-12-31&filter[season_id]=956&sort=starting_at`
      );

      // if (!response.ok) {
      //   console.error(response.statusText);
      //   throw new Error(`An error occured please try again`);
      // }
      // console.log("fixtures data");
      // console.log(response.json());
      const fixtures = await response.json();
      return fixtures.data.splice(0, 6);
    })(),
  ]);

  return {
    props: {
      homeRes: homeRes.data,
      fixtures: fixtures,
    },
    revalidate: 1,
  };
}

export default Home;
