/** @jsxImportSource theme-ui */

import { PlayerBowlingDetails, rowHeaderStyles, rowWrapperStyles } from ".";
import { Ball as BallT, Bowling as BowlingT } from "../../../types/sportmonks";

const LiveBowling = (props: {
  recentBall: BallT;
  fullBowlersList: BowlingT[];
  previousBowler?: BallT;
}) => {
  const { recentBall, fullBowlersList, previousBowler } = props;
  return (
    <div sx={{ ...rowWrapperStyles, marginTop: 4 }}>
      <ul sx={rowHeaderStyles}>
        <li sx={{ flexBasis: "35%" }}>Bowler</li>
        <li sx={{ flexBasis: "16.25%" }}>Ov</li>
        <li sx={{ flexBasis: "16.25%" }}>R</li>
        <li sx={{ flexBasis: "16.25%" }}>W</li>
        <li sx={{ flexBasis: "16.25%" }}>Eco</li>
      </ul>

      {/* Bowler one */}

      <PlayerBowlingDetails
        bowler={recentBall.bowler}
        fullBowlersList={fullBowlersList}
        currentBowler={true}
      />

      {/* Previous bowler - bowler two if exists */}
      {previousBowler && (
        <PlayerBowlingDetails
          bowler={previousBowler.bowler}
          fullBowlersList={fullBowlersList}
        />
      )}
    </div>
  );
};

export default LiveBowling;
