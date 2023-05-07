import { ReelEntitlements, VideoType } from "../components/Ionic/Pages/videos";
import { CategoryType, ImageType, TagsType } from "./article";

export type Tweet = {
  attributes: {
    createdAt: string;
    publishedAt: string;
    title?: string;
    tweet_id: string;
    updatedAt: string;
  };
  id: number;
};

export type SocialEmbed = {
  attributes: {
    title: string;
    social_id: string;
    type: "Twitter" | "Instagram" | "YouTube";
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  id: number;
};

type MuxVideoType = {
  attributes: {
    aspect_ratio: string;
    asset_id: string;
    createdAt: string;
    duration: string;
    error_message: string;
    isReady: boolean;
    playback_id: string;
    title: string;
    updatedAt: string;
    upload_id: string;
  };
};

export type VideoItemType = {
  attributes: {
    title: string;
    description?: string;
    tweet_id?: string;
    type: VideoType;
    thumbnail: { data: ImageType };
    mux_video_uploader_mux_asset?: { data: MuxVideoType };
    tags?: TagsType;
    category?: CategoryType;
    badge?: string;
    slug: string;
    video_ratio: string;
    cricfanatic_originals: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    short_video: boolean;
  };
  id: number;
};

export type VideoEntitlements = {};

export type ReelType = {
  attributes: {
    title: string;
    description?: string;
    tweet_id?: string;
    type: ReelEntitlements;
    thumbnail: { data: ImageType };
    mux_video_uploader_mux_asset?: { data: MuxVideoType };
    tags?: TagsType;
    category?: CategoryType;
    badge?: string;
    slug: string;
    video_ratio: string;
    cricfanatic_originals: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    short_video: boolean;
  };
  id: number;
};
