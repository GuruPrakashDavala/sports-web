/** @jsxImportSource theme-ui */

import { Fragment, useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { ThemeUICSSObject } from "theme-ui";
import { tabStyles } from "../../../pages/matchcenter/[...slug]";
import { colors } from "../../../styles/theme";
import { Extras, TeamInfo } from "../../../types/matchcenter";
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
};

const tabTeamImageStyles: ThemeUICSSObject = {
  background: colors.white,
  height: ["24px", "35px"],
  width: ["24px", "35px"],
  marginRight: 1,
};

const ScoreboardContent = (props: ScoreboardContentProps) => {
  const { fixture, team, extras, didNotBat, fallOfWickets, innings } = props;
  return (
    <Fragment>
      <InningsTable innings={innings} fixture={fixture} teamInfo={team} />
      <InningsAdditionalInfo
        extras={extras}
        score={getScore(fixture.scoreboards, innings)}
        playersDidNotBat={didNotBat}
      />
      <BowlingTable fixture={fixture} innings={innings} />
      <FallofWickets fallOfWickets={fallOfWickets} />
    </Fragment>
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

  const scoreboardTabStyles: ThemeUICSSObject = {
    ...tabStyles,
    // "> .react-tabs__tab-list": { paddingY: 0 },
  };

  useEffect(() => {
    if (fixture.status === "2nd Innings") {
      setTabIndex(1);
    }
  }, [fixture, s1Team, s2Team]);

  return (
    <Tabs
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
      sx={scoreboardTabStyles}
    >
      <TabList>
        <Tab>
          <div sx={tabItemStyles}>
            <img src={s1Team.image} sx={tabTeamImageStyles} />
            <p>{s1Team.name}</p>
            {fixture.status === "1st Innings" && <LivePulse />}
          </div>
        </Tab>
        <Tab>
          <div sx={tabItemStyles}>
            <img src={s2Team.image} sx={tabTeamImageStyles} />
            <p>{s2Team.name}</p>
            {fixture.status === "2nd Innings" && <LivePulse />}
          </div>
        </Tab>
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
    </Tabs>
  );
};

export default Scoreboard;
