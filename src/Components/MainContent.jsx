import { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import RightSidebar from "./RightSidebar";
import { useTabContext } from "../context/TabProvider";

const MainContent = () => {
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
  const { activeTab } = useTabContext();
  return (
    <>
    {activeTab === "profile" && <div className="rounded-lg p-3 pt-[30px] col-span-1  w-[100%]  scrollbar-hide">
        <div className="maincontent  p-6    bg-[#fff]  rounded-lg shadow-lg">
          <div className="topimg relative">
            <img
              className="rounded-[30px] "
              src="/assets/images/cover.png"
              alt=""
            />
            <div className="pro_pic shadow-[-4px_5px_23px_2px_rgba(139,_81,_253,_0.25)] absolute bg-teal-400 rounded-full  w-40 h-40 -bottom-20 left-20 -mt-10 -ml-10">
              <img src="/assets/images/pro_pic.png" alt="" />
            </div>
            <div className="font-montserrat absolute -bottom-15 left-[220px]">
              <h1 className="text-3xl font-bold">Safayet Hossain</h1>
              <p>React Developer</p>
            </div>
          </div>
          <div className="posts mt-[100px] font-montserrat">
            <div className="profile-info mb-6"></div>
            <h2 className="text-2xl font-semibold">Profile Information</h2>
            <p className="mt-2">
              I am a web developer with two years of experience in designing web
              pages using front-end technologies such as HTML, CSS, JavaScript,
              and React. Additionally, I have six months of experience working
              with the MERN stack (MongoDB, Express.js, React, Node.js) to build
              full-stack web applications.
            </p>
          </div>
          <h2 className="text-2xl font-bold  mt-5">Posts</h2>
          <SinglePost />
          <SinglePost />
        </div>
      </div>}
      {activeTab === "settings" && <><div className="bg-gray-100 rounded-lg p-3 pt-[30px] col-span-1  w-[100%]  scrollbar-hide">Settings</div></>}
      

     <RightSidebar/>
    </>
  );
};

export default MainContent;
