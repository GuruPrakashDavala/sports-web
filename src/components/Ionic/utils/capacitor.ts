import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

// Should be passed down into componenets via context API (Not a good approach)

//! Option one should be used for app build process

// Option 1: For app build

export const isNativeMobileApp = Capacitor.isNativePlatform();

// Option 2: Only for localhost development purpose

// export const isNativeMobileApp = true;

export const hapticsImpactMedium = async () => {
  await Haptics.impact({ style: ImpactStyle.Medium });
};

export const hapticsImpactLight = async () => {
  await Haptics.impact({ style: ImpactStyle.Light });
};
