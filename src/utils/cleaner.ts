import xss, { IFilterXSSOptions } from "xss";

const allowedInArticles: IFilterXSSOptions = {
  whiteList: {
    b: [],
    i: [],
    em: [],
    strong: [],
    a: ["href", "target", "class"],
    p: [],
    h2: [],
    ul: [],
    li: [],
    ol: [],
    br: [],
  },
};

const allowedInArticleMeta: IFilterXSSOptions = {
  whiteList: {
    a: ["href", "target"],
  },
};

export function cleanArticleFormattedText(dirty: string): string {
  return xss(dirty, allowedInArticles);
}

export function cleanArticleMetaDescriptionText(dirty: string): string {
  return xss(dirty, allowedInArticleMeta);
}
