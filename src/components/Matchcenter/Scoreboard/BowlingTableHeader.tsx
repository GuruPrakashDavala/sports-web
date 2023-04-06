/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { colors } from "../../../styles/theme";

const BowlingTableHeader = () => {
  const bp = useBreakpointIndex();

  const bowlingTableHeaderMd = [
    { name: "Bowler", width: "20%" },
    { name: "O", width: "11.42%" },
    { name: "M", width: "11.42%" },
    { name: "R", width: "11.42%" },
    { name: "W", width: "11.42%" },
    { name: "NB", width: "11.42%" },
    { name: "WD", width: "11.42%" },
    { name: "Eco", width: "11.42%" },
  ];

  const bowlingTableHeaderSm = [
    { name: "Bowler", width: "30%" },
    { name: "O", width: "14%" },
    { name: "M", width: "14%" },
    { name: "R", width: "14%" },
    { name: "W", width: "14%" },
    { name: "Eco", width: "14%" },
  ];

  const tableHeaders = bp > 1 ? bowlingTableHeaderMd : bowlingTableHeaderSm;
  return (
    <ul
      sx={{
        display: "flex",
        background: colors.gray300,
        padding: 1,
      }}
    >
      {tableHeaders.map((heading, index) => (
        <li
          sx={{ flexBasis: heading.width, variant: "text.subheading4" }}
          key={index}
        >
          {heading.name}
        </li>
      ))}
    </ul>
  );
};

export default BowlingTableHeader;
