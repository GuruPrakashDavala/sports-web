/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";

type PublishInfoProps = {
  styles?: ThemeUICSSObject;
};

const PublishInfo = (props: PublishInfoProps): JSX.Element => {
  const { styles = {} } = props;
  return (
    <p
      sx={{
        variant: "text.label1",
        color: colors.gray100,
        paddingY: 1,
        ...styles,
      }}
    >
      Published 31st August 2022
    </p>
  );
};

export default PublishInfo;
