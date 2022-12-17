/** @jsxImportSource theme-ui */

import { colors } from "../../../styles/theme";
import Skeleton, { SkeletonProps } from "../../Skeleton";
import ArticleCardSkeleton from "../Cards/ArticleCard";

const FixtureSkeleton = (props: SkeletonProps) => {
  return (
    <div
      sx={{
        ...props.styles,
        paddingY: 2,
      }}
    >
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <ArticleCardSkeleton styles={{ padding: 0 }} />
        <ArticleCardSkeleton styles={{ padding: 0 }} />
      </div>
    </div>
  );
};

export default FixtureSkeleton;
