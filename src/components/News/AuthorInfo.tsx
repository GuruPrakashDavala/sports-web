/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";

type AuthorInfoProps = {
  styles?: ThemeUICSSObject;
};

const AuthorInfo = (props: AuthorInfoProps): JSX.Element => {
  const { styles = {} } = props;
  return (
    <p
      sx={{
        variant: "text.label1",
        color: colors.gray100,
        paddingY: [1, null, null, 3],
        ...styles,
      }}
    >
      by Editor
    </p>
  );
};

export default AuthorInfo;
