/** @jsxImportSource theme-ui */

import { useState, useEffect } from "react";
import { ThemeUICSSObject } from "theme-ui";
import { EmbeddedTweet, TweetSkeleton } from "next-tweet";
import { Tweet as TweetT } from "next-tweet/api";
import { getTweet } from "../../utils/util";

const wrapperStyles: ThemeUICSSObject = {
  "& > div, & > div > div": {
    display: "flex",
    justifyContent: "center",
  },
  // Twitter iFrame style overwrites
  "> div > div > iframe": {
    maxWidth: ["90vw", 400],
  },
  "> div > div > iframe > body": {
    opacity: 0.6,
    // backgroundColor: "red !important",
  },
};

type TwitterTweetEmbedProps = { tweetId: string };

// const TweetSkeleton = (): JSX.Element => {
//   return (
//     <div>
//       <Skeleton
//         styles={{
//           height: ["160px", "350px"],
//           width: ["90%"],
//           paddingX: 3,
//         }}
//       />
//     </div>
//   );
// };

const tweetStyles: ThemeUICSSObject = {
  paddingX: 2,
  paddingY: 2,
  "> div": { marginY: 0 },
  "> div > article> div:nth-child(n+5)": {
    display: "none",
  },
};

const TwitterEmbedContent = (props: { tweetId: string }): JSX.Element => {
  const { tweetId } = props;
  const [tweet, setTweet] = useState<undefined | TweetT>();

  const getTweetFunction = async (tweetId: string) => {
    try {
      const tweet = await getTweet(tweetId);
      setTweet(tweet);
    } catch (err) {
      console.log(`Error fetching the tweet - ${tweetId}`);
      console.log(err);
    }
  };

  useEffect(() => {
    getTweetFunction(tweetId);
  }, []);

  return (
    <div sx={tweetStyles} className="light">
      {tweet ? <EmbeddedTweet tweet={tweet} priority /> : <TweetSkeleton />}
    </div>
  );
};

const TwitterTweetEmbed = ({
  tweetId,
}: TwitterTweetEmbedProps): JSX.Element => {
  const TWEET_ID = /^[0-9]+$/;

  if (tweetId.length > 40 || !TWEET_ID.test(tweetId)) {
    return <></>;
  }

  return <TwitterEmbedContent tweetId={tweetId} />;
};

export default TwitterTweetEmbed;
