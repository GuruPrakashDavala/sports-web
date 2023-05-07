/** @jsxImportSource theme-ui */

import { FaImages } from "react-icons/fa";
import { ComponentVariant } from "../../types/modifier";
import { getIconSize, IconProps } from "./Play";

const ImageCollectionIcon = (props: IconProps) => {
  const { styles = {}, variant = ComponentVariant.LARGE } = props;

  return (
    <div
      sx={{
        display: "flex",
        alignItems: "center",
        paddingLeft: "5px",
        ...styles,
      }}
    >
      <FaImages sx={{ height: getIconSize(variant), zIndex: 1 }} />
    </div>
  );
};

export default ImageCollectionIcon;
