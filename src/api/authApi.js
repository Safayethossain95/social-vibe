import axios from "axios";
import { backend_api } from "../config/config";


export const loginUser = async (formdata) => {
    try {
        const {email, password} = formdata
        console.log(email)
      const response = await axios.post(`${backend_api}/login`, {
        email,
        password,
      });
      return response; // Return the response data (e.g., token or user info)
    } catch (error) {
      throw error.response
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

