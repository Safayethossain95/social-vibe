/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchOwnPost } from "../api/postApi";
import { useTabContext } from "../context/TabProvider";
import { img_api } from "../config/config";
import { motion } from "framer-motion";
import Loader from "../utils/loading/Loading";
const SinglePost = () => {
  const { isLogin } = useTabContext();
  const [finaldata, setFinaldata] = useState({});
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    async function fetchposts() {
      if (isLogin) {
        const uid = localStorage.getItem("uid");
        setLoading(true)
        const data = await fetchOwnPost(uid);
        setLoading(false)
        console.log(data);
        setFinaldata(data);
      } 
    }
    fetchposts();
  }, []);
  return (
    <>
       {
      loading ?
      // eslint-disable-next-line react/no-unknown-property
      <div className="flex items-center justify-center h-[50vh]">
        <div className=" w-[40px]">

        <Loader/>
        </div>

      </div>
      :
    <>
    {isLogin && <motion.h2 initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }} className="text-2xl font-bold  mt-5">Your Posts</motion.h2>}
      {finaldata?.posts?.map((item, key) => {
        return (
          <>
         
            <div key={key} className="single-post p-4 mt-5 rounded-[20px] border-[#8C52FC] border ">
              <div className="user-widget my-2 flex items-center space-x-4">
                <img
                  src={`${img_api}/uploads/${finaldata?.user?.profilePicture}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col justify-center">
                  <h1 className="font-bold text-md leading-3">
                    {finaldata?.user?.fullname}
                  </h1>
                  <p className="text-gray-500 leading-5">{finaldata?.user?.email}</p>
                </div>
              </div>
              <b className="block ">{item.subject}</b>
              {item.text}
            </div>
          </>
        );
      })}
    </>
       }
    </>
  );
};

export default SinglePost;
