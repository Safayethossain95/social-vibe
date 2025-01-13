/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("News Feed");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <TabContext.Provider value={{ activeTab, handleTabChange }}>
      {children}
    </TabContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTabContext = () => useContext(TabContext);
