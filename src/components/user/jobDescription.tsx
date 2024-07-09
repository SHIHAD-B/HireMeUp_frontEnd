import { styled } from '@mui/material/styles';
import { GoShareAndroid } from "react-icons/go";
import { Stack } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { IApplicants, IJobData } from '@/interfaces/IUser';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { Loader } from '../common/loader';
import { BiBarcodeReader, BiCctv, BiSolidImageAdd } from 'react-icons/bi';
import { AiFillBulb, AiFillAlert, AiFillDingtalkCircle, AiFillGift, AiOutlineEdit, AiOutlineSlack } from 'react-icons/ai';
import { BsAirplaneFill } from 'react-icons/bs';
import { CgArrangeBack, CgAdidas, CgAbstract } from 'react-icons/cg';
import { DiCoda, DiBingSmall, DiCssdeck } from 'react-icons/di';
import { FaHourglassEnd, FaClock, FaGlassCheers } from 'react-icons/fa';
import { FiAward, FiFeather, FiMoon, FiMonitor, FiTool } from 'react-icons/fi';
import { GiCash } from 'react-icons/gi';
import { LuBaggageClaim } from 'react-icons/lu';
import { MdOutlineHealthAndSafety, MdAssistantNavigation } from 'react-icons/md';
import { PiBagFill } from 'react-icons/pi';
import { SiGoogleassistant } from 'react-icons/si';
import { TbBrandMiniprogram } from 'react-icons/tb';
import { Apply } from './apply';
import { applicantList } from '@/redux/actions/userAction';
import { useToast } from '../ui/use-toast';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserHeader } from './header';
import { Unauth_header } from './unauth-header';

interface JobDescriptionProps {
    id: string;
    back: () => void;
}
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 0,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 0,
        backgroundColor: theme.palette.mode === 'light' ? '#56CDAD' : '#D6DDEB',
    },
}));

const icons = [
    <BiSolidImageAdd />,
    <MdOutlineHealthAndSafety />,
    <FaHourglassEnd />,
    <FaClock />,
    <GiCash />,
    <FaGlassCheers />,
    <TbBrandMiniprogram />,
    <AiFillBulb />,
    <LuBaggageClaim />,
    <PiBagFill />,
    <SiGoogleassistant />,
    <MdAssistantNavigation />,
    <BsAirplaneFill />,
    <AiFillAlert />,
    <AiFillDingtalkCircle />,
    <AiFillGift />,
    <AiOutlineEdit />,
    <CgArrangeBack />,
    <CgAdidas />,
    <CgAbstract />,
    <FiAward />,
    <FiFeather />,
    <FiMoon />,
    <FiMonitor />,
    <FiTool />,
    <AiOutlineSlack />,
    <BiBarcodeReader />,
    <BiCctv />,
    <DiCoda />,
    <DiBingSmall />,
    <DiCssdeck />
]

export const JobDescription: React.FC<JobDescriptionProps> = ({ id, back }) => {
    back
    const { toast } = useToast()
    const dispatch = useDispatch<AppDispatch>()
    const [jobData, setJobData] = useState<IJobData | null>(null);
    const { data, loading } = useSelector((state: RootState) => state.job);
    const { data: schedules } = useSelector((state: RootState) => state.schedule);
    const { user } = useSelector((state: RootState) => state.user);
    const { data: catdata } = useSelector((state: RootState) => state.category)
    const { data: companyData } = useSelector((state: RootState) => state.companyList)
    const { data: applicantLists } = useSelector((state: RootState) => state.applicantList)
    const [applyModal, setApplyModal] = useState(false)
    const [applied, setApplied] = useState(false)
    const { data: jobs } = useSelector((state: RootState) => state.job);
    const [selectedApplication, setSelectedApplication] = useState<IApplicants | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    useEffect(() => {
        dispatch(applicantList())
        const companyId = data?.find((item: any) => item._id == id)?.companyId
        const alreadyApplied = applicantLists?.find((item: any) => item.userId == user?._id && item.jobId == id && item.companyId == companyId)
        if (alreadyApplied) {
            setApplied(true)
        }
    }, [])

    useEffect(() => {

        if (data) {
            const spec = data.filter((item: IJobData) => item._id === id);
            setJobData(spec.length > 0 ? spec[0] : null);
        }
    }, [data, id]);

    const closeJobModal = () => {
        setApplyModal(false)
    }
    const applyJob = () => {
        if (!user?.profile || !user.phone || !user.gender || !user.education || user.skills?.length == 0 || !user.language || !user.dob || !user.about || !user.address) {
            toast({
                description: "Please Update your Profile to Apply!",
                className: "bg-red-500 text-white"
            });
        } else {
            setApplyModal(true)
        }
    }

    const handleViewMoreClick = (application: IApplicants) => {
        setSelectedApplication(application);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedApplication(null);
    };

    return (
        <>
            {applyModal && (
                <>
                    <Apply jobId={String(jobData?._id)} handleaddClose={closeJobModal} setApp={setApplied} />
                </>
            )}
            <div className="w-full felx felx-col ">
                {loading && <Loader />}

                {!user?.email && (
                    <Unauth_header />
                )}
                <UserHeader prop="Job Description" />
                <div className="w-full  flex justify-center p-2">
                    <div className='lg:w-[90%] w-[99%] h-40  flex border border-gray-300'>
                        <div className='w-[70%] h-full  flex'>
                            <div className='w-[30%] h-full flex justify-center items-center '>
                                <img src={companyData?.find((item: any) => item._id == jobData?.companyId)?.icon} alt="" className='w-32 ' />
                            </div>
                            <div className=' w-[70%] h-full  flex flex-col justify-center pl-2'>
                                <span className='lg:text-4xl tex-md font-bold'>{jobData?.job_title}</span>
                                <span className='flex gap-1 text-lg flex-wrap'>
                                    <span className=''>{companyData?.find((item: any) => item._id === jobData?.companyId)?.company_name}</span>
                                    .<span className='lg:text-lg text-sm'>
                                        {companyData
                                            ?.filter((item: any) => item._id === jobData?.companyId)
                                            .flatMap((item: any) => item.location)
                                            .map((location: any, index: any) => (
                                                <Fragment key={index}>
                                                    {index > 0 && ", "}
                                                    {location}
                                                </Fragment>
                                            ))}
                                    </span>
                                    .<span className='lg:text-lg text-sm'>{jobData?.type}</span>
                                </span>


                            </div>
                        </div>
                        <div className='w-[30%] h-full  flex flex-col lg:flex-row justify-center items-center gap-4'>
                            {applied && (
                                <>
                                    <span className='p-1 rounded border lg:text-base text-xs border-green-400 text-green-400'>Applied</span>
                                </>
                            )}
                            <div><GoShareAndroid className='lg:text-4xl text:xl' /></div>
                            <div className=' hidden lg:block w-0.5 h-[40%] bg-gray-500'></div>
                            {applied ? (
                                <>
                                    <div><button onClick={() => handleViewMoreClick(applicantLists?.find((item: any) => item.userId == user?._id && item.jobId == id && item.companyId == data?.find((item: any) => item._id == id)?.companyId) as IApplicants)} className='lg:pl-6 lg:pr-6 lg:pt-2 lg:pb-2 p-1 bg-customviolet rounded text-white border border-gray-400 lg:text-lg text-xs'>See Application</button></div>
                                </>
                            ) : (
                                <>
                                    <div><button onClick={applyJob} className='lg:pl-6 lg:pr-6 lg:pt-2 lg:pb-2 p-1 bg-customviolet rounded text-white border border-gray-400 text-sm'>Easy Apply</button></div>
                                </>
                            )}

                        </div>
                    </div>
                </div>
                <AlertDialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Application Details</AlertDialogTitle>
                            <AlertDialogDescription>

                                <div>
                                    <p><strong>Company Name:</strong> {companyData?.find((item: any) => item._id == selectedApplication?.companyId)?.company_name}</p>
                                    <p><strong>Role:</strong> {jobs?.find((item: any) => item._id == selectedApplication?.jobId)?.job_title}</p>
                                    <p><strong>Date Applied:</strong> {selectedApplication?.createdAt ? new Date(selectedApplication?.createdAt).toDateString() : ""}</p>
                                    <p className='mb-4'><strong>Status:</strong> {selectedApplication?.hiring_status}</p>
                                    {schedules?.length && (
                                        <>
                                            <span className="font-bold underline">Interview Details</span>
                                            {schedules.filter((item: any) => item.jobId == selectedApplication?.jobId).map((item: any, index: any) => (
                                                <>
                                                    <div key={index} className="mt-2">
                                                        <p><strong>Title:</strong> {item.title}</p>
                                                        <p><strong>Date:</strong> {new Date(String(item?.date)).toLocaleString()}</p>
                                                        <p><strong>Status:</strong> {item.status}</p>

                                                    </div>
                                                </>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={handleCloseDialog}>Close</AlertDialogCancel>
                            <AlertDialogAction className="bg-customviolet hover:bg-white hover:text-black">Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <div className='w-full lg:flex  p-4'>
                    <div className='lg:w-[60%] w-full h-full flex flex-col gap-6'>
                        <div className='w-full flex flex-col gap-2'>
                            <span className='text-xl font-bold'>Description</span>
                            <span>{jobData?.description}</span>
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <span className='text-xl font-bold'>Responsibilities</span>
                            <span>{jobData?.responsibilities}</span>
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <span className='text-xl font-bold'>Requirements</span>
                            <span>{jobData?.requirements}</span>
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <span className='text-xl font-bold'>Qualification</span>
                            <span>{jobData?.qualification}</span>
                        </div>
                    </div>
                    <div className='lg:w-[40%] w-full h-full  flex items-start justify-center'>
                        <div className='lg:w-[70%] w-full items-center flex flex-col item-center gap-6'>
                            <span className='text-xl font-bold'>About this role</span>
                            <div className='w-[80%]  bg-gray-200 p-2'>
                                <span className='flex gap-1 text-gray-500'><span className='font-bold text-black'>5 applied</span>of {jobData?.slot} capacity</span>
                                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                    <BorderLinearProgress variant="determinate" value={50} />
                                </Stack>
                            </div>
                            <div className='lg:w-[80%] w-full flex justify-center'>
                                <div className='w-[50%]  flex flex-col gap-2'>
                                    <span>Apply Before</span>
                                    <span>Job Posted On</span>
                                    <span>Job Type</span>
                                    <span>Salary</span>
                                </div>
                                <div className='w-[50%]  flex flex-col gap-2 items-end'>
                                    <span className='font-bold'> {jobData?.end_date ? new Date(jobData.end_date).toDateString() : "No end date available"}</span>
                                    <span className='font-bold'>{jobData?.end_date ? new Date(jobData.createdAt).toDateString() : "No end create date available"}</span>
                                    <span className='font-bold'>{jobData?.type}</span>
                                    <span className='font-bold'>₹{jobData?.salary_from}-₹{jobData?.salary_to}</span>
                                </div>

                            </div>
                            <hr />
                            <div className='flex flex-col w-full items-center gap-1'>
                                <span className='font-bold'>Category</span>
                                <div className='w-full flex items-center justify-center   '><span className='p-2 border border-gray-400 rounded bg-green-200 text-green-800'>{catdata?.find((item: any) => item._id == jobData?.category)?.category}</span></div>
                            </div>
                            <div className='flex flex-col w-full items-center gap-1'>
                                <span className='font-bold'>Required Skills</span>
                                <div className='w-fulljustify-center items-center flex flex-wrap gap-1'>
                                    {jobData && jobData.required_skills.map((key, index) => (
                                        <span key={index} className='p-2 border border-gray-400 rounded bg-customviolet text-white'>
                                            {key}
                                        </span>
                                    ))}


                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <span className='text-xl font-bold pl-4 w-full pt-16'>Benefits</span>
                <div className="w-full justify-center lg:justify-start flex gap-4 flex-wrap p-2">
                    {jobData && jobData.benefits.map((key, index) => (
                        <div key={index} className="flex flex-col gap-1 p-2 border w-[300px] h-[300px] border-gray-400">
                            <div className="w-full h-1/6 flex justify-between items-center text-4xl text-customviolet">
                                {icons[key.icon]}
                            </div>
                            <div className="w-full h-5/6 overflow-hidden">
                                <div className="h-full overflow-y-scroll">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold text-customviolet">{key.name}</span>
                                        <span>{key.description}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>




            </div>
        </>
    )
}

