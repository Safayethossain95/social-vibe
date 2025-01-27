/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useTabContext } from "../context/TabProvider";
import { getFollowers, getFollowing } from "../api/postApi";
import { img_api } from "../config/config";

const Sidebar = ({ tabs }) => {
  const [containerPadding, setContainerPadding] = useState(0);
  const { activeTab,setActiveTab, handleTabChange ,reloadfollowers } = useTabContext();
  useEffect(() => {
    // Dynamically calculate the container's padding
    const updatePadding = () => {
      const screenWidth = window.innerWidth;
      const containerWidth =
        screenWidth >= 1283 && screenWidth < 1600
          ? 1283
          : screenWidth >= 1600
          ? 1600
          : screenWidth;
      setContainerPadding((screenWidth - containerWidth) / 2);
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, []);

  const [mydata,setMydata] = useState([])
  const getfollowersbyid=async()=>{
    const data = await getFollowers(localStorage.getItem("uid"))
    setMydata(data.data?.followers)
    console.log("dt",data.data)
  }
  useEffect(()=>{
    getfollowersbyid()
  },[reloadfollowers])
  const [mydataf,setMydataf] = useState([])
  const getfollowingsbyid=async()=>{
    const data = await getFollowing(localStorage.getItem("uid"))
    setMydataf(data.data?.following)
    console.log("dt",data.data)
  }
  useEffect(()=>{
    getfollowingsbyid()
  },[reloadfollowers])

  const handlefollowersingle=(item)=>{
    console.log(item)
    setActiveTab("othersprofile");
    localStorage.setItem("otheruid",item._id)
  }
  
  return (
    <>
      <div className="sidebar w-full    p-4 rounded-lg">
        <div
          style={{
            width: `calc(2 / 12 * 100%)`, // 2.5fr based on a 12-column layout
            left: `${containerPadding}px`, // Adjusted to the container's right edge
          }}
          className="div min-w-[220px] max-w-[280px]  h-[calc(100vh-130px)]  border bg-[#ffffff] w-full  p-2 rounded-[20px] fixed top-[100px]"
        >
          <ul className=" pointer-events-auto">
            
            

            {tabs.map((tab) => (
              <li
                key={tab.id}
                onClick={() =>  handleTabChange(tab.id)}
                className={`h-[48px] ps-[14px] flex items-center rounded-[16px] cursor-pointer hover:bg-[#8C52FC] my-1 duration-300 
                  ${activeTab === tab.id ? "text-white font-bold bg-[#8C52FC]" : ""} 
                   `}
              >
                {tab.label}
              </li>
            ))}
          </ul>
          <div className="div">
            <h3 className="text-[15px] p-4 font-bold border-b border-gray-200 mb-6">Followers</h3>
         {
          mydata?.map((item,key)=>{
            return(
              <>
              <div key={key} onClick={()=>handlefollowersingle(item)} className="user-widget my-2">
            <div className="flex items-center space-x-4">
            <img
              src={`${img_api}/uploads/${item?.profilePicture}`}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-md leading-3">{item.fullname}</h1>
              <p className="text-gray-500 leading-5">{item.email}</p>
            </div>
            </div>
          </div>
              </>
            )
          })
         }
        </div>
          <div className="div">
            <h3 className="text-[15px] p-4 font-bold border-b border-gray-200 mb-6">Following</h3>
         {
          mydataf?.map((item,key)=>{
            return(
              <>
              <div key={key} className="user-widget my-2">
            <div className="flex items-center space-x-4">
            <img
              src={`${img_api}/uploads/${item?.profilePicture}`}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-md leading-3">{item.fullname}</h1>
              <p className="text-gray-500 leading-5">{item.email}</p>
            </div>
            </div>
          </div>
              </>
            )
          })
         }
        </div>
         
        
        </div>
       
      </div>
    </>
  );
};

export default Sidebar;
