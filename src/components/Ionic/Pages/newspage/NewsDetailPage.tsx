import { useParams } from "react-router";
import { ArticleDetailPageContent } from "../../../../pages/news/[slug]";
import {
  useArticle,
  useGlobals,
  useRecentArticles,
} from "../../../../utils/queries";
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
  IonIcon,
  IonButton,
} from "@ionic/react";
import { shareSocial } from "ionicons/icons";
import PageLoader from "../../../Loaders/PageLoader/PageLoader";
import TabBarContext, {
  TabBarContextProps,
} from "../../contexts/tabBarContext";
import { useContext } from "react";
import { Share } from "@capacitor/share";
import { APPLICATION_DOMAIN_URL } from "../../../../utils/util";
import { isNativeMobileApp } from "../../utils/capacitor";

const NewsDetailPage = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const { setShowTabs } = useContext<TabBarContextProps>(TabBarContext);
  const { data: articleData, isLoading: articleLoading } = useArticle(slug);

  const { isLoading: recentArticlesLoading, data: articles } =
    useRecentArticles();

  const globals = useGlobals();
  const newsShareURL = globals.data?.data.attributes.news_share_url;

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

  const shareURL = newsShareURL
    ? newsShareURL
    : article
    ? `${APPLICATION_DOMAIN_URL}/news/${article.attributes.slug}`
    : `${APPLICATION_DOMAIN_URL}/news`;

  const quote = article
    ? article.attributes.title
    : `Follow all the latest cricket updates at Cricfanatic.com`;

  const nativeAppShare = async () => {
    await Share.share({
      title: "🚀🔥 Cricfanatic latest news",
      text: `${quote}`,
      url: shareURL,
      dialogTitle: "🚀🔥 Cricfanatic latest news",
    });
  };

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
          <IonButtons slot="end">
            <IonButton onClick={isNativeMobileApp ? nativeAppShare : undefined}>
              <IonIcon slot="icon-only" icon={shareSocial}></IonIcon>
            </IonButton>
          </IonButtons>
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
