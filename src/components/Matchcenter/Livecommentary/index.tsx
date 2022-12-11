/** @jsxImportSource theme-ui */

import { useState, useEffect, useMemo } from "react";
import { colors } from "../../../styles/theme";
import BallInfoCircle from "./BallInfoCircle";
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
  Scores as ScoresT,
} from "../../../types/sportmonks";
import LiveBatting from "./LiveBatting";
import LiveBowling from "./LiveBowling";
import WicketCard from "./WicketCard";
import { getOversSummary } from "../../../utils/matchcenter";
import OverSummary, { OversSummary as OversSummaryT } from "./OverSummary";
import PostMatchInfo from "./PostMatchInfo";
import { useBreakpointIndex } from "@theme-ui/match-media";

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
                flexBasis: ["35%", "30%"],
                display: "flex",
                alignItems: "center",
                variant: bp < 1 ? "text.body4" : undefined,
              }}
            >
              {bp > 1 ? batsman.fullname : batsman.lastname}

              {batsman.id === recentBall.batsman_id && (
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
                flexBasis: ["16.25%", "17.5%"],
                variant: bp < 1 ? "text.body4" : undefined,
              }}
            >
              {battingInningsForBatsmanId.score}
            </li>
            <li
              sx={{
                flexBasis: ["16.25%", "17.5%"],
                variant: bp < 1 ? "text.body4" : undefined,
              }}
            >
              {battingInningsForBatsmanId.ball}
            </li>
            <li
              sx={{
                flexBasis: ["16.25%", "17.5%"],
                variant: bp < 1 ? "text.body4" : undefined,
              }}
            >
              {battingInningsForBatsmanId.four_x}
            </li>
            <li
              sx={{
                flexBasis: ["16.25%", "17.5%"],
                variant: bp < 1 ? "text.body4" : undefined,
              }}
            >
              {battingInningsForBatsmanId.six_x}
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

const getWicketType = (type: string): string => {
  const wicketType = type.includes("Run Out") ? "Run Out" : type;
  return wicketType;
};

const getWicketCommentary = (ball: BallT, wicketType: string): string => {
  const type = getWicketType(wicketType);
  switch (type) {
    case "Catch Out": {
      return `Caught by ${ball.catchstump.fullname}. ${ball.batsmanout.fullname} out!`;
    }
    case "Clean Bowled": {
      return `Clean Bowled. ${ball.batsmanout.fullname} out!`;
    }
    case "LBW OUT": {
      return `LBW. ${ball.batsmanout.fullname} out!`;
    }
    case "Stump Out": {
      return `Stumped. ${ball.batsmanout.fullname} out!`;
    }
    case "Run Out": {
      const runoutBy = ball.runoutby
        ? `(${ball.runoutby.fullname} / ${ball.catchstump.fullname})`
        : ball.catchstump
        ? `${ball.catchstump.fullname}`
        : ``;
      return `Runout by ${runoutBy}. ${ball.batsmanout.fullname} out!`;
    }
    default:
      return ``;
  }
};

const getNormalCommentary = (ball: BallT): JSX.Element => {
  return (
    <Fragment>
      <p sx={{ display: "inline" }}>
        {`${ball.ball} - ${ball.bowler.fullname} to ${ball.batsman.fullname}.`}
        &nbsp;
      </p>

      <p
        sx={{
          display: "inline",
          variant: ball.score.six || ball.score.four ? "text.subheading3" : "",
        }}
      >
        {ball.score.name}.
      </p>
    </Fragment>
  );
};

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

const BallInfo = (props: { ball: BallT; isWicket?: boolean }): JSX.Element => {
  const { ball, isWicket = false } = props;
  const ballInfoContainerStyles: ThemeUICSSObject = {
    display: "flex",
    alignItems: "center",
    padding: [1, 2],
    marginY: 1,
    marginX: [0, 1],
    background: colors.gray300,
    borderRadius: "10px",
  };

  return (
    <div key={ball.id} sx={ballInfoContainerStyles}>
      {isWicket ? (
        <Fragment>
          <BallInfoCircle ball={`W`} color={colors.red100} />
          <span sx={{ paddingX: 1 }}>
            <p sx={{ display: "inline" }}>
              {ball.ball} - {ball.bowler.fullname} to {ball.batsman.fullname}.{" "}
            </p>

            <p
              sx={{
                display: "inline",
              }}
            >
              That&apos;s a wicket. &nbsp;
            </p>

            <p sx={{ display: "inline", variant: "text.subheading3" }}>
              {getWicketCommentary(ball, ball.score.name)}
            </p>
          </span>
        </Fragment>
      ) : (
        <Fragment>
          {getBallInfoCircle(ball.score)}
          <span sx={{ paddingX: 1 }}>{getNormalCommentary(ball)}</span>
        </Fragment>
      )}
    </div>
  );
};

const InfoCircle = (props: {
  type: string | number;
  runs?: number;
}): JSX.Element => {
  const { type, runs } = props;
  switch (type) {
    case "six":
      return <BallInfoCircle ball={`6`} color={colors.green} />;

    case "four":
      return <BallInfoCircle ball={`4`} color={colors.yellow300} />;

    case "bye":
      return <BallInfoCircle ball={`b`} color={colors.black} runs={runs} />;

    case "leg bye":
      return <BallInfoCircle ball={`lb`} color={colors.black} runs={runs} />;

    case "no ball":
      return <BallInfoCircle ball={`nb`} color={colors.black} runs={runs} />;

    case "wide":
      return <BallInfoCircle ball={`wd`} color={colors.black} runs={runs} />;

    case "wicket":
      return <BallInfoCircle ball={`W`} color={colors.red150} />;

    default:
      return <BallInfoCircle ball={type} color={colors.gray200} />;
  }
};

const getBallInfoCircle = (score: ScoresT): JSX.Element => {
  const type = score.six
    ? `six`
    : score.four
    ? `four`
    : score.bye > 0
    ? `bye`
    : score.leg_bye > 0
    ? `leg bye`
    : score.noball > 0
    ? `no ball`
    : !score.ball
    ? `wide`
    : score.runs;
  return <InfoCircle type={type} runs={score.runs} />;
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
  justifyContent: "center",
  alignItems: "center",
  paddingX: 2,
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
  paddingX: 2,
  paddingY: 1,
  justifyContent: "center",
  alignItems: "center",
};

const LiveCommentary = (props: {
  balls: BallT[];
  status: string;
  note: string;
  batting: BattingT[];
  bowling: BowlingT[];
  manofmatch?: null | PlayerT;
}): JSX.Element => {
  const { balls, status, note, batting, bowling, manofmatch } = props;
  const reversedOrder = [...balls].reverse();
  const [ballsLimit, setBallsLimit] = useState<number>(25);
  const [ballsInList, setBallsInList] = useState<BallT[]>(
    reversedOrder.slice(0, ballsLimit)
  );

  // reversedOrder contails the balls in reverse order. Example overs from 19.6 to 0.1
  // Balls data
  const recentBall = reversedOrder[0];

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

  useMemo(() => {
    const firstInningsOversSummary = getOversSummary("S1", balls);
    const secondInningsOversSummary = getOversSummary("S2", balls);
    setFirstInningsOversSummary(firstInningsOversSummary);
    setSecondInningsOversSummary(secondInningsOversSummary);
  }, [balls]);

  const getMoreBalls = () => {
    setBallsLimit((prev) => prev + 25);
  };

  const trackOvers: string[] = [];

  return (
    <div sx={{ paddingY: [2, 3] }}>
      <div sx={tableWrapperStyles}>
        <LiveBatting fullBattingList={batting} recentBall={recentBall} />
        <LiveBowling
          recentBall={recentBall}
          fullBowlersList={bowling}
          previousBowler={previousBowler}
        />
      </div>

      {status === FixtureStatus.Finished && (
        <PostMatchInfo manofmatch={manofmatch} note={note} />
      )}

      {status === FixtureStatus.InningsBreak && <div>Innings break </div>}

      {/* Ball by ball commentary infinite scroll */}

      <InfiniteScroll
        dataLength={ballsInList.length}
        next={getMoreBalls}
        hasMore={ballsLimit > reversedOrder.length ? false : true}
        loader={<h4>Loading live commentary...</h4>}
      >
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
      </InfiniteScroll>
    </div>
  );
};

export default LiveCommentary;
