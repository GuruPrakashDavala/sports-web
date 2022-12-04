/** @jsxImportSource theme-ui */

import { colors } from "../../../../styles/theme";
import Skeleton, { SkeletonProps } from "../../../Skeleton";

const ArticleCardSkeleton = (props: SkeletonProps) => {
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
          border: "1px solid",
          borderColor: colors.gray200,
          padding: 1,
          borderRadius: "10px",
        }}
      >
        <Skeleton styles={{ height: ["100px", null, "200px", "250px"] }} />
        <Skeleton styles={{ height: ["30px", null, "50px"] }} />
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
