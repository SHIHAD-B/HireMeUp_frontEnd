import { useState } from "react"
import logo from '../../assets/images/logo.png'
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { BsBuildingsFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/actions/userAction";
import { RootState } from "../../redux/store";
import { HiUserGroup } from "react-icons/hi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { LuCalendarRange } from "react-icons/lu";

export const CompanySideBar = () => {
  
    const { user } = useSelector((state: RootState) => state.user)
    const [active, setActive] = useState("dashboard")
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
    return (
        <>
            <div className="hidden sticky top-0 left-0 bg-customsilver lg:block h-full w-[200px] lg:w-[250px]   flex-col items-center gap-8 border border-gray-400">
                <img src={logo} alt="" className="w-[60%] mt-4" />

                <div className="w-full h-[40%]  flex flex-col gap-4">

                    <NavLink to="/company" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("dashboard")}>
                        <div className={`w-1 ${active === 'dashboard' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'dashboard' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "dashboard" ? "text-customviolet" : "text-gray-600"}`}>
                                <MdSpaceDashboard className="text-xl" />
                                <span>Dashboard</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("message")}>
                        <div className={`w-1 ${active === 'message' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'message' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "message" ? "text-customviolet" : "text-gray-600"}`}>
                                <BiSolidMessageSquareDetail className="text-xl" />
                                <span>Messages</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("companies")}>
                        <div className={`w-1 ${active === 'companies' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'companies' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "companies" ? "text-customviolet" : "text-gray-600"}`}>
                                <BsBuildingsFill className="text-xl" />
                                <span>Company Profile</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("applications")}>
                        <div className={`w-1 ${active === 'applications' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'applications' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "applications" ? "text-customviolet" : "text-gray-600"}`}>
                                <HiUserGroup className="text-xl" />
                                <span>All Applicants</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("jobs")}>
                        <div className={`w-1 ${active === 'jobs' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'jobs' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "jobs" ? "text-customviolet" : "text-gray-600"}`}>
                                <HiOutlineClipboardList className="text-xl" />
                                <span>Job Listing</span>
                            </span>
                        </div>
                    </NavLink>


                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("schedule")}>
                        <div className={`w-1 ${active === 'schedule' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'schedule' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "schedule" ? "text-customviolet" : "text-gray-600"}`}>
                                <LuCalendarRange className="text-xl" />
                                <span>My Schedule</span>
                            </span>
                        </div>
                    </NavLink>




                </div>
                <div className="w-full h-full  border border-t-slate-500 flex flex-col gap-4">
                    <span className="font-bold text-gray-600 text-sm ml-6 mt-4">SETTINGS</span>

                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("settings")}>
                        <div className={`w-1 ${active === 'settings' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'settings' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "settings" ? "text-customviolet" : "text-gray-600"}`}>
                                <IoMdSettings className="text-xl" />
                                <span>Settings</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("help")}>
                        <div className={`w-1 ${active === 'help' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'help' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "help" ? "text-customviolet" : "text-gray-600"}`}>
                                <IoIosHelpCircle className="text-xl" />
                                <span>Help Center</span>
                            </span>
                        </div>
                    </NavLink>

                <button onClick={logOut} className="w-full p-4 border border-gray-400 hover:text-white hover:bg-red-600 text-red-600 rounded-sm flex justify-center items-center">logout</button>
                <div className="w-full mb-2 h-[100px]  flex pl-2 justify-between items-center">
                    <div className="w-14 h-14 bg-red-400 rounded-full">

                    </div>
                    <div className="w-[70%]  flex-col flex pl-2 justify-center">
                        <span className="font-bold">Jake gyil</span>
                        <span className="text-xs">Jakkjhon@gmail.com</span>
                    </div>

                </div>
                </div>
            </div>
        </>
    )
}