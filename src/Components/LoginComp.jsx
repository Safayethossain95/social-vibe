/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { loginUser } from "../api/authApi";
import { useTabContext } from "../context/TabProvider";
import { useNavigate } from "react-router-dom";

const LoginComp = () => {
    const navigate = useNavigate();
    const { isLogin,setIsLogin ,setUserId} = useTabContext();
    const [error, setError] = useState("");
    const [loading,setloading]=useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
     
      // Handle input change
      const handleChange = (e) => {
        const { id, value } = e.target; // `id` should match the key in formData
        setFormData((prevData) => ({
          ...prevData,
          [id]: value, // Dynamically update the key based on input id
        }));
      };
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError("");
      
  
      try {
        console.log(formData);
        const data = await loginUser(formData);
        if(data){
            localStorage.setItem("islogin",true)
            setIsLogin(true)
            setloading(true)
            console.log("user id:", data.data.user.id);
            setUserId(data.data.user.id)
            navigate("/")
        }
      } catch (err) {
        setError(err || "An error occurred");
      } 
    };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#8C52FC]">
        <form onSubmit={handleLogin} className="bg-white w-[500px] p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
             value={formData.email} // Controlled input
             onChange={handleChange}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C52FC] focus:border-transparent"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
             value={formData.password} // Controlled input
             onChange={handleChange}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C52FC] focus:border-transparent"
            />
          </div>
            {!loading ? 
          <button
            type="submit"
            className="w-full bg-[#8C52FC] h-[50px] text-white py-2 px-4 rounded-lg hover:bg-[#7b49e5] focus:outline-none focus:ring-2 focus:ring-[#8C52FC] focus:ring-offset-2"
          >
            Login
            </button>
            :
            <>
            <div className="div w-full  border border-[#7b49e5] rounded-md">

            <div className="div w-[30px]  flex items-center h-[50px] m-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a9" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#9E2BFF"></stop><stop offset=".3" stopColor="#9E2BFF" stopOpacity=".9"></stop><stop offset=".6" stopColor="#9E2BFF" stopOpacity=".6"></stop><stop offset=".8" stopColor="#9E2BFF" stopOpacity=".3"></stop><stop offset="1" stopColor="#9E2BFF" stopOpacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a9)" strokeWidth="13" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#9E2BFF" strokeWidth="13" strokeLinecap="round" cx="100" cy="100" r="70"></circle></svg>
            </div>
            </div>
            </>
            }
            
        </form>
      </div>
    </>
  );
};

export default LoginComp;
