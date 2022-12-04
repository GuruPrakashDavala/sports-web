/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { WriterType } from "../../types/article";
import AuthorInfo from "./AuthorInfo";
import PublishInfo from "./PublishInfo";
import SocialIcons from "./SocialIcons";

type AuthorInfoBlockProps = {
  createdAt: string | Date;
  writer?: WriterType;
  styles?: ThemeUICSSObject;
};

const AuthorInfoBlock = (props: AuthorInfoBlockProps): JSX.Element => {
  const { createdAt, writer, styles } = props;
  return (
    <div sx={{ display: "flex", flexDirection: "column" }}>
      <PublishInfo date={createdAt} />
      {writer?.data && <AuthorInfo name={writer.data.attributes.name} />}

      <SocialIcons />
    </div>
  );
};

export default AuthorInfoBlock;
