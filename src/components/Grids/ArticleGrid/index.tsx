/** @jsxImportSource theme-ui */

import ArticleCard, { ArticleVariant } from "../../Cards/ArticleCard";
import SectionWrapper from "../../Wrappers/SectionWrapper";

const ArticleGrid = () => {
  const items = new Array(6).fill({});
  return (
    <SectionWrapper>
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          margin: 0,
          padding: 0,
        }}
      >
        {items.map((item, index) => {
          return (
            <div
              sx={{
                flexBasis:
                  index < 2
                    ? ["100%", null, "calc(100% / 2)"]
                    : ["100%", null, "calc(100% / 2)", "calc(100% / 3)"],
                marginBottom: [null, null, 2],
              }}
              key={index}
            >
              <ArticleCard
                imageIndex={index}
                variant={ArticleVariant.MEDIUM}
                styles={{ height: "100%" }}
              />
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default ArticleGrid;
