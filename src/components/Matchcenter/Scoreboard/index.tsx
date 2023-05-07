/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { ThemeUICSSObject } from "theme-ui";
import { tabStyles } from "../../../pages/matchcenter/[...slug]";
import { colors } from "../../../styles/theme";
import { Extras, FixtureStatus, TeamInfo } from "../../../types/matchcenter";
import {
  Batting as BattingT,
  Fixture as FixtureT,
  Player as PlayerT,
} from "../../../types/sportmonks";
import { getScore } from "../../Cards/FixtureCard";
import LivePulse from "../../Icons/LivePulse";
import BowlingTable from "./BowlingTable";
import FallofWickets from "./FallofWickets";
import InningsAdditionalInfo from "./InningsAdditionalInfo";
import InningsTable from "./InningsTable";

type ScoreboardContentProps = {
  innings: string;
  fixture: FixtureT;
  team: TeamInfo;
  extras: Extras;
  didNotBat?: PlayerT[];
  fallOfWickets?: BattingT[];
  styles?: ThemeUICSSObject;
};

type ScoreboardProps = {
  fixture: FixtureT;
  s1Team: TeamInfo;
  s2Team: TeamInfo;
  s1Extras: Extras;
  s2Extras: Extras;
  s1DidNotBat?: PlayerT[];
  s2DidNotBat?: PlayerT[];
  s1FallOfWickets?: BattingT[];
  s2FallOfWickets?: BattingT[];
};

const tabItemStyles: ThemeUICSSObject = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

// const tabTeamImageStyles: ThemeUICSSObject = {
//   background: colors.white,
//   height: ["24px", "35px"],
//   width: ["24px", "35px"],
//   marginRight: 1,
// };

const ScoreboardContent = (props: ScoreboardContentProps): JSX.Element => {
  const { fixture, team, extras, didNotBat, fallOfWickets, innings } = props;
  const recentBall =
    fixture.balls && fixture.balls.length > 0
      ? fixture.balls[fixture.balls.length - 1]
      : undefined;

  const bothBatsmanInCrease = recentBall
    ? [recentBall.batsman_one_on_creeze_id, recentBall.batsman_two_on_creeze_id]
    : undefined;

  return (
    <div sx={{ paddingY: [1, 2, 3] }}>
      <InningsTable
        innings={innings}
        fixture={fixture}
        teamInfo={team}
        bothBatsmanInCrease={bothBatsmanInCrease}
      />
      <InningsAdditionalInfo
        extras={extras}
        score={getScore(fixture.scoreboards, innings, fixture.status)}
        playersDidNotBat={didNotBat}
      />
      <BowlingTable fixture={fixture} innings={innings} />
      <FallofWickets fallOfWickets={fallOfWickets} />
    </div>
  );
};

const Scoreboard = (props: ScoreboardProps) => {
  const {
    fixture,
    s1Team,
    s1DidNotBat,
    s1Extras,
    s1FallOfWickets,
    s2Team,
    s2DidNotBat,
    s2Extras,
    s2FallOfWickets,
  } = props;

  const [tabIndex, setTabIndex] = useState(0);
  const bp = useBreakpointIndex();

  const scoreboardTabStyles: ThemeUICSSObject = {
    ...tabStyles,
    "> ul .react-tabs__tab": {
      flexGrow: [1, 0],
      flexBasis: "50%",
      flexWrap: "wrap",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      listStyle: "none",
      paddingY: 2,
      cursor: "pointer",
      "&:hover": {
        "> p, > div > p": {
          color: colors.black,
        },
      },
      // For scoreboard tabs as it is contained inside a flexbox with image and teamname
      "> div > p": {
        color: "rgba(12, 12, 12, 0.3)",
      },
      "> p": {
        variant: "text.subheading4",
        color: "rgba(12, 12, 12, 0.3)",
      },
    },
  };

  useEffect(() => {
    if (fixture && fixture.status === FixtureStatus.SecondInnings) {
      setTabIndex(1);
    }
  }, []);

  return (
    <Tabs
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
      sx={scoreboardTabStyles}
    >
      <TabList>
        <Tab>
          <div sx={tabItemStyles}>
            <Image src={s1Team.image} width={24} height={24} alt="team1" />
            <p
              sx={{
                marginLeft: 1,
                variant: bp < 2 ? "text.subheading5" : undefined,
              }}
            >
              {s1Team.name}
            </p>
            {fixture.status === "1st Innings" && <LivePulse />}
          </div>
        </Tab>

        {fixture.status !== FixtureStatus.FirstInnings && (
          <Tab>
            <div sx={tabItemStyles}>
              <Image src={s2Team.image} width={24} height={24} alt="team2" />
              <p
                sx={{
                  marginLeft: 1,
                  variant: bp < 2 ? "text.subheading5" : undefined,
                }}
              >
                {s2Team.name}
              </p>
              {fixture.status === "2nd Innings" && <LivePulse />}
            </div>
          </Tab>
        )}
      </TabList>

      <TabPanel>
        {/* First innings team stats */}
        <ScoreboardContent
          innings={"S1"}
          fixture={fixture}
          team={s1Team}
          extras={s1Extras}
          didNotBat={s1DidNotBat}
          fallOfWickets={s1FallOfWickets}
        />
      </TabPanel>

      {fixture.status !== FixtureStatus.FirstInnings && (
        <TabPanel>
          {/* Second innings team stats */}
          <ScoreboardContent
            innings={"S2"}
            fixture={fixture}
            team={s2Team}
            extras={s2Extras}
            didNotBat={s2DidNotBat}
            fallOfWickets={s2FallOfWickets}
          />
        </TabPanel>
      )}
    </Tabs>
  );
};

export default Scoreboard;
