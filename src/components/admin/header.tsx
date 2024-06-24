import { IoIosNotificationsOutline } from "react-icons/io";
import pro from '../../assets/images/pro.jpg'
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const AdminHeader=()=>{
  const {admin}=useSelector((state:RootState)=>state.admin)
    return(
        <div className="w-full h-16  flex border border-gray-400 ">
        <div className="w-[50%] h-full flex justify-start items-center gap-2">
          <img
            className="w-[50px] h-[50px] rounded-full bg-black ml-1 bg-cover"
            src={pro}
            alt=""
          />
          <div className="h-full w-32  flex flex-col justify-center">
            <span className="text-xs text-gray-500">{admin?.role}</span>
            <span className="text-md text-black">{admin?.name}</span>
          </div>
        </div>
        <div className="w-[50%] h-full flex items-center justify-end pr-4 ">
          <IoIosNotificationsOutline className="text-2xl" />
        </div>
      </div>
    )
}