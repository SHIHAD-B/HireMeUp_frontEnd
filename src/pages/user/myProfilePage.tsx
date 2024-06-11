import { UserHeader } from "@/components/user/header";
import { CiFlag1 } from "react-icons/ci";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { SiWebmoney } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { FaEdit, FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoFileTrayFull } from "react-icons/io5";



export const MyProfilePage = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state: RootState) => state.user)

    return (
        <>
            <div className="w-full flex flex-col bg-backgournd">
                <UserHeader prop="My Profile" />
                <div className="w-full    flex">
                    <div className="w-[60%] h-full   p-2 flex">
                        <div className="w-full h-full  flex flex-col gap-2">
                            <div className="w-full h-80  border border-gray-300 rounded flex">
                                <div className="w-[30%] h-full  flex justify-center items-center">
                                    <div className="w-44 h-44 rounded-full bg-slate-800">
                                        <img src={user?.profile} alt="" className="w-full h-full rounded-full object-cover" />
                                    </div>
                                </div>
                                <div className=" w-[50%] h-full   flex flex-col gap-1 justify-center">
                                    <span className="text-xl font-bold">{user?.username}</span>
                                    <span className="text-customviolet">{user?.email}</span>
                                    <span>{user?.phone}</span>
                                    <span className="border border-green-500 p-2 w-[60%] flex justify-center items-center gap-1 rounded text-sm text-green-500"><CiFlag1 />OPEN FOR OPPORTUNITIES</span>
                                </div>
                                <div className="w-[20%] h-full flex justify-center pt-4">
                                    <button onClick={() => navigate('/setting')} className="h-9 rounded hover:bg-customviolet hover:text-white text-customviolet p-2 border border-customviolet">Edit Profile</button>
                                </div>
                            </div>
                            <div className="w-full border border-gray-300 rounded flex flex-col p-2 ">
                                <div className="-w-full flex justify-between">
                                    <span className="text-md font-bold">About Me</span>
                                    <button className="p-2 border border-customviolet rounded flex justify-center items-center"><FaEdit className="text-xl text-customviolet" /></button>
                                </div>
                                <span>{user?.about ? user.about : "!No Data Please Update..."}</span>
                            </div>
                            <div className="w-full border border-gray-300 rounded flex flex-col p-2 ">
                                <div className="-w-full flex justify-between">
                                    <span className="text-md font-bold">Experience</span>
                                </div>
                                {user?.experiences?.length ? (
                                    <>
                                        {user.experiences.map((item, index) => (

                                            <div key={index} className="w-full   flex flex-col gap-2">
                                                <div className="w-full flex justify-end">
                                                    <button className="p-2 border border-customviolet rounded flex justify-center items-center"><FaEdit className="text-xl text-customviolet" /></button>
                                                </div>
                                                <span>{item.designation}</span>
                                                <span><span className="font-bold">{item.company}</span>- {item?.from ? new Date(item.from).toDateString() : ""}- {item?.to ? new Date(item.to).toDateString() : ""}</span>
                                                <span className="text-sm text-gray-500">{item?.location}</span>
                                                <span className=" break-words w-[90%]">{item.description}</span>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="w-full   flex flex-col gap-2">
                                        <span>Add Experience..</span>
                                        <button className="p-2 border border-customviolet rounded flex justify-center items-center"><FaEdit className="text-xl text-customviolet" /></button>
                                    </div>)}

                            </div>
                            <div className="w-full border border-gray-300 rounded flex flex-col p-2 ">
                                <div className="-w-full flex justify-between">
                                    <span className="text-md font-bold">Educations</span>
                                </div>
                                {user?.education?.length ? (
                                    <>
                                        {user.education.map((item, index) => (

                                            <div key={index} className="w-full   flex flex-col gap-2">
                                                <div className="w-full flex justify-end">
                                                    <button className="p-2 border border-customviolet rounded flex justify-center items-center"><FaEdit className="text-xl text-customviolet" /></button>
                                                </div>
                                                <span>{item.university}</span>
                                                <span><span className="font-bold">{item.grade}</span>- {item?.from ? new Date(item.from).toDateString() : ""}- {item?.to ? new Date(item.to).toDateString() : ""}</span>
                                                <span className="text-sm text-gray-500">{item?.course}</span>
                                                <span className=" break-words w-[90%]">{item.description}</span>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="w-full   flex flex-col gap-2">
                                        <span>Add Educations..</span>
                                        <button className="p-2 border border-customviolet rounded flex justify-center items-center"><FaEdit className="text-xl text-customviolet" /></button>
                                    </div>)}

                            </div>
                            <div className="w-full border border-gray-300 rounded flex flex-col p-2 ">
                                <div className="-w-full flex justify-between">
                                    <span className="text-md font-bold">Skills</span>
                                    <button className="p-2 border border-customviolet rounded flex justify-center items-center"><FaPlus className="text-xl text-customviolet" /></button>
                                </div>
                                <div className="w-[90%] flex flex-wrap gap-1">
                                    {user?.skills?.length ? (
                                        <>
                                            {user.skills.map((item, index) => (
                                                <span
                                                    key={index}
                                                    className="p-2 border border-customviolet rounded text-customviolet flex justify-center items-center gap-4"
                                                >
                                                    {item}
                                                    <RxCross2 className="text-black" />
                                                </span>
                                            ))}
                                        </>
                                    ) : (
                                        <span >
                                            Add skills ..

                                        </span>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[40%] h-full flex flex-col pt-2 pl-4 pr-6 gap-2">
                        <div className="w-full h-80 rounded border border-gray-400 flex flex-col p-4 gap-2">
                            <div className="-w-full flex justify-between">
                                <span className="text-md font-bold">Social Links</span>
                                <button className="p-2 border border-customviolet rounded flex justify-center items-center"><FaEdit className="text-xl text-customviolet" /></button>
                            </div>
                            <div className="w-full   flex flex-col gap-4">
                                <div className="w-full h-8 flex flex-col">
                                    <span className="flex gap-2 justify-start items-center text-gray-500"><MdEmail/>Email</span>
                                    <span className="text-sm text-customviolet">{user?.contacts?.email?user.contacts.email:""}</span>
                                </div>
                                <div className="w-full h-8 flex flex-col">
                                    <span className="flex gap-2 justify-start items-center text-gray-500"><FaInstagram/>Instagram</span>
                                    <span className="text-sm text-customviolet">{user?.contacts?.instagram?user.contacts.instagram:""}</span>
                                </div>
                                <div className="w-full h-8 flex flex-col">
                                    <span className="flex gap-2 justify-start items-center text-gray-500"><CiLinkedin/>Linkedin</span>
                                    <span className="text-sm text-customviolet">{user?.contacts?.linkedin?user.contacts.linkedin:""}</span>
                                </div>
                                <div className="w-full h-8 flex flex-col">
                                    <span className="flex gap-2 justify-start items-center text-gray-500"><CiTwitter/>Twitter</span>
                                    <span className="text-sm text-customviolet">{user?.contacts?.twitter?user.contacts.twitter:""}</span>
                                </div>
                                <div className="w-full h-8 flex flex-col">
                                    <span className="flex gap-2 justify-start items-center text-gray-500"><SiWebmoney/>Portfolio</span>
                                    <span className="text-sm text-customviolet">{user?.contacts?.portfolio?user.contacts.portfolio:""}</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full  rounded border border-gray-400 flex flex-col p-4 gap-2">
                            <div className="-w-full flex justify-between">
                                <span className="text-md font-bold">CV</span>
                                <button className="p-2 border border-customviolet rounded flex justify-center items-center"><FaEdit className="text-xl text-customviolet" /></button>
                            </div>
                            <div className="w-full   flex flex-col gap-4">
                                <div className="w-full h-8 flex flex-col">
                                    <span className="flex gap-2 justify-start items-center text-gray-500"><IoFileTrayFull/>SHIHAD B</span>
                                    <span className="text-sm text-customviolet">{user?.contacts?.email?user.contacts.email:""}</span>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}