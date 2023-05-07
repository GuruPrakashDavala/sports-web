import { useCallback, MutableRefObject } from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { NewsPageContent } from "../../../../pages/news/index";
import { useEffect, useState } from "react";
import { fetchStrapiAPI } from "../../../../lib/strapi";
import PageLoader from "../../../Loaders/PageLoader/PageLoader";
import { useHistory } from "react-router";
import { useCarouselContext } from "../../contexts/carouselRefContext";

type IonNewsPageProps = {
  contentRef: MutableRefObject<HTMLIonContentElement | null>;
  homeRef?: MutableRefObject<HTMLIonContentElement | null>;
};

const IonNewsPage = (props: IonNewsPageProps) => {
  const { contentRef, homeRef } = props;
  const history = useHistory();

  const [newsPageContentProps, setNewsPageContentProps] =
    useState<any>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // TODO: convert this into react queries. Use the same in next pages
  // TODO: Define the types of newsPageProps

  const getNewsPageProps = async () => {
    const [articles, categories] = await Promise.all([
      fetchStrapiAPI(
        `/articles?pagination[page]=1&pagination[pageSize]=5&populate=deep, 2&sort=createdAt:desc`
      ),
      fetchStrapiAPI(`/categories?fields[0]=name,slug`),
    ]);

    const newsPageProps = {
      articles: articles.data,
      categories: categories.data,
    };

    setNewsPageContentProps(newsPageProps);
  };

  useEffect(() => {
    getNewsPageProps();
  }, []);

  const categoryChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelectedCategory(event.target.value);
  };

  const { setCarouselUpdate } = useCarouselContext();

  const ionBackButton = useCallback((ev: any) => {
    ev.detail.register(10, () => {
      history.replace(`/home`);
      setTimeout(() => {
        if (homeRef) {
          homeRef.current && homeRef.current.scrollToTop(300);
        }
        setCarouselUpdate((prev) => prev + 1);
      }, 50);
    });
  }, []);

  useIonViewDidEnter(() => {
    document.addEventListener("ionBackButton", ionBackButton);
  });

  useIonViewWillLeave(() => {
    document.removeEventListener("ionBackButton", ionBackButton);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-toolbar-color">
          {/* <IonButtons slot="start">
            <IonBackButton defaultHref="/home" className="ion-back-button" />
          </IonButtons> */}
          <IonTitle>News</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollEvents={true} ref={contentRef} fullscreen>
        {newsPageContentProps ? (
          <NewsPageContent
            articles={newsPageContentProps.articles}
            categories={newsPageContentProps.categories}
            onCategoryChangeEvent={categoryChanged}
            selectedCategory={selectedCategory}
          />
        ) : (
          <PageLoader />
        )}
      </IonContent>
    </IonPage>
  );
};

export default IonNewsPage;
