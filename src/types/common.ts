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
