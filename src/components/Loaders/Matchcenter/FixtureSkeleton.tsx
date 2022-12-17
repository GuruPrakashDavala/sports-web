/** @jsxImportSource theme-ui */

import { SkeletonProps } from "../../Skeleton";
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
        <ArticleCardSkeleton styles={{ padding: [0, 2, 3] }} />
        <ArticleCardSkeleton styles={{ padding: [0, 2, 3] }} />
      </div>
    </div>
  );
};

export default FixtureSkeleton;
