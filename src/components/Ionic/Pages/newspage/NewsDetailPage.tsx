import { useParams } from "react-router";
import { ArticleDetailPageContent } from "../../../../pages/news/[slug]";
import { useArticle, useRecentArticles } from "../../../../utils/queries";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import PageLoader from "../../../Loaders/PageLoader/PageLoader";
import TabBarContext, {
  TabBarContextProps,
} from "../../contexts/tabBarContext";
import { useContext } from "react";

const NewsDetailPage = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const { setShowTabs } = useContext<TabBarContextProps>(TabBarContext);
  const { data: articleData, isLoading: articleLoading } = useArticle(slug);

  const { isLoading: recentArticlesLoading, data: articles } =
    useRecentArticles();

  const article = articleData ? articleData.data[0] : undefined;
  const recentArticles =
    !recentArticlesLoading && articles ? articles.data : undefined;

  useIonViewWillEnter(() => {
    console.log("DidEnter");
    setShowTabs(false);
  });

  useIonViewWillLeave(() => {
    setShowTabs(true);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-toolbar-color">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/newspage"
              className="ion-back-button"
            />
          </IonButtons>
          <IonTitle>{article ? article.attributes.title : slug}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {article ? (
          <ArticleDetailPageContent
            article={article}
            recentArticles={recentArticles}
          />
        ) : (
          <PageLoader />
        )}
      </IonContent>
    </IonPage>
  );
};

export default NewsDetailPage;
