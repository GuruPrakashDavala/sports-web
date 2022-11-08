import ArticleGrid from "../../components/Grids/ArticleGrid";
import { fetchAPI } from "../../lib/strapi";
import { ArticleType } from "../../types/article";
import { ColorTheme } from "../../types/modifier";

const NewsPage = (props: { articles: ArticleType[] }) => {
  const { articles } = props;
  return (
    <ArticleGrid
      articleGrid={{
        articles: { data: articles },
        id: 1,
        title: `Recent articles`,
        type: `articlegrid`,
      }}
      theme={ColorTheme.LIGHT}
    />
  );
};

export default NewsPage;

export async function getServerSideProps(context: any) {
  const [articles] = await Promise.all([fetchAPI(`/articles?populate=deep`)]);

  return {
    props: { articles: articles.data },
  };
}
