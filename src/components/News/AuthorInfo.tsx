/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";

type AuthorInfoProps = {
  name: string;
  styles?: ThemeUICSSObject;
};

const AuthorInfo = (props: AuthorInfoProps): JSX.Element => {
  const { name, styles = {} } = props;
  return (
    <p
      sx={{
        variant: "text.label1",
        color: colors.gray100,
        paddingBottom: [1, null, null, 3],
        ...styles,
      }}
    >
      By {name}
    </p>
  );
};

export default AuthorInfo;
