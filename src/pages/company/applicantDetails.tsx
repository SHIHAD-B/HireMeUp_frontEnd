import { CompanyHeader } from "@/components/company/header"
import { FaArrowLeft, FaInstagram } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { CiLinkedin, CiTwitter } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { SiWebmoney } from "react-icons/si";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { IApplicants, IUsers } from "@/interfaces/IUser";
import { useLocation, useNavigate } from "react-router-dom";
import { fecthJob } from "@/redux/actions/jobAction";
import { CfetchCategory, companyApplicantList, companyFetchSchedule, listcompanyUsers } from "@/redux/actions/companyAction";
import { ChatList } from "@/redux/actions/userAction";
import { BASE_URL } from "@/interfaces/config/constant";
import axios from "axios";
import { ScheduleModal } from "@/components/company/scheduleModal";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AddNotesModal } from "@/components/company/addNotes";


interface ScheduleItem {
    date: string;
    interviewer: string;
    status: string;
}

export const ApplicantDetails = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation();
    const id = location.state?.id;
    const { data: company } = useSelector((state: RootState) => state.company)
    const { data: applicants } = useSelector((state: RootState) => state.applicantList)
    const company_Id = useSelector((state: RootState) => state.company.data?._id)
    const { data: user } = useSelector((state: RootState) => state.usersList)
    const { data: jobs } = useSelector((state: RootState) => state.job)
    const { data: category } = useSelector((state: RootState) => state.category)
    const { data: schedule } = useSelector((state: RootState) => state.schedule)
    const { data: chat } = useSelector((state: RootState) => state.chat)
    const [applicantDetails, setApplicantDetails] = useState<IApplicants>()
    const [page, setPage] = useState("")
    const [scheduleModal, setScheduleModal] = useState(false)
    const [addNotes, setAddNotes] = useState(false)

    useEffect(() => {
        const fetchData = () => {
            dispatch(fecthJob(company_Id));
            dispatch(companyApplicantList(String(company_Id)))
            dispatch(listcompanyUsers())
            dispatch(listcompanyUsers())
            dispatch(CfetchCategory());
            dispatch(ChatList(String(company?._id)))
            dispatch(companyFetchSchedule(String(company?._id)))
        };

        fetchData();
    }, []);

    const handleUpdateStatus = async (schId: string, status: string) => {
        setAnchorEl(null);
        const data = {
            id: schId,
            status: status
        }
        await axios.patch(`${BASE_URL}job/company/updateschedulestatus`, data, { withCredentials: true }).then(() => {
            dispatch(companyFetchSchedule(String(company?._id)))
        })
    };

    const close = () => {
        setScheduleModal(false)
        setAddNotes(false)
    }
    const chatwithUser = async (userId: string) => {
        const data = {
            sender: company?._id,
            receiver: userId
        }

        const already = chat?.find((item) =>
            item.participants.includes(String(company?._id)) && item.participants.includes(userId)
        );
        if (already) {
            navigate('/company/chat')
            return

        }

        await axios.post(`${BASE_URL}chat/company/createroom`, data, { withCredentials: true }).then(() => {
            navigate('/company/chat')
        }).catch((error: any) => {
            console.log(error)
        })
    }

    useEffect(() => {
        const application = applicants?.find((item) => item._id == id)
        if (application) {
            setApplicantDetails(application as IApplicants)
        }
    }, [])

    const handlePage = (page: string) => {
        setPage(page)
    }
    const parseDate = (dateString: string) => new Date(dateString);

    const getNextSchedule = (schedule: ScheduleItem[]) => {
        const today = new Date();


        const filteredSchedule = schedule?.filter(item => parseDate(item.date) >= today);


        const sortedSchedule = filteredSchedule?.sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());

        if (sortedSchedule?.length === 0) {
            return null;
        }


        const nextShow = sortedSchedule?.find(item => parseDate(item.date) > today);


        return nextShow || sortedSchedule && sortedSchedule[0];
    };

    const scheduelfitleredData = schedule?.filter((item) => item.companyId == applicantDetails?.companyId && item.userId == applicantDetails?.userId && item.jobId == applicantDetails?.jobId)

    const nextSchedule = getNextSchedule(scheduelfitleredData as unknown as ScheduleItem[]);


    return (
        <>
            {addNotes && <AddNotesModal id={String(applicantDetails?._id)} close={close} setApplicantDetails={setApplicantDetails} />}
            {scheduleModal && <ScheduleModal id={String(applicantDetails?.userId)} jobId={String(applicantDetails?.jobId)} close={close} />}
            <div className="w-full flex-col bg-white">
                <div className=" w-full flex">

                    <div className="flex flex-col w-full gap-4">
                        <CompanyHeader />
                        <div className="w-full flex justify-between">
                            <div className="flex lg:flex-col p-1">
                                <span className="font-bold flex gap-4 justify-center items-center"><FaArrowLeft className="cursor-pointer" />Applicant Details</span>

                            </div>


                        </div>
                        <div className="w-full   flex">
                            <div className="w-[40%] h-full  flex justify-center pt-4 pb-4 ">
                                <div className="w-[95%] h-full  flex flex-col border rounded border-gray-300">
                                    <div className="w-full   flex mt-1">
                                        <div className="w-[40%] h-full flex justify-center items-center ">
                                            <img src={applicantDetails?.userId ?
                                                (user as unknown as IUsers[])?.find((item) => item?._id === applicantDetails?.userId)?.profile :
                                                ''} className="w-28 h-28 rounded-full bg-black object-cover" alt="" />
                                        </div>
                                        <div className="w-[60%] h-full  flex flex-col justify-center">

                                            <span className="text-xl font-bold">{applicantDetails?.userId ?
                                                (user as unknown as IUsers[])?.find((item) => item?._id === applicantDetails?.userId)?.username :
                                                ''}</span>
                                        </div>
                                    </div>
                                    <div className="w-full  p-2 flex flex-col gap-2 ">
                                        <div className="w-full  rounded bg-gray-100 flex flex-col">
                                            <div className="flex p-2 justify-between">
                                                <span>Applied Jobs</span>
                                                <span className="text-sm text-gray-400">{applicantDetails?.createdAt ? new Date(applicantDetails.createdAt).toDateString() : ""}</span>
                                            </div>
                                            <div className="w-full flex flex-col p-2">
                                                <span className="text-md font-bold">{applicantDetails?.jobId ? jobs?.find((item) => item._id == applicantDetails.jobId)?.job_title : ""}</span>

                                                <span className="text-sm text-gray-400">{applicantDetails ? category?.find((item) => item._id == applicantDetails?.jobId ? jobs?.find((item) => item._id == applicantDetails.jobId)?.category : "null")?.category : ""} . {applicantDetails?.jobId ? jobs?.find((item) => item._id == applicantDetails.jobId)?.type : ""}</span>
                                            </div>
                                        </div>
                                        <div className="w-full   flex flex-col gap-1">
                                            <div className="flex justify-between p-2">
                                                <span className="text-sm">Stage</span>
                                                <span className="text-sm text-customviolet">{applicantDetails?.hiring_status}</span>
                                            </div>
                                            <div className="w-full flex gap-0.5 p-2">

                                                <div className={`w-1/4 h-3 ${applicantDetails?.hiring_status == "in-review" || applicantDetails?.hiring_status == "shortlisted" || applicantDetails?.hiring_status == "interview" || applicantDetails?.hiring_status == "hired" ? 'bg-customviolet' : 'bg-gray-400'}`}></div>
                                                <div className={`w-1/4 h-3 ${applicantDetails?.hiring_status == "shortlisted" || applicantDetails?.hiring_status == "interview" || applicantDetails?.hiring_status == "hired" ? 'bg-customviolet' : 'bg-gray-400'}`}></div>
                                                <div className={`w-1/4 h-3 ${applicantDetails?.hiring_status == "interview" || applicantDetails?.hiring_status == "hired" ? 'bg-customviolet' : 'bg-gray-400'}`}></div>
                                                <div className={`w-1/4 h-3 ${applicantDetails?.hiring_status == "hired" ? 'bg-customviolet' : 'bg-gray-400'}`}></div>


                                            </div>
                                        </div>
                                        <div className="w-full   gap-1 flex justify-center items-center">
                                            <button onClick={() => setScheduleModal(true)} className="p-4 hover:bg-customviolet hover:text-white border border-customviolet rounded font-bold text-customviolet "> Schedule Interview</button>
                                            <button onClick={() => chatwithUser(String((user as unknown as IUsers[])?.find((item) => item?._id === applicantDetails?.userId)?._id))} className="p-4 hover:bg-customviolet hover:text-white border border-customviolet rounded flex justify-center items-center text-customviolet"><AiOutlineMessage className="text-2xl" /></button>
                                        </div>
                                        <div className="w-full  flex">

                                            <div className="w-full   flex flex-col gap-4 p-4 ">
                                                <span className="text-md font-bold">Contact</span>
                                                <div className="w-full  flex flex-col ">
                                                    <span className="flex gap-2 justify-start items-center text-gray-500"><MdEmail />Email</span>
                                                    <a href={applicantDetails?.userId ?
                                                        (user as unknown as IUsers[])?.find((item) => item?._id === applicantDetails?.userId)?.email :
                                                        ''} className="text-sm break-words text-customviolet">{applicantDetails?.userId ?
                                                            (user as unknown as IUsers[])?.find((item) => item?._id === applicantDetails?.userId)?.email :
                                                            ''}</a>
                                                </div>
                                                <div className="w-full  flex flex-col">
                                                    <span className="flex gap-2 justify-start items-center text-gray-500"><FaInstagram />Instagram</span>
                                                    <a href={applicantDetails?.userId ?
                                                        (user as unknown as IUsers[])?.find((item) => item?._id === applicantDetails?.userId)?.contacts?.instagram :
                                                        ''} className="text-sm break-words text-customviolet">{applicantDetails?.userId ?
                                                            (user as unknown as IUsers[])?.find((item) => item?._id === applicantDetails?.userId)?.contacts?.instagram :
                                                            ''}</a>
                                                </div>
                                                <div className="w-full  flex flex-col">
                                                    <span className="flex gap-2 justify-start items-center text-gray-500"><CiLinkedin />Linkedin</span>
                                                    <a href={applicantDetails?.userId ?
                                                        (user as unknown as IUsers[])?.find((item) => item?._id === applicantDetails?.userId)?.contacts?.linkedin :
                                                        ''} className="text-sm break-words text-customviolet">{applicantDetails?.userId ?
                                                            (user as unknown as IUsers[])?.find((item) => item?._id === applicantDetails?.userId)?.contacts?.linkedin :
                                                            ''}</a>
                                                </div>
                                                <div className="w-full  flex flex-col">
                                                    <span className="flex gap-2 justify-start items-center text-gray-500"><CiTwitter />Twitter</span>
                                                    <a href={applicantDetails?.userId ?
                                                        (user as unknown as IUsers[])?.find((item) => item?._id === applicantDetails?.userId)?.contacts?.twitter :
                                                        ''} className="text-sm break-words text-customviolet">{applicantDetails?.userId ?
                                                            (user as unknown as IUsers[])?.find((item) => item?._id === applicantDetails?.userId)?.contacts?.twitter :
                                                            ''}</a>
                                                </div>
                                                <div className="w-full  flex flex-col">
                                                    <span className="flex gap-2 justify-start items-center text-gray-500"><SiWebmoney />Portfolio</span>
                                                    <a href={applicantDetails?.userId ?
                                                        (user as unknown as IUsers[])?.find((item) => item?._id === applicantDetails?.userId)?.contacts?.portfolio :
                                                        ''} className="text-sm break-words text-customviolet">{applicantDetails?.userId ?
                                                            (user as unknown as IUsers[])?.find((item) => item?._id === applicantDetails?.userId)?.contacts?.portfolio :
                                                            ''}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-[60%]   flex justify-center  p-4">
                                <div className="w-[98%]  border border-gray-300 rounded flex flex-col gap-2">
                                    <div className="w-full h-16  flex gap-4 p-2 items-center border-b border-gray-300">
                                        <span onClick={() => handlePage("")} className={` cursor-pointer ${page == "" && 'border-b-4 border-customviolet'}  text-sm font-bold`}>Applicant Profile</span>
                                        <span onClick={() => handlePage("resume")} className={` cursor-pointer ${page == "resume" && 'border-b-4 border-customviolet'} text-sm font-bold`}>Resume</span>
                                        <span onClick={() => handlePage("questions")} className={` cursor-pointer ${page == "questions" && 'border-b-4 border-customviolet'} text-sm font-bold`}>Questions</span>
                                        <span onClick={() => handlePage("hiring")} className={` cursor-pointer ${page == "hiring" && 'border-b-4 border-customviolet'} text-sm font-bold`}>Hiring Progress</span>
                                        <span onClick={() => handlePage("interview")} className={` cursor-pointer ${page == "interview" && 'border-b-4 border-customviolet'} text-sm font-bold`}>Interview Schedule</span>
                                    </div>

                                    {page == "" && (


                                        <div className="w-full  bg-white flex flex-col gap-2">
                                            <div className="w-full  flex">
                                                <div className="w-1/3 h-full  flex flex-col p-2 gap-1">
                                                    <span className="text-md font-bold mb-4">Personal Info</span>
                                                    <span className="text-sm ">Full Name</span>
                                                    <span className="text-sm font-bold">{applicantDetails?.userId ? user?.find((item) => item._id == applicantDetails.userId)?.username : ""}</span>
                                                    <span className="text-sm mt-2">Date of Birth</span>
                                                    <span className="text-sm font-bold">{applicantDetails?.userId ?
                                                        (() => {
                                                            const userItem = user?.find((item) => item._id === applicantDetails.userId);
                                                            const dob = userItem?.dob;
                                                            return dob ? new Date(dob).toDateString() : "";
                                                        })()
                                                        : ""}</span>
                                                    <span className="text-sm mt-2">Address</span>
                                                    <span className="w-[95%] text-sm font-bold">{applicantDetails?.userId ? user?.find((item) => item._id == applicantDetails.userId)?.address?.houseNumber : ""}</span>
                                                    <span className="w-[95%] text-sm font-bold">{applicantDetails?.userId ? user?.find((item) => item._id == applicantDetails.userId)?.address?.locality : ""}</span>
                                                    <span className="w-[95%] text-sm font-bold">{applicantDetails?.userId ? user?.find((item) => item._id == applicantDetails.userId)?.address?.city : ""}</span>
                                                    <span className="w-[95%] text-sm font-bold">{applicantDetails?.userId ? user?.find((item) => item._id == applicantDetails.userId)?.address?.state : ""}</span>
                                                    <span className="w-[95%] text-sm font-bold">{applicantDetails?.userId ? user?.find((item) => item._id == applicantDetails.userId)?.address?.country : ""}</span>
                                                    <span className="w-[95%] text-sm font-bold">{applicantDetails?.userId ? user?.find((item) => item._id == applicantDetails.userId)?.address?.pin : ""}</span>

                                                </div>
                                                <div className="w-1/3 h-full flex flex-col p-2 gap-1">
                                                    <span className="text-sm mt-12">Gender</span>
                                                    <span className="text-sm font-bold">{applicantDetails?.userId ? user?.find((item) => item._id == applicantDetails.userId)?.gender : ""}</span>

                                                    <span className="text-sm mt-2">Language</span>
                                                    {applicantDetails?.userId ? user?.find((item) => item._id == applicantDetails.userId)?.language?.map((item) => (

                                                        <span className="text-sm font-bold">{item}</span>
                                                    )) : ""}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="w-full h-64  flex flex-col p-2 gap-1">
                                                <span className="text-md font-bold mb-4">Professional Info</span>
                                                <span className="text-sm text-gray-400">About Me</span>
                                                <p>{applicantDetails?.userId ? user?.find((item) => item._id == applicantDetails.userId)?.about : ""}</p>
                                            </div>
                                            <div className="w-full   flex p-2 ">
                                                <div className="w-1/2   flex flex-col p-2 gap-1">
                                                    <span className="text-sm ">Last Job</span>
                                                    <span className="text-sm font-bold">{applicantDetails?.userId ?
                                                        user?.find((item: any) => item?._id === applicantDetails?.userId)?.experiences?.[0]?.designation ?? "No Experience"
                                                        : ""}
                                                    </span>
                                                    <span className="text-sm mt-4">Highest Qualification Held</span>
                                                    <span className="text-sm font-bold">{applicantDetails?.userId ?
                                                        user?.find((item: any) => item?._id === applicantDetails?.userId)?.education?.[0]?.grade ?? ""
                                                        : ""}
                                                    </span>
                                                </div>
                                                <div className="w-1/2   flex flex-col p-2 gap-1">
                                                    <span className="text-sm ">Experience in Years</span>
                                                    <span className="text-sm font-bold">4 years</span>
                                                    <span className="text-sm mt-4">Skill Set</span>
                                                    <div className="text-sm font-bold flex flex-wrap gap-1">
                                                        {applicantDetails?.userId ? user?.find((item) => item._id == applicantDetails.userId)?.skills?.map((item) => (

                                                            <span className="p-1 rounded border border-customviolet text-customviolet">{item}</span>
                                                        )) : ""}

                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    )}
                                    {page == "resume" && (
                                        <div className="w-full h-full  p-4">
                                            <iframe src={applicantDetails?.userId ? String(user?.find((item) => item._id == applicantDetails?.userId)?.cv) : ""} className="w-full h-full"></iframe>
                                        </div>
                                    )}

                                    {page == "questions" && (
                                        <div className="w-full flex flex-col p-2 gap-2">
                                            {jobs?.find((item) => item._id == applicantDetails?.jobId)?.questions.length ? (
                                                <>
                                                    {jobs?.find((item) => item._id == applicantDetails?.jobId)?.questions?.map((question, index) => {
                                                        const answerKey = `question_${index}`;
                                                        const answerObject: any = applicantDetails?.answers?.find((answer) => answer.hasOwnProperty(answerKey));
                                                        const answerText = answerObject ? answerObject[answerKey] : 'Answer not found';

                                                        return (
                                                            <div key={index} className="mb-4">
                                                                <span className="font-bold">{index + 1}. {question}</span>
                                                                <div>
                                                                    <span className="font-bold">a. </span>
                                                                    <span>{answerText}</span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </>
                                            ) : (
                                                <>
                                                <span className="w-full flex justify-center">No Questions were asked</span>
                                                </>
                                            )}
                                        </div>
                                    )}


                                    {page == "hiring" && (
                                        <div className="w-full flex flex-col">
                                            <div className="w-full p-4 flex flex-col gap-1">
                                                <span className="font-bold text-sm mb-4">Stage Info</span>

                                                <span className="text-sm text-gray-400">Interview Date</span>
                                                <span className="text-sm">   {nextSchedule ? new Date(nextSchedule.date).toLocaleString() : 'No upcoming schedules'}</span>
                                                <span className="text-sm text-gray-400 mt-2">interviewer</span>
                                                <span className="text-sm"> {nextSchedule ? nextSchedule.interviewer : 'N/A'}</span>
                                                <span className="text-sm text-gray-400 mt-2">status</span>
                                                <span className="text-sm p-1 border border-yellow-400 w-24 flex justify-center items-center rounded text-yellow-400 ">{nextSchedule ? nextSchedule?.status : 'N/A'}</span>
                                            </div>
                                            <hr />
                                            <div className="w-full   flex flex-col p-2 gap-2">
                                                <div className="flex w-full justify-between p-1">
                                                    <span className="text-md font-bold">Notes</span>
                                                    <button onClick={() => setAddNotes(true)} className="p-2 border border-customviolet rounded text-sm text-customviolet hover:text-white hover:bg-customviolet flex gap-1 justify-center items-start"><FaPlus />Add Notes</button>
                                                </div>
                                                {applicantDetails?.hiring_info?.length ? (
                                                    <>

                                                        {applicantDetails?.hiring_info?.map((item, index) => (

                                                            <div key={index} className="w-full p-1 flex flex-col border border-gray-400 rounded">
                                                                <span className="font-bold text-sm">{item.name}</span>
                                                                <span className="text-sm text-gray-400">{item.notes}</span>
                                                            </div>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="w-full flex  justify-center items-center">No Notes</span>
                                                    </>
                                                )}


                                            </div>
                                        </div>
                                    )}

                                    {page == "interview" && (
                                        <div className="w-full flex flex-col p-4">
                                            <div className="w-full p-1 flex justify-between">
                                                <span className="text-md font-bold">InterviewList</span>

                                            </div>
                                            {schedule?.filter((item) => item.companyId == applicantDetails?.companyId && item.userId == applicantDetails?.userId && item.jobId == applicantDetails?.jobId).length ? (
                                                <>
                                                    {schedule?.filter((item) => item.companyId == applicantDetails?.companyId && item.userId == applicantDetails?.userId && item.jobId == applicantDetails?.jobId)?.map((item, index) => (

                                                        <div key={index} className="w-full flex flex-col gap-2">
                                                            <div className="w-full flex border border-gray-400 rounded p-4">
                                                                <div className="w-1/3 flex flex-col  justify-center">
                                                                    <span className="text-sm font-bold">{item?.interviewer}</span>
                                                                    <span className="text-sm text-gray-400">{item?.title}</span>
                                                                </div>
                                                                <div className="w-1/3 flex flex-col justify-center">
                                                                    {item?.date ? new Date(item.date).toLocaleDateString() : 'No Date Available'}
                                                                    <span className="text-sm text-gray-400">{item?.status}</span>
                                                                </div>
                                                                <div className="w-1/3 flex flex-col  justify-center">

                                                                    <button onClick={handleClick} className="p-1 border border-customviolet rounded text-customviolet hover:text-white hover:bg-customviolet flex gap-2 justify-center items-center"><FaEdit />Change Status</button>
                                                                    <Menu
                                                                        id="basic-menu"
                                                                        anchorEl={anchorEl}
                                                                        open={open}
                                                                        MenuListProps={{
                                                                            'aria-labelledby': 'basic-button',
                                                                        }}
                                                                    >
                                                                        <MenuItem onClick={() => handleUpdateStatus(String(item._id), "upcomming")}>upcomming</MenuItem>
                                                                        <MenuItem onClick={() => handleUpdateStatus(String(item._id), "re-scheduled")}>re-scheduled</MenuItem>
                                                                        <MenuItem onClick={() => handleUpdateStatus(String(item._id), "completed")}>completed</MenuItem>
                                                                        <MenuItem onClick={() => handleUpdateStatus(String(item._id), "cancelled")}>cancelled</MenuItem>
                                                                    </Menu>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <>
                                                    <span className="w-full flex justify-center">No interviews</span>
                                                </>
                                            )}

                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}