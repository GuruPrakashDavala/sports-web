/** @jsxImportSource theme-ui */

import { useState, useEffect, useRef } from "react";
import MuxVideo from "@mux/mux-video-react";
import { Tweet as TweetT } from "next-tweet/api";
import { getTweet, renderImage } from "../../utils/util";
import { ReelType } from "../../types/common";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { ThemeUICSSObject } from "theme-ui";
import { reelContainerStyles } from "./ReelImageViewer";
import { VideoType } from "../Cards/VideoCard/VideoMicroCard";
import { ReelEntitlements } from "../CarouselBlocks/ReelCarousel";

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

const reelVideoInfoContainerStyles: ThemeUICSSObject = {
  position: "absolute",
  bottom: 0,
  padding: 1,
  width: "100%",
  background: "linear-gradient(rgba(12, 12, 12, 0), rgba(12, 12, 12, 0.6))",
};

const mutedTextStyles: ThemeUICSSObject = {
  background: "gray100",
  paddingY: 1,
  marginBottom: 3,
  variant: "text.subheading4",
  color: "white",
  textAlign: "center",
};

const reelVideoDescriptionContainerStyles: ThemeUICSSObject = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
};

export const errorInfoStyles: ThemeUICSSObject = {
  display: "flex",
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
};

const ReelVideoPlayer = (props: {
  video: ReelType;
  muted: boolean;
  play?: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { video, muted, play } = props;
  const [playerErr, setPlayerErr] = useState<boolean>(false);
  const muxVideoRef = useRef<HTMLVideoElement | null>(null);

  const [playbackVideoAttributes, setPlaybackVideoAttributes] = useState<
    VideoAttributes | undefined
  >(undefined);

  const videoItem = video ?? undefined;

  const setTweetFunction = async (
    tweetId: string,
    video: ReelType
  ): Promise<VideoAttributes | undefined> => {
    try {
      const tweet: TweetT = await getTweet(tweetId);
      if (!tweet) {
        setPlayerErr(true);
        setLoading(false);
        return;
      }
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
        videoURL: videoVariants
          ? videoVariants[videoVariants?.length - 1].src
          : undefined,
        image: tweetImage,
        tweetSource,
        videoType: VideoType.TWITTER_VIDEO,
        videoCMSID: video.id,
      });
      setLoading(false);
    } catch (err) {
      console.log(`Error fetching the tweet - ${tweetId}`);
      console.log(err);
      setPlayerErr(true);
      return;
    }
  };

  const loadVideoAttributes = async (video: ReelType) => {
    const videoType = video.attributes.type;
    const tweetId = video.attributes.tweet_id;
    setPlayerErr(false);
    setLoading(true);
    if (videoType === ReelEntitlements.TWITTER_VIDEO && tweetId) {
      return await setTweetFunction(tweetId, video);
    } else if (videoType === ReelEntitlements.MUX) {
      setPlaybackVideoAttributes({
        playbackVideoId:
          video.attributes.mux_video_uploader_mux_asset?.data?.attributes
            ?.playback_id,
        playbackVideoTitle: video.attributes.title,
        playbackVideoDate: video.attributes.createdAt,
        videoURL: undefined,
        image: renderImage(video.attributes.thumbnail.data),
        tweetSource: undefined,
        videoType: VideoType.MUX,
        videoCMSID: video.id,
      });
      setLoading(false);
    } else {
      return setPlaybackVideoAttributes(undefined);
    }
  };

  useEffect(() => {
    if (videoItem) {
      loadVideoAttributes(videoItem);
    }
  }, [videoItem]);

  useEffect(() => {
    if (!loading && playbackVideoAttributes && muxVideoRef.current && play) {
      setPlayerErr(false);
      muxVideoRef.current.currentTime = 0;
      muxVideoRef.current?.play();
    } else if (!loading && playbackVideoAttributes && muxVideoRef.current) {
      setPlayerErr(false);
      muxVideoRef.current?.pause();
    }
  }, [video, playbackVideoAttributes, muxVideoRef, play]);

  return (
    <div sx={{ ...reelContainerStyles }}>
      {playerErr && (
        <div sx={errorInfoStyles}>
          <p sx={{ color: "white" }}>
            OOPS. We are having trouble swipe down to view other reels.
          </p>
        </div>
      )}

      {!loading && playbackVideoAttributes && (
        <MuxVideo
          ref={muxVideoRef}
          className="control-styles"
          style={{
            height: "100%",
            width: "100%",
          }}
          playbackId={
            playbackVideoAttributes &&
            playbackVideoAttributes.videoType === VideoType.MUX
              ? playbackVideoAttributes?.playbackVideoId
              : undefined
          }
          src={
            playbackVideoAttributes &&
            playbackVideoAttributes.videoType === VideoType.TWITTER_VIDEO
              ? playbackVideoAttributes?.videoURL
              : undefined
          }
          metadata={{
            video_id: playbackVideoAttributes.playbackVideoId,
            video_title: playbackVideoAttributes.playbackVideoTitle,
            viewer_user_id: "cricfanatic reel viewer",
          }}
          nonce={""}
          muted={muted}
          poster={playbackVideoAttributes.image}
        />
      )}

      {!playerErr && (
        <div sx={reelVideoInfoContainerStyles}>
          {muted && <p sx={mutedTextStyles}>Tap to unmute</p>}

          <div sx={reelVideoDescriptionContainerStyles}>
            <p
              sx={{
                color: "white",
                variant: "text.body4",
                flexBasis: "80%",
              }}
            >
              {playbackVideoAttributes?.playbackVideoTitle}
            </p>

            <div
              sx={{
                flexBasis: "20%",
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: 1,
              }}
            >
              {muted ? (
                <FaVolumeMute color="white" fontSize={22} />
              ) : (
                <FaVolumeUp color="white" fontSize={22} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReelVideoPlayer;
