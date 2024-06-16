import { styled } from '@mui/material/styles';
import { GoShareAndroid } from "react-icons/go";
import { Stack } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { IJobData } from '@/interfaces/IUser';
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
import { ModeToggle } from '../common/mode-toggle';
import { FaArrowLeft } from "react-icons/fa6";
import { Apply } from './apply';
import { applicantList } from '@/redux/actions/userAction';
import { useToast } from '../ui/use-toast';
import axios from 'axios';
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
    const { toast } = useToast()
    const dispatch = useDispatch<AppDispatch>()
    const [jobData, setJobData] = useState<IJobData | null>(null);
    const { data, loading } = useSelector((state: RootState) => state.job);
    const { user } = useSelector((state: RootState) => state.user);
    const { data: catdata } = useSelector((state: RootState) => state.category)
    const { data: companyData } = useSelector((state: RootState) => state.companyList)
    const { data: applicantLists } = useSelector((state: RootState) => state.applicantList)
    const [applyModal, setApplyModal] = useState(false)
    const [applied, setApplied] = useState(false)


    useEffect(() => {
        dispatch(applicantList())
        const companyId = data?.find((item) => item._id == id)?.companyId
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
        if (!user?.profile || !user.phone) {
            toast({
                description: "Please Update your Profile to Apply!",
                className: "bg-red-500 text-white"
            });
        } else {
            setApplyModal(true)
        }
    }

 
    return (
        <>
            {applyModal && (
                <>
                    <Apply jobId={String(jobData?._id)} handleaddClose={closeJobModal} setApp={setApplied} />
                </>
            )}
            <div className="w-full felx felx-col ">
                {loading && <Loader />}

                <div className="h-[70px]  border-b border-gray-200 flex items-center pl-2 pr-4 justify-between">
                    <span className="text-xl font-bold flex gap-4 justify-center items-center"><FaArrowLeft onClick={back} className='cursor-pointer' />Job Description</span>
                    <ModeToggle />
                </div>
                <div className="w-full  flex justify-center p-6">
                    <div className='w-[90%] h-40  flex border border-gray-300'>
                        <div className='w-[70%] h-full  flex'>
                            <div className='w-[30%] h-full flex justify-center items-center '>
                                <img src={companyData?.find((item) => item._id == jobData?.companyId)?.icon} alt="" className='w-32 ' />
                            </div>
                            <div className=' w-[70%] h-full  flex flex-col justify-center'>
                                <span className='text-4xl font-bold'>{jobData?.job_title}</span>
                                <span className='flex gap-1 text-lg'>
                                    <span>{companyData?.find((item) => item._id === jobData?.companyId)?.company_name}</span>
                                    .<span>
                                        {companyData
                                            ?.filter(item => item._id === jobData?.companyId)
                                            .flatMap(item => item.location)
                                            .map((location, index) => (
                                                <Fragment key={index}>
                                                    {index > 0 && ", "}
                                                    {location}
                                                </Fragment>
                                            ))}
                                    </span>
                                    .<span>{jobData?.type}</span>
                                </span>


                            </div>
                        </div>
                        <div className='w-[30%] h-full  flex justify-center items-center gap-4'>
                            {applied && (
                                <>
                                    <span className='p-1 rounded border border-green-400 text-green-400'>Applied</span>
                                </>
                            )}
                            <div><GoShareAndroid className='text-4xl' /></div>
                            <div className='w-0.5 h-[40%] bg-gray-500'></div>
                            {applied ? (
                                <>
                                    <div><button className='pl-6 pr-6 pt-2 pb-2 bg-customviolet rounded text-white border border-gray-400'>See Application</button></div>
                                </>
                            ) : (
                                <>
                                    <div><button onClick={applyJob} className='pl-6 pr-6 pt-2 pb-2 bg-customviolet rounded text-white border border-gray-400'>Easy Apply</button></div>
                                </>
                            )}

                        </div>
                    </div>
                </div>

                <div className='w-full   flex p-4'>
                    <div className='w-[60%] h-full flex flex-col gap-6'>
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
                    <div className='w-[40%] h-full  flex items-start justify-center'>
                        <div className='w-[70%] flex flex-col item-center gap-6'>
                            <span className='text-xl font-bold'>About this role</span>
                            <div className='w-[80%]  bg-gray-200 p-2'>
                                <span className='flex gap-1 text-gray-500'><span className='font-bold text-black'>5 applied</span>of {jobData?.slot} capacity</span>
                                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                    <BorderLinearProgress variant="determinate" value={50} />
                                </Stack>
                            </div>
                            <div className='w-[80%] flex '>
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
                            <div className='flex flex-col w-full gap-1'>
                                <span className='font-bold'>Category</span>
                                <div className='w-full justify-center items-center  '><span className='p-2 border border-gray-400 rounded bg-green-200 text-green-800'>{catdata?.find((item) => item._id == jobData?.category)?.category}</span></div>
                            </div>
                            <div className='flex flex-col w-full gap-1'>
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

