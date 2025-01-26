
import MainContent from "../Components/MainContent";
import Sidebar from "../Components/Sidebar";
import { tabsfr } from "../data";
import MyNavbar from "../Components/MyNavbar";
import { useEffect } from "react";
import { useTabContext } from "../context/TabProvider";

const Homepage = () => {
  const {setActiveTab} = useTabContext()
  useEffect(()=>{
    setActiveTab("News Feed")
  },[])
  return (
    <>
      <MyNavbar/>
      <div className="grid container gap-4  xl:grid-cols-[2.3fr_7.4fr_2.3fr] grid-cols-[3fr_9fr] lg:grid-cols-[2.3fr_7.4fr_2.3fr]">
        <Sidebar tabs={tabsfr} />
        <MainContent />
      </div>
    </>
  );
};

export default Homepage;
