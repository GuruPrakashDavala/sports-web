/** @jsxImportSource theme-ui */

import { colors } from "../../../styles/theme";
import { Player as PlayerT, Team as TeamT } from "../../../types/sportmonks";

const PlayerList = (props: { lineup: PlayerT[]; teamname: string }) => {
  const { lineup, teamname } = props;
  return (
    <div
      sx={{
        backgroundColor: colors.gray300,
        color: colors.black,
        padding: 1,
        mt: 1,
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <p sx={{ variant: "text.subheading4" }}>{teamname} Squad:&nbsp;</p>
      {lineup.map((player, index) => (
        <p key={player.id} sx={{ variant: "text.body4" }}>
          {player.fullname}
          {`${index !== lineup.length - 1 ? `,` : ``}`}&nbsp;
        </p>
      ))}
    </div>
  );
};

const Lineup = (props: {
  localteam?: TeamT;
  visitorteam?: TeamT;
  lineup?: [] | PlayerT[];
}) => {
  const { localteam, visitorteam, lineup } = props;

  if (!lineup || lineup.length === 0 || !localteam || !visitorteam) {
    return <></>;
  }

  const localTeamLineup = lineup.filter(
    (player, _index) => player.lineup?.team_id === localteam.id
  );

  const visitorTeamLineUp = lineup.filter(
    (player, _index) => player.lineup?.team_id === visitorteam.id
  );

  return (
    <div>
      {localTeamLineup.length > 0 && visitorTeamLineUp.length > 0 && (
        <>
          <PlayerList lineup={localTeamLineup} teamname={localteam.name} />
          <PlayerList lineup={visitorTeamLineUp} teamname={visitorteam.name} />
        </>
      )}
    </div>
  );
};

export default Lineup;
