import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../../utils/gtag";

const useWebAnalytics = () => {
  const router = useRouter();
  const path = router.asPath;
  useEffect(() => {
    try {
      gtag.pageview(path);
    } catch (err) {
      console.log(`Google Analytics: ${err}`);
    }
  }, [router]);
};

const WebAnalytics = () => {
  useWebAnalytics();
  return <></>;
};

export default WebAnalytics;
