import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from "@ionic/react";
import { useContext, useEffect, useCallback } from "react";
import { home, calendar, newspaper, analytics, list } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import IonNewsPage from "../Pages/newspage";
import IonHomePage from "../Pages";
import NewsDetailPage from "../Pages/newspage/NewsDetailPage";
import MatchDetailPage from "../Pages/matchcenter/MatchDetailPage";
import StadingsPage from "../Pages/standings";
import Matchcenter from "../Pages/matchcenter";
import SchedulePage from "../Pages/schedule";
import { setupIonicReact } from "@ionic/react";
import TabBarContext, { TabBarContextProps } from "../contexts/tabBarContext";
import { hapticsImpactMedium } from "../utils/capacitor";
import { Network } from "@capacitor/network";
import More from "../Pages/more";
import MobileAnalytics from "../../GoogleAnalytics/MobileAnalytics";

setupIonicReact();

const NativeAppShell = () => {
  console.log("This is an Ionic native app");
  console.log("Nativeapp shell");

  const { showTabs } = useContext<TabBarContextProps>(TabBarContext);
  const tabBarStyles = showTabs ? undefined : { display: "none" };

  const logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
    if (!status.connected) {
      alert("Oops seems like your device network is disconnected!");
    }
  };

  const networkStatusChanged = useCallback((status: any) => {
    if (!status.connected) {
      alert("Oops seems like your device network is disconnected!");
    }
  }, []);

  useEffect(() => {
    logCurrentNetworkStatus();
    Network.addListener("networkStatusChange", networkStatusChanged);
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <MobileAnalytics />
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <IonHomePage />
            </Route>

            <Route exact path="/newspage">
              <IonNewsPage />
            </Route>

            <Route path="/newspage/:slug">
              <NewsDetailPage />
            </Route>

            <Route exact path="/matchcenterpage">
              <Matchcenter />
            </Route>

            <Route exact path="/matchcenterpage/:fixtureId/:teams">
              <MatchDetailPage />
            </Route>

            <Route exact path="/schedulepage">
              <SchedulePage />
            </Route>

            <Route exact path="/standings">
              <StadingsPage />
            </Route>

            <Route exact path="/more">
              <More />
            </Route>

            <Redirect exact path="/" to="/home" />
          </IonRouterOutlet>

          <IonTabBar
            slot="bottom"
            className="ion-tab-bar-styles"
            style={tabBarStyles}
          >
            <IonTabButton tab="tab1" href="/home" onClick={hapticsImpactMedium}>
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton
              tab="tab2"
              href="/schedulepage"
              onClick={hapticsImpactMedium}
            >
              <IonIcon icon={calendar} />
              <IonLabel>Fixtures</IonLabel>
            </IonTabButton>

            <IonTabButton
              tab="tab3"
              href="/newspage"
              onClick={hapticsImpactMedium}
            >
              <IonIcon icon={newspaper} />
              <IonLabel>News</IonLabel>
            </IonTabButton>

            <IonTabButton
              tab="tab4"
              href="/standings"
              onClick={hapticsImpactMedium}
            >
              <IonIcon icon={analytics} />
              <IonLabel>Standings</IonLabel>
            </IonTabButton>

            {/* <IonTabButton tab="tab5" href="/more" onClick={hapticsImpactMedium}>
              <IonIcon icon={list} />
              <IonLabel>More</IonLabel>
            </IonTabButton> */}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default NativeAppShell;
