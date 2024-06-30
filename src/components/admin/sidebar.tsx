import { useEffect, useState } from "react"
import logo from '../../assets/images/logo.png'
import { MdSpaceDashboard } from "react-icons/md";
import { PiBuildingsBold } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbUserPlus } from "react-icons/tb";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/actions/userAction";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import pro from '../../assets/images/pro.jpg'

export const AdminSideBar = () => {
    const location = useLocation()
    const [active, setActive] = useState("")
    const { admin } = useSelector((state: RootState) => state.admin)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const logOut = async () => {
        try {
            const res = await dispatch(logout());
            res;
            navigate('/');
        } catch (error: any) {
            console.error("Logout failed:", error.message);
        }
    }
    useEffect(() => {
        setActive(location.pathname)
    }, [])
    return (
        <>
            <div className=" h-screen sticky left-0 top-0 w-[200px] lg:w-[250px] bg-customsilver flex flex-col items-center gap-8 border border-gray-400">
                <img  onClick={()=>navigate('/')} src={logo} alt="" className="w-[60%] mt-4 cursor-pointer" />

                <div className="w-full h-[50%]  flex flex-col gap-4">

                    <NavLink to="/admin/dashboard" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("/admin/dashboard")}>
                        <div className={`w-1 ${active === '/admin/dashboard' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === '/admin/dashboard' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "/admin/dashboard" ? "text-customviolet" : "text-gray-600"}`}>
                                <MdSpaceDashboard className="text-xl" />
                                <span>Dashboard</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/admin/request" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("/admin/reques")}>
                        <div className={`w-1 ${active === '/admin/reques' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === '/admin/reques' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "/admin/reques" ? "text-customviolet" : "text-gray-600"}`}>
                                <TbUserPlus className="text-xl" />
                                <span>Requests</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/admin/companymanagement" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("/admin/companymanagement")}>
                        <div className={`w-1 ${active === '/admin/companymanagement' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === '/admin/companymanagement' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "/admin/companymanagement" ? "text-customviolet" : "text-gray-600"}`}>
                                <PiBuildingsBold className="text-xl" />
                                <span>Companies</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/admin/usermanagement" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("/admin/usermanagement")}>
                        <div className={`w-1 ${active === '/admin/usermanagement' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === '/admin/usermanagement' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "/admin/usermanagement" ? "text-customviolet" : "text-gray-600"}`}>
                                <FaUsers className="text-xl" />
                                <span>Users</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/admin/categorymanagement" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("/admin/categorymanagement")}>
                        <div className={`w-1 ${active === '/admin/categorymanagement' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === '/admin/categorymanagement' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "/admin/categorymanagement" ? "text-customviolet" : "text-gray-600"}`}>
                                <MdOutlineCategory className="text-xl" />
                                <span>Category</span>
                            </span>
                        </div>
                    </NavLink>

                    <NavLink to="/admin/subscriptionmanagement" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("/admin/subscriptionmanagement")}>
                        <div className={`w-1 ${active === '/admin/subscriptionmanagement' && 'bg-customviolet'} h-full`}></div>
                        <div className={`w-[90%] h-full ${active === '/admin/subscriptionmanagement' && "bg-activesilver"}`}>
                            <span className={`w-full h-full flex gap-4 items-center ${active === "/admin/subscriptionmanagement" ? "text-customviolet" : "text-gray-600"}`}>
                                <MdOutlineWorkspacePremium className="text-xl" />
                                <span>Subscriptions</span>
                            </span>
                        </div>
                    </NavLink>

                    {admin?.role == "super-admin" && (
                        <NavLink to="/admin/adminmanagement" className="w-full h-10 flex justify-between cursor-pointer" onClick={() => setActive("/admin/adminmanagement")}>
                            <div className={`w-1 ${active === '/admin/adminmanagement' && 'bg-customviolet'} h-full`}></div>
                            <div className={`w-[90%] h-full ${active === '/admin/adminmanagement' && "bg-activesilver"}`}>
                                <span className={`w-full h-full flex gap-4 items-center ${active === "/admin/adminmanagement" ? "text-customviolet" : "text-gray-600"}`}>
                                    <MdOutlineAdminPanelSettings className="text-xl" />
                                    <span>Admin</span>
                                </span>
                            </div>
                        </NavLink>
                    )}


                </div>
                <div className="w-full h-36  flex flex-col gap-4">




                </div>
                <button onClick={logOut} className="w-full h-24 border border-gray-400 hover:text-white hover:bg-red-600 text-red-600 rounded-sm flex justify-center items-center">logout</button>
                <div className="w-full h-40  flex pl-2 justify-between">
                    <div className="w-14 h-14 bg-red-400 rounded-full object-cover">
                        <img src={pro} alt="" className="w-full h-full rounded-3xl object-cover" />
                    </div>
                    <div className="w-[70%] h-=full  flex-col flex pl-2 justify-center">
                        <span className="font-bold">{admin?.name}</span>
                        <span className="text-xs">{admin?.email}</span>
                    </div>

                </div>
            </div>
        </>
    )
}