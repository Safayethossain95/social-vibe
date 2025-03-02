/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react";

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("News Feed");
  const [load, setLoad] = useState(false);
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setLoad(true);
  };
  const [isLogin, setIsLogin] = useState(false);
  const [userid, setUserId] = useState(null);
  const [profileinfo, setprofileinfo] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrlother, setImageUrlother] = useState("");
  const [reloadfollowers, setReloadfollowers] = useState(0);

  return (
    <TabContext.Provider
      value={{
        activeTab,
        handleTabChange,
        isLogin,
        setIsLogin,
        userid,
        setUserId,
        profileinfo,
        setprofileinfo,
        setActiveTab,
        imageUrl,
        setImageUrl,
        load,
        setLoad,
        reloadfollowers,
        setReloadfollowers,
        imageUrlother,
        setImageUrlother,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTabContext = () => useContext(TabContext);
