import { useState } from "react";
import { signupUser } from "../api/authApi";
import toast from "react-hot-toast";

const SignUpComp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [confirmpassword, setConfirmpassword] = useState("");   
  const handleChange = (e) => {
    const { id, value } = e.target; // `id` should match the key in formData
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // Dynamically update the key based on input id
    }));
  };
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSignUp = async (e) => {
    
          e.preventDefault();
          setError("");
          setLoading(true);
      
          try {
            console.log(formData);
            const data = await signupUser(formData);
            toast.success("Sign Up Successful:", data);
            
          } catch (err) {
            toast.error(err || "Sign Up Failed");
          } finally {
            setLoading(false);
          }
        
  }
  return (
    <>
      <div className="flex  items-center justify-center min-h-screen bg-[#8C52FC]">
        <form className="bg-white w-[500px] p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold font-montserrat mb-6 text-center">
            Sign Up
          </h2>
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              onChange={handleChange}
              value={formData.fullname}
              type="fullname"
              id="fullname"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C52FC] focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
            onChange={handleChange}
            value={formData.email}
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
            onChange={handleChange}
            value={formData.password}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C52FC] focus:border-transparent"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmpassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              type="password"
              id="confirmpassword"
              placeholder="Enter your confirm password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C52FC] focus:border-transparent"
            />
          </div>
          <button
          onClick={handleSignUp}
            type="button"
            className="w-full bg-[#8C52FC] text-white py-2 px-4 rounded-lg hover:bg-[#7b49e5] focus:outline-none focus:ring-2 focus:ring-[#8C52FC] focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUpComp;
