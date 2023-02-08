/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { WriterType } from "../../types/article";
import { isNativeMobileApp } from "../Ionic/utils/capacitor";
import AuthorInfo from "./AuthorInfo";
import PublishInfo from "./PublishInfo";
import SocialIcons from "./SocialIcons";

type AuthorInfoBlockProps = {
  quote: string;
  shareURL: string;
  createdAt: string | Date;
  writer?: WriterType;
  styles?: ThemeUICSSObject;
};

const AuthorInfoBlock = (props: AuthorInfoBlockProps): JSX.Element => {
  const { createdAt, writer, quote, shareURL, styles } = props;

  return (
    <div sx={{ display: "flex", flexDirection: "column" }}>
      <PublishInfo date={createdAt} />
      {writer?.data && <AuthorInfo name={writer.data.attributes.name} />}
      {!isNativeMobileApp && <SocialIcons quote={quote} shareURL={shareURL} />}
    </div>
  );
};

export default AuthorInfoBlock;
