
import { ModeToggle } from "../common/mode-toggle"
import { VscBell, VscBellDot } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { userNotificatinoList } from "@/redux/actions/userAction";
import axios from "axios";
import { BASE_URL } from "@/interfaces/config/constant";
import { userInfo } from "os";

interface UserHeaderProps {
  prop: string;
}



export const UserHeader: React.FC<UserHeaderProps> = ({ prop }) => {
  const { data: notificationList } = useSelector((state: RootState) => state.notification)
  const { data: companyList } = useSelector((state: RootState) => state.companyList)
  const { data: useList } = useSelector((state: RootState) => state.usersList)
  const { user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  const [notification, setNotification] = useState(false)
  const [unread, setUnread] = useState(false)
  useEffect(() => {
    dispatch(userNotificatinoList(String(user?._id)))
    const unreaded = notificationList.some((item) => item.read == false)
    setUnread(unreaded)

  }, [])
  const notificationRead = async () => {
    setNotification(true)
    setUnread(false)
    await axios.patch(`${BASE_URL}notification/user/updatereadstatus`, { id: user?._id }, { withCredentials: true }).then(() => {
      dispatch(userNotificatinoList(String(user?._id)))
    })
  }
  return (
    <>

      {notification && (
        <>
          <div className="absolute right-1 top-1 w-80 h-80 bg-white border border-gray-400 z-10 flex flex-col">
            
            <span className="w-full flex justify-end p-2">
              <RxCross1 onClick={() => setNotification(false)} className="cursor-pointer text-md font-bold" />
            </span>
            <div className="w-full h-[95%]  break-words overflow-auto flex flex-col gap-2">
              {notificationList.length?(
                <>
              {notificationList?.map((item, index) => (
                <span key={index} className="p-1 border border-gray-400 text-sm text-gray-500 rounded">
                  from {companyList?.find((items) => items._id == item.sender)?.company_name ?? useList?.find((items) => items._id == item.sender)?.username}:
                  <br />
                  {item.message}
                </span>
              ))}
                </>
              ):(
                <>
                <span className="w-full h-full flex justify-center items-center text-xl font-bold">No Notifications.</span>
                </>
              )}

            </div>
          </div>
        </>
      )}
      <div className="h-[70px] border-b border-gray-200 flex items-center pl-2 pr-4 justify-between">
        <span className="text-xl font-bold">{prop}</span>
        <div className="flex gap-4 pr-4 justify-center items-center">
          {unread ? (
            <>
              <VscBellDot onClick={notificationRead} className="text-2xl cursor-pointer text-customviolet" />
            </>
          ) : (
            <>
              <VscBell onClick={() => setNotification(true)} className="text-2xl cursor-pointer" />
            </>
          )}
          <ModeToggle />
        </div>

      </div>
    </>
  );
};