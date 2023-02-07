import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

// Should be passed down into componenets via context API (Not a good approach)

export const isNativeMobileApp = Capacitor.isNativePlatform();

// export const isNativeMobileApp = true;

export const hapticsImpactMedium = async () => {
  await Haptics.impact({ style: ImpactStyle.Medium });
};
