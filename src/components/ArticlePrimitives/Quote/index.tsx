/** @jsxImportSource theme-ui */

import { colors } from "../../../styles/theme";

type ArticleQuoteType = {
  quote: string;
  index: number;
  pre?: string;
  post?: string;
};

const ArticleQuote = (props: ArticleQuoteType) => {
  const { quote, index, pre, post } = props;
  return (
    <div
      sx={{
        paddingY: [2, 3],
      }}
      key={index}
    >
      <div
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          background: colors.gray300,
          borderRadius: "10px",
        }}
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
            paddingY: 3,
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
    </div>
  );
};

export default ArticleQuote;
