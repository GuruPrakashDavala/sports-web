/** @jsxImportSource theme-ui */

import Skeleton from "../../Skeleton";

const PageLoader = () => {
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: [2, 3],
        gap: 2,
        height: "100%",
      }}
    >
      <Skeleton styles={{ flexBasis: "5%" }} />
      <Skeleton styles={{ flexBasis: "5%" }} />
      <Skeleton styles={{ flexBasis: "10%" }} />
      <Skeleton styles={{ flexBasis: "5%" }} />
      <Skeleton styles={{ flexBasis: "30%" }} />
      <Skeleton styles={{ flexBasis: "10%" }} />
      <Skeleton styles={{ flexBasis: "10%" }} />
      <Skeleton styles={{ flexBasis: "25%" }} />
    </div>
  );
};

export default PageLoader;
