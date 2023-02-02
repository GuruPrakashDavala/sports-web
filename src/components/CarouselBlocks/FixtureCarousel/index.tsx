import { ColorTheme } from "../../../types/modifier";
import { Fixture as FixtureT } from "../../../types/sportmonks";
import { schedulepageBaseURL } from "../../../utils/pages";
import FixtureCard from "../../Cards/FixtureCard";
import Carousel from "../../Carousel";
import SectionHeading from "../../SectionHeading";
import SectionWrapper from "../../Wrappers/SectionWrapper";

const FixtureCarousel = (props: { fixtures: FixtureT[] }) => {
  const { fixtures } = props;
  return (
    <SectionWrapper>
      <SectionHeading
        title={`Match schedule & results`}
        theme={ColorTheme.LIGHT}
        styles={{ px: [0, 1] }}
        link={{
          href: `/${schedulepageBaseURL}`,
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
