/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import SectionWrapper from "../../components/Wrappers/SectionWrapper";
import { useState, useEffect } from "react";
import { colors } from "../../styles/theme";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ThemeUICSSObject } from "theme-ui";
import LiveCommentary from "../../components/Matchcenter/Livecommentary";
import Scoreboard from "../../components/Matchcenter/Scoreboard";
import Header from "../../components/Matchcenter/Header";
import { getYear } from "date-fns";
import { articleBodyWrapperStyles } from "../news/[slug]";
import AdBlock, { AdBlockVariant } from "../../components/AdBlock";
import ArticleCard, {
  ArticleVariant,
} from "../../components/Cards/ArticleCard";
import { fetchAPI } from "../../lib/strapi";
import { ColorTheme } from "../../types/modifier";
import ArticleMicroCard from "../../components/Cards/ArticleMicroCard";
import { renderImage } from "../../utils/util";
import {
  Batting as BattingT,
  Fixture as FixtureT,
  Scoreboard as ScoreboardT,
  Player as PlayerT,
  Team as TeamT,
} from "../../types/sportmonks";
import { ArticleType } from "../../types/article";
import { Extras, FixtureStatus } from "../../types/matchcenter";

type MatchCenterProps = {
  fixture: FixtureT;
  recentArticles: ArticleType[];
};

// lineup array contains team players (player resource)
const getTeamLineup = (lineup: PlayerT[], teamId: number) => {
  const teamLineup = lineup.filter((lineupItem) => {
    return lineupItem.lineup?.team_id === teamId;
  });
  return teamLineup;
};

const getPlayersDidNotBat = (
  fixtureBatting: BattingT[],
  lineup: PlayerT[],
  innings: string
) => {
  // fixtureBatting - contains the battings of both teams
  // lineup - contains lineup of specific team (11 players)
  // innings - Enum: S1 or S2
  // teamId - number

  // The below filters the players who batted in the specified innings. Check innings param for innings code.
  const playerIdsWhoBattedInTheInnings = fixtureBatting
    .filter((batting) => {
      return batting.scoreboard === innings;
    })
    .map((item) => item.player_id);

  const playersDidNotBatInTheInnings = lineup.filter((player) => {
    return playerIdsWhoBattedInTheInnings.indexOf(player.id) === -1;
  });

  return playersDidNotBatInTheInnings;
};

export const tabStyles: ThemeUICSSObject = {
  "> .react-tabs__tab-list": {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    // borderBottom: "1px solid #aaa",
    margin: "0 0 20px",
    paddingY: 1,
  },
  "> ul .react-tabs__tab": {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    listStyle: "none",
    padding: 2,
    cursor: "pointer",
    borderBottom: "1px solid #aaa",
    "&:hover": {
      "> p": {
        color: colors.black,
      },
    },
    "> p": {
      variant: "text.subheading3",
      color: "rgba(12, 12, 12, 0.3)",
    },
  },
  "> ul .react-tabs__tab:focus": {
    outline: "none",
  },
  "> ul .react-tabs__tab--selected": {
    background: colors.white,
    borderBottom: "2px solid",
    borderColor: colors.red100,
    "> p": {
      color: colors.black,
    },
  },
  "> .react-tabs__tab-panel": {
    display: "none",
  },
  "> .react-tabs__tab-panel--selected": {
    display: "block",
  },
};

const MatchCenter = (props: MatchCenterProps): JSX.Element => {
  console.log(props);
  const { fixture, recentArticles } = props;

  // if (fixture.status === FixtureStatus.NotStarted) {
  //   return <div>Game not started yet...</div>;
  // }

  // if (fixture.status === FixtureStatus.Abandoned && fixture.runs.length === 0) {
  //   return <div>{fixture.note}</div>;
  // }

  const isLive =
    fixture.status === FixtureStatus.FirstInnings ||
    fixture.status === FixtureStatus.SecondInnings ||
    fixture.status === FixtureStatus.InningsBreak ||
    fixture.status === FixtureStatus.Interrupted;

  const baseUrl = `/matchcenter`;

  const getRouteUrl = (
    fixtureId: number,
    s1TeamCode: string,
    s2TeamCode: string,
    leagueCode: string,
    matchDate: string
  ) => {
    // constructed url would look like - /matchcenter/42776/wct20-ind-vs-rsa-2022/
    const year = getYear(new Date(matchDate));
    const routeUrl = `${baseUrl}/${fixtureId}/${leagueCode}-${s1TeamCode}-vs-${s2TeamCode}-${year}`;
    return routeUrl;
  };

  const bp = useBreakpointIndex();
  // WIP: S1 and S2 team details

  // Util to get the opposite team info (toss lost team - 2nd Innings)
  const getOppositeTeamInfo = (tosswonTeam: TeamT) => {
    const teamInfo = [fixture.localteam, fixture.visitorteam]
      .filter((team) => tosswonTeam.code !== team.code)
      .map((team) => {
        return {
          name: team.name,
          code: team.code,
          image: team.image_path,
          id: team.id,
        };
      });
    // The above will always contain only one team (item)
    return teamInfo[0];
  };

  const setS1AndS2TeamInfo = () => {
    const tosswonTeam = fixture.tosswon;
    if (!tosswonTeam) {
      return;
    }
    switch (fixture.elected) {
      case "bowling":
        setS2Team({
          name: tosswonTeam.name,
          code: tosswonTeam.code,
          image: tosswonTeam.image_path,
          id: tosswonTeam.id,
        });
        setS1Team(getOppositeTeamInfo(tosswonTeam));
        break;
      case "batting":
        setS1Team({
          name: tosswonTeam.name,
          code: tosswonTeam.code,
          image: tosswonTeam.image_path,
          id: tosswonTeam.id,
        });
        setS2Team(getOppositeTeamInfo(tosswonTeam));
        break;
      default:
        setS1Team({
          name: fixture.localteam.name,
          code: fixture.localteam.code,
          image: fixture.localteam.image_path,
          id: fixture.localteam.id,
        });
        setS2Team({
          name: fixture.visitorteam.name,
          code: fixture.visitorteam.code,
          image: fixture.visitorteam.image_path,
          id: fixture.visitorteam.id,
        });
        break;
    }
  };

  const [s1Team, setS1Team] = useState<
    | {
        name: string;
        code: string;
        image: string;
        id: number;
      }
    | undefined
  >(undefined);

  const [s2Team, setS2Team] = useState<
    | {
        name: string;
        code: string;
        image: string;
        id: number;
      }
    | undefined
  >(undefined);

  const [s1TeamLineup, setS1TeamLineup] = useState<undefined | PlayerT[]>(
    undefined
  );
  const [s2TeamLineup, setS2TeamLineup] = useState<undefined | PlayerT[]>();

  const [s1DidNotBat, setS1DidNotBat] = useState<undefined | PlayerT[]>();
  const [s2DidNotBat, setS2DidNotBat] = useState<undefined | PlayerT[]>();

  const [s1Extras, setS1Extras] = useState<undefined | Extras>(undefined);
  const [s2Extras, setS2Extras] = useState<undefined | Extras>(undefined);

  const [s1FallOfWickets, setS1FallOfWickets] = useState<
    undefined | BattingT[]
  >(undefined);

  const [s2FallOfWickets, setS2FallOfWickets] = useState<
    undefined | BattingT[]
  >(undefined);

  // main tab index
  const [tabIndex, setTabIndex] = useState(1);

  // First useEffect to fetch both S1 and S2 team details
  useEffect(() => {
    /* 
    The below function does the following:
    1. Sets the first batting team info in s1Team
    2. Sets the second batting team info in the s2Team
    See method internals to understand the implementation logics
    */
    if (fixture.resource === "fixtures" && fixture.tosswon) {
      setS1AndS2TeamInfo();
    }
  }, [fixture]);

  // Second useEffect to set the S1 and S2 team lineup
  useEffect(() => {
    if (s1Team && s2Team && fixture.lineup.length > 0) {
      setS1TeamLineup(getTeamLineup(fixture.lineup, s1Team.id));
      setS2TeamLineup(getTeamLineup(fixture.lineup, s2Team.id));
    }
  }, [s1Team, s2Team, fixture.lineup]);

  // Third useEffect to set the s1DidNotBat and s2DidNotBat
  useEffect(() => {
    if (s1Team && s2Team && s1TeamLineup && s2TeamLineup) {
      // S1Team player did not bat
      const s1DidNotBat =
        fixture.scoreboards.filter(
          (scoreboardItem) =>
            scoreboardItem.scoreboard === "S1" &&
            scoreboardItem.type === "total"
        )?.length > 0
          ? getPlayersDidNotBat(fixture.batting, s1TeamLineup, "S1")
          : s1TeamLineup;

      // S2Team player did not bat
      const s2DidNotBat =
        fixture.scoreboards.filter(
          (scoreboardItem) =>
            scoreboardItem.scoreboard === "S2" &&
            scoreboardItem.type === "total"
        )?.length > 0
          ? getPlayersDidNotBat(fixture.batting, s2TeamLineup, "S2")
          : s2TeamLineup;

      s1DidNotBat.length > 0
        ? setS1DidNotBat(s1DidNotBat)
        : setS1DidNotBat(undefined);

      s2DidNotBat.length > 0
        ? setS2DidNotBat(s2DidNotBat)
        : setS2DidNotBat(undefined);
    }
  }, [s1Team, s2Team, s1TeamLineup, s2TeamLineup]);

  // Fourth useEffect to set the s1Extras and s2Extras
  useEffect(() => {
    if (fixture.scoreboards && s1Team && s2Team) {
      const s1ExtrasScoreboard = fixture.scoreboards.filter(
        (scoreboardItem) =>
          scoreboardItem.scoreboard === "S1" && scoreboardItem.type === "extra"
      );

      const s1Extras =
        s1ExtrasScoreboard.length > 0
          ? s1ExtrasScoreboard.map((scoreboardItem: ScoreboardT) => {
              return {
                b: scoreboardItem.bye,
                lb: scoreboardItem.leg_bye,
                wide: scoreboardItem.wide,
                nb: scoreboardItem.noball_balls + scoreboardItem.noball_runs,
                p: scoreboardItem.penalty,
                total:
                  scoreboardItem.bye +
                  scoreboardItem.leg_bye +
                  scoreboardItem.wide +
                  scoreboardItem.noball_balls +
                  scoreboardItem.noball_runs +
                  scoreboardItem.penalty,
              };
            })[0]
          : undefined;

      setS1Extras(s1Extras);

      const s2ExtrasScoreboard = fixture.scoreboards.filter(
        (scoreboardItem) =>
          scoreboardItem.scoreboard === "S2" && scoreboardItem.type === "extra"
      );

      const s2Extras =
        s2ExtrasScoreboard.length > 0
          ? s2ExtrasScoreboard.map((scoreboardItem) => {
              return {
                b: scoreboardItem.bye,
                lb: scoreboardItem.leg_bye,
                wide: scoreboardItem.wide,
                nb: scoreboardItem.noball_balls + scoreboardItem.noball_runs,
                p: scoreboardItem.penalty,
                total:
                  scoreboardItem.bye +
                  scoreboardItem.leg_bye +
                  scoreboardItem.wide +
                  scoreboardItem.noball_balls +
                  scoreboardItem.noball_runs +
                  scoreboardItem.penalty,
              };
            })[0]
          : undefined;

      setS2Extras(s2Extras);
    }
  }, [fixture.scoreboards, s1Team, s2Team]);

  // Fifth useEffect to set S1Fow and S2Fow (Fall of wickets)
  useEffect(() => {
    if (fixture.batting.length > 0) {
      // S1 fall of wickets
      const s1Fow = fixture.batting
        .filter(
          (batting) =>
            batting.scoreboard === "S1" && batting.result.is_wicket === true
        )
        .sort((batting1, batting2) => batting1.fow_balls - batting2.fow_balls);

      // Set S1 fall of wickets
      s1Fow.length > 0
        ? setS1FallOfWickets(s1Fow)
        : setS1FallOfWickets(undefined);

      // S2 fall of wickets
      const s2Fow = fixture.batting
        .filter(
          (batting, index) =>
            batting.scoreboard === "S2" && batting.result.is_wicket === true
        )
        .sort((batting1, batting2) => batting1.fow_balls - batting2.fow_balls);

      // Set S2 fall of wickets
      s2Fow.length > 0
        ? setS2FallOfWickets(s2Fow)
        : setS2FallOfWickets(undefined);
    }
  }, [fixture.batting, s1Team, s2Team]);

  // const router = useRouter();

  // Timer to test/trigger state updates - testing purpose

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log("timer initiated");
  //     // setTabIndex(1);
  //   }, 10000);
  //   return () => clearTimeout(timer);
  // }, []);

  // useEffect(() => {
  //   router.push(
  //     `/matchcenter/${fixture.id}/${fixture.localteam.code}vs${fixture.visitorteam.code}/live-commentary`
  //   );
  // }, []);

  return (
    <SectionWrapper styles={{ paddingX: [2, null, null, 0] }}>
      <div
        sx={{
          ...articleBodyWrapperStyles,
          gridTemplateColumns: ["100%", null, null, "16.66% 58.3% 25%"],
        }}
      >
        <div>
          {/* <AdBlock variant={AdBlockVariant.VERTICAL} />
          {recentArticles.length > 0 &&
            recentArticles.map((block, index) => {
              return (
                <div sx={{ paddingX: 2 }} key={block.attributes.slug}>
                  <ArticleCard
                    label={block.attributes.title}
                    imageSrc={renderImage(block.attributes.coverimage.data)}
                    variant={ArticleVariant.MEDIUM}
                    date={block.attributes.createdAt}
                    badge={block.attributes.badge?.data?.attributes.name}
                    type={block.attributes.type}
                    category={block.attributes.category}
                    slug={block.attributes.slug}
                    theme={ColorTheme.DARK}
                    styles={{ height: "100%" }}
                  />
                </div>
              );
            })} */}
        </div>

        <div>
          {/* Match Header component */}
          {s1Team && s2Team && fixture && (
            <Header
              fixture={fixture}
              s1Team={s1Team}
              s2Team={s2Team}
              isLive={isLive}
            />
          )}

          <Tabs
            //  selectedIndex={tabIndex}
            // onSelect={(index) => setTabIndex(index)}
            // defaultIndex={1}
            sx={{ ...tabStyles }}
          >
            <TabList>
              <Tab tabIndex="0">
                <p>Match info</p>
              </Tab>
              <Tab tabIndex="1">
                <p>Live commentary</p>
              </Tab>
              <Tab tabIndex="2">
                <p>Scorecard</p>
              </Tab>
              <Tab tabIndex="3">
                <p>Trending</p>
              </Tab>
            </TabList>
            <TabPanel>This section contains the match info</TabPanel>
            <TabPanel>
              {/* Livecommentary tab panel */}
              {fixture.status !== FixtureStatus.NotStarted &&
                fixture.balls.length > 0 &&
                s1Team &&
                s2Team && (
                  <LiveCommentary
                    balls={fixture.balls}
                    status={fixture.status}
                    note={fixture.note}
                    batting={fixture.batting}
                    bowling={fixture.bowling}
                  />
                )}
            </TabPanel>

            <TabPanel>
              {/* Scorecard tab panel */}
              {s1Team && s2Team && fixture.scoreboards.length > 0 && (
                // Should apply mobile responsive custom styles
                <Scoreboard
                  fixture={fixture}
                  s1Team={s1Team}
                  s1DidNotBat={s1DidNotBat}
                  s1Extras={s1Extras}
                  s1FallOfWickets={s1FallOfWickets}
                  s2Team={s2Team}
                  s2DidNotBat={s2DidNotBat}
                  s2Extras={s2Extras}
                  s2FallOfWickets={s2FallOfWickets}
                />
              )}
            </TabPanel>
            <TabPanel>This section contains trending socials</TabPanel>
          </Tabs>
        </div>

        {bp > 2 && (
          <div sx={{ paddingX: [0, 3], paddingTop: 5 }}>
            <AdBlock variant={AdBlockVariant.SQUARE} />
            {recentArticles.length > 0 &&
              recentArticles.map((block, index) => {
                return (
                  <div sx={{ paddingX: 2 }} key={block.attributes.slug}>
                    {/* <ArticleCard
                      label={block.attributes.title}
                      imageSrc={renderImage(block.attributes.coverimage.data)}
                      variant={ArticleVariant.MEDIUM}
                      date={block.attributes.createdAt}
                      badge={block.attributes.badge?.data?.attributes.name}
                      type={block.attributes.type}
                      category={block.attributes.category}
                      slug={block.attributes.slug}
                      theme={ColorTheme.GRAY}
                      styles={{ height: "100%" }}
                    /> */}

                    <ArticleMicroCard
                      label={block.attributes.title}
                      imageSrc={renderImage(block.attributes.coverimage.data)}
                      variant={ArticleVariant.MEDIUM}
                      date={block.attributes.createdAt}
                      badge={block.attributes.badge?.data?.attributes.name}
                      type={block.attributes.type}
                      category={block.attributes.category}
                      slug={block.attributes.slug}
                      theme={ColorTheme.GRAY}
                      styles={{ height: "100%" }}
                    />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export async function getServerSideProps(
  context: any
): Promise<MatchCenterProps | {}> {
  try {
    const slug = context.params.slug;

    if (slug.length === 0) {
      return {};
    }

    const fixtureId = slug[0];
    const fixtureURI = `https://cricket.sportmonks.com/api/v2.0/fixtures/${fixtureId}?api_token=arQupbeQwcFvjafCxxqydm2XgMRbqRhWjUNJaINkNSG8n75Np9wNPG7aQu2f&include=visitorteam, localteam, league, venue, scoreboards, manofmatch, batting, batting.batsman, batting.batsmanout, batting.result, batting.bowler, batting.catchstump, batting.runoutby, odds.bookmaker, odds, odds.market, bowling, bowling.bowler, scoreboards.team,balls, balls.batsmanout, balls.batsmanone,balls.batsmantwo,balls.catchstump,balls.score,balls.runoutby, lineup, tosswon, runs,stage, runs.team`;

    const [fixture, recentArticles] = await Promise.all([
      fetch(fixtureURI).then((res) => res.json()),
      fetchAPI(`/articles?populate=deep,2`),
    ]);

    return {
      props: { fixture: fixture.data, recentArticles: recentArticles.data },
    };
  } catch (err) {
    console.log(err);
    return {};
  }
}

export default MatchCenter;
