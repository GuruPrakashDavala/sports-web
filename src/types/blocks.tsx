import { ArticleType, CategoryType, ImageType, Video } from "./article";

export enum BlockType {
  ARTICLE = "article",
  NEWSCARD = "newscard",
  MULTIINFOCARD = "multiinfocard",
}

type ArticleBlock = {
  article: {
    data: ArticleType;
  };
  id: number;
  type: "article";
};

export type MultiInfoComponent = {
  id: number;
  title_article: { data: ArticleType };
  description_article: { data: ArticleType };
  type: "multiinfocomponent";
};

export type ContentGrid = ArticleBlock | MultiInfoComponent;

export type ArticleCarousel = {
  articles: { data: ArticleType[] };
  id: number;
  title: string;
  type: "articlecarousel";
};

export type TweetEmbed = {
  id: number;
  title: string;
  tweet_id: string;
  type: "tweetembed";
};

export type VideoCarousel = {
  id: number;
  title: "Videos";
  type: "videocarousel";
  videos: { data: Video[] };
};

export type ArticleGrid = {
  articles: { data: ArticleType[] };
  id: number;
  title: string;
  type: "articlegrid";
};

export type HomeBlocks = ArticleCarousel | VideoCarousel | ArticleGrid;

export type ImageCarousel = {
  id: number;
  imagecarousel: { data: ImageType[] };
  type: "imagecarousel";
};

export type RichText = {
  id: number;
  richtext: string;
  type: "richtext";
};
