import { useEffect, useState } from 'react'
import SinglePost from './SinglePost'
import { motion } from "framer-motion";
import axios from 'axios';
import { useTabContext } from '../context/TabProvider';
import { fetchOwnPost } from '../api/postApi';
const ProfileComp = () => {
     const { isLogin, profileinfo, } = useTabContext();
      const [finaldata, setFinaldata] = useState({});
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
    const [imageUrl, setImageUrl] = useState("");
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        if (!selectedFile) {
          return alert("Please select an image first!");
        }
    
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "cloudinaryimg");
        formData.append("cloud_name", "dahrqm9pr");
    
        try {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dahrqm9pr/image/upload",
            formData
          );
          console.log(response.data.url);
    
          setImageUrl(response.data.url);
          alert("Image uploaded successfully!");
        } catch (error) {
          console.error("Upload error:", error);
          alert("Failed to upload image. Please try again.");
        }
      };
      
  useEffect(() => {
    localStorage.setItem("profileinfo", JSON.stringify(profileinfo));
    const pro_info = JSON.parse(localStorage.getItem("profileinfo"));
    console.log(pro_info);
    setImageUrl(pro_info?.profilePicture);
  }, [profileinfo]);
  return (
    <>
    <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className=" p-3 mt-[80px] pt-[30px] col-span-1  w-[100%]  scrollbar-hide"
        >
          <div className="maincontent  p-6    bg-[#fff]  rounded-[20px] shadow-lg">
            <div className="topimg relative">
              <img
                className="rounded-[30px] w-full"
                src="/assets/images/cover.png"
                alt="Cover"
              />

              <div className="pro_pic shadow-[-4px_5px_23px_2px_rgba(139,_81,_253,_0.25)] absolute bg-teal-400 rounded-full w-40 h-40 -bottom-20 left-20 flex justify-center overflow-hidden items-center cursor-pointer">
                {/* AdvancedImage Component */}
                <img src={imageUrl} alt="" />

                {/* Hidden File Input */}
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
                <h1 className="text-3xl font-bold">{finaldata?.user?.fullname}</h1>
                <p className="text-gray-500 leading-5">{finaldata?.user?.email}</p>
              </div>
            </div>

            <div className="posts mt-[100px] font-montserrat">
              <div className="profile-info mb-6"></div>
              <h2 className="text-2xl font-semibold">Profile Information</h2>
              <p className="mt-2">
                I am a web developer with two years of experience in designing
                web pages using front-end technologies such as HTML, CSS,
                JavaScript, and React. Additionally, I have six months of
                experience working with the MERN stack (MongoDB, Express.js,
                React, Node.js) to build full-stack web applications.
              </p>
            </div>
            <h2 className="text-2xl font-bold  mt-5">Posts</h2>
            <SinglePost />
          </div>
        </motion.div>
    </>
  )
}

export default ProfileComp