/** @jsxImportSource theme-ui */

import { colors } from "../../styles/theme";

const BowlingTableHeader = () => {
  return (
    <div
      sx={{
        display: "flex",
        background: colors.gray300,
        padding: 1,
      }}
    >
      <p sx={{ flexBasis: "16.66%" }}>Bowler</p>
      <p sx={{ flexBasis: "16.66%" }}>Overs</p>
      <p sx={{ flexBasis: "16.66%" }}>Medians</p>
      <p sx={{ flexBasis: "16.66%" }}>Runs</p>
      <p sx={{ flexBasis: "16.66%" }}>Wickets</p>
      <p sx={{ flexBasis: "16.66%" }}>NB</p>
      <p sx={{ flexBasis: "16.66%" }}>WD</p>
      <p sx={{ flexBasis: "16.66%" }}>Eco</p>
    </div>
  );
};

export default BowlingTableHeader;
