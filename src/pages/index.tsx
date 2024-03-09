/** @jsxImportSource theme-ui */

import Head from "next/head";
import { useState, useEffect, Fragment } from "react";
import ArticleGrid from "../components/Grids/ArticleGrid";
import { fetchStrapiAPI } from "../lib/strapi";
import { ColorTheme } from "../types/modifier";
import { ArticleType, ImageType } from "../types/article";
import { ContentGrid as ContentGridT, HomeBlocks } from "../types/blocks";
import Quote from "../components/Quote";
import { Fixture as FixtureT } from "../types/sportmonks";
import { isMatchLive } from "../utils/matchcenter";
import { useCurrentFixtures, useHomepage } from "../utils/queries";
import { API_BASE_URL } from "../utils/util";
import FixtureCarousel from "../components/CarouselBlocks/FixtureCarousel";
import { getSeriesIdsFromFixturesList } from "../utils/fixtures";
import RetailCarousel from "../components/CarouselBlocks/RetailCarousel";
import VideoCarouselPicker from "../components/CarouselBlocks/VideoCarousel";
import ArticleCarouselPicker from "../components/CarouselBlocks/ArticleCarousel";
import StandingsTableBlock from "../components/StandingsTableBlock";
import ReelCarouselPicker from "../components/CarouselBlocks/ReelCarousel";
import NotFoundPage from "./404";
import ContentGrid from "../components/Grids/ContentGrid";

type BlockPickerProps = { block: HomeBlocks; index: number };

const BlockPicker = ({ block, index }: BlockPickerProps): JSX.Element => {
  switch (block.type) {
    case "articlecarousel":
      return (
        <ArticleCarouselPicker
          block={block}
          theme={index % 2 === 0 ? ColorTheme.LIGHT : ColorTheme.GRAY}
          styles={{ padding: [1, 2] }}
        />
      );

    case "retailcarousel":
      return (
        <RetailCarousel
          block={block}
          theme={index % 2 === 0 ? ColorTheme.LIGHT : ColorTheme.GRAY}
          styles={{ padding: [1, 2] }}
        />
      );

    case "videocarousel":
      return (
        <VideoCarouselPicker
          block={block}
          theme={index % 2 === 0 ? ColorTheme.LIGHT : ColorTheme.GRAY}
          styles={{ padding: [1, 2] }}
        />
      );

    // case "reelcarousel":
    //   return (
    //     <ReelCarouselPicker
    //       block={block}
    //       theme={index % 2 === 0 ? ColorTheme.LIGHT : ColorTheme.GRAY}
    //       styles={{ padding: [1, 2] }}
    //     />
    //   );

    case "articlegrid":
      return (
        <ArticleGrid
          articleGrid={block}
          theme={index % 2 === 0 ? ColorTheme.LIGHT : ColorTheme.GRAY}
        />
      );

    case "quote":
      return <Quote quote={block.quote} pre={block.pre} post={block.post} />;
    case "standingstable":
      return (
        <StandingsTableBlock
          series_name={block.series_name}
          series_id={block.series_id}
          theme={index % 2 === 0 ? ColorTheme.LIGHT : ColorTheme.GRAY}
        />
      );
    default:
      return <></>;
  }
};

export const HomePageContent = (props: {
  homepage: HomePageProps;
  fixtures: FixtureT[];
  recentNewsArticles?: ArticleType[];
}) => {
  const { homepage, fixtures } = props;

  const title = `Cricfanatic homepage`;
  const keywords = `homepage, cricfanatic, cricket, live scores, live, cricket app, India, BCCI, ICC, news, IPL, ODI, t20, Indian Premier League`;

  return (
    <section>
      <Head>
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
        <meta
          name="description"
          content="Cricfanatic superfast cricket news and livescores app"
        />
        {/* TODO: change the fav icon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {homepage.attributes.contentGrid &&
        homepage.attributes.contentGrid.length > 0 && (
          <ContentGrid blocks={homepage.attributes.contentGrid} />
        )}

      <FixtureCarousel fixtures={fixtures} />

      {homepage.attributes.pageblocks &&
        homepage.attributes.pageblocks.length > 0 &&
        homepage.attributes.pageblocks.map((block, index) => {
          return (
            <Fragment key={index}>
              <BlockPicker block={block} index={index + 1} />
            </Fragment>
          );
        })}
    </section>
  );
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

const WebHome = (props: {
  homepage: HomePageProps;
  fixtures: FixtureT[];
  seriesIds: string;
  recentNewsArticles?: ArticleType[];
}) => {
  const { seriesIds, recentNewsArticles } = props;
  const [refetchInterval, setRefetchInterval] = useState<number>(0);
  const { data: currentFixtures, isLoading: isFixturesLoading } =
    useCurrentFixtures({
      seriesIds,
      refetchInterval,
    });

  const { data: homepageRes, isLoading: isHomepageLoading } = useHomepage();

  const homepage =
    !isHomepageLoading && homepageRes ? homepageRes.data : props.homepage;

  const fixtures =
    !isFixturesLoading && currentFixtures ? currentFixtures : props.fixtures;

  useEffect(() => {
    const isLive = fixtures.filter((fixture) => isMatchLive(fixture.status));
    isLive.length > 0
      ? setRefetchInterval(1000 * 30) // 0.5 mins polling
      : setRefetchInterval(1000 * 300); // 5 mins polling;
  }, [currentFixtures]);

  return (
    <HomePageContent
      homepage={homepage}
      fixtures={fixtures}
      recentNewsArticles={recentNewsArticles}
    />
  );
};

const Home = (props: {
  homepage: HomePageProps;
  fixtures: FixtureT[];
  seriesIds: string;
  recentNewsArticles?: ArticleType[];
}): JSX.Element => {
  const { homepage, fixtures, recentNewsArticles, seriesIds } = props;

  return (
    <WebHome
      homepage={homepage}
      fixtures={fixtures}
      seriesIds={seriesIds}
      recentNewsArticles={recentNewsArticles}
    />
  );
};

export async function getStaticProps() {
  try {
    const recentNewsAPIURL = `/articles?pagination[page]=1&pagination[pageSize]=10&populate=deep,2&sort=createdAt:desc`;
    const [homepage, fixturesDefinedInCMS, recentNews] = await Promise.all([
      fetchStrapiAPI("/home", {
        populate: "deep, 4",
      }),
      fetchStrapiAPI("/fixtures-list", {
        populate: "deep, 3",
      }),
      fetchStrapiAPI(recentNewsAPIURL),
    ]);

    const seriesIds: string = getSeriesIdsFromFixturesList(
      fixturesDefinedInCMS.data
    );

    const response = await fetch(
      `${API_BASE_URL}/fixtures/current-fixtures?seriesIds=${seriesIds}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const fixtures = await response.json();

    return {
      props: {
        homepage: homepage.data,
        fixtures: fixtures.data,
        recentNewsArticles: recentNews.data,
        seriesIds,
      },
      revalidate: 60 * 5,
    };
  } catch (err) {
    console.log(err);
    return {};
  }
}

export default Home;
