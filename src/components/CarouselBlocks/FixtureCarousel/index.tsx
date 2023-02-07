import { ColorTheme } from "../../../types/modifier";
import { Fixture as FixtureT } from "../../../types/sportmonks";
import { SCHEDULEPAGE_BASE_URL } from "../../../utils/pages";
import FixtureCard from "../../Cards/FixtureCard";
import Carousel from "../../Carousel";
import SectionHeading from "../../SectionHeading";
import SectionWrapper from "../../Wrappers/SectionWrapper";

const FixtureCarousel = (props: { fixtures: FixtureT[] }) => {
  const { fixtures } = props;

  if (fixtures.length === 0) {
    return <></>;
  }

  return (
    <SectionWrapper>
      <SectionHeading
        title={`Match schedule & results`}
        theme={ColorTheme.LIGHT}
        styles={{ px: [0, 1] }}
        link={{
          href: `/${SCHEDULEPAGE_BASE_URL}`,
          external: false,
          label: `all schedule`,
        }}
      />
      <Carousel
        swiperId={`fixturecarousel`}
        items={fixtures.map((fixtureItem) => {
          return {
            content: (
              <FixtureCard fixture={fixtureItem} styles={{ cursor: "grab" }} />
            ),
          };
        })}
      />
    </SectionWrapper>
  );
};

export default FixtureCarousel;
