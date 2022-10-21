/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";

type QuoteProps = {
  quote: string;
  pre?: string;
  post?: string;
};

const quoteContainerStyles: ThemeUICSSObject = {
  paddingX: [2, null, null, 5, 6],
  paddingY: [6, null, null, 8],
  background: colors.yellow,
};

const quoteWrapperStyles: ThemeUICSSObject = {
  maxWidth: [null, null, "66.67%"],
  marginLeft: "auto",
  marginRight: "auto",
};

const preStyles = {
  display: "inline-block",
  color: colors.black,
  variant: "text.subheading3",
};

const quoteStyles = {
  variant: "text.quote1",
  display: "block",
  quotes: "none",
  marginY: [2],
  "> span": {
    backgroundSize: "2px 0",
    color: colors.black,
  },
};

const postStyles: ThemeUICSSObject = {
  display: "inline-block",
  color: colors.black,
  variant: "text.subheading2",
  float: "right",
  marginRight: [3, null, null, 6],
};

const Quote = (props: QuoteProps): JSX.Element => {
  const { pre, post, quote } = props;
  return (
    <div sx={quoteContainerStyles}>
      <div sx={{ maxWidth: "105rem", margin: "0 auto" }}>
        <div sx={quoteWrapperStyles}>
          <div sx={{ paddingLeft: "20px", paddingRight: "20px" }}>
            {pre && <span sx={preStyles}>{pre}</span>}

            <q sx={quoteStyles}>
              <span>{quote}</span>
            </q>
            {post && <span sx={postStyles}>&mdash; {post}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
