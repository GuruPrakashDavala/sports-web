/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";
import { ComponentVariant } from "../../types/modifier";
import FacebookIcon from "../Icons/Facebook";
import MailIcon from "../Icons/Mail";
import TwitterIcon from "../Icons/Twitter";
import { Share } from "@capacitor/share";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";

const iconContainerStyles: ThemeUICSSObject = {
  display: "flex",
  flexDirection: "row",
  paddingY: 2,
  gap: 2,
  borderTop: "1px solid",
  borderColor: colors.gray200,
};

const iconWrapperStyles: ThemeUICSSObject = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  height: "25px",
  width: "25px",
  // background: "rgb(220, 7, 20)",
  background: colors.experimental.blue100,
  color: colors.white,
};

const iconStyles: ThemeUICSSObject = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  cursor: "pointer",
};

const SocialIcons = (props: {
  quote: string;
  shareURL: string;
}): JSX.Element => {
  const { quote, shareURL } = props;
  const hashtag = `#cricfanatic #cricket #playstore`;
  const hashtags = ["#cricfanatic", "#cricket", "#playstore"];

  const nativeAppShare = async () => {
    await Share.share({
      title: "🚀🔥 Cricfanatic trending news",
      text: `${quote}`,
      url: shareURL,
      dialogTitle: "🚀🔥 Cricfanatic trending news",
    });
  };

  return (
    <ul sx={iconContainerStyles}>
      <li sx={iconWrapperStyles}>
        <FacebookShareButton url={shareURL} quote={quote} hashtag={hashtag}>
          <FacebookIcon variant={ComponentVariant.SMALL} styles={iconStyles} />
        </FacebookShareButton>
      </li>

      <li sx={iconWrapperStyles} onClick={undefined}>
        <TwitterShareButton url={shareURL} title={quote} hashtags={hashtags}>
          <TwitterIcon variant={ComponentVariant.SMALL} styles={iconStyles} />
        </TwitterShareButton>
      </li>

      <li sx={iconWrapperStyles} onClick={undefined}>
        <EmailShareButton
          url={shareURL}
          subject={quote}
          body={`${quote} ${hashtag}`}
        >
          <MailIcon variant={ComponentVariant.SMALL} styles={iconStyles} />
        </EmailShareButton>
      </li>
    </ul>
  );
};

export default SocialIcons;
