import { IoIosNotificationsOutline } from "react-icons/io";
import log from '../../assets/images/log.png'
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

export const CompanyHeader=()=>{
  const navigate=useNavigate()
    const {data}=useSelector((state:RootState)=>state.company)
    return(
        <div className="w-full h-16  flex border border-gray-400 ">
        <div className="w-[50%] h-full flex justify-start items-center gap-2">
          <img
            className="w-[50px] h-[50px] rounded-full bg-black ml-1 bg-cover"
            src={log}
            alt=""
          />
          <div className="h-full w-32  flex flex-col justify-center">
            <span className="text-xs text-gray-500">Company</span>
            <span className="text-md text-black">{data?.company_name}</span>
          </div>
        </div>
        <div className="w-[50%] h-full flex items-center justify-end pr-4 gap-2 ">
          <IoIosNotificationsOutline className="text-2xl" />
          <button onClick={()=>navigate('/company/postjob')} className=" text-white bg-customviolet p-2 flex gap-1 justify-center items-center rounded hover:rounded-xl">
            <FaPlus className="text-white"/>
            Post a Job
          </button>
        </div>
      </div>
    )
}