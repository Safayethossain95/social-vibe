/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";


const RightSidebar = () => {
    const [containerPadding, setContainerPadding] = useState(0);
    
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
     <div className="container relative">
        <div
          style={{
            width: `calc(2 / 12 * 100%)`, // 2.5fr based on a 12-column layout
            right: `${containerPadding}px`, // Adjusted to the container's right edge
          }}
          className="bg-white min-w-[220px] max-w-[280px] p-4 mt-[30px] hidden lg:block fixed  h-[calc(100vh-60px)]     right-0  rounded-[24px] flex-col lg-flex-row"
        >
          <h1 className="text-xl font-bold">Followers</h1>

          <div className="user-widget my-2 flex items-center space-x-4">
            <img
              src="/assets/images/pro_pic.png"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-md leading-3">Safa hossain</h1>
              <p className="text-gray-500 leading-5">React Developer</p>
            </div>
          </div>
          <div className="user-widget my-2 flex items-center space-x-4">
            <img
              src="/assets/images/rafayat.png"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-md leading-3">Rafayat Rakib</h1>
              <p className="text-gray-500 leading-5">Video Editor</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RightSidebar