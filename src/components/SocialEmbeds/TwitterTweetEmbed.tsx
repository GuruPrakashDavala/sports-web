/** @jsxImportSource theme-ui */

import { TwitterTweetEmbed as TwitterTweetEmbedComponent } from "react-twitter-embed";
import { ThemeUICSSObject } from "theme-ui";

const wrapperStyles: ThemeUICSSObject = {
  "& > div, & > div > div": {
    display: "flex",
    justifyContent: "center",
  },
  //   Twitter iFrame style overwrites
  "> div > div > iframe": {
    maxWidth: ["90vw", 400],
  },
};

type TwitterTweetEmbedProps = { tweetId: string };

const TwitterTweetEmbed = ({
  tweetId,
}: TwitterTweetEmbedProps): JSX.Element => {
  const userCanView = true;

  return (
    <div sx={wrapperStyles}>
      {userCanView ? <TwitterTweetEmbedComponent tweetId={tweetId} /> : <></>}
    </div>
  );
};

export default TwitterTweetEmbed;
