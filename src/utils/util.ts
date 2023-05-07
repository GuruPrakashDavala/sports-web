import { differenceInHours, format } from "date-fns";
import { ImageType } from "../types/article";

export const APPLICATION_DOMAIN_URL = `https://cricfanatic.com`;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_REST_API ?? `http://localhost:3000/api`;

export const getArticleFormattedDate = (articleDate: string | Date) => {
  const now = new Date();
  const articlePublishedDate = new Date(articleDate);
  const differenceFromCurrentTime = differenceInHours(
    now,
    articlePublishedDate
  );

  const formattedDate =
    differenceFromCurrentTime === 0
      ? `Just now`
      : differenceFromCurrentTime > 24
      ? format(articlePublishedDate, "do MMMM yyyy")
      : `${differenceFromCurrentTime} hrs ago`;

  return formattedDate;
};

export const renderImage = (image: ImageType) => {
  const imageSrc = image.attributes.formats.large
    ? image.attributes.formats.large.url
    : image.attributes.formats.medium
    ? image.attributes.formats.medium.url
    : image.attributes.formats.small
    ? image.attributes.formats.small.url
    : image.attributes.url;
  return imageSrc;
};

export const getCountry = async () => {
  const res = await fetch("https://api.ipregistry.co/?key=42r5ldd0dh2gem25");
  const ipAddress = await res.json();
  return ipAddress;
};

export const getFixtureStatus = async (
  fixtureId?: string,
  cricketDataAPIToken?: string
) => {
  if (!fixtureId) {
    return;
  }
  const LifeTimeFreeAPIToken = "5b6ddb95-de9c-4059-8ea8-a15eb3f373f2";
  const APIToken = cricketDataAPIToken ?? LifeTimeFreeAPIToken;
  const apiBaseURL = "https://api.cricapi.com/v1/match_info";
  try {
    const res = await fetch(
      `${apiBaseURL}?apikey=${APIToken}&offset=0&id=${fixtureId}`
    );
    const cricketDataRes = await res.json();
    return cricketDataRes;
  } catch (err) {
    console.log(err);
    return;
  }
};

// Get TweetData

export const getTweet = async (tweetId: string) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/socials/single-tweet?tweetId=${tweetId}`
    );
    const tweet = await res.json();
    return tweet.tweetData;
  } catch (err) {
    console.log(`Error fetching the tweet - ${tweetId}`);
    console.log(err);
    return undefined;
  }
};
