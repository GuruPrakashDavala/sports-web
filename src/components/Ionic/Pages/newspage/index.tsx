import { useCallback } from "react";
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
import { useEffect, useState, Fragment } from "react";
import { fetchStrapiAPI } from "../../../../lib/strapi";
import PageLoader from "../../../Loaders/PageLoader/PageLoader";
import { useHistory } from "react-router";

const IonNewsPage = () => {
  const history = useHistory();
  const [props, setProps] = useState<any>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // TODO: convert this into react queries. Use the same in next pages
  // TODO: Define the types of newsPageProps

  const getNewsPageProps = async () => {
    const [articles, categories] = await Promise.all([
      fetchStrapiAPI(
        `/articles?pagination[page]=1&pagination[pageSize]=10&populate=deep, 2&sort=createdAt:desc`
      ),
      fetchStrapiAPI(`/categories?fields[0]=name,slug`),
    ]);

    const newsPageProps = {
      articles: articles.data,
      categories: categories.data,
    };

    setProps(newsPageProps);
  };

  useEffect(() => {
    getNewsPageProps();
  }, []);

  const categoryChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelectedCategory(event.target.value);
  };

  const ionBackButton = useCallback((ev: any) => {
    ev.detail.register(10, () => {
      history.replace(`/home`);
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

      <IonContent fullscreen>
        {props ? (
          <Fragment>
            <NewsPageContent
              articles={props.articles}
              categories={props.categories}
              onCategoryChangeEvent={categoryChanged}
              selectedCategory={selectedCategory}
            />
          </Fragment>
        ) : (
          <PageLoader />
        )}
      </IonContent>
    </IonPage>
  );
};

export default IonNewsPage;
