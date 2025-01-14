import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUser } from "../api/authApi";
import { useTabContext } from "../context/TabProvider";
const MyNavbar = () => {
  const location = useLocation(); // Access the location object
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
        const data = await getUser(userid);
        if (data) {
          setprofileinfo(data.data);
        }
      } catch (err) {
        console.log(err || "An error occurred");
      }
    }
    
      fetchdata();
    
  
  }, []);

useEffect(() => {
    const storedLoginStatus = JSON.parse(localStorage.getItem("isLogin"));
    if (storedLoginStatus) {
        setIsLogin(storedLoginStatus);
    }
}, []);
  
  const handlelogout = () => {
    setActiveTab("News Feed");
    localStorage.setItem("islogin",false);
    setIsLogin(false);
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
          {JSON.parse(localStorage.getItem("islogin")) && (
            <img
              src={profileinfo?.profilePicture}
              alt="profile"
              className="h-[36px] w-[36px] rounded-full object-cover"
            />
          )}

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
