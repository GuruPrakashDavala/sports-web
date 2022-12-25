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
  "> div > div > iframe > body": {
    opacity: 0.6,
    backgroundColor: "red !important",
  },
};

type TwitterTweetEmbedProps = { tweetId: string };

const TwitterTweetEmbed = ({
  tweetId,
}: TwitterTweetEmbedProps): JSX.Element => {
  const userCanView = true;

  return (
    <div sx={wrapperStyles}>
      {userCanView ? (
        <TwitterTweetEmbedComponent
          tweetId={tweetId}
          placeholder={`Tweet loading`}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TwitterTweetEmbed;
