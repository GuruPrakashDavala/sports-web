/** @jsxImportSource theme-ui */

import { colors } from "../../../styles/theme";

const ArticleQuote = (props: {
  quote: string;
  index: number;
  pre?: string;
  post?: string;
}) => {
  const { quote, index, pre, post } = props;
  return (
    <div
      sx={{
        padding: [3],
        marginTop: [3],
        background: colors.gray300,
        borderRadius: [4],
        display: "flex",
        flexDirection: "column",
      }}
      key={index}
    >
      {pre && (
        <span
          sx={{
            display: "inline-block",
            color: colors.black,
            variant: "text.subheading5",
          }}
        >
          {pre}
        </span>
      )}

      <q
        sx={{
          display: "flex",
          variant: "text.quote2",
          fontStyle: "italic",
          paddingY: [3],
          justifyContent: "center",
        }}
      >
        {quote}
      </q>

      {post && (
        <span
          sx={{
            color: colors.black,
            variant: "text.subheading4",
            display: "flex",
            justifyContent: "end",
          }}
        >
          &mdash; {post}
        </span>
      )}
    </div>
  );
};

export default ArticleQuote;
