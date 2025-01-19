/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react";

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("News Feed");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  const [isLogin, setIsLogin] = useState(false);
  const [userid,setUserId] = useState(null);
  const [profileinfo,setprofileinfo] = useState(null);
 

  // Check login status on app load
 
  return (
    <TabContext.Provider value={{ activeTab, handleTabChange ,isLogin, setIsLogin,userid,setUserId,profileinfo,setprofileinfo,setActiveTab}}>
      {children}
    </TabContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTabContext = () => useContext(TabContext);
