import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SinglePost from "./SinglePost";

import axios from "axios";
import { getUser } from "../api/authApi";
import { fetchOwnPost } from "../api/postApi";
import { backend_api, img_api } from "../config/config";
import { useTabContext } from "../context/TabProvider";
import Loader from "../utils/loading/Loading";
import BreathingPlaceholder from "./BreathingPlaceholderComp";
const ProfileComp = () => {
  const { isLogin, imageUrl, setImageUrl } = useTabContext();
  const [finaldata, setFinaldata] = useState({});
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    async function fetchposts() {
      if (isLogin) {
        const uid = localStorage.getItem("uid");
        const data = await fetchOwnPost(uid);
        console.log(data);
        
        setFinaldata(data);
      }
    }
    fetchposts();
  }, []);
  
  

  const [isUploading, setIsUploading] = useState(false);
  const [fname,setFname]= useState("")
  const [em,setEm]= useState("")
  useEffect(() => {
    async function a() {
      const uid = localStorage.getItem("uid");
     
        setLoading(true)
      const data = await getUser(uid);
      setIsUploading(true);
      if (data) {
        console.log(data.data);
        setFname(data.data?.fullname)
        setEm(data.data?.email)
        setImageUrl(`${img_api}/uploads/${data.data?.profilePicture}`);
        setIsUploading(false);
        setTimeout(() => {
          
          setLoading(false)
        }, 2000);
      }
    }
    a();
  }, [imageUrl]);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const userId = localStorage.getItem("uid");
    if (file && userId) {
      try {
        const formData = new FormData();
        formData.append("userId", userId); 
        formData.append("image", file); 

        const response = await axios.post(
          `${backend_api}/upload-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setImageUrl(`${img_api}${response.data?.imageUrl}`);
        console.log(
          "Uploaded Image URL:",
          `${img_api}${response.data?.imageUrl}`
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className=" p-3 mt-[80px] pt-[30px] col-span-1  w-[100%]  scrollbar-hide"
      >
        <div className="maincontent p-6 bg-[#fff] rounded-[20px] shadow-lg">
          <div className="topimg relative">
            <img
              className="rounded-[30px] w-full"
              src="/assets/images/cover.png"
              alt="Cover"
            />

            <div className="pro_pic shadow-[-4px_5px_23px_2px_rgba(139,_81,_253,_0.25)] absolute bg-teal-400 rounded-full w-40 h-40 -bottom-20 left-20 flex justify-center overflow-hidden items-center cursor-pointer">
              {isUploading ? <Loader /> : <img src={imageUrl} alt="" />}

              <label
                htmlFor="fileInput"
                className="absolute w-full h-full rounded-full"
              >
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div className="font-montserrat absolute -bottom-15 left-[280px]">
              {!loading? (
                <>
                
                <motion.h1
                  className="text-3xl font-bold"
                >
                  {fname}
                </motion.h1>
                 <motion.p className="text-gray-500 leading-5">
                 {em}
               </motion.p>
                </>
              ) : (
                <BreathingPlaceholder />
               )}
             
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

          <SinglePost />
        </div>
      </motion.div>
    </>
  );
};

export default ProfileComp;
