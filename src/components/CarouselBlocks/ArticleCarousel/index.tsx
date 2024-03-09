import { ColorTheme } from "../../../types/modifier";
import { ArticleCarousel } from "../../../types/blocks";
import ArticleCard, { ArticleVariant } from "../../Cards/ArticleCard";
import Carousel, { CarouselItem } from "../../Carousel";
import SectionHeading from "../../SectionHeading";
import SectionWrapper from "../../Wrappers/SectionWrapper";
import { ThemeUICSSObject } from "theme-ui";
import { renderImage } from "../../../utils/util";
import { NEWSPAGE_BASE_URL } from "../../../utils/pages";
import { useArticles } from "../../../utils/queries";

type ArticleCarouselProps = {
  block: ArticleCarousel;
  theme?: ColorTheme;
  styles?: ThemeUICSSObject;
};

const ArticleCarouselPicker = (props: ArticleCarouselProps): JSX.Element => {
  const { block, theme, styles = {} } = props;

  const carouselType = block.automatic ? "automatic" : "manual";
  const category = block.category?.data?.attributes.slug;
  const fetchArticlesByCategory = block.automatic && category ? true : false;

  const { data: articles } = useArticles({
    category,
    enabled: fetchArticlesByCategory ?? false,
  });

  const articleByCategory = articles ? articles.data : undefined;

  const articleCarouselProps: ArticleCarousel = {
    id: block.id,
    category: undefined,
    title: block.title,
    type: "articlecarousel",
    articles: {
      data: articleByCategory ? articleByCategory : [],
    },
    automatic: true,
    theme: block.theme,
  };

  switch (carouselType) {
    case "automatic":
      return (
        <ArticeCarousel
          block={articleCarouselProps}
          theme={theme}
          styles={styles}
        />
      );
    case "manual":
      return <ArticeCarousel block={block} theme={theme} styles={styles} />;

    default:
      return <></>;
  }
};

const ArticeCarousel = (props: ArticleCarouselProps): JSX.Element => {
  const { block, theme = ColorTheme.LIGHT, styles = {} } = props;

  if (!block.articles.data || block.articles.data.length === 0) return <></>;

  const carouselTheme = block.theme ?? theme;

  const categoryLink = {
    href: `/${NEWSPAGE_BASE_URL}`,
    external: false,
    label: "View all news",
  };

  const carouselItems: CarouselItem[] = block.articles.data.map((article) => {
    return {
      content: (
        <ArticleCard
          label={article.attributes.title}
          imageSrc={renderImage(article.attributes.coverimage.data)}
          date={article.attributes.createdAt}
          variant={ArticleVariant.SMALL}
          badge={article.attributes.badge?.data?.attributes.name}
          type={article.attributes.type}
          category={article.attributes.category}
          slug={article.attributes.slug}
          theme={carouselTheme}
          styles={{ height: "100%", cursor: "grab", ...styles }}
        />
      ),
    };
  });

  return (
    <SectionWrapper theme={carouselTheme}>
      <SectionHeading
        title={block.title}
        theme={carouselTheme}
        styles={{ px: [0, 1] }}
        link={categoryLink}
      />
      <Carousel swiperId={block.id.toString()} items={carouselItems} />
    </SectionWrapper>
  );
};

export default ArticleCarouselPicker;
