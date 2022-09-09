/** @jsxImportSource theme-ui */
import { ThemeUICSSObject } from "theme-ui";
import Image from "next/image";

const NextImage = () => {
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        sx={{
          // position: "relative",
          display: "block",
        }}
      >
        <Image
          src="/assets/cardimage.png"
          layout="responsive"
          objectFit="cover"
          height={"100%"}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default NextImage;
