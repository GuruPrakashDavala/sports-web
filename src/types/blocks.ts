import { ArticleType, CategoryType, ImageType, RetailProduct } from "./article";
import { ReelType, VideoItemType } from "./common";
import { ColorTheme } from "./modifier";

export enum BlockType {
  ARTICLE = "article",
  NEWSCARD = "newscard",
  SNACKQUOTE = "snackquote",
  ARTICLE_CAROUSEL = "articlecarousel",
}

type ArticleBlock = {
  article: {
    data: ArticleType;
  };
  id: number;
  type: "article";
};

export type SnackQuoteComponent = {
  id: number;
  title_article: { data: ArticleType };
  description_article: { data: ArticleType };
  type: "snackquote";
};

export type ContentGrid = ArticleBlock | SnackQuoteComponent;

export type ArticleCarousel = {
  id: number;
  category?: CategoryType;
  title: string;
  type: "articlecarousel";
  articles: { data: ArticleType[] };
  theme?: ColorTheme;
  automatic: boolean;
};

export type VideoCarousel = {
  id: number;
  category?: CategoryType;
  title: string;
  type: "videocarousel";
  videos: { data: VideoItemType[] };
  automatic: boolean;
  theme?: ColorTheme;
};

export type ReelCarousel = {
  id: number;
  category?: CategoryType;
  title: string;
  type: "reelcarousel";
  reels: { data: ReelType[] };
  automatic: boolean;
  theme?: ColorTheme;
};

export type RetailCarousel = {
  id: number;
  title: string;
  type: "retailcarousel";
  theme: ColorTheme.DARK | ColorTheme.LIGHT;
  retail_products: { data: RetailProduct[] };
  isActive: boolean;
};

export type StandingsTableBlock = {
  series_name: string;
  series_id: string;
  code: string;
  type: "standingstable";
};

export type TweetEmbed = {
  id: number;
  title: string;
  tweet_id: string;
  type: "tweetembed";
};

export type ArticleGrid = {
  articles: { data: ArticleType[] };
  id: number;
  title: string;
  type: "articlegrid";
};

export type Quote = {
  id: number;
  type: "quote";
  quote: string;
  pre?: string;
  post?: string;
};

export type ImagePageBlock = {
  id: number;
  image: { data: ImageType };
  source?: string;
  type: "image";
};

export type ArticlePageBlock = {
  article: { data: ArticleType };
  id: number;
  type: "article";
};

export type HomeBlocks =
  | ArticleCarousel
  | VideoCarousel
  | ReelCarousel
  | ArticleGrid
  | Quote
  | RetailCarousel
  | StandingsTableBlock;

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

export type YoutubeEmbed = {
  id: number;
  youtubeId: string;
  embed_title: string;
  type: "youtubeembed";
};
