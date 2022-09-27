/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import AuthorInfo from "./AuthorInfo";
import PublishInfo from "./PublishInfo";
import SocialIcons from "./SocialIcons";

type AuthorInfoBlockProps = {
  date: string | Date;
  styles?: ThemeUICSSObject;
};

const AuthorInfoBlock = (props: AuthorInfoBlockProps): JSX.Element => {
  const { date, styles } = props;
  return (
    <div sx={{ display: "flex", flexDirection: "column" }}>
      <PublishInfo date={date} />
      <AuthorInfo />
      <SocialIcons />
    </div>
  );
};

export default AuthorInfoBlock;
