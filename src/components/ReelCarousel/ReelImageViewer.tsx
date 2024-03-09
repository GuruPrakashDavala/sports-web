/** @jsxImportSource theme-ui */

import { renderImage } from "../../utils/util";
import { ReelType } from "../../types/common";
import { BsFillImageFill } from "react-icons/bs";
import { ThemeUICSSObject } from "theme-ui";
import Image from "next/image";

export const reelContainerStyles: ThemeUICSSObject = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
};

const reelImageInfoStyles: ThemeUICSSObject = {
  position: "absolute",
  bottom: 0,
  padding: 2,
  paddingY: 3,
  width: "100%",
  background: "linear-gradient(rgba(12, 12, 12, 0), rgba(12, 12, 12, 0.6))",
};

const ReelImageViewer = (props: { reel: ReelType }) => {
  const { reel } = props;
  return (
    <div sx={reelContainerStyles}>
      <Image
        src={renderImage(reel.attributes.thumbnail.data)}
        alt={reel.attributes.title}
      />

      <div sx={reelImageInfoStyles}>
        <div
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <BsFillImageFill color="white" />
          <p
            sx={{
              color: "white",
              variant: "text.body4",
            }}
          >
            {reel.attributes.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReelImageViewer;
