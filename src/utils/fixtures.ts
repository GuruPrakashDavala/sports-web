export type FixturesList = {
  attributes: {
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    series: {
      id: number;
      seriesName: string;
      code: string;
      seriesIds: { id: number; seriesId: string }[];
    }[];
  };
  id: number;
};

export type StandingsList = {
  attributes: {
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    standings: {
      id: number;
      seriesName: string;
      seriesId: string;
      code: string;
    }[];
  };
  id: number;
};

export const getSeriesIdsFromFixturesList = (fixturesList: FixturesList) => {
  const allSeries = fixturesList.attributes.series;

  const seriesIds = allSeries
    .map((series: any) =>
      series.seriesIds.map((seriesItem: any) => seriesItem.seriesId)
    )
    .toString();

  return seriesIds;
};
