/** @jsxImportSource theme-ui */

import { useCallback, Fragment, MutableRefObject } from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  useIonViewDidEnter,
  useIonViewDidLeave,
} from "@ionic/react";
import SectionHeading from "../../../SectionHeading";
import { Standings } from "../../../Standings/StandingsTable/Standings";
import SectionWrapper from "../../../Wrappers/SectionWrapper";
import { useStandingsDefinedInCMS } from "../../../../utils/queries";
import PageLoader from "../../../Loaders/PageLoader/PageLoader";
import { useHistory } from "react-router";
import Head from "next/head";

type IonStandingsPageProps = {
  contentRef: MutableRefObject<HTMLIonContentElement | null>;
  homeRef?: MutableRefObject<HTMLIonContentElement | null>;
};

const StadingsPage = (props: IonStandingsPageProps) => {
  const { contentRef, homeRef } = props;
  const history = useHistory();

  const ionBackButton = useCallback((ev: any) => {
    ev.detail.register(10, () => {
      history.replace(`/home`);
      setTimeout(() => {
        if (homeRef) {
          homeRef.current && homeRef.current.scrollToTop(300);
        }
      }, 50);
    });
  }, []);

  useIonViewDidEnter(() => {
    document.addEventListener("ionBackButton", ionBackButton);
  });

  useIonViewDidLeave(() => {
    document.removeEventListener("ionBackButton", ionBackButton);
  });

  const { data: standingsDefinedInCMS, isLoading: standingsListLoading } =
    useStandingsDefinedInCMS();

  const standings = !standingsListLoading
    ? standingsDefinedInCMS?.data.attributes.standings
    : undefined;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-toolbar-color">
          <IonTitle>Standings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollEvents={true} ref={contentRef} fullscreen>
        <Head>
          <title>{`Standings page`}</title>
          <meta
            name="description"
            content="Cricfanatic superfast cricket news"
          />
        </Head>

        {standings ? (
          <Fragment>
            <SectionWrapper>
              {standings.map((standing, index) => {
                return (
                  <Fragment key={standing.seriesId}>
                    <SectionHeading
                      title={standing.seriesName}
                      styles={{ paddingX: 0, paddingTop: index > 0 ? 4 : 0 }}
                    />
                    <Standings stageId={standing.seriesId} />
                  </Fragment>
                );
              })}
            </SectionWrapper>
          </Fragment>
        ) : (
          <PageLoader />
        )}
      </IonContent>
    </IonPage>
  );
};

export default StadingsPage;
