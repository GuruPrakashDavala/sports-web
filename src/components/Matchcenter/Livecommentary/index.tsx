/** @jsxImportSource theme-ui */

import { useState, useEffect, useMemo } from "react";
import { colors } from "../../../styles/theme";
import { Fragment } from "react";
import { ThemeUICSSObject } from "theme-ui";
import InfiniteScroll from "react-infinite-scroll-component";
import BatIcon from "../../Icons/Bat";
import BallIcon from "../../Icons/Ball";
import { FixtureStatus } from "../../../types/matchcenter";
import {
  Ball as BallT,
  Batting as BattingT,
  Bowling as BowlingT,
  Player as PlayerT,
  Scoreboard as ScoreboardT,
} from "../../../types/sportmonks";
import LiveBatting from "./LiveBatting";
import LiveBowling from "./LiveBowling";
import { getOversSummary } from "../../../utils/matchcenter";
import OverSummary, { OversSummary as OversSummaryT } from "./OverSummary";
import PostMatchInfo from "./PostMatchInfo";
import { useBreakpointIndex } from "@theme-ui/match-media";
import WicketBallInfo from "./utils/WicketBallInfo";
import BallInfo from "./utils/BallInfo";
import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";

export const PlayerBattingDetails = (props: {
  batsman: PlayerT;
  fullBattingList: BattingT[];
  recentBall: BallT;
  excludeWicketPlayer?: boolean;
  styles?: ThemeUICSSObject;
}): JSX.Element => {
  const {
    batsman,
    fullBattingList,
    recentBall,
    excludeWicketPlayer = true,
    styles = {},
  } = props;
  const bp = useBreakpointIndex();
  // Will always return single record (matching batsman record) or undefined
  const battingInningsForBatsmanId = fullBattingList.filter(
    (batting) => batsman.id === batting.batsman.id
  )?.[0];

  return (
    <Fragment>
      {/* Batsman innings available */}
      {battingInningsForBatsmanId ? (
        battingInningsForBatsmanId.result.is_wicket && excludeWicketPlayer ? (
          <></>
        ) : (
          <ul sx={{ ...rowStyles, ...styles }}>
            <li
              sx={{
                flexBasis: ["45%", "30%"],
                display: "flex",
                alignItems: "center",
                variant: bp < 1 ? "text.body4" : undefined,
              }}
            >
              {bp > 1 ? batsman.fullname : batsman.lastname}

              {batsman.id === recentBall.batsman_id && excludeWicketPlayer && (
                <BatIcon
                  styles={{
                    display: "flex",
                    marginLeft: "5px",
                    padding: 0,
                    "> svg": {
                      fontSize: ["16px", "20px"],
                      color: colors.black,
                    },
                  }}
                />
              )}
            </li>

            <li
              sx={{
                flexBasis: ["11%", "14%"],
                variant: bp < 1 ? "text.body4" : undefined,
              }}
            >
              {battingInningsForBatsmanId.score}
            </li>

            <li
              sx={{
                flexBasis: ["11%", "14%"],
                variant: bp < 1 ? "text.body4" : undefined,
              }}
            >
              {battingInningsForBatsmanId.ball}
            </li>

            <li
              sx={{
                flexBasis: ["11%", "14%"],
                variant: bp < 1 ? "text.body4" : undefined,
              }}
            >
              {battingInningsForBatsmanId.four_x}
            </li>

            <li
              sx={{
                flexBasis: ["11%", "14%"],
                variant: bp < 1 ? "text.body4" : undefined,
              }}
            >
              {battingInningsForBatsmanId.six_x}
            </li>

            <li
              sx={{
                flexBasis: ["11%", "14%"],
                variant: bp < 1 ? "text.body4" : undefined,
              }}
            >
              {battingInningsForBatsmanId.rate}
            </li>
          </ul>
        )
      ) : (
        // Batsman innings hasn't started yet
        // Show name and stats as zero
        <ul sx={rowStyles}>
          <li
            sx={{
              flexBasis: ["35%", "30%"],
              display: "flex",
              alignItems: "center",
            }}
          >
            {batsman.lastname}
          </li>
          <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>0</li>
          <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>0</li>
          <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>0</li>
          <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>0</li>
        </ul>
      )}
    </Fragment>
  );
};

/** 
   PlayerBowlingDetails props note:
   bowler - player resource type
   fullBowlerList - all bowlers bowled in both innings of the game
   currentBowler - boolean (used for icon display) 
   */

export const PlayerBowlingDetails = (props: {
  bowler: PlayerT;
  fullBowlersList: BowlingT[];
  currentBowler?: boolean;
}): JSX.Element => {
  const { bowler, fullBowlersList, currentBowler } = props;
  const bp = useBreakpointIndex();
  const bowlerStats = fullBowlersList.filter(
    (bowling) => bowler.id === bowling.bowler.id
  )?.[0];
  return (
    <ul sx={rowStyles}>
      <li
        sx={{
          flexBasis: "40%",
          display: "flex",
          alignItems: "center",
          variant: bp < 1 ? "text.body4" : undefined,
        }}
        key={bowler.firstname}
      >
        {bp > 1 ? bowler.fullname : bowler.lastname}
        {currentBowler && (
          <BallIcon
            styles={{
              display: "flex",
              marginLeft: "5px",
              padding: 0,
              "> svg": { fontSize: ["14px", "18px"], color: colors.black },
            }}
          />
        )}
      </li>

      {bowlerStats && (
        <Fragment>
          <li
            sx={{
              flexBasis: "15%",
              variant: bp < 1 ? "text.body4" : undefined,
            }}
          >
            {bowlerStats.overs}
          </li>
          <li
            sx={{
              flexBasis: "15%",
              variant: bp < 1 ? "text.body4" : undefined,
            }}
          >
            {bowlerStats.runs}
          </li>
          <li
            sx={{
              flexBasis: "15%",
              variant: bp < 1 ? "text.body4" : undefined,
            }}
          >
            {bowlerStats.wickets}
          </li>
          <li
            sx={{
              flexBasis: "15%",
              variant: bp < 1 ? "text.body4" : undefined,
            }}
          >
            {bowlerStats.rate}
          </li>
        </Fragment>
      )}
    </ul>
  );
};

const tableWrapperStyles: ThemeUICSSObject = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  height: "100%",
  width: "100%",
  paddingX: [0, 1],
};

export const rowWrapperStyles: ThemeUICSSObject = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  border: "1px solid",
  borderColor: colors.gray200,
  width: "100%",
};

export const rowHeaderStyles: ThemeUICSSObject = {
  display: "flex",
  width: "100%",
  flexWrap: "wrap",
  // justifyContent: "center",
  alignItems: "center",
  paddingX: [1, 2],
  paddingY: 2,
  background: colors.gray300,
  "> li": {
    variant: "text.subheading3",
  },
};

const rowStyles: ThemeUICSSObject = {
  display: "flex",
  width: "100%",
  flexWrap: "wrap",
  paddingX: [1, 2],
  paddingY: 1,
  // justifyContent: "center",
  alignItems: "center",
};

const LiveCommentary = (props: {
  balls: BallT[];
  status: string;
  note: string;
  batting: BattingT[];
  bowling: BowlingT[];
  scoreboards: ScoreboardT[];
  manofmatch?: null | PlayerT;
}): JSX.Element => {
  const { balls, status, note, batting, bowling, manofmatch, scoreboards } =
    props;
  const reversedOrder = [...balls].reverse();
  const [ballsLimit, setBallsLimit] = useState<number>(25);
  const [ballsInList, setBallsInList] = useState<BallT[]>(
    reversedOrder.slice(0, ballsLimit)
  );

  // console.log(reversedOrder);

  // reversedOrder contails the balls in reverse order. Example overs from 19.6 to 0.1
  // Balls data
  const recentBall = reversedOrder[0];
  const liveScoreboard = recentBall.scoreboard;
  const isCurrentInningsAllOut = scoreboards.find(
    (scoreboard) =>
      scoreboard.scoreboard === liveScoreboard &&
      scoreboard.type === "total" &&
      scoreboard.wickets === 10
  );

  const previousOver = {
    lastOver: Number((recentBall.ball - 1).toFixed(1)),
    scoreboard: recentBall.scoreboard,
  };

  const previousBowler =
    previousOver.lastOver > 0
      ? reversedOrder.filter(
          (ball) =>
            ball.ball === previousOver.lastOver &&
            ball.scoreboard === previousOver.scoreboard
        )[0]
      : undefined;

  useEffect(() => {
    setBallsInList(reversedOrder.slice(0, ballsLimit));
  }, [ballsLimit, balls]);

  const [firstInningsOversSummary, setFirstInningsOversSummary] = useState<
    OversSummaryT | undefined
  >(undefined);

  const [secondInningsOversSummary, setSecondInningsOversSummary] = useState<
    OversSummaryT | undefined
  >(undefined);

  const [thirdInningsOversSummary, setThirdInningsOversSummary] = useState<
    OversSummaryT | undefined
  >(undefined);

  const [fourthInningsOversSummary, setFourthInningsOversSummary] = useState<
    OversSummaryT | undefined
  >(undefined);

  useMemo(() => {
    const firstInningsOversSummary = getOversSummary("S1", balls);
    const secondInningsOversSummary = getOversSummary("S2", balls);
    const thirdInningsOversSummary = getOversSummary("S3", balls);
    const fourthInningsOversSummary = getOversSummary("S4", balls);
    setFirstInningsOversSummary(firstInningsOversSummary);
    setSecondInningsOversSummary(secondInningsOversSummary);
    setThirdInningsOversSummary(thirdInningsOversSummary);
    setFourthInningsOversSummary(fourthInningsOversSummary);
  }, [balls]);

  const getMoreBalls = (ev: any) => {
    if (ballsLimit < reversedOrder.length) {
      setBallsLimit((prev) => prev + 25);
      setTimeout(() => ev.target.complete(), 500);
    }
    ev.target.complete();
  };

  const trackOvers: string[] = [];

  return (
    <div
      sx={{
        paddingY: [2, 3],
      }}
    >
      <div sx={tableWrapperStyles}>
        {!isCurrentInningsAllOut ? (
          <LiveBatting fullBattingList={batting} recentBall={recentBall} />
        ) : (
          <></>
        )}

        <LiveBowling
          recentBall={recentBall}
          fullBowlersList={bowling}
          previousBowler={previousBowler}
        />
      </div>

      {status === FixtureStatus.Finished && (
        <PostMatchInfo manofmatch={manofmatch} note={note} />
      )}

      {/* Innings break div */}

      {/* {status === FixtureStatus.InningsBreak && <div>Innings break </div>} */}

      {/* Ball by ball commentary infinite scroll */}

      <div>
        {ballsInList &&
          ballsInList.map((ball) => {
            const isLastBallOfTheOver =
              Number((ball.ball % 1).toFixed(1)) === 0.6;
            const overNumber = Math.round(ball.ball);
            const overKey: string = `${overNumber}-${ball.scoreboard}`;
            const inningsOversSummary =
              ball.scoreboard === "S1"
                ? firstInningsOversSummary
                : ball.scoreboard === "S2"
                ? secondInningsOversSummary
                : ball.scoreboard === "S3"
                ? thirdInningsOversSummary
                : ball.scoreboard === "S4"
                ? fourthInningsOversSummary
                : undefined;

            return (
              <Fragment key={ball.id}>
                {isLastBallOfTheOver && !trackOvers.includes(overKey) && (
                  <OverSummary
                    overNumber={overNumber}
                    innings={ball.scoreboard}
                    ball={ball}
                    inningsOversSummary={inningsOversSummary}
                  />
                )}

                {isLastBallOfTheOver && trackOvers.push(overKey) && null}

                {ball.score.is_wicket && ball.batsmanout ? (
                  <WicketBallInfo
                    ball={ball}
                    fullBattingList={batting}
                    recentBall={recentBall}
                    key={ball.id}
                  />
                ) : (
                  <BallInfo ball={ball} key={ball.id} />
                )}
              </Fragment>
            );
          })}
      </div>

      <IonInfiniteScroll onIonInfinite={getMoreBalls}>
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </div>
  );
};

export default LiveCommentary;
