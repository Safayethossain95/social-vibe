import { useEffect, useState } from "react";
import { fetchallusers, pushFollower } from "../api/postApi";
import { img_api } from "../config/config";
import { useTabContext } from "../context/TabProvider";

const RightSidebar = () => {
  const [containerPadding, setContainerPadding] = useState(0);
  const { setReloadfollowers } = useTabContext();
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
  const [reload,setreload]=useState(0)
  const [data,setData] = useState([])
  useEffect(()=>{
    async function getallusers(){
      
      const res = await fetchallusers(localStorage.getItem("uid"))
      console.log(res)
      setData(res.data.data)
    }
    getallusers()
  },[reload])
  const handlepushfollower=async(followerid)=>{
    const data = await pushFollower(localStorage.getItem("uid"),followerid)
    console.log(data)
    setReloadfollowers(p=>p+1)
    setreload(p=>p+1)
  }
  return (
    <>
      <div className="container ">
        <div
          style={{
            width: `calc(2 / 12 * 100%)`, // 2.5fr based on a 12-column layout
            right: `${containerPadding}px`, // Adjusted to the container's right edge
          }}
          className="bg-white overflow-y-scroll scrollbar-hide min-w-[220px] max-w-[280px] p-4 mt-[100px] hidden lg:block fixed  h-[calc(100vh-130px)]     right-0  rounded-[24px] flex-col lg-flex-row"
        >
          <h1 className="text-[15px] font-bold font-serif mb-6">People to follow</h1>

          {/* <div className="user-widget my-2">
            <div className="flex items-center space-x-4">
            <img
              src="/assets/images/pro_pic.png"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-md leading-3">Safa hossain</h1>
              <p className="text-gray-500 leading-5">React Developer</p>
            </div>
            </div>
            <div className="flex justify-center">
            <button className="bg-[#8C52FC] text-[10px] text-white px-4 py-1 rounded-[8px] mt-2 inline-block">
              Follow
            </button>
            </div>
          </div> */}
          {
            data?.map((item,key)=>{
              return(
                <>
                <div key={key} className="w-full my-2 bg-white rounded-lg shadow-md p-2 text-center">
            <img
              src={`${img_api}/uploads/${item?.profilePicture}`}
              alt="Profile Image"
              className="w-16 h-16 mx-auto rounded-full shadow-md"
            />
            <h2 className="text-xl font-semibold text-gray-800 ">
             {item?.fullname}
            </h2>
            <button onClick={()=>handlepushfollower(item._id)} className="px-6 mt-2 py-2 text-white bg-[#8C52FC] hover:bg-purple-600 rounded-full shadow-md transition-transform transform hover:scale-105">
              Follow
            </button>
          </div>
                </>
              )
            })
          }
          

         
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
