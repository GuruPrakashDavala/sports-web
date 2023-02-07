/** @jsxImportSource theme-ui */

import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
} from "@ionic/react";
import {
  home,
  calendar,
  newspaper,
  analytics,
  list,
  gift,
} from "ionicons/icons";
import { colors } from "../../../../styles/theme";

const More = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-toolbar-color">
          <IonTitle>More</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          <IonItem routerLink="/newspage" lines="full">
            <IonIcon icon={newspaper} slot="start"></IonIcon>
            <IonLabel>News</IonLabel>
          </IonItem>

          <IonItem routerLink="/schedulepage" lines="full">
            <IonIcon icon={calendar} slot="start"></IonIcon>
            <IonLabel>Fixtures</IonLabel>
          </IonItem>

          <IonItem href="https://fanwicket.myshopify.com/" lines="full">
            <IonIcon icon={gift} slot="start"></IonIcon>
            <IonLabel>Shop</IonLabel>
          </IonItem>

          <IonItem routerLink="/standings" lines="full">
            <IonIcon icon={analytics} slot="start"></IonIcon>
            <IonLabel>Standings</IonLabel>
          </IonItem>
        </IonList>

        <div sx={{ padding: 2, background: colors.gray300 }}></div>

        <IonList>
          <IonItem routerLink="/newspage" lines="full">
            <IonIcon icon={newspaper} slot="start"></IonIcon>
            <IonLabel>News</IonLabel>
          </IonItem>

          <IonItem routerLink="/schedulepage" lines="full">
            <IonIcon icon={calendar} slot="start"></IonIcon>
            <IonLabel>Fixtures</IonLabel>
          </IonItem>

          <IonItem href="https://fanwicket.myshopify.com/" lines="full">
            <IonIcon icon={gift} slot="start"></IonIcon>
            <IonLabel>Shop</IonLabel>
          </IonItem>

          <IonItem routerLink="/standings" lines="full">
            <IonIcon icon={analytics} slot="start"></IonIcon>
            <IonLabel>Standings</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default More;
