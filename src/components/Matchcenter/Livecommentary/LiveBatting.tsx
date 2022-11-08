/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { ThemeUICSSObject } from "theme-ui";
import { PlayerBattingDetails, rowHeaderStyles, rowWrapperStyles } from ".";
import {
  Ball as BallT,
  Batting as BattingT,
  Player as PlayerT,
} from "../../../types/sportmonks";

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
        <li sx={{ flexBasis: ["35%", "30%"] }}>Batsman</li>
        <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>{bp > 1 ? `Runs` : `R`}</li>
        <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>
          {bp > 1 ? `Balls` : `B`}
        </li>
        <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>4S</li>
        <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>6S</li>
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
