/** @jsxImportSource theme-ui */

import { ReactNode } from "react";
import { useBreakpointIndex } from "@theme-ui/match-media";
import {
  Fixture as FixtureT,
  Bowling as BowlingT,
  Player as PlayerT,
} from "../../../types/sportmonks";
import BowlingTableHeader from "./BowlingTableHeader";

type InningsTableProps = {
  fixture: FixtureT;
  innings: string;
};

const BowlingTable = (props: InningsTableProps) => {
  const { fixture, innings } = props;
  const bp = useBreakpointIndex();

  const isBowlingStatsAvailable = fixture.bowling.filter(
    (bowling) => bowling.scoreboard === innings
  );

  if (isBowlingStatsAvailable.length === 0) {
    return null;
  }

  const bowlingTableHeaderMd = [
    { name: "Bowler", key: "fullname", width: "20%" },
    { name: "O", key: "overs", width: "11.42%" },
    { name: "M", key: "medians", width: "11.42%" },
    { name: "R", key: "runs", width: "11.42%" },
    { name: "W", key: "wickets", width: "11.42%" },
    { name: "NB", key: "noball", width: "11.42%" },
    { name: "WD", key: "wide", width: "11.42%" },
    { name: "Eco", key: "rate", width: "11.42%" },
  ];

  const bowlingTableHeaderSm = [
    { name: "Bowler", key: "lastname", width: "30%" },
    { name: "O", key: "overs", width: "14%" },
    { name: "M", key: "medians", width: "14%" },
    { name: "R", key: "runs", width: "14%" },
    { name: "W", key: "wickets", width: "14%" },
    { name: "Eco", key: "rate", width: "14%" },
  ];

  const tableHeaders = bp > 1 ? bowlingTableHeaderMd : bowlingTableHeaderSm;

  return (
    <div sx={{ paddingY: 1 }}>
      <BowlingTableHeader />
      {fixture.bowling.map((bowling) => {
        return bowling.scoreboard === innings ? (
          <ul
            sx={{
              display: "flex",
              padding: 1,
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "1px solid",
              borderColor: "rgba(12, 12, 12, 0.17)",
            }}
            key={bowling.id}
          >
            {tableHeaders.map((heading, index) => {
              const statKey = heading.key;
              return index === 0 ? (
                <li
                  sx={{
                    flexBasis: heading.width,
                    paddingY: [null, 1],
                    variant: bp === 0 ? "text.subheading4" : "text.subheading3",
                  }}
                  key={index}
                >
                  {bowling.bowler[statKey as keyof PlayerT] as ReactNode}
                </li>
              ) : (
                <li
                  sx={{
                    flexBasis: heading.width,
                    paddingY: [null, 1],
                    variant: "text.body4",
                  }}
                  key={index}
                >
                  {bowling[statKey as keyof BowlingT] as ReactNode}
                </li>
              );
            })}
          </ul>
        ) : (
          <></>
        );
      })}
    </div>
  );
};

export default BowlingTable;
