import { useQuery, UseQueryResult } from "react-query";
import { Fixture as FixtureT } from "../types/sportmonks";
import axios from "axios";
import { fetchStrapiAPI } from "../lib/strapi";
import { ArticleType } from "../types/article";
import { fixtureBallFields, fixtureBaseFields } from "./matchcenter";
import { HomePageProps } from "../pages";
import { fixturesRestAPI } from "./util";

export const recentArticlesStrapiAPI =
  "/articles?pagination[page]=1&pagination[pageSize]=5&populate=deep,2 &sort=updatedAt:desc";

type FixtureAPIResponse = {
  data: FixtureT;
  status: number;
  statusText: string;
};

type FixturesAPIResponse = {
  data: FixtureT[];
  status: number;
  statusText: string;
};

type ArticleQueryResponse = {
  data: ArticleType[];
};

const getFixtureDetails = async ({ queryKey }: { queryKey: any }) => {
  const fixtureId = queryKey[1];
  const fields = [...fixtureBaseFields, ...fixtureBallFields].toString();
  return axios.get<FixtureAPIResponse>(
    `${fixturesRestAPI}/fixtures/single-fixture?fixtureId=${fixtureId}&fields=${fields}`
  );
};

const getCurrentFixtures = async ({ queryKey }: { queryKey: any }) => {
  const seriesIds = queryKey[1];
  return axios.get<FixturesAPIResponse>(
    `${fixturesRestAPI}/fixtures/current-fixtures?seriesIds=${seriesIds}`
  );
};

const getFixtureSchedule = async ({ queryKey }: { queryKey: any }) => {
  const seriesIds = queryKey[1];
  return axios.get<FixturesAPIResponse>(
    `http://localhost:3000/api/fixtures/schedule?seriesIds=${seriesIds}`
  );
};

export const useFixtureDetails = (
  fixtureId: string,
  refetchInterval?: number
) => {
  return useQuery(["fixtureDetail", fixtureId], getFixtureDetails, {
    refetchInterval: refetchInterval ?? 0,
  });
};

export const useRecentArticles = (): UseQueryResult<
  ArticleQueryResponse,
  Error
> => {
  return useQuery("recentArticles", () =>
    fetchStrapiAPI(recentArticlesStrapiAPI)
  );
};

export const useCurrentFixtures = (
  seriesIds: string,
  refetchInterval?: number
) => {
  return useQuery(["currentFixtures", seriesIds], getCurrentFixtures, {
    refetchInterval: refetchInterval ?? 0,
  });
};

export const useFixtureSchedule = (
  seriesIds: string,
  refetchInterval?: number
) => {
  return useQuery(["schedule", seriesIds], getFixtureSchedule, {
    refetchInterval: refetchInterval ?? 0,
  });
};

export const useHomepage = (): UseQueryResult<
  { data: HomePageProps },
  Error
> => {
  return useQuery("homepage", () =>
    fetchStrapiAPI("/home", {
      populate: "deep, 4",
    })
  );
};
