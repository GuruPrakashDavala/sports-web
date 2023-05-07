/** @jsxImportSource theme-ui */

import { useEffect, useState, Fragment } from "react";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { getArticleFormattedDate } from "../../../utils/util";
import { VideoCardProps } from ".";
import AnimatingMusicBars from "../../Icons/AnimatingMusicBars";
import { VideoType } from "../../Ionic/Pages/videos";
import { Tweet as TweetT } from "next-tweet/api";
import { getTweet } from "../../../utils/util";

const cardHoverStyles: ThemeUICSSObject = {
  transition:
    "background-color 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
  "> div .info": {
    transform: "translateY(-3px)",
    transition: "transform 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
    willChange: "transform",
  },
};

// card info styles when hovered out of the card
const cardInfoTransition: ThemeUICSSObject = {
  transition: "transform 400ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
  willChange: "transform",
};

const imageWrapperStyles: ThemeUICSSObject = {
  position: "relative",
  display: "block",
  marginRight: 1,
};

type MicroCardContentProps = {
  imageURL: string;
  slug?: string;
  isActive?: boolean;
  label?: string;
  articlePublishedDate: string;
  styles?: ThemeUICSSObject;
};

const MicroCardContent = (props: MicroCardContentProps) => {
  const { imageURL, slug, isActive, label, articlePublishedDate, styles } =
    props;

  return (
    <div sx={{ cursor: "pointer" }}>
      <div sx={styles}>
        <div sx={imageWrapperStyles}>
          <img
            src={imageURL}
            alt={slug}
            sx={{
              height: ["65px"],
              width: ["85px"],
              minWidth: "60px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="info" sx={{ ...cardInfoTransition }}>
          <h3
            sx={{
              color: colors.black,
              variant: "text.body4",
              ...(isActive ? { fontWeight: 700 } : {}),
            }}
          >
            {label}
          </h3>
          <div sx={{ display: "flex", gap: 1 }}>
            {isActive && <AnimatingMusicBars />}
            <p
              sx={{
                variant: "text.label2",
                color: colors.gray100,
                paddingBottom: "5px",
              }}
            >
              {articlePublishedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoMicroCard = (
  props: Partial<VideoCardProps> & { tweetId?: string; videoType: VideoType }
) => {
  const {
    tweetId,
    imageSrc,
    slug,
    label,
    date = new Date(),
    isActive,
    videoType,
    styles = {},
  } = props;

  const [imageURL, setImageURL] = useState<string | undefined>(imageSrc);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const isTweetVideo = videoType === VideoType.TWITTER_VIDEO && tweetId;

  const bp = useBreakpointIndex();
  const articlePublishedDate = getArticleFormattedDate(date);

  const cardWrapperStyles: ThemeUICSSObject = {
    display: "flex",
    height: "100%",
    width: "100%",
    textDecoration: "none",
    borderBottom: "1px solid",
    borderBottomColor: colors.gray200,
    paddingY: 1,
    "&:hover": bp > 1 ? cardHoverStyles : null,
  };

  const setTweetImage = async (tweetId: string) => {
    try {
      setError(false);
      setLoading(true);
      const tweet: TweetT = await getTweet(tweetId);
      const tweetImage =
        tweet && tweet.video?.mediaAvailability.status === "available"
          ? tweet.video.poster
          : undefined;
      setImageURL(tweetImage ?? imageSrc);
      setLoading(false);
      return;
    } catch (err) {
      console.log(`Error fetching the tweet - ${tweetId}`);
      console.log(err);
      setError(true);
      return;
    }
  };

  useEffect(() => {
    if (videoType === VideoType.MUX) {
      setImageURL(imageSrc);
    } else if (isTweetVideo) {
      setTweetImage(tweetId);
    }
  }, [videoType]);

  return (
    <Fragment>
      {error ? (
        <></>
      ) : (
        imageURL &&
        !loading &&
        !error && (
          <MicroCardContent
            imageURL={imageURL}
            slug={slug}
            label={label}
            articlePublishedDate={articlePublishedDate}
            styles={{ ...cardWrapperStyles, ...styles }}
            isActive={isActive}
          />
        )
      )}
    </Fragment>
  );
};

export default VideoMicroCard;
