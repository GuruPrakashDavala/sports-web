import { useEffect } from "react";
import { useLocation } from "react-router";
import * as gtag from "../../utils/gtag";

const useMobileAnalytics = () => {
  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {
    try {
      gtag.pageview(path);
    } catch (err) {
      console.log(`Google Analytics: ${err}`);
    }
  }, [location]);
};

const MobileAnalytics = () => {
  useMobileAnalytics();
  return <></>;
};

export default MobileAnalytics;
