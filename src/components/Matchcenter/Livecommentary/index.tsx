/** @jsxImportSource theme-ui */

import { useState, useEffect } from "react";
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
import SectionWrapper from "../../Wrappers/SectionWrapper";

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
              }}
            >
              {batsman.lastname}

              {batsman.id === recentBall.batsman_id && (
                <BatIcon
                  styles={{
                    display: "flex",
                    marginLeft: "5px",
                    padding: 0,
                    "> svg": { fontSize: "20px", color: colors.black },
                  }}
                />
              )}
            </li>
            <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>
              {battingInningsForBatsmanId.score}
            </li>
            <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>
              {battingInningsForBatsmanId.ball}
            </li>
            <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>
              {battingInningsForBatsmanId.four_x}
            </li>
            <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>
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

export const PlayerBowlingDetails = (props: {
  bowler: PlayerT;
  fullBowlersList: BowlingT[];
  currentBowler?: boolean;
}): JSX.Element => {
  const { bowler, fullBowlersList, currentBowler } = props;
  return (
    <ul sx={rowStyles} key={bowler.id}>
      <li sx={{ flexBasis: "35%", display: "flex", alignItems: "center" }}>
        {bowler.lastname}
        {currentBowler && (
          <BallIcon
            styles={{
              display: "flex",
              marginLeft: "5px",
              padding: 0,
              "> svg": { fontSize: "18px", color: colors.black },
            }}
          />
        )}
      </li>

      {fullBowlersList.map((bowling) => {
        return bowler.id === bowling.bowler.id ? (
          <Fragment key={bowling.bowler.id}>
            <li sx={{ flexBasis: "16.25%" }}>{bowling.overs}</li>
            <li sx={{ flexBasis: "16.25%" }}>{bowling.runs}</li>
            <li sx={{ flexBasis: "16.25%" }}>{bowling.wickets}</li>
            <li sx={{ flexBasis: "16.25%" }}>{bowling.rate}</li>
          </Fragment>
        ) : (
          <></>
        );
      })}
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
      return `Caught by ${ball.catchstump.fullname}. ${ball.batsmanout.fullname} out.`;
    }
    case "Clean Bowled": {
      return `Clean Bowled. ${ball.batsmanout.fullname} out.`;
    }
    case "LBW OUT": {
      return `LBW. ${ball.batsmanout.fullname} out.`;
    }
    case "Stump Out": {
      return `Stumped. ${ball.batsmanout.fullname} out.`;
    }
    case "Run Out": {
      const runoutBy = ball.runoutby
        ? `(${ball.runoutby.fullname} / ${ball.catchstump.fullname})`
        : ball.catchstump
        ? `${ball.catchstump.fullname}`
        : ``;
      return `Runout by ${runoutBy}. ${ball.batsmanout.fullname} out.`;
    }
    default:
      return ``;
  }
};

const WicketBallInfo = (props: {
  ball: BallT;
  fullBattingList: BattingT[];
  recentBall: BallT;
}): JSX.Element => {
  const { ball, fullBattingList, recentBall } = props;
  return (
    <Fragment>
      <BallInfo ball={ball} isWicket={true} />
    </Fragment>
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

const BallInfo = (props: { ball: BallT; isWicket?: boolean }): JSX.Element => {
  const { ball, isWicket = false } = props;
  return (
    <div
      key={ball.id}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 1,
        marginY: 1,
        marginX: [0, 1],
        background: colors.gray300,
        borderRadius: "10px",
      }}
    >
      {isWicket ? (
        <Fragment>
          <BallInfoCircle ball={`W`} color={colors.red100} />
          <span sx={{ paddingY: 1, paddingX: 1 }}>
            <p sx={{ display: "inline-block" }}>
              {ball.ball} - {ball.bowler.fullname} to {ball.batsman.fullname}.{" "}
            </p>
            <p
              sx={{
                variant: "text.subheading3",
                display: "inline-block",
              }}
            >
              That&apos;s a wicket. {getWicketCommentary(ball, ball.score.name)}
            </p>
          </span>
        </Fragment>
      ) : (
        <>
          {/* {(ball.ball % 1).toFixed(1) === "0.6" &&
    ball.score.ball &&
    ball.score.noball_runs === 0
      ? "last ball - here is the place to show over overview"
      : ``} */}
          {getBallInfoCircle(ball.score)}{" "}
          <span sx={{ paddingY: 1, paddingX: 1 }}>
            <p>
              {ball.ball} - {ball.bowler.fullname} to {ball.batsman.fullname}
              {". "}
              {ball.score.name}.
            </p>
          </span>
        </>
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

const LiveCommentary = (props: {
  balls: BallT[];
  status: string;
  note: string;
  batting: BattingT[];
  bowling: BowlingT[];
}): JSX.Element => {
  const { balls, status, note, batting, bowling } = props;
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
  }, [ballsLimit]);

  const getMoreBalls = () => {
    // setTimeout(() => {
    //   setBallsLimit((prev) => prev + 25);
    // }, 1000);
    setBallsLimit((prev) => prev + 25);
  };

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
        <Fragment>
          <div
            sx={{
              padding: 1,
              marginX: [0, 1],
              marginY: [1],
              background: colors.mint,
            }}
          >
            <p sx={{ variant: "text.subheading3", color: colors.white }}>
              🏆 {note}
            </p>
          </div>
          <div sx={{ marginY: 2, marginX: [0, 1] }}>
            <p>
              Well that&apos;s a wrap. Check the points table here. Hope you
              have a good day.Check points table here... Stay connected with us
              - install the app. See you in the next game.Until then bye. Take
              care. Team cricfanatic
            </p>
          </div>
        </Fragment>
      )}

      {/* Ball by ball commentary infinite scroll */}

      <InfiniteScroll
        dataLength={ballsInList.length}
        next={getMoreBalls}
        hasMore={ballsLimit > reversedOrder.length ? false : true}
        loader={<h4>Loading...</h4>}
      >
        {ballsInList &&
          ballsInList.map((ball) => {
            return ball.score.is_wicket && ball.batsmanout ? (
              <WicketBallInfo
                ball={ball}
                fullBattingList={batting}
                recentBall={recentBall}
                key={ball.id}
              />
            ) : (
              <BallInfo ball={ball} />
            );
          })}
      </InfiniteScroll>
    </div>
  );
};

export default LiveCommentary;
