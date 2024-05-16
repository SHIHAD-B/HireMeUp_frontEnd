import { useState } from "react"
import logo from '../../assets/images/logo.png'
import { MdSpaceDashboard } from "react-icons/md";
import { PiBuildingsBold } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { TbFileStack } from "react-icons/tb";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { TbUserPlus } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/actions/userAction";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";

export const AdminSideBar = () => {
    const [active, setActive] = useState("requests")
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const logOut = async () => {
        try {
            const res = await dispatch(logout());
            navigate('/');
        } catch (error: any) {
            console.error("Logout failed:", error.message);
        }
    }
    return (
        <>
            <div className=" h-auto w-[200px] lg:w-[250px] bg-customsilver flex flex-col items-center gap-8 border border-gray-400">
                <img src={logo} alt="" className="w-[60%] mt-4" />

                <div className="w-full h-[40%]  flex flex-col gap-4">

                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("dashboard")}>
                        <div className={`w-1 ${active === 'dashboard' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'dashboard' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "dashboard" ? "text-customviolet" : "text-gray-600"}`}>
                                <MdSpaceDashboard className="text-xl" />
                                <span>Dashboard</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/admin/request" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("requests")}>
                        <div className={`w-1 ${active === 'requests' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'requests' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "requests" ? "text-customviolet" : "text-gray-600"}`}>
                                <TbUserPlus className="text-xl" />
                                <span>Requests</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/admin/companymanagement" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("companies")}>
                        <div className={`w-1 ${active === 'companies' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'companies' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "companies" ? "text-customviolet" : "text-gray-600"}`}>
                                <PiBuildingsBold className="text-xl" />
                                <span>Companies</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/admin/usermanagement" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("users")}>
                        <div className={`w-1 ${active === 'users' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'users' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "users" ? "text-customviolet" : "text-gray-600"}`}>
                                <FaUsers className="text-xl" />
                                <span>Users</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/admin/categorymanagement" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("category")}>
                        <div className={`w-1 ${active === 'category' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'category' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "category" ? "text-customviolet" : "text-gray-600"}`}>
                                <MdOutlineCategory className="text-xl" />
                                <span>Category</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/admin/subscriptionmanagement" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("subscription")}>
                        <div className={`w-1 ${active === 'subscription' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'subscription' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "subscription" ? "text-customviolet" : "text-gray-600"}`}>
                                <MdOutlineWorkspacePremium className="text-xl" />
                                <span>Subscriptions</span>
                            </span>
                        </div>
                    </NavLink>
                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("complaints")}>
                        <div className={`w-1 ${active === 'complaints' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'complaints' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "complaints" ? "text-customviolet" : "text-gray-600"}`}>
                                <TbFileStack className="text-xl" />
                                <span>Complaints</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("admin")}>
                        <div className={`w-1 ${active === 'admin' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'admin' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "admin" ? "text-customviolet" : "text-gray-600"}`}>
                                <MdOutlineAdminPanelSettings className="text-xl" />
                                <span>Admin</span>
                            </span>
                        </div>
                    </NavLink>
                    <NavLink to="" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("jobs")}>
                        <div className={`w-1 ${active === 'jobs' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === 'jobs' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "jobs" ? "text-customviolet" : "text-gray-600"}`}>
                                <BsPersonWorkspace className="text-xl" />
                                <span>Jobs</span>
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

                   

                </div>
                <button onClick={logOut} className="w-full h-24 bg-red-300 text-red-600 rounded-sm flex justify-center items-center">logout</button>
                <div className="w-full h-40  flex pl-2 justify-between">
                    <div className="w-14 h-14 bg-red-400 rounded-full">

                    </div>
                    <div className="w-[70%] h-=full  flex-col flex pl-2 justify-center">
                        <span className="font-bold">Jake gyil</span>
                        <span className="text-xs">Jakkjhon@gmail.com</span>
                    </div>

                </div>
            </div>
        </>
    )
}