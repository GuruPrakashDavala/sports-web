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
import { useBreakpointIndex } from "@theme-ui/match-media";

const PlayerBattingDetails = (props: {
  batsman: any;
  fullBattingList: any;
  recentBall: any;
  excludeWicketPlayer?: boolean;
  styles?: any;
}): JSX.Element => {
  const {
    batsman,
    fullBattingList,
    recentBall,
    excludeWicketPlayer = true,
    styles,
  } = props;
  // Will always return single record (matching batsman record) or undefined
  const battingInningsForBatsmanId = fullBattingList.filter(
    (batting: any) => batsman.id === batting.batsman.id
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

const PlayerBowlingDetails = (props: {
  bowler: any;
  fullBowlersList: any;
  currentBowler?: any;
}): JSX.Element => {
  const { bowler, fullBowlersList, currentBowler } = props;
  return (
    <ul sx={rowStyles}>
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
      {fullBowlersList.map((bowling: any) => {
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

  const bp = useBreakpointIndex();

  return (
    <div>
      {/* Live commentary innings box */}
      <div sx={tableWrapperStyles}>
        {/* Batting table */}
        <div sx={rowWrapperStyles}>
          <ul sx={rowHeaderStyles}>
            <li sx={{ flexBasis: ["35%", "30%"] }}>Batsman</li>
            <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>
              {bp > 1 ? `Runs` : `R`}
            </li>
            <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>
              {bp > 1 ? `Balls` : `B`}
            </li>
            <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>4S</li>
            <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>6S</li>
          </ul>

          {/* Batsman one */}
          <PlayerBattingDetails
            batsman={recentBall.batsmanone}
            fullBattingList={batting}
            recentBall={recentBall}
          />

          {/* Batsman two */}
          <PlayerBattingDetails
            batsman={recentBall.batsmantwo}
            fullBattingList={batting}
            recentBall={recentBall}
          />
        </div>

        {/* Bowling table */}
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
            fullBowlersList={bowling}
            currentBowler={true}
          />

          {/* Previous bowler two */}
          {previousBowler && (
            <PlayerBowlingDetails
              bowler={previousBowler.bowler}
              fullBowlersList={bowling}
            />
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
                        display: "flex",
                        margin: 1,
                        background: colors.red200,
                        borderRadius: "10px",
                      }}
                    >
                      <div sx={{ display: "flex", width: "100%" }}>
                        <div
                          sx={{
                            display: "flex",
                            justifyContent: ["flex-start", null],
                            flexWrap: "wrap",
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          <div
                            sx={{
                              display: "flex",
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
                              flexBasis: "70%",
                            }}
                          >
                            <ul
                              sx={{
                                ...rowHeaderStyles,
                                background: "transparent",
                                display: "flex",
                                "> li": {
                                  color: colors.white,
                                  variant: "text.subheading3",
                                },
                              }}
                            >
                              <li sx={{ flexBasis: ["35%", "30%"] }}>
                                Batsman
                              </li>
                              <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>
                                {bp > 1 ? `Runs` : `R`}
                              </li>
                              <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>
                                {bp > 1 ? `Balls` : `B`}
                              </li>
                              <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>
                                4S
                              </li>
                              <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>
                                6S
                              </li>
                            </ul>
                            <PlayerBattingDetails
                              batsman={ball.batsmanout}
                              fullBattingList={batting}
                              recentBall={recentBall}
                              excludeWicketPlayer={false}
                              styles={{
                                ">li": {
                                  color: colors.white,
                                  variant: "text.heading4",
                                },
                              }}
                            />
                          </div>
                        </div>
                      </div>
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
