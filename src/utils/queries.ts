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
import { fixtureBaseFields } from "./matchcenter";
import { HomePageProps } from "../pages";
import { API_BASE_URL, getCountry, getFixtureStatus } from "./util";
import { InfiniteArticlesResponseType } from "../pages/news";
import { FixturesList, StandingsList } from "./fixtures";
import { Globals } from "../types/header";
import {
  ReelType,
  SocialEmbed as SocialEmbedT,
  Tweet as TweetT,
  VideoItemType,
} from "../types/common";

export const recentArticlesStrapiAPI =
  "/articles?pagination[page]=1&pagination[pageSize]=5&populate=deep,2 &sort=createdAt:desc";

export const tweetsStrapiAPI = "/tweets?populate=deep&sort=createdAt:desc";

// Region: Mumbai
export const fixtureDetailLambdaBaseURL = `https://7quaen67b5kaqmokpxx25jcdca0zokxc.lambda-url.ap-south-1.on.aws/`;

// Region: US EAST
export const fixtureDetailLambdaBaseURL2 = `https://bntfwvspn7xvyta7vmoheoxawy0xkeyf.lambda-url.us-east-1.on.aws/`;

type FixtureAPIResponse = {
  data: FixtureT;
  status: number;
  statusText: string;
};

export type FixturesAPIResponse = {
  data: FixtureT[];
  status: number;
  statusText: string;
};

type ArticleQueryResponse = {
  data: ArticleType[];
};

type FixturesListQueryResponse = {
  data: FixturesList;
};

type StandingsListQueryResponse = {
  data: StandingsList;
};

type TweetsQueryResponse = {
  data: TweetT[];
};

const getFixtureDetails = async ({ queryKey }: { queryKey: any }) => {
  const fixtureId = queryKey[1];
  // const fields = [...fixtureBaseFields, ...fixtureBallFields].toString();
  const { data: fixtureDetail } = await axios.get<FixtureAPIResponse>(
    `${fixtureDetailLambdaBaseURL}?fixtureId=${fixtureId}`
  );
  return fixtureDetail;
};

const getFixtureBasicDetails = async ({ queryKey }: { queryKey: any }) => {
  const fixtureId = queryKey[1];
  const fields = fixtureBaseFields.toString();
  const { data: fixtureBasicDetail } = await axios.get<FixtureAPIResponse>(
    `${fixtureDetailLambdaBaseURL}?fixtureId=${fixtureId}&fields=${fields}`
  );
  return fixtureBasicDetail;
};

const getCurrentFixtures = async ({ queryKey }: { queryKey: any }) => {
  const seriesIds = queryKey[1];
  const { data: fixtures } = await axios.get<FixturesAPIResponse>(
    `${API_BASE_URL}/fixtures/current-fixtures?seriesIds=${seriesIds}`
  );
  return fixtures.data;
};

const getFixtureSchedule = async ({ queryKey }: { queryKey: any }) => {
  const seriesIds = queryKey[1];
  return axios.get(`${API_BASE_URL}/fixtures/schedule?seriesIds=${seriesIds}`);
};

const getStandingsTableForStageId = async ({ queryKey }: { queryKey: any }) => {
  const stageId = queryKey[1];
  return axios.get(
    `${API_BASE_URL}/fixtures/standings?stageId=${stageId}&include=team`
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

const getInfiniteSocials = ({
  pageParam = 1,
}: {
  pageParam?: number;
  queryKey: string[];
}) => {
  const APIURL = `/socials?pagination[page]=${pageParam}&pagination[pageSize]=5&populate=deep, 2&sort=createdAt:desc`;
  return fetchStrapiAPI(APIURL);
};

export const useTweets = (): UseQueryResult<TweetsQueryResponse, Error> => {
  return useQuery("fetchTweetsFromStrapi", () =>
    fetchStrapiAPI(tweetsStrapiAPI)
  );
};

export type InfiniteSocialsResponseType = {
  pages: { data: SocialEmbedT[] }[];
  pageParams: any;
};

export const useInfiniteSocials = ({
  initialData,
  queryEnabled = true,
}: {
  category?: string;
  initialData?: any;
  queryEnabled?: boolean;
}): UseInfiniteQueryResult<InfiniteSocialsResponseType, Error> => {
  return useInfiniteQuery(["infiniteSocials"], getInfiniteSocials, {
    getNextPageParam: (_lastPage, pages) => {
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
    enabled: queryEnabled,
  });
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

export const useFixtureBasicDetails = (fixtureId: string) => {
  return useQuery(["fixtureBasicDetail", fixtureId], getFixtureBasicDetails, {
    keepPreviousData: true,
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

export const useFixturesDefinedInCMS = (): UseQueryResult<
  FixturesListQueryResponse,
  Error
> => {
  const APIURL = `/fixtures-list?populate=deep,3`;
  return useQuery("fixturesDefinedInCMS", () => fetchStrapiAPI(APIURL), {
    refetchOnWindowFocus: false,
  });
};

export const useStandingsDefinedInCMS = (): UseQueryResult<
  StandingsListQueryResponse,
  Error
> => {
  const APIURL = `/standings-table?populate=deep,3`;
  return useQuery("standingsDefinedInCMS", () => fetchStrapiAPI(APIURL), {
    refetchOnWindowFocus: false,
  });
};

export const useCurrentFixtures = ({
  seriesIds,
  refetchInterval,
  queryEnabled = true,
}: {
  seriesIds: string;
  refetchInterval?: number;
  queryEnabled?: boolean;
}) => {
  return useQuery(["currentFixtures", seriesIds], getCurrentFixtures, {
    refetchInterval: refetchInterval ?? 0,
    enabled: queryEnabled,
  });
};

export const useStandingsTable = ({
  stageId,
  queryEnabled = true,
}: {
  stageId: string;
  queryEnabled?: boolean;
}) => {
  return useQuery(["standingsTable", stageId], getStandingsTableForStageId, {
    refetchOnWindowFocus: false,
    enabled: queryEnabled,
  });
};

// Below query not in use
export const useFixtureSchedule = (
  seriesIds: string,
  refetchInterval?: number
) => {
  return useQuery(["schedule", seriesIds], getFixtureSchedule, {
    refetchInterval: refetchInterval ?? 0,
    refetchOnWindowFocus: false,
  });
};

export const useGlobals = (): UseQueryResult<Globals, Error> => {
  return useQuery("appGlobals", () =>
    fetchStrapiAPI("/global", {
      populate: "deep, 7",
    })
  );
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

export const useArticles = ({
  category,
  pageNumber = 1,
  enabled = true,
}: {
  category?: string;
  pageNumber?: number;
  enabled?: boolean;
}): UseQueryResult<{ data: ArticleType[] }, Error> => {
  const APIURL =
    !category || category === "All"
      ? `/articles?pagination[page]=${pageNumber}&pagination[pageSize]=5&populate=deep, 2&sort=createdAt:desc`
      : `/articles?filters[category][slug][$eq]=${category}&pagination[page]=${pageNumber}&pagination[pageSize]=5&populate=deep, 2&sort=createdAt:desc`;

  return useQuery(
    ["articles", category, pageNumber ?? 1],
    () => fetchStrapiAPI(APIURL),
    {
      keepPreviousData: true,
      enabled: enabled,
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
    `${API_BASE_URL}/fixtures/schedule?seriesIds=${seriesIds}&starts_between=${dateRange}&page=${pageParam}`
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
  queryEnabled = true,
}: {
  seriesIds: string;
  dateRange: string;
  initialData?: any;
  refetchInterval?: number;
  queryEnabled?: boolean;
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
      enabled: queryEnabled,
    }
  );
};

type IPREGISTRY = {
  location: {
    country: {
      name: string;
    };
  };
};

export const useUserCountry = (): UseQueryResult<IPREGISTRY, Error> => {
  return useQuery(["userCountry"], getCountry, {
    refetchOnWindowFocus: false,
  });
};

type FixtureStrapiType = {
  attributes: {
    createdAt: string;
    publishedAt: string;
    cricketdata_match_id: string;
    sportmonk_fixture_id: string;
  };
};

export const useCricketDataFixtureIdFromStrapi = (
  sportmonkFixtureId: number
): UseQueryResult<{ data: FixtureStrapiType[] }, Error> => {
  return useQuery(
    ["fixture", sportmonkFixtureId],
    () =>
      fetchStrapiAPI(
        `/fixtures?filters[sportmonk_fixture_id][$eq]=${sportmonkFixtureId}&populate=deep`
      ),
    { refetchOnWindowFocus: false }
  );
};

export const useFixtureStatus = ({
  cricketDataFixtureId,
  cricketDataAPIToken,
  queryEnabled = false,
  refetchInterval,
}: {
  cricketDataFixtureId?: string;
  cricketDataAPIToken?: string;
  queryEnabled?: boolean;
  refetchInterval?: number;
}): UseQueryResult<any, Error> => {
  return useQuery(
    ["fixtureStatus", cricketDataFixtureId, cricketDataAPIToken],
    () => getFixtureStatus(cricketDataFixtureId, cricketDataAPIToken),
    {
      enabled: queryEnabled,
      refetchInterval,
    }
  );
};

const getInfiniteVideos = ({ pageParam = 1 }: { pageParam?: number }) => {
  const APIURL = `/videos?pagination[page]=${pageParam}&pagination[pageSize]=10&populate=deep, 2&sort=createdAt:desc`;
  return fetchStrapiAPI(APIURL);
};

const getInfiniteReels = ({ pageParam = 1 }: { pageParam?: number }) => {
  const APIURL = `/reels?pagination[page]=${pageParam}&pagination[pageSize]=10&populate=deep, 2&sort=createdAt:desc`;
  return fetchStrapiAPI(APIURL);
};

export type InfiniteVideosResponseType = {
  pages: { data: VideoItemType[]; meta: any }[];
  pageParams: any;
};

export type InfiniteReelsResponseType = {
  pages: { data: ReelType[]; meta: any }[];
  pageParams: any;
};

export const useInfiniteVideos = ({
  initialData,
  refetchOnWindowFocus = false,
}: {
  initialData?: InfiniteVideosResponseType;
  refetchOnWindowFocus?: boolean;
}): UseInfiniteQueryResult<InfiniteVideosResponseType, Error> => {
  return useInfiniteQuery(["infiniteVideos"], getInfiniteVideos, {
    getNextPageParam: (_lastPage, pages) => {
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
    refetchOnWindowFocus: refetchOnWindowFocus,
  });
};

export const useVideo = (
  slug: string
): UseQueryResult<{ data: VideoItemType[] }, Error> => {
  return useQuery(["video", slug], () =>
    fetchStrapiAPI(`/videos?filters[slug][$eq]=${slug}&populate=deep, 2`)
  );
};

export const useVideos = ({
  category,
  pageNumber = 1,
  enabled = true,
}: {
  category?: string;
  pageNumber?: number;
  enabled?: boolean;
}): UseQueryResult<{ data: VideoItemType[] }, Error> => {
  const APIURL =
    !category || category === "All"
      ? `/videos?pagination[page]=${pageNumber}&pagination[pageSize]=5&populate=deep, 2&sort=createdAt:desc`
      : `/videos?filters[category][slug][$eq]=${category}&pagination[page]=${pageNumber}&pagination[pageSize]=5&populate=deep, 2&sort=createdAt:desc`;

  return useQuery(
    ["videosByCategory", category, pageNumber ?? 1],
    () => fetchStrapiAPI(APIURL),
    {
      keepPreviousData: true,
      enabled: enabled,
    }
  );
};

export const useReels = ({
  category,
  pageNumber = 1,
  enabled = true,
}: {
  category?: string;
  pageNumber?: number;
  enabled?: boolean;
}): UseQueryResult<{ data: ReelType[] }, Error> => {
  const APIURL =
    !category || category === "All"
      ? `/reels?pagination[page]=${pageNumber}&pagination[pageSize]=5&populate=deep, 2&sort=createdAt:desc`
      : `/videos?filters[category][slug][$eq]=${category}&pagination[page]=${pageNumber}&pagination[pageSize]=5&populate=deep, 2&sort=createdAt:desc`;

  return useQuery(
    ["reelsByCategory", category, pageNumber ?? 1],
    () => fetchStrapiAPI(APIURL),
    {
      keepPreviousData: true,
      enabled: enabled,
    }
  );
};

export const useReel = (
  slug: string
): UseQueryResult<{ data: ReelType[] }, Error> => {
  return useQuery(["singleReel", slug], () =>
    fetchStrapiAPI(`/reels?filters[slug][$eq]=${slug}&populate=deep, 2`)
  );
};

export const useInfiniteReels = ({
  initialData,
  refetchOnWindowFocus = false,
}: {
  initialData?: InfiniteReelsResponseType;
  refetchOnWindowFocus?: boolean;
}): UseInfiniteQueryResult<InfiniteReelsResponseType, Error> => {
  return useInfiniteQuery(["infiniteReels"], getInfiniteReels, {
    getNextPageParam: (_lastPage, pages) => {
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
    refetchOnWindowFocus: refetchOnWindowFocus,
  });
};

export const useTwitterFeedById = () => {};
