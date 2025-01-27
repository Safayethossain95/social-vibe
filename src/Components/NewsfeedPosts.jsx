/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchOwnNewsfeed, fetchOwnPost } from "../api/postApi";
import { useTabContext } from "../context/TabProvider";
import Loading from "../utils/loading/Loading";
import { motion } from "framer-motion";
import { img_api } from "../config/config";
const NewsfeedPosts = ({load}) => {
  const [finaldata, setFinaldata] = useState({});
  const [loading, setLoading] = useState(false);  
  useEffect(() => {
    async function fetchposts() {
      console.log("without login")
      
        if(localStorage.getItem("islogin")){
          console.log("with login")
        const uid = localStorage.getItem("uid");
        setLoading(true)
        const data = await fetchOwnNewsfeed(uid);
        console.log(data);
        setLoading(false)
        setFinaldata(data);
        }
      
    }
    fetchposts();
  }, [load]);
  return (
    <>
    {
      loading ?
      // eslint-disable-next-line react/no-unknown-property
      <div className="flex items-center justify-center h-[50vh]">
        <div className=" w-[40px]">

        <Loading/>
        </div>

      </div>
      :
      localStorage.getItem("islogin")==true &&
     <motion.h2 initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }} className="text-2xl font-bold  mt-5">Posts</motion.h2>}
      {finaldata?.posts?.slice().reverse().map((item, key) => {
        return (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }} key={key} className="single-post p-4 mt-5 rounded-[20px] border-[#8C52FC] border">
              <div className="user-widget my-2 flex items-center space-x-4">
                <img
                  src={`${img_api}/uploads/${item?.profilePicture}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col justify-center">
                  <h1 className="font-bold text-md leading-3">
                    {item?.fullname}
                  </h1>
                  <p className="text-gray-500 leading-5">{item?.email}</p>
                </div>
              </div>
              <b className="block ">{item.subject}</b> 
              {item.text}
            </motion.div>
          </>
        );
      })
    }
    </>
  );
};

export default NewsfeedPosts;
