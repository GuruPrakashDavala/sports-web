/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { ThemeUICSSObject } from "theme-ui";
import { PlayerBattingDetails, rowHeaderStyles, rowWrapperStyles } from ".";
import { Ball as BallT, Batting as BattingT } from "../../../types/sportmonks";

type LiveBattingProps = {
  fullBattingList: BattingT[];
  recentBall: BallT;
  excludeWicketPlayer?: boolean;
  styles?: ThemeUICSSObject;
};

const LiveBatting = (props: LiveBattingProps) => {
  const {
    fullBattingList,
    recentBall,
    excludeWicketPlayer = true,
    styles = {},
  } = props;
  const bp = useBreakpointIndex();
  return (
    <div sx={rowWrapperStyles}>
      {/* Table header */}
      <ul sx={rowHeaderStyles}>
        <li sx={{ flexBasis: ["45%", "30%"] }}>Batsman</li>
        <li sx={{ flexBasis: ["11%", "14%"] }}>{bp > 1 ? `Runs` : `R`}</li>
        <li sx={{ flexBasis: ["11%", "14%"] }}>{bp > 1 ? `Balls` : `B`}</li>
        <li sx={{ flexBasis: ["11%", "14%"] }}>4S</li>
        <li sx={{ flexBasis: ["11%", "14%"] }}>6S</li>
        <li sx={{ flexBasis: ["11%", "14%"] }}>SR</li>
      </ul>

      {/* Table row */}
      {/* Batsman one */}
      <PlayerBattingDetails
        batsman={recentBall.batsmanone}
        fullBattingList={fullBattingList}
        recentBall={recentBall}
      />

      {/* Batsman two */}
      <PlayerBattingDetails
        batsman={recentBall.batsmantwo}
        fullBattingList={fullBattingList}
        recentBall={recentBall}
      />
    </div>
  );
};

export default LiveBatting;
