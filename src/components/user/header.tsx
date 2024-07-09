
import { ModeToggle } from "../common/mode-toggle"
import { VscBell, VscBellDot } from "react-icons/vsc";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logout, userNotificatinoList } from "@/redux/actions/userAction";
import axios from "axios";
import { BASE_URL } from "@/interfaces/config/constant";
import { HiMenuAlt1 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";


interface UserHeaderProps {
  prop: string;
}



export const UserHeader: React.FC<UserHeaderProps> = ({ prop }) => {
  const navigate = useNavigate()
  const { data: notificationList } = useSelector((state: RootState) => state.notification)
  const { data: companyList } = useSelector((state: RootState) => state.companyList)
  const { data: useList } = useSelector((state: RootState) => state.usersList)
  const { user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  const [notification, setNotification] = useState(false)
  const [unread, setUnread] = useState(false)
  useEffect(() => {
    dispatch(userNotificatinoList(String(user?._id)))
    const unreaded = notificationList.some((item: any) => item.read == false)
    setUnread(unreaded)

  }, [])
  const notificationRead = async () => {
    setNotification(true)
    setUnread(false)
    await axios.patch(`${BASE_URL}notification/user/updatereadstatus`, { id: user?._id }, { withCredentials: true }).then(() => {
      dispatch(userNotificatinoList(String(user?._id)))
    })
  }
  const [ham, setHam] = useState(false)
  const hamburger = () => {
    setHam(!ham)
  }
  const logOut = async () => {
    try {
         await dispatch(logout());
       
        navigate('/');
    } catch (error: any) {
        console.error("Logout failed:", error.message);
    }
}
  return (
    <>
      {ham && (
        <>
          <div className='w-48  bg-white flex-col absolute top-1 right-2 rounded z-10 flex gap-2'>
            <span className='w-full flex justify-end pr-2'><RxCross1 onClick={hamburger} className='text-xl font-bold cursor-pointer' /></span>
            <span onClick={() => navigate('/home')} className='w-full h-10 border border-gray-200 text-customviolet flex justify-start items-center pl-4 hover:bg-customviolet hover:text-white'>Dashboard</span>
            <span onClick={() => navigate('/chat')} className='w-full h-10 border border-gray-200 text-customviolet flex justify-start items-center pl-4 hover:bg-customviolet hover:text-white'>Messages</span>
            <span onClick={() => navigate('/myapplication')} className='w-full h-10 border border-gray-200 text-customviolet flex justify-start items-center pl-4 hover:bg-customviolet hover:text-white'>My Applications</span>
            <span onClick={() => navigate('/joblist')} className='w-full h-10 border border-gray-200 text-customviolet flex justify-start items-center pl-4 hover:bg-customviolet hover:text-white'>Find jobs</span>
            <span onClick={() => navigate('/companylist')} className='w-full h-10 border border-gray-200 text-customviolet flex justify-start items-center pl-4 hover:bg-customviolet hover:text-white'>Browse Companies</span>
            <span onClick={() => navigate('/profile')} className='w-full h-10 border border-gray-200 text-customviolet flex justify-start items-center pl-4 hover:bg-customviolet hover:text-white'>My Public Profile</span>
            <span onClick={() => navigate('/subscription')} className='w-full h-10 border border-gray-200 text-customviolet flex justify-start items-center pl-4 hover:bg-customviolet hover:text-white'>Subscription</span>
            <span onClick={() => navigate('/setting')} className='w-full h-10 border border-gray-200 text-customviolet flex justify-start items-center pl-4 hover:bg-customviolet hover:text-white'>Settings</span>
            <span onClick={() => navigate('/underconstrution')} className='w-full h-10 border border-gray-200 text-customviolet flex justify-start items-center pl-4 hover:bg-customviolet hover:text-white'>Help Center</span>
            <span onClick={logOut} className='w-full h-10 border border-gray-200 text-red-500 flex justify-start items-center pl-4 hover:bg-red-500 hover:text-white'>Logout</span>
          </div>

        </>
      )}

      {notification && (
        <>
          <div className="absolute right-1 top-1 w-80 h-80 bg-white border border-gray-400 z-10 flex flex-col">

            <span className="w-full flex justify-end p-2">
              <RxCross1 onClick={() => setNotification(false)} className="cursor-pointer text-md font-bold" />
            </span>
            <div className="w-full h-[95%]  break-words overflow-auto flex flex-col gap-2">
              {notificationList.length ? (
                <>
                  {notificationList?.map((item: { sender: any; message: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
                    <span key={index} className="p-1 border border-gray-400 text-sm text-gray-500 rounded">
                      from {companyList?.find((items:any) => items._id == item.sender)?.company_name ?? useList?.find((items: any) => items._id == item.sender)?.username}:
                      <br />
                      {item.message}
                    </span>
                  ))}
                </>
              ) : (
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
          {user?.email && (
            <>
              <ModeToggle />
              <HiMenuAlt1 onClick={hamburger} className='text-2xl md:hidden' />
            </>
          )}
        </div>

      </div>
    </>
  );
};