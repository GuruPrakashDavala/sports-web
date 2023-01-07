import { ImageType } from "../types/article";

// AppHeader types

type Subcategory = {
  id: number;
  name: string;
  href: string;
  logo: { data: ImageType | null };
};

export type CategoryImage = {
  id: number;
  name: string;
  href: string;
  type: "image";
  image: { data: ImageType };
};

export type CategoryList = {
  id: number;
  name: string;
  type: "list";
  subcategory: Subcategory[];
};

export type MenuCategory = {
  id: number;
  data: {
    attributes: {
      createdAt: string;
      publishedAt: string;
      slug: string;
      title: string;
      updatedAt: string;
      category_items: (CategoryImage | CategoryList)[];
    };
  } | null;
};

type HeaderItem = {
  id: number;
  name: string;
  href: string | null;
  menucategory: MenuCategory;
};

export type AppHeader = {
  id: number;
  HeaderItems: HeaderItem[];
};

type HeaderPromo = {
  id: number;
  promo_description: string;
  href: string;
};
