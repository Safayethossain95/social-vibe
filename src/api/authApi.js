import axios from "axios";
import { backend_api } from "../config/config";
import toast from 'react-hot-toast'

export const loginUser = async (formdata) => {
    try {
        
   
      const response = await axios.post(`${backend_api}/login`, formdata, { withCredentials: true });
      toast.success(response.data.message)
      return response.data; 
    } catch (error) {
      const errorMessage = String(
        error.response?.data?.message || "An error occurred during login."
      );
      toast.error(errorMessage); // Show a string, not an object
      console.log(errorMessage);
    }
  };
export const signupUser = async (formdata) => {
    try {
        const {email, password,fullname} = formdata
        console.log(email)
      const response = await axios.post(`${backend_api}/signup`, {
        fullname,
        email,
        password,
      });
      return response; // Return the response data (e.g., token or user info)
    } catch (error) {
      throw error.response
    }
  };
export const getUser = async (id) => {
    try {
      const response = await axios.get(`${backend_api}/userget/${id}`);
      return response; 
    } catch (error) {
      throw error.response
    }
  };
  export const authUser = async () => {
    try {
      // const token = localStorage.getItem("token");
      // console.log(token)
      const response = await axios.get(`${backend_api}/auth/user`, 
        {
        withCredentials: true, // Include credentials (cookies) with the request
      });
      return response;
    } catch (error) {
      throw error.response; // Handle the error response
    }
  };
  
export const logoutUser = async () => {
    try {
      const response = await axios.post(`${backend_api}/logout`, {}, {
        withCredentials: true, // Move withCredentials to the config object
      });
      return response; 
    } catch (error) {
      throw error.response
    }
  };


