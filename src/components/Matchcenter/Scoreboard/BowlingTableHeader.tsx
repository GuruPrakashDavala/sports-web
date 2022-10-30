/** @jsxImportSource theme-ui */

import { colors } from "../../../styles/theme";

const BowlingTableHeader = () => {
  return (
    <ul
      sx={{
        display: "flex",
        background: colors.gray300,
        padding: 1,
      }}
    >
      <li sx={{ flexBasis: "20%", variant: "text.subheading3" }}>Bowler</li>
      <li sx={{ flexBasis: "11.42%", variant: "text.subheading3" }}>O</li>
      <li sx={{ flexBasis: "11.42%", variant: "text.subheading3" }}>M</li>
      <li sx={{ flexBasis: "11.42%", variant: "text.subheading3" }}>R</li>
      <li sx={{ flexBasis: "11.42%", variant: "text.subheading3" }}>W</li>
      <li sx={{ flexBasis: "11.42%", variant: "text.subheading3" }}>NB</li>
      <li sx={{ flexBasis: "11.42%", variant: "text.subheading3" }}>WD</li>
      <li sx={{ flexBasis: "11.42%", variant: "text.subheading3" }}>Eco</li>
    </ul>
  );
};

export default BowlingTableHeader;
