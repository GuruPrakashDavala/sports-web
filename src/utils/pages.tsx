import { isNativeMobileApp } from "../components/Ionic/utils/capacitor";

export const newspageBaseURL = isNativeMobileApp ? `newspage` : `news`;

export const schedulepageBaseURL = isNativeMobileApp
  ? `schedulepage`
  : `schedule`;

export const matchcenterPageBaseURL = isNativeMobileApp
  ? `matchcenterpage`
  : `matchcenter`;
