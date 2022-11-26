import React, { createContext, useState } from "react";

type TabBarContextType = {
  showTabs: boolean;
  setShowTabs: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Context = createContext<TabBarContextType | undefined>(undefined);

export const TabBarProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [showTabs, setShowTabs] = useState(true);
  const stateVariables = {
    showTabs,
    setShowTabs,
  };
  return <Context.Provider value={stateVariables}>{children}</Context.Provider>;
};

export default Context;
