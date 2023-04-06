import { Fragment } from "react";
import { ColorTheme } from "../../../types/modifier";
import { RetailCarousel } from "../../../types/blocks";
import { ArticleVariant } from "../../Cards/ArticleCard";
import Carousel from "../../Carousel";
import SectionHeading from "../../SectionHeading";
import SectionWrapper from "../../Wrappers/SectionWrapper";
import { ThemeUICSSObject } from "theme-ui";
import { renderImage } from "../../../utils/util";
import RetailCard from "../../Cards/RetailCard";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { useUserCountry } from "../../../utils/queries";

type RetailCarouselProps = {
  block: RetailCarousel;
  theme?: ColorTheme;
  styles?: ThemeUICSSObject;
};

const RetailCarousel = (props: RetailCarouselProps): JSX.Element => {
  const { block, theme = ColorTheme.LIGHT, styles = {} } = props;
  const bp = useBreakpointIndex();
  const { data, isLoading } = useUserCountry();
  const country = !isLoading ? data?.location.country.name : undefined;

  if (
    !block.isActive ||
    !block.retail_products.data ||
    block.retail_products.data.length === 0 ||
    isLoading
  ) {
    return <></>;
  }

  const retailProducts = block.retail_products.data.filter(
    (product) =>
      product.attributes.country === "All" ||
      product.attributes.country === country
  );

  if (retailProducts.length === 0) {
    return <></>;
  }

  const carouselTheme = block.theme;

  const retailCarouselItems = retailProducts.map((product) => {
    const discountedProduct = product.attributes.status === `Offer`;
    const retailProductBadge =
      product.attributes.status === `Offer` ? `In sale` : undefined;

    return {
      content: (
        <RetailCard
          label={product.attributes.title}
          imageSrc={renderImage(product.attributes.image.data)}
          date={product.attributes.createdAt}
          slug={product.attributes.slug}
          href={product.attributes.url}
          badge={retailProductBadge}
          category={product.attributes.category}
          mrpPrice={product.attributes.mrp_price}
          currentPrice={product.attributes.current_price}
          variant={bp > 1 ? ArticleVariant.LARGE : ArticleVariant.LARGE}
          theme={carouselTheme}
          discountedProduct={discountedProduct}
          styles={{ height: "100%", cursor: "grab", ...styles }}
        />
      ),
    };
  });

  return (
    <Fragment>
      {retailCarouselItems && retailCarouselItems.length > 0 ? (
        <SectionWrapper theme={carouselTheme}>
          <SectionHeading
            title={block.title}
            theme={ColorTheme.DARK}
            styles={{ px: [0, 1] }}
          />
          <Carousel
            swiperId={block.id.toString()}
            items={retailCarouselItems}
            styles={{ gap: [1] }}
          />
        </SectionWrapper>
      ) : null}
    </Fragment>
  );
};

export default RetailCarousel;
