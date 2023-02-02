import React, { createContext, useState } from "react";

export type TabBarContextProps = {
  showTabs: boolean;
  setShowTabs: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TabBarContext = createContext<TabBarContextProps>({
  showTabs: true,
  setShowTabs: () => {},
});

export const TabBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [showTabs, setShowTabs] = useState<boolean>(true);
  const stateVariables = {
    showTabs,
    setShowTabs,
  };

  return (
    <TabBarContext.Provider value={stateVariables}>
      {children}
    </TabBarContext.Provider>
  );
};

export default TabBarContext;
