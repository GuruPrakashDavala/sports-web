/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { alpha } from "@theme-ui/color";
import { markdownToHtml } from "../../../lib/posts";

export const formattedTextStyles: ThemeUICSSObject = {
  // px: 2,
  p: {
    variant: "text.body2",
    fontSize: [2, null, null, 3],
    // color: colors.gray100,
    lineHeight: "spaceous",
    ":not(:last-child)": { mb: 4 },
  },
  h2: {
    variant: "text.heading2",
    fontSize: [5, null, null, 6],
    color: colors.black,
    mb: 2,
    ":not(:first-of-type)": { mt: 4 },
  },
  "ul, ol": {
    pl: 3,
    variant: "text.body2",
    fontSize: [2, null, null, 3],
    color: colors.gray100,
    lineHeight: "spaceous",
    ":not(:last-child)": { mb: 4 },
  },
  ul: { listStyle: "disc" },
  ol: { listStyle: "decimal" },
  a: {
    color: colors.red100,
    textDecoration: "underline",
    textDecorationColor: alpha(colors.red300, 0.17),
    textDecorationThickness: "2px",
    textUnderlineOffset: "1px",
  },
  "a:hover": { color: colors.red200, textDecorationColor: colors.red100 },
  // Styles for CTAs inlined in the formatted text that should be rendered as a button.
  // "a.cta": completeButtonStyles(ButtonVariants.PRIMARY, ColorThemeFrontend.BLACK),

  // custom styles
  img: {
    paddingY: 1,
    height: "100%",
    width: "100%",
  },
};

const RichText = (props: { richText: string; index: number }) => {
  const { body } = markdownToHtml(props.richText);
  const html = body.html;
  return (
    <div
      sx={{ ...formattedTextStyles }}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
      key={props.index}
    ></div>
  );
};

export default RichText;
