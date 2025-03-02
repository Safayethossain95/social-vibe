import axios from "axios";
import { backend_api } from "../config/config";
import toast from 'react-hot-toast'
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

  export const fetchallusers = async(uid)=>{
    try{
      const response = await axios.get(`${backend_api}/getallusers/${uid}`)
      return response
    }catch(err){
      console.log(err.message)
    }
  }
  export const pushFollower = async(meid,uid)=>{
    try{
      const response = await axios.post(`${backend_api}/push-follower/${meid}/${uid}`)
      toast.success(response.data.message)
      return response.data
    }catch(err){
      toast.error(err.message)
      console.log(err)
    }
  }
  export const getFollowers = async(uid)=>{
    try{
      const response = await axios.get(`${backend_api}/get-followers/${uid}`)
      return response
    }catch(err){
      toast.error(err.message)
      console.log(err)
    }
  }
  export const getFollowing = async(uid)=>{
    try{
      const response = await axios.get(`${backend_api}/get-following/${uid}`)
      return response
    }catch(err){
      toast.error(err.message)
      console.log(err)
    }
  }

  