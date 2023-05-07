import { isNativeMobileApp } from "../components/Ionic/utils/capacitor";

export const NEWSPAGE_BASE_URL = isNativeMobileApp ? `newspage` : `news`;

export const SCHEDULEPAGE_BASE_URL = isNativeMobileApp
  ? `schedulepage`
  : `schedule`;

export const MATCHCENTER_PAGE_BASE_URL = isNativeMobileApp
  ? `matchcenterpage`
  : `matchcenter`;

export const VIDEOS_PAGE_BASE_URL = isNativeMobileApp ? `videospage` : `videos`;

export const REELS_PAGE_BASE_URL = isNativeMobileApp ? `reelvideos` : `reels`;
