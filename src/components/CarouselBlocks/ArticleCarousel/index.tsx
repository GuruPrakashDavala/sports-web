import { Fragment } from "react";
import { ColorTheme } from "../../../types/modifier";
import { ArticleCarousel } from "../../../types/blocks";
import ArticleCard, { ArticleVariant } from "../../Cards/ArticleCard";
import Carousel, { CarouselItem } from "../../Carousel";
import SectionHeading from "../../SectionHeading";
import SectionWrapper from "../../Wrappers/SectionWrapper";
import { ThemeUICSSObject } from "theme-ui";
import { renderImage } from "../../../utils/util";

type ArticleCarouselProps = {
  block: ArticleCarousel;
  theme?: ColorTheme;
  styles?: ThemeUICSSObject;
};

const ArticeCarousel = (props: ArticleCarouselProps): JSX.Element => {
  const { block, theme = ColorTheme.LIGHT, styles = {} } = props;

  const categorySlug = block.category.data?.attributes.slug;
  const categoryName = block.category.data?.attributes.name;

  const categoryLink =
    categorySlug && categoryName
      ? {
          href: `/news?category=${categorySlug}`,
          external: false,
          label: categoryName,
        }
      : undefined;

  const carouselItems: CarouselItem[] = block.articles.data.map((article) => {
    return {
      content: (
        <Fragment key={article.id}>
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
            styles={{ height: "100%", ...styles }}
          />
        </Fragment>
      ),
      slideStyles: {},
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
