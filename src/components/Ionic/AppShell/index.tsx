import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  TabsCustomEvent,
  IonAlert,
} from "@ionic/react";
import { useContext, useEffect, useCallback, useRef, useState } from "react";
import {
  home,
  calendar,
  newspaper,
  caretForwardCircle,
  analytics,
} from "ionicons/icons";
import { setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import IonNewsPage from "../Pages/newspage";
import IonHomePage from "../Pages";
import NewsDetailPage from "../Pages/newspage/NewsDetailPage";
import MatchDetailPage from "../Pages/matchcenter/MatchDetailPage";
import StadingsPage from "../Pages/standings";
import Matchcenter from "../Pages/matchcenter";
import SchedulePage from "../Pages/schedule";
import TabBarContext, { TabBarContextProps } from "../contexts/tabBarContext";
import { hapticsImpactLight, isNativeMobileApp } from "../utils/capacitor";
import { Network } from "@capacitor/network";
import More from "../Pages/more";
import MobileAnalytics from "../../GoogleAnalytics/MobileAnalytics";
import PushNotificationsContainer from "../utils/pushNotifications";
import { useGlobals } from "../../../utils/queries";
import {
  getUserRatingForApp,
  performImmediateUpdate,
  setUserRatingPreferences,
} from "../../../utils/ionicUtils";
import { CarouselContext } from "../contexts/carouselRefContext";
import VideosPage from "../Pages/videos";
import VideoDetailPage from "../Pages/videos/VideoDetailPage";
import ReelVideos from "../Pages/reelvideos";

setupIonicReact();

const NativeAppShell = () => {
  const { showTabs } = useContext<TabBarContextProps>(TabBarContext);
  const tabBarStyles = showTabs ? undefined : { display: "none" };
  const { data: globals } = useGlobals();
  const showStandings =
    globals?.data.attributes.Mobile_App_Settings?.show_standings_page;

  const showVideosPage =
    globals?.data.attributes.Mobile_App_Settings?.show_videos_page;

  const [isOpen, setIsOpen] = useState(false);

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

  // Below useEffect runs only once in the app journey lifecycle
  useEffect(() => {
    logCurrentNetworkStatus();
    Network.addListener("networkStatusChange", networkStatusChanged);

    // App update and App rating code
    //! This must be enabled for mobile build

    performImmediateUpdate();
    if (isNativeMobileApp) {
      getUserRatingForApp(setIsOpen);
    }
  }, []);

  const [carouselUpdate, setCarouselUpdate] = useState<number>(0);
  const carouselRef = { carouselUpdate, setCarouselUpdate };

  const tabOneRef = useRef<HTMLIonContentElement | null>(null);
  const tabTwoRef = useRef<HTMLIonContentElement | null>(null);
  const tabThreeRef = useRef<HTMLIonContentElement | null>(null);
  const tabFourRef = useRef<HTMLIonContentElement | null>(null);
  const tabFiveRef = useRef<HTMLIonContentElement | null>(null);

  const handleTabDidChange = (event: TabsCustomEvent) => {
    setTimeout(() => {
      if (event.detail.tab === "tab1" && tabOneRef) {
        tabOneRef.current && tabOneRef.current.scrollToTop();
        setCarouselUpdate((prev) => prev + 1);
      }

      if (event.detail.tab === "tab2" && tabTwoRef) {
        tabTwoRef.current && tabTwoRef.current.scrollToTop();
      }

      if (event.detail.tab === "tab3" && tabThreeRef) {
        tabThreeRef.current && tabThreeRef.current.scrollToTop();
      }

      if (event.detail.tab === "tab4" && tabFourRef) {
        tabFourRef.current && tabFourRef.current.scrollToTop();
      }

      if (event.detail.tab === "tab5" && tabFiveRef) {
        tabFiveRef.current && tabFiveRef.current.scrollToTop();
      }
    }, 50);
  };

  return (
    <CarouselContext.Provider value={carouselRef}>
      <IonApp>
        <IonAlert
          isOpen={isOpen}
          header="Rate our app"
          message="If you enjoy using this app, would you mind taking a moment to rate it? It won't take more than a minute. Thank you for your support!"
          buttons={[
            {
              text: "RATE IT NOW",
              role: "confirm",
              handler: () => {
                setUserRatingPreferences("yes", setIsOpen);
              },
            },
            {
              text: "No, Thanks",
              role: "cancel",
              handler: () => {
                setUserRatingPreferences("no", setIsOpen);
              },
            },
            {
              text: "REMIND ME LATER",
              role: "remindlater",
              handler: () => {
                setUserRatingPreferences("no", setIsOpen);
              },
            },
          ]}
          onDidDismiss={() => setIsOpen(false)}
          backdropDismiss={true}
        ></IonAlert>

        <IonReactRouter>
          <PushNotificationsContainer />
          <MobileAnalytics />
          <IonTabs onIonTabsDidChange={handleTabDidChange}>
            <IonRouterOutlet>
              <Route exact path="/home">
                <IonHomePage contentRef={tabOneRef} globals={globals} />
              </Route>

              <Route exact path="/schedulepage">
                <SchedulePage contentRef={tabTwoRef} homeRef={tabOneRef} />
              </Route>

              {/* <Route exact path="/socials">
                <Socials contentRef={tabThreeRef} homeRef={tabOneRef} />
              </Route> */}

              <Route exact path="/videospage">
                <VideosPage contentRef={tabThreeRef} homeRef={tabOneRef} />
              </Route>

              <Route path="/videospage/:slug">
                <VideoDetailPage />
              </Route>

              <Route path="/reelvideos/:slug">
                <ReelVideos />
              </Route>

              <Route exact path="/newspage">
                <IonNewsPage contentRef={tabFourRef} homeRef={tabOneRef} />
              </Route>

              <Route path="/newspage/:slug">
                <NewsDetailPage />
              </Route>

              <Route exact path="/standings">
                <StadingsPage contentRef={tabFiveRef} homeRef={tabOneRef} />
              </Route>

              <Route exact path="/matchcenterpage">
                <Matchcenter />
              </Route>

              <Route exact path="/matchcenterpage/:fixtureId/:teams">
                <MatchDetailPage />
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
              <IonTabButton
                tab="tab1"
                href="/home"
                onClick={hapticsImpactLight}
              >
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>

              <IonTabButton
                tab="tab2"
                href="/schedulepage"
                onClick={hapticsImpactLight}
              >
                <IonIcon icon={calendar} />
                <IonLabel>Fixtures</IonLabel>
              </IonTabButton>

              {/* <IonTabButton
                tab="tab3"
                href="/socials"
                onClick={hapticsImpactLight}
              >
                <IonIcon icon={flame} />
                <IonLabel>Trending</IonLabel>
              </IonTabButton> */}

              {showVideosPage && (
                <IonTabButton
                  tab="tab3"
                  href="/videospage"
                  onClick={hapticsImpactLight}
                >
                  <IonIcon icon={caretForwardCircle} />
                  <IonLabel>Videos</IonLabel>
                </IonTabButton>
              )}

              <IonTabButton
                tab="tab4"
                href="/newspage"
                onClick={hapticsImpactLight}
              >
                <IonIcon icon={newspaper} />
                <IonLabel>News</IonLabel>
              </IonTabButton>

              {showStandings && (
                <IonTabButton
                  tab="tab5"
                  href="/standings"
                  onClick={hapticsImpactLight}
                >
                  <IonIcon icon={analytics} />
                  <IonLabel>Standings</IonLabel>
                </IonTabButton>
              )}
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </CarouselContext.Provider>
  );
};

export default NativeAppShell;
