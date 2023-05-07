import React, { createContext, useState } from "react";
import { isNativeMobileApp } from "../utils/capacitor";

export type NativeAppContextProps = {
  isNativeApp: boolean;
  setNativeApp: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NativeAppContext = createContext<NativeAppContextProps>({
  isNativeApp: false,
  setNativeApp: () => {},
});

export const NativeAppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isNativeApp, setNativeApp] = useState<boolean>(isNativeMobileApp);
  const stateVariables = {
    isNativeApp,
    setNativeApp,
  };

  return (
    <NativeAppContext.Provider value={stateVariables}>
      {children}
    </NativeAppContext.Provider>
  );
};

export default NativeAppContext;
