/** @jsxImportSource theme-ui */

import { useState, useEffect } from "react";
import { colors } from "../../../styles/theme";
import ScorecardTabs from "../Scoreboard/ScorecardTabs";
import BallInfoCircle from "./BallInfoCircle";
import { Fragment } from "react";
import { ThemeUICSSObject } from "theme-ui";
import InfiniteScroll from "react-infinite-scroll-component";
import { getWicketCatchStumpRunout } from "../Scoreboard/InningsTable";
import BatIcon from "../../Icons/Bat";
import BallIcon from "../../Icons/Ball";

const PlayerBattingDetails = (props: {
  batsman: any;
  batting: any;
  recentBall: any;
}): JSX.Element => {
  const { batsman, batting, recentBall } = props;
  // Will always return single record (matching batsman record) or undefined
  const battingInningsForBatsmanId = batting.filter(
    (batting: any) => batsman.id === batting.batsman.id
  )?.[0];

  return (
    <Fragment>
      {/* Batsman innings available */}
      {battingInningsForBatsmanId ? (
        battingInningsForBatsmanId.result.is_wicket ? (
          <></>
        ) : (
          <ul sx={rowStyles}>
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
                    marginLeft: 1,
                    padding: 0,
                    "> svg": { fontSize: "22px", color: colors.black },
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
        <ul sx={rowStyles}>
          <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>0</li>
          <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>0</li>
          <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>0</li>
          <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>0</li>
        </ul>
      )}
    </Fragment>
  );
};

const PlayerBowlingDetails = (props: {
  bowlerId: any;
  bowling: any;
}): JSX.Element => {
  const { bowlerId, bowling } = props;
  return (
    <Fragment>
      {bowling.map((bowler: any) => {
        return bowlerId === bowler.bowler.id ? (
          <Fragment key={bowler.bowler.id}>
            <li sx={{ flexBasis: "17.5%" }}>{bowler.overs}</li>
            <li sx={{ flexBasis: "17.5%" }}>{bowler.runs}</li>
            <li sx={{ flexBasis: "17.5%" }}>{bowler.wickets}</li>
            <li sx={{ flexBasis: "17.5%" }}>{bowler.rate}</li>
          </Fragment>
        ) : (
          <></>
        );
      })}
    </Fragment>
  );
};

const tableWrapperStyles: ThemeUICSSObject = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  height: "100%",
  width: "100%",
  paddingX: 1,
};

const rowWrapperStyles: ThemeUICSSObject = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  border: "1px solid",
  borderColor: colors.gray200,
  width: "100%",
};

const rowHeaderStyles: ThemeUICSSObject = {
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
  balls: any;
  status: any;
  note: any;
  batting: any;
  bowling: any;
}) => {
  const { balls, status, note, batting, bowling } = props;
  const reversedOrder = [...balls].reverse();
  const [ballsLimit, setBallsLimit] = useState(25);
  const [initialBalls, setInitialBalls] = useState<any[]>(
    reversedOrder.slice(0, ballsLimit)
  );
  // reversedOrder contails the balls in reverse order. Example overs from 19.6 to 0.1
  const recentBall = reversedOrder[0];
  // console.log(initialBalls);
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
    setInitialBalls(reversedOrder.slice(0, ballsLimit));
  }, [ballsLimit]);

  const getWicketType = (type: any) => {
    const wicketType = type.includes("Run Out") ? "Run Out" : type;
    return wicketType;
  };

  const getWicketCommentary = (ball: any, wicketType: any) => {
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
    }
  };

  const infoCircle = (type: any, runs: any) => {
    switch (type) {
      case "six": {
        return <BallInfoCircle ball={`6`} color={colors.green} />;
      }
      case "four": {
        return <BallInfoCircle ball={`4`} color={colors.yellow300} />;
      }
      case "bye": {
        return <BallInfoCircle ball={`b`} color={colors.black} runs={runs} />;
      }
      case "leg bye": {
        return <BallInfoCircle ball={`lb`} color={colors.black} runs={runs} />;
      }
      case "no ball": {
        return <BallInfoCircle ball={`nb`} color={colors.black} runs={runs} />;
      }
      case "wide": {
        return <BallInfoCircle ball={`wd`} color={colors.black} runs={runs} />;
      }
      default:
        return <BallInfoCircle ball={type} color={colors.gray200} />;
    }
  };

  const getBallInfoCircle = (score: any): JSX.Element => {
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
    return infoCircle(type, score.runs);
  };

  const getMoreBalls = () => {
    console.log(reversedOrder.length);
    console.log(ballsLimit);
    setTimeout(() => {
      setBallsLimit((prev) => prev + 25);
    }, 1000);
    // setBallsLimit((prev) => prev + 25);
  };

  return (
    <div>
      {/* Live commentary innings box */}
      <div sx={tableWrapperStyles}>
        {/* Batting table */}
        <div sx={rowWrapperStyles}>
          <ul sx={rowHeaderStyles}>
            <li sx={{ flexBasis: ["35%", "30%"] }}>Batsman</li>
            <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>Runs</li>
            <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>Balls</li>
            <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>4S</li>
            <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>6S</li>
          </ul>

          {/* Batsman one */}
          <PlayerBattingDetails
            batsman={recentBall.batsmanone}
            batting={batting}
            recentBall={recentBall}
          />

          {/* Batsman two */}
          <PlayerBattingDetails
            batsman={recentBall.batsmantwo}
            batting={batting}
            recentBall={recentBall}
          />
        </div>

        {/* Bowling table */}
        <div sx={{ ...rowWrapperStyles, marginTop: 4 }}>
          <ul sx={rowHeaderStyles}>
            <li sx={{ flexBasis: "30%" }}>Bowler</li>
            <li sx={{ flexBasis: "17.5%" }}>Ov</li>
            <li sx={{ flexBasis: "17.5%" }}>R</li>
            <li sx={{ flexBasis: "17.5%" }}>W</li>
            <li sx={{ flexBasis: "17.5%" }}>Eco</li>
          </ul>

          {/* Bowler one */}
          <ul sx={rowStyles}>
            <li
              sx={{ flexBasis: "30%", display: "flex", alignItems: "center" }}
            >
              {recentBall.bowler.lastname}
              <BallIcon
                styles={{
                  marginLeft: 1,
                  padding: 0,
                  "> svg": { fontSize: "18px", color: colors.black },
                }}
              />
            </li>

            <PlayerBowlingDetails
              bowlerId={recentBall.bowler.id}
              bowling={bowling}
            />
          </ul>

          {/* Previous bowler two */}
          {previousBowler && (
            <ul sx={rowStyles}>
              <li sx={{ flexBasis: "30%" }}>
                {previousBowler.bowler.lastname}
              </li>
              <PlayerBowlingDetails
                bowlerId={previousBowler.bowler.id}
                bowling={bowling}
              />
            </ul>
          )}
        </div>
      </div>

      <ul>
        {status === "Finished" && (
          <li sx={{ padding: 1, margin: 1, background: colors.mint }}>
            <p sx={{ variant: "text.subheading3", color: colors.white }}>
              {note}
            </p>
          </li>
        )}

        {/* Commentary infinite scroll */}
        <InfiniteScroll
          dataLength={initialBalls.length}
          next={getMoreBalls}
          hasMore={ballsLimit > reversedOrder.length ? false : true}
          loader={<h4>Loading...</h4>}
        >
          <Fragment>
            {initialBalls &&
              initialBalls.map((ball: any) => {
                const result = ball.score.name;
                const bowlerName = ball.bowler ? ball.bowler.lastname : "";
                const catchstump = ball.catchstump
                  ? ball.catchstump.lastname
                  : "";
                const runoutBy = ball.runoutby ? ball.runoutby.lastname : "";
                return ball.score.is_wicket && ball.batsmanout ? (
                  <Fragment>
                    <div
                      sx={{
                        margin: 1,
                        background: colors.red200,
                        borderRadius: "10px",
                      }}
                    >
                      <ul sx={{ display: "flex", width: "100%" }}>
                        <li
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            width: "100%",
                            alignItems: "center",
                            padding: 1,
                          }}
                        >
                          <div
                            sx={{
                              display: "flex",
                              // background: colors.red150,
                              // border: "1px solid",
                              // borderColor: colors.gray300,
                              height: "fit-content",
                              width: "fit-content",
                              alignItems: "center",
                              borderRadius: "10px",
                            }}
                          >
                            <p
                              sx={{
                                padding: 1,
                                variant: "text.subheading2",
                                color: colors.white,
                              }}
                            >
                              Out
                            </p>
                          </div>
                          <div
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              padding: 1,
                            }}
                          >
                            <p
                              sx={{
                                variant: "text.subheading3",
                                color: colors.white,
                                padding: 1,
                              }}
                            >
                              {ball.batsmanout.fullname}
                            </p>
                            <p
                              sx={{
                                variant: "text.heading4",
                                color: colors.white,
                                padding: 1,
                              }}
                            >
                              {getWicketCatchStumpRunout(
                                result,
                                catchstump,
                                bowlerName,
                                runoutBy
                              )}
                            </p>
                          </div>
                          <div
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              padding: 1,
                            }}
                          >
                            <p
                              sx={{
                                variant: "text.heading4",
                                color: colors.white,
                                padding: 1,
                              }}
                            >
                              6s
                            </p>
                            <p
                              sx={{
                                variant: "text.heading4",
                                color: colors.white,
                                padding: 1,
                              }}
                            >
                              0
                            </p>
                          </div>
                          <div
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              padding: 1,
                            }}
                          >
                            <p
                              sx={{
                                variant: "text.heading4",
                                color: colors.white,
                                padding: 1,
                              }}
                            >
                              6s
                            </p>
                            <p
                              sx={{
                                variant: "text.heading4",
                                color: colors.white,
                                padding: 1,
                              }}
                            >
                              0
                            </p>
                          </div>
                          <div
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              padding: 1,
                            }}
                          >
                            <p
                              sx={{
                                variant: "text.heading4",
                                color: colors.white,
                                padding: 1,
                              }}
                            >
                              6s
                            </p>
                            <p
                              sx={{
                                variant: "text.heading4",
                                color: colors.white,
                                padding: 1,
                              }}
                            >
                              0
                            </p>
                          </div>
                          <div
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              padding: 1,
                            }}
                          >
                            <p
                              sx={{
                                variant: "text.heading4",
                                color: colors.white,
                                padding: 1,
                              }}
                            >
                              6s
                            </p>
                            <p
                              sx={{
                                variant: "text.heading4",
                                color: colors.white,
                                padding: 1,
                              }}
                            >
                              0
                            </p>
                          </div>
                        </li>
                      </ul>
                      <ul></ul>
                    </div>
                    <li
                      key={ball.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: 1,
                        margin: 1,
                        background: colors.gray300,
                        borderRadius: "10px",
                      }}
                    >
                      <BallInfoCircle ball={`W`} color={colors.red150} />
                      <span sx={{ paddingY: 1, paddingX: 1 }}>
                        <p sx={{ display: "inline-block" }}>
                          {ball.ball} - {ball.bowler.fullname} to{" "}
                          {ball.batsman.fullname}.{" "}
                        </p>
                        <p
                          sx={{
                            variant: "text.subheading3",
                            display: "inline-block",
                          }}
                        >
                          That's a wicket.{" "}
                          {getWicketCommentary(ball, ball.score.name)}
                        </p>
                      </span>
                    </li>
                  </Fragment>
                ) : (
                  <li
                    key={ball.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: 1,
                      margin: 1,
                      background: colors.gray300,
                      borderRadius: "10px",
                    }}
                  >
                    <>
                      {getBallInfoCircle(ball.score)}{" "}
                      <span sx={{ paddingY: 1, paddingX: 1 }}>
                        <p>
                          {ball.ball} - {ball.bowler.fullname} to{" "}
                          {ball.batsman.fullname}
                          {". "}
                          {ball.score.name}.
                        </p>
                      </span>
                    </>
                  </li>
                );
              })}
          </Fragment>
        </InfiniteScroll>
      </ul>
    </div>
  );
};

export default LiveCommentary;
