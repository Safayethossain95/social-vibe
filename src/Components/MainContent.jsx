import axios from "axios";
import { useEffect, useState } from "react";
import { backend_api } from "../config/config";
import { useTabContext } from "../context/TabProvider";
import RightSidebar from "./RightSidebar";
import SinglePost from "./SinglePost";
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

  const [file, setFile] = useState(null); // State to store the selected file
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    axios
      .get(`${backend_api}/userget`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Set the selected file to state
    console.log(selectedFile);
    if (!selectedFile) {
      return alert("Please select an image first!");
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "cloudinaryimg"); // Replace with your upload preset
    formData.append("cloud_name", "dahrqm9pr"); // Replace with your upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dahrqm9pr/image/upload", // Replace with your Cloudinary cloud name
        formData
      );
      console.log(response.data.url);

      // if(activeTab === "profile"){
      //   axios.post(`${backend_api}/edituser`, )

      // }
      setImageUrl(response.data.url); // Set the uploaded image URL to state
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  // Initialize Cloudinary instance
  // const cld = new Cloudinary({ cloud: { cloudName: "dahrqm9pr" } });

  // Configure transformations for the uploaded image (optional)
  const img = imageUrl; // Default image when no image is uploaded

  return (
    <>
      {activeTab === "profile" && (
        <div className="rounded-lg p-3 pt-[30px] col-span-1  w-[100%]  scrollbar-hide">
          <div className="maincontent  p-6    bg-[#fff]  rounded-lg shadow-lg">
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
                <h1 className="text-3xl font-bold">Safayet Hossain</h1>
                <p>React Developer</p>
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
            <SinglePost />
          </div>
        </div>
      )}
      {activeTab === "News Feed" && (
        <>
          <div className="bg-white rounded-lg p-3 mt-[30px] col-span-1  w-[100%]  scrollbar-hide">

            <div>
              <textarea placeholder="write something" type="text" className="outline-none p-3 h-[150px] w-full border-[#8C52FC] border  rounded-[20px]" />
            </div>

            <h2 className="text-2xl font-bold  mt-5">Posts</h2>
            <SinglePost />
            <SinglePost />
          </div>
        </>
      )}

      <RightSidebar />
    </>
  );
};

export default MainContent;
