import { UserHeader } from "@/components/user/header";
import { CiFlag1 } from "react-icons/ci";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { SiWebmoney } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { FaEdit, FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoFileTrayFull } from "react-icons/io5";
import { useState } from "react";
import { AboutModal } from "@/components/user/aboutModal";
import { ExperienceModal } from "@/components/user/experienceModal";
import { IUsers } from "@/interfaces/IUser";
import { useToast } from '@/components/ui/use-toast';
import axios from "axios";
import { BASE_URL } from "@/interfaces/config/constant";
import { config } from "@/interfaces/config/configuration";
import { EditExperienceModal } from "@/components/user/editExperience";
import { AddEducationModal } from "@/components/user/addEducation";
import { EditEducationModal } from "@/components/user/editEducation";
import { AddSkillModal } from "@/components/user/skillModal";
import { AddLangModal } from "@/components/user/addLangModal";
import { SocialLinkModal } from "@/components/user/socialLinkModal";
import { CvModal } from "@/components/user/cvModal";
import { AddressModal } from "@/components/user/addressModal";




export const MyProfilePage = () => {
    const { toast } = useToast()
    const navigate = useNavigate()
    const { user } = useSelector((state: RootState) => state.user)
    const [aboutModal, setAboutModal] = useState(false)
    const [experiencModal, setExperienceModal] = useState(false)
    const [editExperienceModal, setEditExperienceModal] = useState(false)
    const [expId, setExpId] = useState("")
    const [eduId, setEduId] = useState("")
    const [users, setUser] = useState<IUsers>(user as IUsers)
    const [addEducationModal, setAddEducationModal] = useState(false)
    const [editEducationModal, setEditEducationModal] = useState(false)
    const [addSkillModal, setAddSkillModal] = useState(false)
    const [addLanglModal, setAddLangModal] = useState(false)
    const [socialLinkModal, setsocialLinkModal] = useState(false)
    const [resumeModal, setresumeModal] = useState(false)
    const [addressModal, setaddressModal] = useState(false)

    const close = () => {

        setAboutModal(false)
        setExperienceModal(false)
        setEditExperienceModal(false)
        setAddEducationModal(false)
        setEditEducationModal(false)
        setAddSkillModal(false)
        setAddLangModal(false)
        setsocialLinkModal(false)
        setresumeModal(false)
        setaddressModal(false)
    }

    const deleteExperience = async (experienceId: string) => {
        if (!experienceId) {
            toast({
                description: "failed to delete experience",
                className: "bg-red-600 text-white"

            })
            return
        }
        const data = {
            userId: user?._id,
            id: experienceId
        }
        await axios.patch(`${BASE_URL}user/deleteexperience`, data, config).then(() => {

            setUser((prev: any) => ({
                ...prev,
                experiences: prev?.experiences.filter((item: any) => item._id !== experienceId)
            }));
            toast({
                description: "Experience Deleted",
                className: "bg-customviolet text-white"

            })
        }).catch((error: any) => {
            console.log(error)
            toast({
                description: "failed to delete experience",
                className: "bg-red-600 text-white"

            })
        })
    };
    const deleteEducation = async (educationId: string) => {
        if (!educationId) {
            toast({
                description: "failed to delete education",
                className: "bg-red-600 text-white"

            })
            return
        }
        const data = {
            userId: user?._id,
            id: educationId
        }
        await axios.patch(`${BASE_URL}user/deleteeducation`, data, config).then(() => {

            setUser((prev: any) => ({
                ...prev,
                education: prev?.education.filter((item: any) => item._id !== educationId)
            }));
            toast({
                description: "Education Deleted",
                className: "bg-customviolet text-white"

            })
        }).catch((error: any) => {
            console.log(error)
            toast({
                description: "failed to delete education",
                className: "bg-red-600 text-white"

            })
        })
    };

    const deleteSkill = async (skill: string) => {
        if (!skill) {
            toast({
                description: "failed to delete education",
                className: "bg-red-600 text-white"

            })
            return
        }
        const data = {
            id: user?._id,
            skill: skill
        }
        await axios.patch(`${BASE_URL}user/deleteskill`, data, config).then(() => {

            setUser((prev: any) => ({
                ...prev,
                skills: prev?.skills.filter((item: any) => item !== skill)
            }));
            toast({
                description: "skill Deleted",
                className: "bg-customviolet text-white"

            })
        }).catch((error: any) => {
            console.log(error)
            toast({
                description: "failed to delete skill",
                className: "bg-red-600 text-white"

            })
        })
    };

    const deleteLanguage = async (lang: string) => {
        if (!lang) {
            toast({
                description: "failed to delete language",
                className: "bg-red-600 text-white"

            })
            return
        }
        const data = {
            id: user?._id,
            language: lang
        }
        await axios.patch(`${BASE_URL}user/deletelanguage`, data, config).then(() => {

            setUser((prev: any) => ({
                ...prev,
                language: prev?.language.filter((item: any) => item !== lang)
            }));
            toast({
                description: "language Deleted",
                className: "bg-customviolet text-white"

            })
        }).catch((error: any) => {
            console.log(error)
            toast({
                description: "failed to delete language",
                className: "bg-red-600 text-white"

            })
        })
    };

    const editExperience = (id: string) => {
        setExpId(id)
        setEditExperienceModal(true)
    }
    const editEducation = (id: string) => {
        setEduId(id)
        setEditEducationModal(true)
    }


    return (
        <>


            {aboutModal && <AboutModal id={String(users?._id)} close={close} />}
            {experiencModal && <ExperienceModal id={String(users?._id)} close={close} setUser={setUser} />}
            {editExperienceModal && <EditExperienceModal id={expId} data={users} close={close} setUser={setUser} />}
            {editEducationModal && <EditEducationModal id={eduId} data={users} close={close} setUser={setUser} />}
            {addEducationModal && <AddEducationModal id={String(users?._id)} close={close} setUser={setUser} />}
            {addSkillModal && <AddSkillModal id={String(users?._id)} close={close} setUser={setUser} users={users} />}
            {addLanglModal && <AddLangModal id={String(users?._id)} close={close} setUser={setUser} users={users} />}
            {socialLinkModal && <SocialLinkModal id={String(users?._id)} close={close} setUser={setUser} users={users} />}
            {resumeModal && <CvModal id={String(users?._id)} close={close} setUser={setUser} users={users} />}
            {addressModal && <AddressModal id={String(users?._id)} close={close} setUser={setUser} users={users} />}


            <div className="w-full  flex flex-col bg-backgournd">
                <UserHeader prop="My Profile" />
                <div className="w-full    flex">
                    <div className="w-[60%] h-full   p-2 flex">
                        <div className="w-full h-full  flex flex-col gap-2">
                            <div className="w-full h-80  border border-gray-300 rounded flex">
                                <div className="w-[30%] h-full  flex justify-center items-center">
                                    <div className="w-44 h-44 rounded-full bg-slate-800">
                                        <img src={users?.profile} alt="" className="w-full h-full rounded-full object-cover" />
                                    </div>
                                </div>
                                <div className=" w-[50%] h-full   flex flex-col gap-1 justify-center">
                                    <span className="text-xl font-bold">{users?.username}</span>
                                    <span className="text-customviolet">{users?.email}</span>
                                    <span>{users?.phone}</span>
                                    <span className="border border-green-500 p-2 w-[60%] flex justify-center items-center gap-1 rounded text-sm text-green-500"><CiFlag1 />OPEN FOR OPPORTUNITIES</span>
                                </div>
                                <div className="w-[20%] h-full flex justify-center pt-4">
                                    <button onClick={() => navigate('/setting')} className="h-9 rounded hover:bg-customviolet hover:text-white text-customviolet p-2 border border-customviolet">Edit Profile</button>
                                </div>
                            </div>
                            <div className="w-full border border-gray-300 rounded flex flex-col p-2 ">
                                <div className="-w-full flex justify-between">
                                    <span className="text-md font-bold">About Me</span>
                                    <button onClick={() => setAboutModal(true)} className="p-2 border border-customviolet rounded flex justify-center items-center"><FaEdit className="text-sm text-customviolet" /></button>
                                </div>
                                <span>{users?.about ? users.about : "!No Data Please Update..."}</span>
                            </div>
                            <div className="w-full border border-gray-300 rounded flex flex-col p-2 ">
                                <div className="-w-full flex justify-between">
                                    <span className="text-md font-bold">Experience</span>
                                </div>
                                {users?.experiences?.length ? (
                                    <>


                                        {users.experiences.map((item, index) => (

                                            <div key={index} className="w-full   flex flex-col gap-2">
                                                <div className="w-full flex justify-end gap-2">
                                                    <button onClick={() => editExperience(String(item._id))} className="p-2 border border-customviolet rounded flex justify-center items-center"><FaEdit className=" text-customviolet text-sm" /></button>
                                                    <button onClick={() => deleteExperience(String(item._id))} className="p-2 border border-customviolet rounded flex justify-center items-center"><MdDelete className=" text-customviolet text-sm" /></button>
                                                </div>
                                                <span>{item.designation}</span>
                                                <span><span className="font-bold">{item.company}</span>- {item?.from ? new Date(item.from).toDateString() : ""}- {item?.to ? new Date(item.to).toDateString() : ""}</span>
                                                <span className="text-sm text-gray-500">{item?.location}</span>
                                                <span className=" break-words w-[90%]">{item.description}</span>
                                            </div>
                                        ))}
                                        <button onClick={() => setExperienceModal(true)} className="p-2 border border-customviolet rounded flex justify-center items-center"><FaPlus className=" text-customviolet text-sm" /></button>
                                    </>
                                ) : (
                                    <div className="w-full   flex flex-col gap-2">
                                        <span>Add Experience..</span>
                                        <button onClick={() => setExperienceModal(true)} className="p-2 border border-customviolet rounded flex justify-center items-center"><FaPlus className="text-xl text-customviolet" /></button>
                                    </div>)}

                            </div>
                            <div className="w-full border border-gray-300 rounded flex flex-col p-2 ">
                                <div className="-w-full flex justify-between">
                                    <span className="text-md font-bold">Educations</span>
                                </div>
                                {users?.education?.length ? (
                                    <>
                                        {users.education.map((item, index) => (

                                            <div key={index} className="w-full   flex flex-col gap-2">
                                                <div className="w-full flex justify-end gap-2">
                                                    <button onClick={() => editEducation(String(item._id))} className="p-2 border border-customviolet rounded flex justify-center items-center"><FaEdit className=" text-customviolet text-sm" /></button>
                                                    <button onClick={() => deleteEducation(String(item._id))} className="p-2 border border-customviolet rounded flex justify-center items-center"><MdDelete className=" text-customviolet text-sm" /></button>
                                                </div>
                                                <span>{item.university}</span>
                                                <span><span className="font-bold">{item.grade}</span>- {item?.from ? new Date(item.from).toDateString() : ""}- {item?.to ? new Date(item.to).toDateString() : ""}</span>
                                                <span className="text-sm text-gray-500">{item?.course}</span>
                                                <span className=" break-words w-[90%]">{item.description}</span>
                                            </div>
                                        ))}
                                        <button onClick={() => setAddEducationModal(true)} className="p-2 border border-customviolet rounded flex justify-center items-center"><FaPlus className="text-sm text-customviolet" /></button>
                                    </>
                                ) : (
                                    <div className="w-full   flex flex-col gap-2">
                                        <span>Add Educations..</span>
                                        <button onClick={() => setAddEducationModal(true)} className="p-2 border border-customviolet rounded flex justify-center items-center"><FaPlus className="text-sm text-customviolet" /></button>
                                    </div>)}

                            </div>
                            <div className="w-full border border-gray-300 rounded flex flex-col p-2 ">
                                <div className="-w-full flex justify-between">
                                    <span className="text-md font-bold">Skills</span>
                                    <button onClick={() => setAddSkillModal(true)} className="p-2 border border-customviolet rounded flex justify-center items-center"><FaPlus className="text-sm text-customviolet" /></button>
                                </div>
                                <div className="w-[90%] flex flex-wrap gap-1">
                                    {users?.skills?.length ? (
                                        <>
                                            {users.skills.map((item, index) => (
                                                <span
                                                    key={index}
                                                    className="p-2 border border-customviolet rounded text-customviolet flex justify-center items-center gap-4"
                                                >
                                                    {item}
                                                    <RxCross2 onClick={() => deleteSkill(item)} className="text-black cursor-pointer" />
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
                        <div className="w-full min-h-80 rounded border border-gray-300 flex flex-col p-4 gap-2">
                            <div className="-w-full flex justify-between">
                                <span className="text-md font-bold">Social Links</span>
                                <button onClick={() => setsocialLinkModal(true)} className="p-2 border border-customviolet rounded flex justify-center items-center"><FaEdit className="text-sm text-customviolet" /></button>
                            </div>
                            <div className="w-full   flex flex-col gap-4">
                                <div className="w-full min-h-8 flex flex-col">
                                    <span className="flex gap-2 justify-start items-center  text-gray-500"><MdEmail />Email</span>
                                    <a href={users?.email ? users.email : ""} className="text-sm break-words text-customviolet">{users?.email ? users.email : ""}</a>
                                </div>
                                <div className="w-full min-h-8 flex flex-col">
                                    <span className="flex gap-2 justify-start items-center  text-gray-500"><FaInstagram />Instagram</span>
                                    <a href={users?.contacts?.instagram ? users.contacts.instagram : ""} className="text-sm break-words text-customviolet">{users?.contacts?.instagram ? users.contacts.instagram : ""}</a>
                                </div>
                                <div className="w-full min-h-8 flex flex-col">
                                    <span className="flex gap-2 justify-start items-center  text-gray-500"><CiLinkedin />Linkedin</span>
                                    <a href={users?.contacts?.linkedin ? users.contacts.linkedin : ""} className="text-sm break-words text-customviolet">{users?.contacts?.linkedin ? users.contacts.linkedin : ""}</a>
                                </div>
                                <div className="w-full min-h-8 flex flex-col">
                                    <span className="flex gap-2 justify-start items-center  text-gray-500"><CiTwitter />Twitter</span>
                                    <a href={users?.contacts?.twitter ? users.contacts.twitter : ""} className="text-sm break-words text-customviolet">{users?.contacts?.twitter ? users.contacts.twitter : ""}</a>
                                </div>
                                <div className="w-full min-h-8 flex flex-col">
                                    <span className="flex gap-2 justify-start items-center  text-gray-500"><SiWebmoney />Portfolio</span>
                                    <a href={users?.contacts?.portfolio ? users.contacts.portfolio : ""} className="text-sm break-words text-customviolet">{users?.contacts?.portfolio ? users.contacts.portfolio : ""}</a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full  rounded border border-gray-300 flex flex-col p-4 gap-2">
                            <div className="-w-full flex justify-between">
                                <span className="text-md font-bold">CV</span>
                                <button onClick={() => setresumeModal(true)} className="p-2 border border-customviolet rounded flex justify-center items-center"><FaEdit className="text-sm text-customviolet" /></button>
                            </div>
                            <div className="w-full   flex flex-col gap-4">
                                <div className="w-full h-8 flex flex-col">
                                    <span className={`flex gap-2 justify-start cursor-pointer items-center ${users.cv ? 'text-customviolet' : 'text-gray-500'} `}><IoFileTrayFull className="text-gray-500" />{users?.cv ? users?.cv?.split("/")?.pop()?.split(".")?.shift() : 'Add a pdf'}</span>

                                </div>

                            </div>
                        </div>
                        <div className="w-full  rounded border border-gray-300 flex flex-col p-4 gap-2">
                            <div className="-w-full flex justify-between">
                                <span className="text-md font-bold">Languages</span>
                                <button onClick={() => setAddLangModal(true)} className="p-2 border border-customviolet rounded flex justify-center items-center"><FaPlus className="text-sm text-customviolet" /></button>
                            </div>
                            <div className="w-full   flex flex-col gap-4">
                                <div className="w-full  flex flex-wrap gap-2">
                                    {users.language?.length ? (
                                        <>
                                            {users?.language?.map((item, index) => (
                                                <span key={index} className="flex gap-2 justify-between items-center border border-customviolet p-1 rounded text-customviolet">
                                                    {item}
                                                    <RxCross2 onClick={() => deleteLanguage(item)} className="text-black cursor-pointer" />
                                                </span>

                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            <span>Add Languages</span>
                                        </>
                                    )}

                                </div>

                            </div>
                        </div>
                        <div className="w-full  rounded border border-gray-300 flex flex-col p-4 gap-2">
                            <div className="-w-full flex justify-between">
                                <span className="text-md font-bold">Address</span>
                                <button onClick={()=>setaddressModal(true)} className="p-2 border border-customviolet rounded flex justify-center items-center"><FaEdit className="text-sm text-customviolet" /></button>
                            </div>
                            <div className="w-full   flex flex-col gap-4">
                                {users.address?(

                                <div className="w-full  flex flex-col">
                                
                                    <span className="flex gap-2 justify-start items-center text-gray-500">{users.address.houseNumber}</span>
                                    <span className="flex gap-2 justify-start items-center text-gray-500">{users.address.locality}</span>
                                    <span className="flex gap-2 justify-start items-center text-gray-500">{users.address.city}</span>
                                    <span className="flex gap-2 justify-start items-center text-gray-500">{users.address.state}</span>
                                    <span className="flex gap-2 justify-start items-center text-gray-500">{users.address.country}</span>
                                    <span className="flex gap-2 justify-start items-center text-gray-500">{users.address.pin}</span>

                                </div>
                                ):(
                                    <>
                                    <span>Add Address..</span>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}