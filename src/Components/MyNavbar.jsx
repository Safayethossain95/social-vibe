import { useEffect } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../api/authApi";
import { useTabContext } from "../context/TabProvider";
import Cookies from "js-cookie";
const MyNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate() // Access the location object
  const pageAddress = location.pathname.substring(1);
  console.log(pageAddress);
  const {
    setActiveTab,
    isLogin,
    setIsLogin,
    userid,
    profileinfo,
    setprofileinfo,
  } = useTabContext();

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
      console.log(Cookies.get('uid'))
  
  }, []);

  useEffect(() => {
    function init() {
      const data = localStorage.getItem("token"); // Get the token from localStorage
      
      if (data) {
        console.log(data);  // Log the token to check if it's correct
        setIsLogin(true);
  
      } else {
        setIsLogin(false);
      }
    }
  
    init();
  }, [isLogin]);
  
  
const handlelogout =async () => {
  
// Clear the 'uid' cookie
  const data = await logoutUser()
  console.log(data)
  setIsLogin(false);
  localStorage.removeItem("token");
  setActiveTab("News Feed"); // Redirect to login page
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
              src={profileinfo?.profilePicture}
              alt="profile"
              className="h-[36px] w-[36px] rounded-full object-cover"
            />
          ):""}

          {isLogin ? (
            <>
              <Link
                to="/"
                className="bg-white font-bold text-[#8C52FC] hover:bg-[#8C52FC] hover:border-white border border-[#8C52FC] hover:text-white duration-300 px-4 py-2 rounded-lg"
              >
                Home
              </Link>
              <Link
                to="/"
                onClick={handlelogout}
                className="bg-white font-bold text-[#8C52FC] hover:bg-[#8C52FC] hover:border-white border border-[#8C52FC] hover:text-white duration-300 px-4 py-2 rounded-lg"
              >
                Logout
              </Link>
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
