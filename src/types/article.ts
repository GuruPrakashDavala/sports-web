import {
  ArticleCarousel,
  ImageCarousel,
  RichText,
  VideoCarousel,
  TweetEmbed,
  ImagePageBlock,
  ArticlePageBlock,
  Quote,
  SnackQuoteComponent,
} from "./blocks";

type WriterType = {
  data: null | {
    attributes: {
      articles: { data: ArticleType[] };
      createdAt: string;
      email: string;
      name: string;
      updatedAt: string;
    };
    id: number;
  };
};

type BadgeType = {
  data: null | {
    attributes: {
      createdAt: string;
      name: string;
      slug: string;
      updatedAt: string;
    };
    id: number;
  };
};

export type CategoryType = {
  data: null | {
    attributes: {
      articles: { data: ArticleType[] };
      createdAt: string;
      name: string;
      slug: string;
      updatedAt: string;
    };
    id: number;
  };
};

export type ImageType = {
  attributes: {
    alternativeText: string;
    caption: string;
    createdAt: string;
    ext: string;
    formats: ImageFormats;
    hash: string;
    height: number;
    mime: string;
    name: string;
    previewUrl: null | string;
    provider: string;
    provider_metadata: null | string;
    size: number;
    updatedAt: string;
    url: string;
    width: number;
  };
  id: number;
};

type ImageFormats = {
  large?: ImageFormatSpecs;
  medium?: ImageFormatSpecs;
  small: ImageFormatSpecs;
  thumbnail: ImageFormatSpecs;
};

type TagsType = {
  data:
    | []
    | {
        attributes: {
          name: string;
          createdAt: string;
          slug: string;
          updatedAt: string;
        };
        id: number;
      }[];
};

type ImageFormatSpecs = {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: null | string;
  size: number;
  url: string;
  width: number;
};

export type Video = {
  attributes: {
    category: CategoryType;
    createdAt: string;
    publishedAt: string;
    title: string;
    type: string;
    updatedAt: string;
    videoid: string;
  };
  id: number;
};

export type ArticleType = {
  attributes: {
    writer?: WriterType;
    badge?: BadgeType;
    blocks?: ArticleBlocks[];
    category?: CategoryType;
    coverimage: { data: ImageType };
    createdAt: string;
    publishedAt: string;
    slug: string;
    tags: TagsType;
    title: string;
    type: string;
    updatedAt: string;
  };
  id: number;
};

export type ArticleBlocks =
  | ArticleCarousel
  | VideoCarousel
  | ImageCarousel
  | RichText
  | TweetEmbed
  | ImagePageBlock
  | ArticlePageBlock
  | Quote
  | SnackQuoteComponent;
