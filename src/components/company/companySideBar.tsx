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
import { GrResources } from "react-icons/gr";
import pro from '../../assets/images/pro.jpg'
export const CompanySideBar = () => {
  
    const { data } = useSelector((state: RootState) => state.company)
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
            <div className="hidden sticky top-0 left-0 bg-background lg:block h-full w-[150px]  lg:w-[250px] dark:bg-gray-800   flex-col items-center gap-8 border border-gray-400">
                <div className="w-full flex justify-center items-center p-3">
                <img src={logo} alt="" className="w-[60%] mt-4" />
                </div>
               

                <div className="w-full h-[40%]  flex flex-col gap-4">

                    <NavLink to="/company" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("dashboard")}>
                        <div className={`w-1 ${active === 'dashboard' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full rounded ${active === 'dashboard' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "dashboard" ? "text-customviolet" : " dark:text-foregroundtext-gray-600"}`}>
                                <MdSpaceDashboard className="text-xl" />
                                <span>Dashboard</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("message")}>
                        <div className={`w-1 ${active === 'message' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full rounded ${active === 'message' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "message" ? "text-customviolet" : "dark:text-foreground text-gray-600"}`}>
                                <BiSolidMessageSquareDetail className="text-xl" />
                                <span>Messages</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("companies")}>
                        <div className={`w-1 ${active === 'companies' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'companies' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "companies" ? "text-customviolet" : "dark:text-foreground text-gray-600"}`}>
                                <BsBuildingsFill className="text-xl" />
                                <span>Company Profile</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("applications")}>
                        <div className={`w-1 ${active === 'applications' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'applications' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "applications" ? "text-customviolet" : "dark:text-foreground text-gray-600"}`}>
                                <HiUserGroup className="text-xl" />
                                <span>All Applicants</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/company/joblist" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("jobs")}>
                        <div className={`w-1 ${active === 'jobs' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'jobs' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "jobs" ? "text-customviolet" : "dark:text-foreground text-gray-600"}`}>
                                <HiOutlineClipboardList className="text-xl" />
                                <span>Job Listing</span>
                            </span>
                        </div>
                    </NavLink>
                    <NavLink to="/company/resources" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("resources")}>
                        <div className={`w-1 ${active === 'resources' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'resources' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "resources" ? "text-customviolet" : "dark:text-foreground text-gray-600"}`}>
                                <GrResources className="text-xl" />
                                <span>Resources</span>
                            </span>
                        </div>
                    </NavLink>


                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("schedule")}>
                        <div className={`w-1 ${active === 'schedule' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'schedule' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "schedule" ? "text-customviolet" : " dark:text-foreground text-gray-600"}`}>
                                <LuCalendarRange className="text-xl" />
                                <span>My Schedule</span>
                            </span>
                        </div>
                    </NavLink>




                </div>
                <div className="w-full h-full  border border-t-slate-500 flex flex-col gap-4">
                    <span className="font-bold text-gray-600 text-sm ml-6 mt-4 dark:text-foreground">SETTINGS</span>

                    <NavLink to="/company/settings" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("settings")}>
                        <div className={`w-1 ${active === 'settings' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'settings' && " dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "settings" ? "text-customviolet" : "dark:text-foreground text-gray-600"}`}>
                                <IoMdSettings className="text-xl" />
                                <span>Settings</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("help")}>
                        <div className={`w-1 ${active === 'help' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'help' && "dark:bg-gray-900 bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "help" ? "text-customviolet" : "dark:text-foreground text-gray-600"}`}>
                                <IoIosHelpCircle className="text-xl" />
                                <span>Help Center</span>
                            </span>
                        </div>
                    </NavLink>

                <button onClick={logOut} className="w-full p-2 border border-gray-400 hover:text-white hover:bg-red-600 text-red-600 rounded-sm flex justify-center items-center">logout</button>
                <div className="w-full mb-2 h-[70px]  flex pl-2 justify-between items-center">
                    <div className="w-14 h-14 bg-red-400 rounded-full">
                       <img src={data?.icon?data.icon:pro} className="h-full w-full rounded-full" alt="" />
                    </div>
                    <div className="w-[70%]  flex-col flex pl-2 justify-center">
                        <span className="font-bold">{data?.company_name}</span>
                        <span className="text-xs">{data?.email}</span>
                    </div>

                </div>
                </div>
            </div>
        </>
    );
}