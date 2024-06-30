import { useEffect, useState } from "react"
import logo from '../../assets/images/logo.png'
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaFileAlt } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { BsBuildingsFill } from "react-icons/bs";
import { TbHandClick } from "react-icons/tb";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/actions/userAction";
import { RootState } from "../../redux/store";

export const UserSideBar = () => {
    const location=useLocation()
    const { user } = useSelector((state: RootState) => state.user)
    const [active, setActive] = useState("jobs")
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const logOut = async () => {
        try {
             await dispatch(logout());
           
            navigate('/');
        } catch (error: any) {
            console.error("Logout failed:", error.message);
        }
    }
    useEffect(()=>{
       setActive(String(location.pathname))
    },[location])
    return (
        <>
        {user?.email&&(

     
            <div className="hidden lg:flex h-screen w-[200px] lg:w-[230px] top-0 left-0 dark:bg-gray-800 sticky  flex-col items-center gap-8 border border-gray-200 dark:border-gray-700">
                <img  onClick={()=>navigate('/')} src={logo} alt="" className="w-[60%] mt-4" />

                <div className="w-full h-[40%]  flex flex-col gap-4">

                    <NavLink to="/home" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("/home")}>
                        <div className={`w-1 ${active === '/home' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === '/home' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "/home" ? "text-customviolet" : "text-gray-600 dark:text-textDark "}`}>
                                <MdSpaceDashboard className="text-xl" />
                                <span>Dashboard</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/chat" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("/chat")}>
                        <div className={`w-1 ${active === '/chat' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === '/chat' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "/chat" ? "text-customviolet" : "text-gray-600 dark:text-textDark "}`}>
                                <BiSolidMessageSquareDetail className="text-xl" />
                                <span>Messages</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/myapplication" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("/myapplication")}>
                        <div className={`w-1 ${active === '/myapplication' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === '/myapplication' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "/myapplication" ? "text-customviolet" : "text-gray-600 dark:text-textDark "}`}>
                                <FaFileAlt className="text-xl" />
                                <span>My Applications</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/joblist" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("/joblist")}>
                        <div className={`w-1 ${active === '/joblist' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === '/joblist' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "/joblist" ? "text-customviolet" : "text-gray-600 dark:text-textDark "}`}>
                                <LuSearch className="text-xl" />
                                <span>Find Jobs</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/companylist" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("/companylist")}>
                        <div className={`w-1 ${active === '/companylist' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === '/companylist' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "/companylist" ? "text-customviolet" : "text-gray-600 dark:text-textDark "}`}>
                                <BsBuildingsFill className="text-xl" />
                                <span>Browse Companies</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/profile" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("/profile")}>
                        <div className={`w-1 ${active === '/profile' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === '/profile' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "/profile" ? "text-customviolet" : "text-gray-600 dark:text-textDark "}`}>
                                <IoPersonSharp className="text-xl" />
                                <span>My Public Profile</span>
                            </span>
                        </div>
                    </NavLink>
                    <NavLink to="/subscription" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("/subscription")}>
                        <div className={`w-1 ${active === '/subscription' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === '/subscription' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "/subscription" ? "text-customviolet" : "text-gray-600 dark:text-textDark "}`}>
                                <TbHandClick className="text-xl" />
                                <span>Subscription</span>
                            </span>
                        </div>
                    </NavLink>




                </div>
                <div className="w-full  border border-t-slate-500 flex flex-col gap-4">
                    <span className="font-bold text-gray-600 text-sm ml-6 mt-4">SETTINGS</span>

                    <NavLink to="/setting" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("/setting")}>
                        <div className={`w-1 ${active === '/setting' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === '/setting' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "/setting" ? "text-customviolet" : "text-gray-600 dark:text-textDark "}`}>
                                <IoMdSettings className="text-xl" />
                                <span>Settings</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/underconstrution" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("help")}>
                        <div className={`w-1 ${active === 'help' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'help' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "help" ? "text-customviolet" : "text-gray-600 dark:text-textDark "}`}>
                                <IoIosHelpCircle className="text-xl" />
                                <span>Help Center</span>
                            </span>
                        </div>
                    </NavLink>

                </div>
                <button onClick={logOut} className="w-full h-24 border border-gray-400 rounded hover:bg-red-600 hover:text-white text-red-600  flex justify-center items-center">logout</button>
                <div className="w-full h-40  flex pl-2 justify-between">
                    <div className="w-14 h-14 rounded-full">
                     <img src={user?.profile} alt=""  className="object-cover w-full h-full rounded-full"/>
                    </div>
                    <div className="w-[70%] h-=full  flex-col flex pl-2 justify-center">
                        <span className="font-bold">{user?.username}</span>
                        <span className="text-xs overflow-clip">{user?.email}</span>
                    </div>

                </div>
            </div>
               )}
        </>
    )
}