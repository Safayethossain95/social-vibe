/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("News Feed");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  const [isLogin, setIsLogin] = useState(false);
  const [userid,setUserId] = useState(null);
  const [profileinfo,setprofileinfo] = useState(null);
  const [user, setUser] = useState(null);

  // Check login status on app load
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("/api/auth/me", { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        setUser(null); // Not logged in
      }
    };
    checkLogin();
  }, []);
  return (
    <TabContext.Provider value={{ activeTab, handleTabChange ,isLogin, setIsLogin,userid,setUserId,profileinfo,setprofileinfo}}>
      {children}
    </TabContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTabContext = () => useContext(TabContext);
