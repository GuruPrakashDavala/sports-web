import { ImageType } from "../types/article";

export type Globals = {
  data: {
    id: number;
    attributes: {
      siteName: string;
      createdAt: string;
      updatedAt: string;
      defaultSeo: {
        id: number;
        metaTitle: string;
        metaDescription: string;
        shareImage: { data: ImageType };
      };
      favicon: {
        data: ImageType;
      };
      AppHeader: AppHeader;
      Web_Promo: HeaderPromo;
      Mobile_Promo: HeaderPromo;
      news_share_url?: string;
    };
  };
  meta: any;
};

export type AppHeader = {
  id: number;
  HeaderItems: HeaderItem[];
};

type HeaderItem = {
  id: number;
  name: string;
  href: string | null;
  menucategory: MenuCategory | null;
};

type MenuCategory = {
  data: {
    id: number;
    attributes: {
      title: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      category_items: (CategoryListItemType | CategoryImageType)[];
    };
  };
};

type Subcategory = {
  id: number;
  name: string;
  href: string;
  logo: { data: ImageType | null };
};

export type CategoryListItemType = {
  id: number;
  name: string;
  type: "list";
  subcategory: Subcategory[];
};

export type CategoryImageType = {
  id: number;
  type: "image";
  href: string;
  name: string;
  image: {
    data: ImageType;
  };
};

export type HeaderPromo = {
  id: number;
  promo_description: string;
  href: string;
  external?: boolean;
  active?: boolean;
};
