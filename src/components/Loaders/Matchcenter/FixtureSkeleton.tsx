/** @jsxImportSource theme-ui */

import { colors } from "../../../styles/theme";
import Skeleton, { SkeletonProps } from "../../Skeleton";
import ArticleCardSkeleton from "../Cards/ArticleCard";

const FixtureSkeleton = (props: SkeletonProps) => {
  return (
    <div
      sx={{
        padding: 1,
        ...props.styles,
      }}
    >
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
      </div>
    </div>
  );
};

export default FixtureSkeleton;
