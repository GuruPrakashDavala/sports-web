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

  const authorName = writer?.data?.attributes.name;

  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "fit-content",
        ...styles,
      }}
    >
      <PublishInfo date={createdAt} />
      {authorName && <AuthorInfo name={authorName} />}
      {!isNativeMobileApp && <SocialIcons quote={quote} shareURL={shareURL} />}
    </div>
  );
};

export default AuthorInfoBlock;
