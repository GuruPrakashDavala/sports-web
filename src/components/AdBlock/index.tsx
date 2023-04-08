/** @jsxImportSource theme-ui */

import Image from "next/legacy/image";
import { ThemeUICSSObject } from "theme-ui";

export enum AdBlockVariant {
  SQUARE = "square",
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
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
    : variant === AdBlockVariant.VERTICAL
    ? 220
    : 20;

  const adBlockPath =
    variant === AdBlockVariant.SQUARE
      ? `/assets/squaread.gif`
      : variant === AdBlockVariant.HORIZONTAL
      ? `/assets/horizontalad.gif`
      : `/assets/vertical-banner.gif`;

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
        alt="adBlock"
        height={adBlockHeight}
        width={100}
      />
    </div>
  );
};

export default AdBlock;
