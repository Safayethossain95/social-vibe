/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useTabContext } from "../context/TabProvider";

const Sidebar = ({ tabs }) => {
  const [containerPadding, setContainerPadding] = useState(0);
  const { activeTab, handleTabChange } = useTabContext();
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
  
  return (
    <>
      <div className="sidebar w-full  pointer-events-none  p-4 rounded-lg">
        <div
          style={{
            width: `calc(2 / 12 * 100%)`, // 2.5fr based on a 12-column layout
            left: `${containerPadding}px`, // Adjusted to the container's right edge
          }}
          className="div min-w-[220px] max-w-[280px]  h-[calc(100vh-60px)]  fixed top-[30px]"
        >
          <ul className=" border bg-[#ffffff] w-full h-full p-2 rounded-[20px] pointer-events-auto">
            
            <img
              className="w-[100%] my-6 "
              src="/assets/images/logo.png"
              alt=""
            />

            {tabs.map((tab) => (
              <li
                key={tab.id}
                onClick={() =>  handleTabChange(tab.id)}
                className={`h-[48px] ps-[14px] flex items-center rounded-[16px] cursor-pointer hover:bg-[#8b52fc82]  duration-300 
                  ${activeTab === tab.id ? "bg-white font-bold" : ""}
                   `}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="div"></div>
      </div>
    </>
  );
};

export default Sidebar;
