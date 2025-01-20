/* eslint-disable no-unused-vars */
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTabContext } from "../context/TabProvider";
import RightSidebar from "./RightSidebar";
import SinglePost from "./SinglePost";
import toast,{Toaster} from 'react-hot-toast';
import { createPost, fetchOwnPost } from "../api/postApi";
import ProfileComp from "./ProfileComp";
import NewsfeedPosts from "./NewsfeedPosts";
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
  const { activeTab, profileinfo, isLogin, setIsLogin } = useTabContext();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    localStorage.setItem("profileinfo", JSON.stringify(profileinfo));
    const pro_info = JSON.parse(localStorage.getItem("profileinfo"));
    console.log(pro_info);
    setImageUrl(pro_info?.profilePicture);
  }, [profileinfo]);
  
  const handlePost = async (e) => {
    e.preventDefault();
    const formData = {
      userId: profileinfo?._id,
      subject: e.target.subject.value,
      text: e.target.text.value,
    };
    console.log(formData);
   
    if(isLogin){

      const data = await createPost(formData)
      console.log(data)
      toast.success("Post created successfully")
    }else{
      
      toast.error("Must login first")
    }
  };

  return (
    <>
     
      {activeTab === "profile" && (
        <ProfileComp/>
      )}
      {activeTab === "News Feed" && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[20px] p-3 mt-[100px] col-span-1  w-[100%]  scrollbar-hide"
          >
            <div>
              <form onSubmit={handlePost}>
                <input
                  className="outline-none p-3 h-[40px] w-full border-[#8C52FC] border mb-3  rounded-[20px]"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                />
                <textarea
                  type="text"
                  name="text"
                  placeholder="write something"
                  className="outline-none p-3 h-[150px] w-full border-[#8C52FC] border  rounded-[20px]"
                />
                <div className="flex flex-end">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-[#8C52FC] hover:bg-[#7A43E1] rounded-md shadow-md transition duration-300 ml-auto inline-block"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>

            

            <NewsfeedPosts />
            
          </motion.div>
        </>
      )}

      <RightSidebar />
    </>
  );
};

export default MainContent;
