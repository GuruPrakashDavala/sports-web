import { ColorTheme } from "../../../types/modifier";
import { ArticleCarousel } from "../../../types/blocks";
import ArticleCard, { ArticleVariant } from "../../Cards/ArticleCard";
import Carousel, { CarouselItem } from "../../Carousel";
import SectionHeading from "../../SectionHeading";
import SectionWrapper from "../../Wrappers/SectionWrapper";
import { ThemeUICSSObject } from "theme-ui";
import { renderImage } from "../../../utils/util";
import { newspageBaseURL } from "../../../utils/pages";
import { isNativeMobileApp } from "../../Ionic/utils/capacitor";
import BasicArticleCard from "../../Cards/BasicArticalCard";

type ArticleCarouselProps = {
  block: ArticleCarousel;
  theme?: ColorTheme;
  styles?: ThemeUICSSObject;
};

const ArticeCarousel = (props: ArticleCarouselProps): JSX.Element => {
  const { block, theme = ColorTheme.LIGHT, styles = {} } = props;

  if (!block.articles.data) return <></>;

  const categorySlug = block.category.data?.attributes.slug;
  const categoryName = block.category.data?.attributes.name;

  const categoryLink =
    categorySlug && categoryName
      ? {
          href: `/${newspageBaseURL}?category=${categorySlug}`,
          external: false,
          label: categoryName,
        }
      : undefined;

  const carouselItems: CarouselItem[] = block.articles.data.map((article) => {
    return {
      content: isNativeMobileApp ? (
        <BasicArticleCard
          label={article.attributes.title}
          imageSrc={renderImage(article.attributes.coverimage.data)}
          date={article.attributes.createdAt}
          variant={ArticleVariant.SMALL}
          badge={article.attributes.badge?.data?.attributes.name}
          type={article.attributes.type}
          category={article.attributes.category}
          slug={article.attributes.slug}
          theme={theme}
        />
      ) : (
        <ArticleCard
          label={article.attributes.title}
          imageSrc={renderImage(article.attributes.coverimage.data)}
          date={article.attributes.createdAt}
          variant={ArticleVariant.SMALL}
          badge={article.attributes.badge?.data?.attributes.name}
          type={article.attributes.type}
          category={article.attributes.category}
          slug={article.attributes.slug}
          theme={theme}
          styles={{ height: "100%", cursor: "grab", ...styles }}
        />
      ),
    };
  });

  return (
    <SectionWrapper theme={theme}>
      <SectionHeading
        title={block.title}
        theme={ColorTheme.LIGHT}
        styles={{ px: [0, 1] }}
        link={categoryLink}
      />
      <Carousel
        swiperId={block.id.toString()}
        items={carouselItems}
        styles={{ gap: [1] }}
      />
    </SectionWrapper>
  );
};

export default ArticeCarousel;
