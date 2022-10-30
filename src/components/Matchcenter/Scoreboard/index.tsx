/** @jsxImportSource theme-ui */

import { Fragment, useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { ThemeUICSSObject } from "theme-ui";
import { tabStyles } from "../../../pages/matchcenter/[...slug]";
import { ComponentVariant } from "../../../types/modifier";
import { getScore } from "../../Cards/FixtureCard";
import LivePulse from "../../Icons/LivePulse";
import BowlingTable from "./BowlingTable";
import FallofWickets from "./FallofWickets";
import InningsAdditionalInfo from "./InningsAdditionalInfo";
import InningsTable from "./InningsTable";

type ScoreboardContentProps = {
  innings: any;
  fixture: any;
  team: any;
  extras: any;
  didNotBat: any;
  fallOfWickets: any;
};

type ScoreboardProps = {
  s1Team: any;
  s1Extras: any;
  s1DidNotBat: any;
  s1FallOfWickets: any;
  s2Team: any;
  s2Extras: any;
  s2DidNotBat: any;
  s2FallOfWickets: any;
  fixture: any;
};

const tabItemStyles: ThemeUICSSObject = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const tabTeamImageStyles: ThemeUICSSObject = {
  borderRadius: "50%",
  height: "40px",
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

  useEffect(() => {
    if (fixture.status === "2nd Innings") {
      setTabIndex(1);
    }
  }, [fixture, s1Team, s2Team]);

  return (
    <Tabs
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
      sx={tabStyles}
    >
      <TabList>
        <Tab>
          <div sx={tabItemStyles}>
            <img src={s1Team.image} sx={tabTeamImageStyles} />

            <p>{s1Team.name}</p>
            {/* <p>
              {s1Team.name}: {getScore(fixture.scoreboards, "S1")}
            </p> */}

            {fixture.status === "1st Innings" && <LivePulse />}
          </div>
        </Tab>
        <Tab>
          <div sx={tabItemStyles}>
            <img src={s2Team.image} sx={tabTeamImageStyles} />
            <p>{s2Team.name}</p>
            {/* <p>
                      {s2Team.name}: {getScore(fixture.scoreboards, "S2")}
                    </p> */}

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
