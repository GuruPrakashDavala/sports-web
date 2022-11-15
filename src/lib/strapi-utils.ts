import { ArticleType } from "../types/article";
import { fetchStrapiAPI } from "./strapi";

export const getArticles = async (): Promise<ArticleType[]> => {
  const articles = await fetchStrapiAPI("/articles", {
    populate: "deep",
  });
  return articles.data;
};
