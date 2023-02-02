/** @jsxImportSource theme-ui */

import { useCallback, Fragment } from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  useIonViewDidEnter,
  useIonViewWillLeave,
  IonCard,
  IonCardHeader,
  IonImg,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import SectionHeading from "../../../SectionHeading";
import { Standings } from "../../../Standings/StandingsTable/Standings";
import SectionWrapper from "../../../Wrappers/SectionWrapper";
import { App } from "@capacitor/app";
import { useStandingsDefinedInCMS } from "../../../../utils/queries";
import Carousel, { CarouselItem } from "../../../Carousel";
import { ColorTheme } from "../../../../types/modifier";
import { colors } from "../../../../styles/theme";
import { Link } from "react-router-dom";

const StadingsPage = () => {
  const ionBackButton = useCallback(() => {
    App.exitApp();
  }, []);

  useIonViewDidEnter(() => {
    document.addEventListener("ionBackButton", ionBackButton);
  });

  useIonViewWillLeave(() => {
    document.removeEventListener("ionBackButton", ionBackButton);
  });

  const { data: standingsDefinedInCMS, isLoading: standingsListLoading } =
    useStandingsDefinedInCMS();

  const standings = !standingsListLoading
    ? standingsDefinedInCMS?.data.attributes.standings
    : undefined;

  console.log("standingsDetailsFromCMS");
  console.log(standings);

  const array = [1, 2, 3, 4, 5];

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }

  const carouselItems: CarouselItem[] = array.map((value, index) => {
    return {
      content: (
        <div sx={{ padding: "10px", height: "100%" }}>
          <IonCard
            routerLink="/newspage/ipl-2023-best-unsold-xi-from-the-auction"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              boxShadow: "none",
              borderBottom: "1px solid",
              borderBottomColor: "rgba(12, 12, 12, 0.17)",
              backgroundColor: "#F6F6F6",
              margin: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            {/* <img
            alt="Silhouette of mountains"
            src="https://material.angular.io/assets/img/examples/shiba2.jpg"
          /> */}
            <IonImg
              src={
                index % 2 === 0
                  ? "https://docs-demo.ionic.io/assets/madison.jpg"
                  : "https://material.angular.io/assets/img/examples/shiba2.jpg"
              }
              alt="The Wisconsin State Capitol building in Madison, WI at night"
              style={{
                height: "130px",
                maxWidth: "100%",
                objectFit: "cover",
              }}
            ></IonImg>

            <IonCardHeader
              style={{
                paddingLeft: 0,
                paddingTop: "15px",
                paddingBottom: "15px",
              }}
            >
              <div sx={{ display: "flex", flexDirection: "column" }}>
                <h2
                  sx={{
                    variant: "text.heading5",
                    color: colors.black,
                  }}
                >
                  A bug is becoming a meme on the internet
                </h2>

                <p
                  sx={{
                    variant: "text.subheading4",
                    color: colors.black,
                    paddingTop: 1,
                  }}
                >
                  Trending
                </p>

                <p
                  sx={{
                    variant: "text.label2",
                    color: colors.black,
                    paddingTop: "5px",
                  }}
                >
                  15th November 2022
                </p>
              </div>
            </IonCardHeader>

            {/* <IonCardContent>
            Heres a small text description for the card content. Nothing more
            nothing less
          </IonCardContent> */}
          </IonCard>
        </div>
      ),
    };
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-toolbar-color">
          <IonTitle>Standings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher> */}

        <SectionWrapper theme={ColorTheme.GRAY}>
          {standings &&
            standings.map((standing, index) => {
              return (
                <Fragment key={standing.id}>
                  <SectionHeading
                    title={standing.seriesName}
                    styles={{ paddingX: 0, paddingTop: index > 0 ? 4 : 0 }}
                  />

                  <Carousel
                    swiperId={`carousel`}
                    items={carouselItems}
                    styles={{ gap: [1] }}
                  />

                  <Standings stageId={standing.seriesId} />
                </Fragment>
              );
            })}
        </SectionWrapper>
      </IonContent>
    </IonPage>
  );
};

export default StadingsPage;
