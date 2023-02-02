import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

export const isNativeMobileApp = Capacitor.isNativePlatform();

// export const isNativeMobileApp = true;

export const hapticsImpactMedium = async () => {
  await Haptics.impact({ style: ImpactStyle.Medium });
};
