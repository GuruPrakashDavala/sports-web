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
    <div sx={{ ...rowWrapperStyles, marginTop: [2, 3, 4] }}>
      <ul sx={rowHeaderStyles}>
        <li sx={{ flexBasis: "40%" }}>
          <p>Bowler</p>
        </li>
        <li sx={{ flexBasis: "15%" }}>Ov</li>
        <li sx={{ flexBasis: "15%" }}>R</li>
        <li sx={{ flexBasis: "15%" }}>W</li>
        <li sx={{ flexBasis: "15%" }}>Eco</li>
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
