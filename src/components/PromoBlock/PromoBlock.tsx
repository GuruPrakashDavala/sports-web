/** @jsxImportSource theme-ui */

import Image from "next/legacy/image";
import { colors } from "../../styles/theme";

const PromoBlockFlex = (): JSX.Element => {
  return (
    <div
      sx={{
        display: "flex",
        background: colors.red100,
        flexWrap: "wrap",
        height: "100%",
      }}
    >
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          padding: "60px",
          justifyContent: "space-between",
          flexDirection: "column",
          flexBasis: "50%",
        }}
      >
        <div
          sx={{
            variant: "text.heading1",
            color: colors.white,
            paddingBottom: "90px",
          }}
        >
          Watch LFCTV GO for exclusive interviews, documentaries and highlights.
        </div>
        <a
          sx={{
            padding: "20px",
            background: colors.black,
            color: colors.white,
            width: "50%",
          }}
        >
          View here - button component
        </a>
      </div>
      <div sx={{ flexBasis: "50%", padding: "60px" }}>
        <div
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "50%",
            width: "100%",
            height: "100%",
          }}
        >
          {/* !! Image in testing */}
          <Image
            src={"/assets/pexel.jpg"}
            layout="fill"
            objectFit="contain"
            alt="image"
            // height={48}
            // width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default PromoBlockFlex;
