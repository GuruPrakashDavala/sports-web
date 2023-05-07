import { StandingsTableBlock as StandingsTableBlockT } from "../../types/blocks";
import { ColorTheme } from "../../types/modifier";
import SectionHeading from "../SectionHeading";
import { Standings } from "../Standings/StandingsTable/Standings";
import SectionWrapper from "../Wrappers/SectionWrapper";

const StandingsTableBlock = (
  props: Partial<StandingsTableBlockT & { theme: ColorTheme }>
): JSX.Element => {
  const { series_id, series_name, theme } = props;
  return (
    <SectionWrapper theme={theme}>
      {series_id && series_name && (
        <>
          <SectionHeading
            title={series_name}
            styles={{ paddingTop: 0, paddingX: 0 }}
          />
          <Standings stageId={series_id} />
        </>
      )}
    </SectionWrapper>
  );
};

export default StandingsTableBlock;
