/** @jsxImportSource theme-ui */

import { useState, useEffect } from "react";
import { ThemeUICSSObject } from "theme-ui";
import { getTweet } from "../../utils/util";

// const wrapperStyles: ThemeUICSSObject = {
//   "& > div, & > div > div": {
//     display: "flex",
//     justifyContent: "center",
//   },
//   // Twitter iFrame style overwrites
//   "> div > div > iframe": {
//     maxWidth: ["90vw", 400],
//   },
//   "> div > div > iframe > body": {
//     opacity: 0.6,
//     // backgroundColor: "red !important",
//   },
// };

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
  "> div > article> div:nth-of-type(n+4)": {
    display: "none",
  },
};

// const TwitterEmbedContent = (props: { tweetId: string }): JSX.Element => {
//   const { tweetId } = props;
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<boolean>(false);
//   const [tweet, setTweet] = useState<undefined | TweetT>();

//   const getTweetFunction = async (tweetId: string) => {
//     try {
//       setError(false);
//       setLoading(true);
//       const tweet = await getTweet(tweetId);
//       tweet ? setTweet(tweet) : setError(true);
//       setLoading(false);
//       return;
//     } catch (err) {
//       console.log(`Error fetching the tweet - ${tweetId}`);
//       console.log(err);
//       setError(true);
//       return;
//     }
//   };

//   useEffect(() => {
//     getTweetFunction(tweetId);
//   }, [tweetId]);

//   return (
//     <div sx={tweetStyles} className="light">
//       {error ? (
//         <></>
//       ) : loading ? (
//         <TweetSkeleton />
//       ) : tweet ? (
//         <EmbeddedTweet tweet={tweet} priority />
//       ) : (
//         <TweetSkeleton />
//       )}
//     </div>
//   );
// };

const TwitterEmbedContent = () => {
  return <></>;
};

const TwitterTweetEmbed = ({
  tweetId,
}: TwitterTweetEmbedProps): JSX.Element => {
  const TWEET_ID = /^[0-9]+$/;

  if (tweetId.length > 40 || !TWEET_ID.test(tweetId)) {
    return <></>;
  }

  return <TwitterEmbedContent />;
};

export default TwitterTweetEmbed;
