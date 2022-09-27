import { differenceInHours, format } from "date-fns";
import { ImageType } from "../types/article";

export const imageHost = `http://localhost:1337`;

const getArticleFormattedDate = (articleDate: string | Date) => {
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
      ? format(articlePublishedDate, "Mo MMMM yyyy")
      : `${differenceFromCurrentTime} hrs ago`;

  return formattedDate;
};

export const renderImage = (image: ImageType) => {
  const imageSrc = image.attributes.formats.large
    ? image.attributes.formats.large.url
    : image.attributes.formats.medium
    ? image.attributes.formats.medium.url
    : image.attributes.formats.small.url;

  return `${imageHost}${imageSrc}`;
};

export default getArticleFormattedDate;
