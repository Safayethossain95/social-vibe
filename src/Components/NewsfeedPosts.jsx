/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchOwnNewsfeed, fetchOwnPost } from "../api/postApi";
import { useTabContext } from "../context/TabProvider";

const NewsfeedPosts = () => {
  const { isLogin } = useTabContext();
  const [finaldata, setFinaldata] = useState({});
  useEffect(() => {
    async function fetchposts() {
      if (isLogin) {
        const uid = localStorage.getItem("uid");
        const data = await fetchOwnNewsfeed(uid);
        console.log(data);
        setFinaldata(data);
      } 
    }
    fetchposts();
  }, []);
  return (
    <>
      {finaldata?.posts?.map((item, key) => {
        return (
          <>
            <div key={key} className="single-post p-4 mt-5 rounded-[20px] border-[#8C52FC] border ">
              <div className="user-widget my-2 flex items-center space-x-4">
                <img
                  src={item?.profilePicture}
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
              <b className="block ">{item.subject}</b> <br></br>
              {item.text}
            </div>
          </>
        );
      })}
    </>
  );
};

export default NewsfeedPosts;
