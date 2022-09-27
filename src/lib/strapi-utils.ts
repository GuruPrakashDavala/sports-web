import { ArticleType } from "../types/article";
import { fetchAPI } from "./strapi";

export const getArticles = async (): Promise<ArticleType[]> => {
  const articles = await fetchAPI("/articles", {
    populate: "deep",
  });
  return articles.data;
};
