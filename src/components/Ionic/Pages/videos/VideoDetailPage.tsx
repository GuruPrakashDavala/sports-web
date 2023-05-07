/** @jsxImportSource theme-ui */

import {
  Fragment,
  useState,
  useEffect,
  CSSProperties,
  useContext,
} from "react";
import { useParams } from "react-router";

import {
  IonPage,
  IonContent,
  useIonViewWillEnter,
  useIonViewWillLeave,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { colors } from "../../../../styles/theme";
import {
  InfiniteVideosResponseType,
  useGlobals,
  useInfiniteVideos,
  useVideo,
} from "../../../../utils/queries";
import TabBarContext, {
  TabBarContextProps,
} from "../../contexts/tabBarContext";
import Head from "next/head";
import MuxVideo from "@mux/mux-video-react";
import {
  APPLICATION_DOMAIN_URL,
  getArticleFormattedDate,
  renderImage,
} from "../../../../utils/util";
import VideoMicroCard from "../../../Cards/VideoCard/VideoMicroCard";
import { VideoCardVariant } from "../../../Cards/VideoCard";
import { BsShareFill, BsFillExclamationCircleFill } from "react-icons/bs";
import { Share } from "@capacitor/share";
import { VideoType } from ".";
import { Tweet as TweetT } from "next-tweet/api";
import { getTweet } from "../../../../utils/util";
import { VideoItemType } from "../../../../types/common";
import { TwitterIcon } from "react-share";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { ThemeUICSSObject } from "theme-ui";
import { errorInfoStyles } from "../../../ReelCarousel/ReelVideoPlayer";
import SectionWrapper from "../../../Wrappers/SectionWrapper";

export type VideoAttributes = {
  playbackVideoId?: string;
  playbackVideoTitle?: string;
  playbackVideoDate?: string;
  videoURL?: string;
  image?: string;
  tweetSource?: string;
  videoType: VideoType;
  videoCMSID?: number;
};

const VideoDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setShowTabs } = useContext<TabBarContextProps>(TabBarContext);
  const [error, setError] = useState<boolean>(false);
  const bp = useBreakpointIndex();

  const [playbackVideoAttributes, setPlaybackVideoAttributes] = useState<
    VideoAttributes | undefined
  >(undefined);

  const globals = useGlobals();
  const newsShareURL =
    globals.data?.data.attributes.Mobile_App_Settings?.news_share_url;

  const { data: video } = useVideo(slug);
  const { data: videos, hasNextPage, fetchNextPage } = useInfiniteVideos({});

  const allVideos = videos
    ? (videos as unknown as InfiniteVideosResponseType)
    : undefined;

  const videoItem = video && video?.data.length > 0 ? video.data[0] : undefined;

  useIonViewWillEnter(() => {
    setShowTabs(false);
  });

  useIonViewWillLeave(() => {
    setShowTabs(true);
  });

  const setTweetFunction = async (tweetId: string, video: VideoItemType) => {
    try {
      setError(false);
      const tweet: TweetT = await getTweet(tweetId);
      const videoVariants =
        tweet &&
        tweet.video?.mediaAvailability.status === "available" &&
        tweet.video?.variants
          ? tweet.video.variants.filter(
              (variant) => variant.type === "video/mp4"
            )
          : undefined;

      const tweetImage =
        tweet && tweet.video?.mediaAvailability.status === "available"
          ? tweet.video.poster
          : undefined;

      const tweetSource =
        tweet && tweet.video?.mediaAvailability.status === "available"
          ? tweet.user.screen_name
          : undefined;

      // Set twitter video attributes
      setPlaybackVideoAttributes({
        playbackVideoId: undefined,
        playbackVideoTitle: video.attributes.title,
        playbackVideoDate: video.attributes.createdAt,
        videoURL:
          videoVariants && videoVariants.length > 0
            ? videoVariants[videoVariants?.length - 1].src
            : undefined,
        image: tweetImage,
        tweetSource,
        videoType: VideoType.TWITTER_VIDEO,
        videoCMSID: video.id,
      });

      return;
    } catch (err) {
      console.log(`Error fetching the tweet - ${tweetId}`);
      console.log(err);
      setError(true);
      return;
    }
  };

  const loadVideoAttributes = (video: VideoItemType) => {
    const videoType = video.attributes.type;
    const tweetId = video.attributes.tweet_id;
    if (videoType === VideoType.TWITTER_VIDEO && tweetId) {
      setTweetFunction(tweetId, video);
    } else if (videoType === VideoType.MUX) {
      setPlaybackVideoAttributes({
        playbackVideoId:
          video.attributes.mux_video_uploader_mux_asset?.data.attributes
            .playback_id,
        playbackVideoTitle: video.attributes.title,
        playbackVideoDate: video.attributes.createdAt,
        videoURL: undefined,
        image: renderImage(video.attributes.thumbnail.data),
        tweetSource: undefined,
        videoType: VideoType.MUX,
        videoCMSID: video.id,
      });
      setError(false);
    } else {
      setPlaybackVideoAttributes(undefined);
      setError(true);
    }
  };

  useEffect(() => {
    if (videoItem) {
      loadVideoAttributes(videoItem);
    }
  }, [videoItem]);

  const loadMore = (ev: any) => {
    if (hasNextPage) {
      fetchNextPage();
      setTimeout(() => ev.target.complete(), 500);
    } else {
      setTimeout(() => ev.target.complete(), 500);
    }
  };

  const shareURL = newsShareURL
    ? newsShareURL
    : `${APPLICATION_DOMAIN_URL}/videospage`;

  const nativeAppShare = async () => {
    await Share.share({
      title:
        "🚀🔥 CricFanatic latest news. Download CricFanatic app from playstore.",
      text: `${playbackVideoAttributes?.playbackVideoTitle} - Catch all the latest cricket news and videos from CricFanatic`,
      url: shareURL,
      dialogTitle:
        "🚀🔥 CricFanatic latest cricket news and videos at your finger tips",
    });
  };

  const containerStyles: ThemeUICSSObject = {
    position: ["sticky", "relative"],
    top: 0,
    zIndex: 100,
    background: "black",
  };

  const videoPlayerStyles: CSSProperties = {
    minHeight: "230px",
    maxHeight: bp > 1 ? "720px" : "320px",
    height: "100%",
    width: "100%",
    maxWidth: "100%",
  };

  const videoInfoContainerStyles: ThemeUICSSObject = {
    display: "flex",
    paddingY: 1,
    paddingX: 1,
    background: "gray300",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid",
    borderBottom: "1px solid",
    borderColor: colors.gray200,
    gap: 1,
    minHeight: "90px",
  };

  const shareButtonStyles: ThemeUICSSObject = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "30%",
    backgroundColor: colors.experimental.blue150,
    padding: 1,
    borderRadius: "5px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    gap: 1,
  };

  const allVideosContainerStyles: ThemeUICSSObject = {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
  };

  return (
    <IonPage>
      <IonContent scrollEvents={true} fullscreen>
        <Head>
          <title>{`Video player - ${slug}`}</title>
          <meta
            name="description"
            content="Cricfanatic superfast cricket news and videos"
          />
        </Head>

        <SectionWrapper styles={{ padding: 0 }}>
          {error ? (
            <div sx={errorInfoStyles}>
              <p>Unexpected error occured</p>
            </div>
          ) : (
            <Fragment>
              <div sx={containerStyles}>
                <MuxVideo
                  style={videoPlayerStyles}
                  playbackId={
                    playbackVideoAttributes &&
                    playbackVideoAttributes.videoType === VideoType.MUX
                      ? playbackVideoAttributes?.playbackVideoId
                      : undefined
                  }
                  src={
                    playbackVideoAttributes &&
                    playbackVideoAttributes.videoType ===
                      VideoType.TWITTER_VIDEO
                      ? playbackVideoAttributes?.videoURL
                      : undefined
                  }
                  metadata={{
                    video_id: playbackVideoAttributes
                      ? playbackVideoAttributes.playbackVideoId
                      : videoItem?.attributes.slug,
                    video_title: playbackVideoAttributes?.playbackVideoTitle,
                    viewer_user_id: "cricfanatic full length video viewer",
                  }}
                  nonce={""}
                  streamType="on-demand"
                  autoPlay
                  controls
                  poster={playbackVideoAttributes?.image}
                />
                {/* Video info section */}
                <div sx={videoInfoContainerStyles}>
                  <div
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      flexBasis: "70%",
                    }}
                  >
                    {playbackVideoAttributes &&
                      !playbackVideoAttributes.playbackVideoTitle && (
                        <BsFillExclamationCircleFill
                          fontSize={20}
                          color={colors.red100}
                        />
                      )}

                    <div sx={{ display: "inline" }}>
                      <p
                        sx={{
                          variant: "text.heading4",
                          fontWeight: "500",
                        }}
                      >
                        {playbackVideoAttributes &&
                        !playbackVideoAttributes.playbackVideoTitle
                          ? `Error playing the video`
                          : playbackVideoAttributes?.playbackVideoTitle}
                      </p>

                      {playbackVideoAttributes?.playbackVideoDate && (
                        <div
                          sx={{
                            display: "flex",
                            justifyContent: "left",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <p
                            sx={{
                              variant: "text.label2",
                              color: colors.gray100,
                              paddingY: "5px",
                            }}
                          >
                            {getArticleFormattedDate(
                              playbackVideoAttributes.playbackVideoDate
                            )}
                          </p>

                          {playbackVideoAttributes?.tweetSource && (
                            <>
                              <TwitterIcon size={18} round={true} />
                              <p
                                sx={{
                                  variant: "text.label2",
                                  color: colors.gray100,
                                }}
                              >
                                {playbackVideoAttributes.tweetSource}
                              </p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div sx={shareButtonStyles} onClick={nativeAppShare}>
                    <p sx={{ variant: "text.body4", color: "white" }}>Share</p>
                    <BsShareFill fontSize={20} color="white" />
                  </div>
                </div>
              </div>

              {allVideos && (
                <div sx={allVideosContainerStyles}>
                  {allVideos.pages.map((group, index) => {
                    return (
                      <Fragment key={index}>
                        {group.data.map((video) => {
                          const isVideoInPlayBack =
                            playbackVideoAttributes?.videoCMSID === video.id;

                          return (
                            <div
                              key={video.attributes.slug}
                              onClick={() => loadVideoAttributes(video)}
                              sx={{ width: "100%" }}
                            >
                              <VideoMicroCard
                                tweetId={video.attributes.tweet_id}
                                label={video.attributes.title}
                                imageSrc={renderImage(
                                  video.attributes.thumbnail.data
                                )}
                                variant={VideoCardVariant.MEDIUM}
                                date={video.attributes.createdAt}
                                category={video.attributes.category}
                                slug={video.attributes.slug}
                                isActive={isVideoInPlayBack}
                                videoType={video.attributes.type}
                                styles={{
                                  height: "100%",
                                  paddingX: 2,
                                  backgroundColor: isVideoInPlayBack
                                    ? "gray300"
                                    : null,
                                }}
                              />
                            </div>
                          );
                        })}
                      </Fragment>
                    );
                  })}
                </div>
              )}

              {hasNextPage && (
                <IonInfiniteScroll onIonInfinite={loadMore}>
                  <IonInfiniteScrollContent></IonInfiniteScrollContent>
                </IonInfiniteScroll>
              )}
            </Fragment>
          )}
        </SectionWrapper>
      </IonContent>
    </IonPage>
  );
};

export default VideoDetailPage;
