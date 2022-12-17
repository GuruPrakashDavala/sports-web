import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { Fixture as FixtureT } from "../types/sportmonks";
import axios from "axios";
import { fetchStrapiAPI } from "../lib/strapi";
import { ArticleType } from "../types/article";
import { fixtureBallFields, fixtureBaseFields } from "./matchcenter";
import { HomePageProps } from "../pages";
import { fixturesRestAPI } from "./util";
import { InfiniteArticlesResponseType } from "../pages/news";

export const recentArticlesStrapiAPI =
  "/articles?pagination[page]=1&pagination[pageSize]=5&populate=deep,2 &sort=createdAt:desc";

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
    `https://bntfwvspn7xvyta7vmoheoxawy0xkeyf.lambda-url.us-east-1.on.aws?fixtureId=${fixtureId}`
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
  return axios.get(
    `${fixturesRestAPI}/fixtures/schedule?seriesIds=${seriesIds}`
  );
};

const getInfiniteArticles = ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: string[];
}) => {
  const category = queryKey[1];
  const APIURL =
    !category || category === "All"
      ? `/articles?pagination[page]=${pageParam}&pagination[pageSize]=5&populate=deep, 2&sort=createdAt:desc`
      : `/articles?filters[category][slug][$eq]=${category}&pagination[page]=${pageParam}&pagination[pageSize]=5&populate=deep, 2&sort=createdAt:desc`;

  return fetchStrapiAPI(APIURL);
};

export const useFixtureDetails = (
  fixtureId: string,
  refetchInterval?: number
) => {
  const refetchOnWindowFocus = refetchInterval === 0 ? false : true;
  return useQuery(["fixtureDetail", fixtureId], getFixtureDetails, {
    refetchInterval: refetchInterval ?? 0,
    keepPreviousData: true,
    refetchOnWindowFocus: refetchOnWindowFocus,
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

export const useCurrentFixtures = ({
  seriesIds,
  refetchInterval,
}: {
  seriesIds: string;
  refetchInterval?: number;
}) => {
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
    refetchOnWindowFocus: false,
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

const useArticles = ({
  category,
  initialData,
  pageNumber,
}: {
  category: string;
  initialData: { data: ArticleType[] };
  pageNumber?: number;
}): UseQueryResult<{ data: ArticleType[] }, Error> => {
  const APIURL =
    !category || category === "All"
      ? `/articles?pagination[page]=${pageNumber}&pagination[pageSize]=10&populate=deep, 2`
      : `/articles?filters[category][slug][$eq]=${category}&pagination[page]=${pageNumber}&pagination[pageSize]=10&populate=deep, 2`;

  return useQuery(
    ["articles", category, pageNumber ?? 1],
    () => fetchStrapiAPI(APIURL),
    {
      keepPreviousData: true,
      initialData: initialData,
      // enabled: false,
    }
  );
};

export const useInfiniteArticles = ({
  category,
  initialData,
}: {
  category: string;
  initialData?: InfiniteArticlesResponseType;
}): UseInfiniteQueryResult<InfiniteArticlesResponseType, Error> => {
  return useInfiniteQuery(["infiniteArticles", category], getInfiniteArticles, {
    getNextPageParam: (_lastPage, pages) => {
      console.log(pages);
      const lastFetchedPageMeta = pages[pages.length - 1].meta;
      const metaPagination = lastFetchedPageMeta
        ? lastFetchedPageMeta.pagination
        : undefined;
      if (metaPagination) {
        const currentPage = metaPagination.page;
        const hasNextPage = currentPage < metaPagination.pageCount;
        const nextPageNumber = hasNextPage ? currentPage + 1 : undefined;
        return nextPageNumber;
      } else {
        return undefined;
      }
    },
    keepPreviousData: true,
    initialData: initialData,
  });
};

export const useArticle = (
  slug: string
): UseQueryResult<{ data: ArticleType[] }, Error> => {
  return useQuery(["article", slug], () =>
    fetchStrapiAPI(`/articles?filters[slug][$eq]=${slug}&populate=deep, 4`)
  );
};

const getInfiniteFixtures = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: string[];
}) => {
  const seriesIds = queryKey[1];
  const dateRange = queryKey[2];

  const { data: fixturesRes } = await axios.get<{ data: FixtureResponse }>(
    `${fixturesRestAPI}/fixtures/schedule?seriesIds=${seriesIds}&starts_between=${dateRange}&page=${pageParam}`
  );

  return fixturesRes.data;
};

type FixtureResponse = {
  data: FixtureT[];
  links: any;
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};

export type InfiniteFixturesResponseType = {
  pages: FixtureResponse[];
  pageParams: any;
};

export const useInfiniteFixtures = ({
  seriesIds,
  dateRange,
  refetchInterval,
  initialData,
}: {
  seriesIds: string;
  dateRange: string;
  initialData?: any;
  refetchInterval?: number;
}): UseInfiniteQueryResult<InfiniteFixturesResponseType, Error> => {
  return useInfiniteQuery(
    ["infiniteFixtures", seriesIds, dateRange],
    getInfiniteFixtures,
    {
      getNextPageParam: (_lastPage, pages) => {
        const lastFetchedPageMeta =
          pages.length > 0 ? pages[pages.length - 1].meta : undefined;
        if (lastFetchedPageMeta) {
          const currentPage = lastFetchedPageMeta.current_page;
          const lastPage = lastFetchedPageMeta.last_page;
          const hasNextPage = currentPage < lastPage;
          const nextPageNumber = hasNextPage ? currentPage + 1 : undefined;
          return nextPageNumber;
        } else {
          return undefined;
        }
      },
      refetchInterval,
      initialData: initialData,
      keepPreviousData: false,
    }
  );
};
