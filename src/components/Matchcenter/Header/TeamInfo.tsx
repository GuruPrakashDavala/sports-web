/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { getScore } from "../../Cards/FixtureCard";

type TeamInfoProps = {
  team: any;
  innings: any;
  fixture: any;
  inPlay: any;
};

const TeamInfo = (props: TeamInfoProps) => {
  const { team, innings, fixture, inPlay } = props;
  const bp = useBreakpointIndex();
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "row",
        padding: [null, null, 1],
      }}
    >
      {bp > 1 && (
        <img src={team.image} sx={{ height: ["45px", null, null, "65px"] }} />
      )}
      <div
        sx={{
          display: "flex",
          flexDirection: ["row", null, "column"],
          alignItems: ["center", "flex-start"],
        }}
      >
        <p
          sx={{
            paddingX: 1,
            variant: inPlay ? "text.subheading3" : "text.heading3",
          }}
        >
          {team.code}
        </p>
        <p
          sx={{
            paddingX: 1,
            variant: inPlay ? "text.subheading2" : "text.heading3",
          }}
        >
          {getScore(fixture.scoreboards, innings)}
        </p>
        {/* <p
          sx={{
            paddingX: 1,
            variant: inPlay ? "text.subheading3" : "text.heading3",
          }}
        >
          CRR: 5.4
        </p> */}
      </div>
    </div>
  );
};

export default TeamInfo;
