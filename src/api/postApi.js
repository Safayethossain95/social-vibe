import axios from "axios";
import { backend_api } from "../config/config";

export const createPost = async (formdata) => {
    try {
       
      const response = await axios.post(`${backend_api}/createpost`, formdata, { withCredentials: true });
      return response; // Return the response data (e.g., token or user info)
    } catch (error) {
      throw error.response
    }
  };
  export const fetchOwnPost = async (uid) => {
    try {
      const response = await axios.get(`${backend_api}/fetchownposts/${uid}`, {
        withCredentials: true,
      });
      return response.data; // Return the fetched posts data
    } catch (error) {
      throw error.response; // Throw the error response for handling in the caller
    }
  };
  export const fetchOwnNewsfeed = async (uid) => {
    try {
      const response = await axios.get(`${backend_api}/fetchnewsfeed/${uid}`, {
        withCredentials: true,
      });
      return response.data; // Return the fetched posts data
    } catch (error) {
      throw error.response; // Throw the error response for handling in the caller
    }
  };