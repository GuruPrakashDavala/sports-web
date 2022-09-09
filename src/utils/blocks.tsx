import { ArticleVariant } from "../components/Cards/ArticleCard";
import { ColorThemeAll, ComponentVariant } from "../types/modifier";

export enum BlockType {
  NEWSCARD = "newscard",
  MULTIINFOCARD = "multiinfocard",
}

export type NewsCardType = {
  id: string;
  type: BlockType.NEWSCARD;
  imageIndex: number;
  theme?: ColorThemeAll;
  variant?: ArticleVariant;
};

type MultiInfoCardType = {
  id: string;
  type: BlockType.MULTIINFOCARD;
  label: string;
  theme?: ColorThemeAll;
  variant?: ComponentVariant;
};

export type Blocks = NewsCardType | MultiInfoCardType;
