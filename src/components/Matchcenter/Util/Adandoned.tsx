/** @jsxImportSource theme-ui */

import { colors } from "../../../styles/theme";

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
      <div sx={{ padding: 2, background: colors.red200 }}>
        <span>Logo</span>
        <span
          sx={{
            variant: "text.heading4",
            color: colors.white,
          }}
        >
          {note}
        </span>
      </div>
    </div>
  );
};

export default Adandoned;
