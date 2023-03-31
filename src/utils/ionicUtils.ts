import { Preferences } from "@capacitor/preferences";
import { AppUpdate } from "@capawesome/capacitor-app-update";
import { AppUpdateAvailability } from "@capawesome/capacitor-app-update/dist/esm/definitions";

const preferencesKey = "appRatingDetails";

const openAppStore = async () => {
  await AppUpdate.openAppStore();
};

export const getUserRatingForApp = async (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { value } = await Preferences.get({ key: preferencesKey });
  if (value) {
    const { appOpenNumber, isAppRated } = JSON.parse(value);
    if (appOpenNumber % 15 === 0 && appOpenNumber < 50 && !isAppRated) {
      setIsOpen(true);
      return;
    }

    if (!isAppRated && appOpenNumber < 50) {
      const appRatingDetails = {
        appOpenNumber: appOpenNumber + 1,
        isAppRated: false,
      };

      await Preferences.set({
        key: preferencesKey,
        value: JSON.stringify(appRatingDetails),
      });
    }
  } else {
    const value = {
      appOpenNumber: 1,
      isAppRated: false,
    };
    await Preferences.set({
      key: preferencesKey,
      value: JSON.stringify(value),
    });
  }
};

export const setUserRatingPreferences = async (
  message: string,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  switch (message) {
    case "yes": {
      const { value } = await Preferences.get({ key: preferencesKey });
      setIsOpen(false);
      if (value) {
        const { appOpenNumber } = JSON.parse(value);
        const appRatingDetails = {
          appOpenNumber: appOpenNumber,
          isAppRated: true,
        };
        await Preferences.set({
          key: preferencesKey,
          value: JSON.stringify(appRatingDetails),
        });
        openAppStore();
      }
      return;
    }
    case "no": {
      const { value } = await Preferences.get({ key: preferencesKey });
      setIsOpen(false);
      if (value) {
        const { appOpenNumber } = JSON.parse(value);
        const appRatingDetails = {
          appOpenNumber: appOpenNumber + 1,
          isAppRated: false,
        };
        await Preferences.set({
          key: preferencesKey,
          value: JSON.stringify(appRatingDetails),
        });
      }
      return;
    }
  }
};

export const performImmediateUpdate = async () => {
  const result = await AppUpdate.getAppUpdateInfo();
  if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
    return;
  }
  if (result.immediateUpdateAllowed) {
    await AppUpdate.performImmediateUpdate();
  }
};
