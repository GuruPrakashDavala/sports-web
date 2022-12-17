/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import SectionWrapper from "../../components/Wrappers/SectionWrapper";
import { useState, useEffect, Fragment, useMemo } from "react";
import { colors } from "../../styles/theme";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ThemeUICSSObject } from "theme-ui";
import LiveCommentary from "../../components/Matchcenter/Livecommentary";
import Abandoned from "../../components/Matchcenter/Util/Adandoned";
import Scoreboard from "../../components/Matchcenter/Scoreboard";
import Header from "../../components/Matchcenter/Header";
import { articleBodyWrapperStyles } from "../news/[slug]";
import AdBlock, { AdBlockVariant } from "../../components/AdBlock";
import { fetchStrapiAPI } from "../../lib/strapi";
import {
  Batting as BattingT,
  Fixture as FixtureT,
  Scoreboard as ScoreboardT,
  Player as PlayerT,
  Team as TeamT,
} from "../../types/sportmonks";
import { ArticleType } from "../../types/article";
import { Extras, FixtureStatus, TeamInfo } from "../../types/matchcenter";
import {
  getPlayersDidNotBat,
  getTeamLineup,
  now,
  smTabLists,
  mdTabLists,
  isMatchLive,
  isMatchFinished,
  fixtureBaseFields,
} from "../../utils/matchcenter";
import Matchinfo from "../../components/Matchcenter/MatchInfo/Matchinfo";
import { differenceInMinutes, isToday } from "date-fns";
import {
  recentArticlesStrapiAPI,
  useFixtureDetails,
  useRecentArticles,
} from "../../utils/queries";
import RelatedArticles from "../../components/Matchcenter/RelatedArticles";
import LivecommentarySkeleton from "../../components/Loaders/Matchcenter/Livecommentary";

type MatchCenterProps = {
  fixture: FixtureT;
  recentArticles: ArticleType[];
  fixtureId: string;
};

export const tabStyles: ThemeUICSSObject = {
  "> .react-tabs__tab-list": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: [null, 3, 4],
    flexWrap: "wrap",
    width: "100%",
    borderBottom: "1px solid",
    borderColor: colors.gray200,
    margin: 0,
    paddingTop: ["5px", 1],
  },
  "> ul .react-tabs__tab": {
    flexGrow: [1, 0],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    listStyle: "none",
    paddingY: 2,
    cursor: "pointer",
    "&:hover": {
      "> p": {
        color: colors.black,
      },
    },
    "> p": {
      variant: "text.subheading4",
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
  const bp = useBreakpointIndex();
  const [refetchInterval, setRefetchInterval] = useState<number>(0);

  const { isLoading: fixtureLoading, data: fixtureResponse } =
    useFixtureDetails(props.fixtureId, refetchInterval);

  const fixture =
    !fixtureLoading && fixtureResponse
      ? fixtureResponse.data.data
      : props.fixture;

  const { isLoading: recentArticlesLoading, data: articles } =
    useRecentArticles();

  const recentArticles =
    !recentArticlesLoading && articles ? articles.data : props.recentArticles;

  const tabLists = bp > 0 ? mdTabLists : smTabLists;
  const isLive = isMatchLive(fixture.status);
  const isFinished = isMatchFinished(fixture.status);

  // Util to get the opposite team info (toss lost team - 2nd Innings)
  const getOppositeTeamInfo = (tosswonTeam: TeamT): TeamInfo => {
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

  const setS1AndS2TeamInfo = (): void => {
    const tosswonTeam = fixture.tosswon;

    if (!tosswonTeam) {
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

  // State variables
  const [s1Team, setS1Team] = useState<TeamInfo | undefined>(undefined);
  const [s2Team, setS2Team] = useState<TeamInfo | undefined>(undefined);

  const [s1TeamLineup, setS1TeamLineup] = useState<undefined | PlayerT[]>(
    undefined
  );

  const [s2TeamLineup, setS2TeamLineup] = useState<undefined | PlayerT[]>(
    undefined
  );

  const [s1DidNotBat, setS1DidNotBat] = useState<undefined | PlayerT[]>(
    undefined
  );

  const [s2DidNotBat, setS2DidNotBat] = useState<undefined | PlayerT[]>(
    undefined
  );

  const [s1Extras, setS1Extras] = useState<undefined | Extras>(undefined);
  const [s2Extras, setS2Extras] = useState<undefined | Extras>(undefined);

  const [s1FallOfWickets, setS1FallOfWickets] = useState<
    undefined | BattingT[]
  >(undefined);

  const [s2FallOfWickets, setS2FallOfWickets] = useState<
    undefined | BattingT[]
  >(undefined);

  // API polling memo
  useMemo(() => {
    const differenceInMins = differenceInMinutes(
      new Date(fixture.starting_at),
      now
    );

    const isFixtureStartsToday = isToday(new Date(fixture.starting_at));

    const doesGameStartsInLessThanSixtyMins =
      differenceInMins > 0 && differenceInMins < 60;

    if (isLive) {
      setRefetchInterval(15000); // 1.5 mins polling
    } else {
      isFinished
        ? setRefetchInterval(0)
        : doesGameStartsInLessThanSixtyMins
        ? setRefetchInterval(1000 * 300) // 5 mins polling
        : isFixtureStartsToday
        ? setRefetchInterval(1000 * 1200) // 20 mins polling
        : setRefetchInterval(0);
    }
  }, [fixtureResponse]);

  // UseEffect calls
  // First useEffect to fetch both S1 and S2 team details
  useEffect(() => {
    /* 
    The below function does the following:
    1. Sets the first batting team info in s1Team
    2. Sets the second batting team info in the s2Team
    See method internals to understand the implementation logics
    */
    if (fixture.resource === "fixtures") {
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

  return (
    <Fragment>
      {bp < 2 && s1Team && s2Team && fixture && (
        <Header
          fixture={fixture}
          s1Team={s1Team}
          s2Team={s2Team}
          isLive={isLive}
        />
      )}

      <SectionWrapper
        styles={{ paddingX: [2, null, null, 0], paddingY: [null, null, 3, 5] }}
      >
        <div
          sx={{
            ...articleBodyWrapperStyles,
            gridTemplateColumns: ["100%", null, null, "16.66% 58.3% 25%"],
          }}
        >
          {bp > 2 && <AdBlock variant={AdBlockVariant.VERTICAL} />}

          <div>
            {s1Team && s2Team && fixture && (
              <Fragment>
                {bp > 1 && (
                  <Header
                    fixture={fixture}
                    s1Team={s1Team}
                    s2Team={s2Team}
                    isLive={isLive}
                  />
                )}

                <Tabs
                  defaultIndex={isLive || isFinished ? 2 : 0}
                  sx={{ ...tabStyles }}
                >
                  <TabList>
                    {tabLists.map((tab) => (
                      <Fragment key={tab.id}>
                        <Tab tabIndex={tab.id} key={tab.id}>
                          <p>{tab.name}</p>
                        </Tab>
                      </Fragment>
                    ))}
                  </TabList>

                  <TabPanel id="matchinfo">
                    <Matchinfo fixture={fixture} />
                  </TabPanel>

                  <TabPanel id="livecommentary">
                    {fixture.status !== FixtureStatus.NotStarted &&
                    !fixtureLoading &&
                    fixture.balls.length > 0 &&
                    s1Team &&
                    s2Team ? (
                      <LiveCommentary
                        balls={fixture.balls}
                        status={fixture.status}
                        note={fixture.note}
                        batting={fixture.batting}
                        bowling={fixture.bowling}
                        manofmatch={fixture.manofmatch}
                        scoreboards={fixture.scoreboards}
                      />
                    ) : fixtureLoading ? (
                      <LivecommentarySkeleton />
                    ) : (
                      <Abandoned
                        note={fixture.note}
                        status={fixture.status}
                        startsAt={fixture.starting_at}
                      />
                    )}
                  </TabPanel>

                  <TabPanel id="scoreboard">
                    {s1Team && s2Team && fixture.scoreboards.length > 0 ? (
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
                    ) : (
                      <Abandoned
                        note={fixture.note}
                        status={fixture.status}
                        startsAt={fixture.starting_at}
                      />
                    )}
                  </TabPanel>
                </Tabs>
              </Fragment>
            )}
          </div>

          {bp > 2 && (
            <div sx={{ paddingX: [0, 3], paddingTop: 5 }}>
              <AdBlock variant={AdBlockVariant.SQUARE} />
              <RelatedArticles recentArticles={recentArticles} />
            </div>
          )}
        </div>
      </SectionWrapper>
    </Fragment>
  );
};

export async function getServerSideProps(
  context: any
): Promise<MatchCenterProps | {}> {
  try {
    const slug = context.params.slug;
    const fields = fixtureBaseFields.toString();

    if (slug.length === 0) {
      return {};
    }

    const fixtureId = slug[0];
    const sportmonkAPIURL = process.env.NEXT_PUBLIC_SPORTMONK_API;
    const APIToken = process.env.NEXT_PUBLIC_SPORT_MONKS_API_TOKEN;

    const fixtureURI = `${sportmonkAPIURL}/fixtures/${fixtureId}?api_token=${APIToken}&include=${fields}`;

    const [fixture, recentArticles] = await Promise.all([
      fetch(fixtureURI).then((res) => res.json()),
      fetchStrapiAPI(recentArticlesStrapiAPI),
    ]);

    return {
      props: {
        fixture: fixture.data,
        recentArticles: recentArticles.data,
        fixtureId,
      },
    };
  } catch (err) {
    console.log(err);
    return {};
  }
}

export default MatchCenter;
