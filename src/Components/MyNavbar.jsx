/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authUser, getUser, logoutUser } from "../api/authApi";
import { img_api } from "../config/config";
import { useTabContext } from "../context/TabProvider";
const MyNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Access the location object
  const pageAddress = location.pathname.substring(1);
  console.log(pageAddress);
  const { setActiveTab, isLogin, setIsLogin,  setprofileinfo } =
    useTabContext();

  useEffect(() => {
    async function fetchdata() {
      try {
        const uid = localStorage.getItem("uid");
        const data = await getUser(uid);
        if (data) {
          setprofileinfo(data.data);
        }
      } catch (err) {
        console.log(err || "An error occurred");
      }
    }

    fetchdata();
  }, []);
  const { imageUrl, setImageUrl } = useTabContext();
  useEffect(() => {
    async function a() {
      const uid = localStorage.getItem("uid");
      const data = await getUser(uid);
      if (data) {
        console.log(data.data);
        setImageUrl(`${img_api}/uploads/${data.data?.profilePicture}`);
      }
    }
    a();
  }, [imageUrl]);
  useEffect(() => {
    async function init() {
      const data = await authUser();
      if (data.status === 200) {
        console.log(data.status);
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
    init();
  }, []);

  const handlelogout = async () => {
    const data = await logoutUser();
    console.log(data);
    setIsLogin(false);
    localStorage.removeItem("islogin",false)
    setActiveTab("News Feed");
    navigate("/login");
  };

  return (
    <div
      className={`h-[70px] w-full z-10 fixed bg-[#8C52FC] ${
        pageAddress == "login" || pageAddress == "signup"
          ? "border-b border-gray-300"
          : ""
      }`}
    >
      <div className="container h-full flex items-center justify-between">
        <img src="/assets/images/logo.png" alt="logo" className="h-[40px]" />
        <div className="flex items-center space-x-3">
          {isLogin ? (
            <img
              src={imageUrl}
              alt="profile"
              className="h-[36px] w-[36px] rounded-full object-cover"
            />
          ) : (
            ""
          )}

          {isLogin ? (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                }}
                className="mylink"
                style={{ display: 'inline-block' }}
              >
                <Link
                  to="/"
                  onClick={()=>{}}
                  className="bg-white font-bold text-[#8C52FC] hover:bg-[#8C52FC] hover:border-white border border-[#8C52FC] hover:text-white duration-300 px-4 py-2 rounded-lg"
                >
                  Home
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                }}
                className="mylink"
                style={{ display: 'inline-block' }}
              >
                <Link
                  to="/"
                  onClick={handlelogout}
                  className="bg-white font-bold text-[#8C52FC] hover:bg-[#8C52FC] hover:border-white border border-[#8C52FC] hover:text-white duration-300 px-4 py-2 rounded-lg"
                >
                  Logout
                </Link>
              </motion.div>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="bg-white font-bold text-[#8C52FC] hover:bg-[#8C52FC] hover:border-white border border-[#8C52FC] hover:text-white duration-300 px-4 py-2 rounded-lg"
              >
                Home
              </Link>
              {pageAddress == "login" ? (
                <Link
                  to="/signup"
                  className="bg-white font-bold text-[#8C52FC] hover:bg-[#8C52FC] hover:border-white border border-[#8C52FC] hover:text-white duration-300 px-4 py-2 rounded-lg"
                >
                  Sign Up
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="bg-white font-bold text-[#8C52FC] hover:bg-[#8C52FC] hover:border-white border border-[#8C52FC] hover:text-white duration-300 px-4 py-2 rounded-lg"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyNavbar;
