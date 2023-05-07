/** @jsxImportSource theme-ui */

import { useCallback, MutableRefObject, Fragment, CSSProperties } from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  useIonViewDidEnter,
  useIonViewDidLeave,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import {
  InfiniteReelsResponseType,
  InfiniteVideosResponseType,
  useInfiniteReels,
  useInfiniteVideos,
} from "../../../../utils/queries";
import { useHistory } from "react-router";
import Head from "next/head";
import { useCarouselContext } from "../../contexts/carouselRefContext";
import { renderImage } from "../../../../utils/util";

import PageLoader from "../../../Loaders/PageLoader/PageLoader";
import TwitterVideoCard from "../../../Cards/TwitterVideoCard";
import BasicArticleCard from "../../../Cards/BasicArticalCard";
import { ThemeUICSSObject } from "theme-ui";
import { ArticleVariant } from "../../../Cards/ArticleCard";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { tabStyles } from "../../../../pages/matchcenter/[...slug]";
import PlayIcon from "../../../Icons/Play";
import ReelIcon from "../../../Icons/ReelIcon";
import SectionWrapper from "../../../Wrappers/SectionWrapper";

type IonStandingsPageProps = {
  contentRef: MutableRefObject<HTMLIonContentElement | null>;
  homeRef?: MutableRefObject<HTMLIonContentElement | null>;
};

export enum VideoType {
  MUX = "Mux Video",
  TWITTER_VIDEO = "Twitter Video",
}

export enum ReelEntitlements {
  MUX = "Mux Video",
  TWITTER_VIDEO = "Twitter Video",
  IMAGE = "Image",
}

const VideosContentComponent = (props: {
  videos: InfiniteReelsResponseType | InfiniteVideosResponseType;
  hasNextPage?: boolean;
  fetchNextPage: () => {};
  reelVideos?: boolean;
}) => {
  const { videos, hasNextPage, reelVideos = false, fetchNextPage } = props;
  const videoCardStyles: ThemeUICSSObject = { padding: 0, paddingTop: 2 };

  const container: ThemeUICSSObject = {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    margin: 0,
  };

  const loadMore = (ev: any) => {
    if (hasNextPage) {
      fetchNextPage();
      setTimeout(() => ev.target.complete(), 500);
    } else {
      setTimeout(() => ev.target.complete(), 500);
    }
  };

  return (
    <div sx={container}>
      {videos.pages.map((group, index) => {
        return (
          <Fragment key={index}>
            {group.data.map((video) => {
              const videoType = video.attributes.type;
              const cfOriginals = reelVideos
                ? undefined
                : video.attributes.cricfanatic_originals;
              return (
                <div
                  sx={{
                    flexBasis: [
                      "100%",
                      null,
                      "calc(100% / 2)",
                      "calc(100% / 3)",
                    ],
                    marginBottom: [null, null, 2],
                  }}
                  key={video.attributes.slug}
                >
                  {videoType === VideoType.MUX ||
                  videoType === ReelEntitlements.IMAGE ? (
                    <BasicArticleCard
                      label={video.attributes.title}
                      imageSrc={renderImage(video.attributes.thumbnail.data)}
                      variant={ArticleVariant.MEDIUM}
                      date={video.attributes.createdAt}
                      category={video.attributes.category}
                      cricfanaticOriginals={cfOriginals}
                      cardType={"Video"}
                      reelVideo={reelVideos}
                      badge={video.attributes.badge}
                      slug={video.attributes.slug}
                      styles={videoCardStyles}
                    />
                  ) : videoType === VideoType.TWITTER_VIDEO ? (
                    <TwitterVideoCard
                      label={video.attributes.title}
                      variant={ArticleVariant.MEDIUM}
                      tweetId={video.attributes.tweet_id}
                      date={video.attributes.createdAt}
                      category={video.attributes.category}
                      badge={video.attributes.badge}
                      reelVideo={reelVideos}
                      slug={video.attributes.slug}
                      styles={videoCardStyles}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </Fragment>
        );
      })}
      {hasNextPage && (
        <IonInfiniteScroll onIonInfinite={loadMore}>
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      )}
    </div>
  );
};

const VideosPage = (props: IonStandingsPageProps) => {
  const history = useHistory();
  const { contentRef, homeRef } = props;

  const { setCarouselUpdate } = useCarouselContext();

  const ionBackButton = useCallback((ev: any) => {
    ev.detail.register(10, () => {
      history.replace(`/home`);
      setTimeout(() => {
        if (homeRef) {
          homeRef.current && homeRef.current.scrollToTop(300);
        }
        setCarouselUpdate((prev) => prev + 1);
      }, 50);
    });
  }, []);

  useIonViewDidEnter(() => {
    document.addEventListener("ionBackButton", ionBackButton);
  });

  useIonViewDidLeave(() => {
    document.removeEventListener("ionBackButton", ionBackButton);
  });

  const {
    data: regularVideos,
    hasNextPage: regularVideosHasNextPage,
    fetchNextPage: regularVideosFetchNextPage,
    isLoading: isRegularVideosLoading,
  } = useInfiniteVideos({});

  const {
    data: reelVideos,
    hasNextPage: reelVideosHasNextPage,
    fetchNextPage: reelVideosFetchNextPage,
    isLoading: isReelVideosLoading,
  } = useInfiniteReels({});

  const regularVideosFromCMS = regularVideos
    ? (regularVideos as unknown as InfiniteVideosResponseType)
    : undefined;

  const reelVideosFromCMS = reelVideos
    ? (reelVideos as unknown as InfiniteReelsResponseType)
    : undefined;

  const tabListStyles: CSSProperties = {
    position: "sticky",
    top: "0px",
    background: "white",
    zIndex: 99,
  };

  const tabItemStyles: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-toolbar-color">
          <IonTitle>Videos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollEvents={true} ref={contentRef} fullscreen>
        <Head>
          <title>{`CricFanatic Latest Videos`}</title>
          <meta
            name="description"
            content="Cricfanatic superfast cricket news and videos at your fingertips"
          />
        </Head>

        <SectionWrapper styles={{ paddingX: 1, paddingTop: 0 }}>
          <Tabs
            defaultIndex={0}
            sx={{ ...tabStyles, height: "100%", width: "100%" }}
          >
            <TabList style={tabListStyles}>
              <Tab tabIndex={"reels"} key={1} style={tabItemStyles}>
                <ReelIcon fontSize={14} />
                <p>Reels</p>
              </Tab>

              <Tab tabIndex={"videos"} key={2} style={tabItemStyles}>
                <PlayIcon fontSize={14} />
                <p>Videos</p>
              </Tab>
            </TabList>

            <TabPanel id="Reels" style={{ height: "100%" }}>
              {!isReelVideosLoading && reelVideosFromCMS ? (
                <VideosContentComponent
                  videos={reelVideosFromCMS}
                  hasNextPage={reelVideosHasNextPage}
                  fetchNextPage={reelVideosFetchNextPage}
                  reelVideos={true}
                />
              ) : (
                <PageLoader />
              )}
            </TabPanel>

            <TabPanel id="Videos" style={{ height: "100%" }}>
              {!isRegularVideosLoading && regularVideosFromCMS ? (
                <VideosContentComponent
                  videos={regularVideosFromCMS}
                  hasNextPage={regularVideosHasNextPage}
                  fetchNextPage={regularVideosFetchNextPage}
                />
              ) : (
                <PageLoader />
              )}
            </TabPanel>
          </Tabs>
        </SectionWrapper>
      </IonContent>
    </IonPage>
  );
};

export default VideosPage;
