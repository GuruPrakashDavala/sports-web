/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";
import getArticleFormattedDate from "../../utils/util";

type PublishInfoProps = {
  date: string | Date;
  styles?: ThemeUICSSObject;
};

const PublishInfo = (props: PublishInfoProps): JSX.Element => {
  const { date, styles = {} } = props;
  const articleDate = getArticleFormattedDate(date);
  return (
    <p
      sx={{
        variant: "text.label1",
        color: colors.gray100,
        paddingY: 1,
        ...styles,
      }}
    >
      {articleDate}
    </p>
  );
};

export default PublishInfo;
