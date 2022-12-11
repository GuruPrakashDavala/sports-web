import { Fragment } from "react";
import {
  Ball as BallT,
  Batting as BattingT,
} from "../../../../types/sportmonks";
import WicketCard from "../WicketCard";
import BallInfo from "./BallInfo";

const WicketBallInfo = (props: {
  ball: BallT;
  fullBattingList: BattingT[];
  recentBall: BallT;
}): JSX.Element => {
  const { ball, fullBattingList, recentBall } = props;
  return (
    <Fragment>
      <WicketCard
        ball={ball}
        fullBattingList={fullBattingList}
        recentBall={recentBall}
      />
      <BallInfo ball={ball} isWicket={true} />
    </Fragment>
  );
};

export default WicketBallInfo;
