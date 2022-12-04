/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";
import { ComponentVariant } from "../../types/modifier";
import FacebookIcon from "../Icons/Facebook";
import MailIcon from "../Icons/Mail";
import TwitterIcon from "../Icons/Twitter";

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

const SocialIcons = (): JSX.Element => {
  return (
    <ul sx={iconContainerStyles}>
      <li sx={iconWrapperStyles}>
        <FacebookIcon variant={ComponentVariant.SMALL} styles={iconStyles} />
      </li>
      <li sx={iconWrapperStyles}>
        <TwitterIcon variant={ComponentVariant.SMALL} styles={iconStyles} />
      </li>
      <li sx={iconWrapperStyles}>
        <MailIcon variant={ComponentVariant.SMALL} styles={iconStyles} />
      </li>
    </ul>
  );
};

export default SocialIcons;
