/** @jsxImportSource theme-ui */

import { colors } from "../../../styles/theme";
import { ComponentVariant } from "../../../types/modifier";
import ExclamationIcon from "../../Icons/ExclamationIcon";

const Adandoned = (props: { note: string; type?: string }) => {
  const { type, note } = props;
  return (
    <div
      sx={{
        paddingY: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        sx={{
          padding: 2,
          background: colors.gray300,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ExclamationIcon variant={ComponentVariant.MEDIUM} />
        <span
          sx={{
            variant: "text.heading4",
            marginLeft: 1,
          }}
        >
          {note}
        </span>
      </div>
    </div>
  );
};

export default Adandoned;
