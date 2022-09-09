/** @jsxImportSource theme-ui */

import { ColorTheme, ColorThemeAll } from "../../../types/modifier";
import ArticleCard, { ArticleVariant } from "../../Cards/ArticleCard";
import SectionWrapper from "../../Wrappers/SectionWrapper";

type ContentGridType = {
  theme?: ColorThemeAll;
};

const ContentGrid = (props: ContentGridType) => {
  const { theme = ColorTheme.LIGHT } = props;
  const items = new Array(7).fill({});
  return (
    <SectionWrapper theme={theme}>
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          margin: 0,
          padding: 0,
        }}
      >
        {items.map((_, index) => (
          <ArticleCard
            imageIndex={index}
            theme={theme}
            styles={{
              flexBasis: ["100%", null, "calc(100% / 3)"],
              marginBottom: [null, null, 2],
            }}
            key={index}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ContentGrid;
