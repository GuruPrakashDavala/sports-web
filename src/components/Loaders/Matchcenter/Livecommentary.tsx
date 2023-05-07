/** @jsxImportSource theme-ui */

import Skeleton from "../../Skeleton";

const LivecommentarySkeleton = () => {
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: 2,
        gap: 2,
      }}
    >
      <Skeleton styles={{ height: ["30px"] }} />
      <Skeleton styles={{ height: ["100px", null, "200px", "250px"] }} />
      <Skeleton styles={{ height: ["30px"] }} />
      <Skeleton styles={{ height: ["30px"] }} />
    </div>
  );
};

export default LivecommentarySkeleton;
