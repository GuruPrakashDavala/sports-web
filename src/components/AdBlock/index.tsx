/** @jsxImportSource theme-ui */

import Image from "next/image";
import { ThemeUICSSObject } from "theme-ui";

export enum AdBlockVariant {
  SQUARE = "square",
  HORIZONTAL = "horizontal",
}

type AdBlockProps = {
  variant: AdBlockVariant;
  path?: string;
  height?: number;
  styles?: ThemeUICSSObject;
};

const AdBlock = (props: AdBlockProps): JSX.Element => {
  const { variant, path, height, styles = {} } = props;
  const adBlockHeight = height
    ? height
    : variant === AdBlockVariant.SQUARE
    ? 35
    : 20;

  const adBlockPath =
    variant === AdBlockVariant.SQUARE
      ? `/assets/squaread.gif`
      : `/assets/horizontalad.gif`;

  return (
    <div
      sx={{
        paddingTop: 2,
        paddingBottom: 4,
        cursor: "pointer",
        ...styles,
      }}
    >
      <Image
        src={path ? path : adBlockPath}
        layout="responsive"
        objectFit="contain"
        alt="image"
        height={adBlockHeight}
        width={"100%"}
      />
    </div>
  );
};

export default AdBlock;
