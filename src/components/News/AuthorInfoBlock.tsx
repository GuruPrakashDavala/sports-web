/** @jsxImportSource theme-ui */

import { colors } from "../../styles/theme";
import AuthorInfo from "./AuthorInfo";
import PublishInfo from "./PublishInfo";
import SocialIcons from "./SocialIcons";

const AuthorInfoBlock = (): JSX.Element => {
  return (
    <div sx={{ display: "flex", flexDirection: "column" }}>
      <PublishInfo />
      <AuthorInfo />
      <SocialIcons />
    </div>
  );
};

export default AuthorInfoBlock;
