/** @jsxImportSource theme-ui */

import { FaExclamationCircle } from "react-icons/fa";
import { ComponentVariant } from "../../types/modifier";
import { getIconSize, IconProps } from "./Play";

const ExclamationIcon = (props: IconProps) => {
  const { styles = {}, variant = ComponentVariant.LARGE } = props;

  return (
    <div
      sx={{
        display: "flex",
        paddingLeft: "5px",
        alignItems: "center",
        ...styles,
      }}
    >
      <FaExclamationCircle sx={{ height: getIconSize(variant), zIndex: 1 }} />
    </div>
  );
};

export default ExclamationIcon;
