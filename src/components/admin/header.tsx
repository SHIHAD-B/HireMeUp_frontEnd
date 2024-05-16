import { IoIosNotificationsOutline } from "react-icons/io";
import pro from '../../assets/images/pro.jpg'

export const AdminHeader=()=>{
    return(
        <div className="w-full h-16  flex border border-gray-400 ">
        <div className="w-[50%] h-full flex justify-start items-center gap-2">
          <img
            className="w-[50px] h-[50px] rounded-full bg-black ml-1 bg-cover"
            src={pro}
            alt=""
          />
          <div className="h-full w-32  flex flex-col justify-center">
            <span className="text-xs text-gray-500">Admin</span>
            <span className="text-md text-black">SHIHAD</span>
          </div>
        </div>
        <div className="w-[50%] h-full flex items-center justify-end pr-4 ">
          <IoIosNotificationsOutline className="text-2xl" />
        </div>
      </div>
    )
}