import { CompanySideBar } from "@/components/company/companySideBar";
import { CompanyHeader } from "@/components/company/header";
import { FaArrowLeft } from "react-icons/fa6";
import { Bs1Circle } from "react-icons/bs";
import { Bs2Circle } from "react-icons/bs";
import { Bs3Circle } from "react-icons/bs";
import Slider from '@mui/material/Slider';
import { ChangeEvent, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Footer } from "@/components/user/footer";
import { BiSolidImageAdd } from "react-icons/bi";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { IJobData } from "@/interfaces/IUser";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaHourglassEnd } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { FaGlassCheers } from "react-icons/fa";
import { TbBrandMiniprogram } from "react-icons/tb";
import { AiFillBulb } from "react-icons/ai";
import { LuBaggageClaim } from "react-icons/lu";
import { PiBagFill } from "react-icons/pi";
import { SiGoogleassistant } from "react-icons/si";
import { MdAssistantNavigation } from "react-icons/md";
import { BsAirplaneFill } from "react-icons/bs";
import { AiFillAlert } from "react-icons/ai";
import { AiFillDingtalkCircle } from "react-icons/ai";
import { AiFillGift } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { CgArrangeBack } from "react-icons/cg";
import { CgAdidas } from "react-icons/cg";
import { CgAbstract } from "react-icons/cg";
import { FiAward } from "react-icons/fi";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FiFeather } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { FiMonitor } from "react-icons/fi";
import { FiTool } from "react-icons/fi";
import { AiOutlineSlack } from "react-icons/ai";
import { BiBarcodeReader } from "react-icons/bi";
import { BiCctv } from "react-icons/bi";
import { DiCoda } from "react-icons/di";
import { DiBingSmall } from "react-icons/di";
import { DiCssdeck } from "react-icons/di";
import { addJobValidation } from "@/utils/validations/company/jobValidation";
import dayjs from 'dayjs';
import { useToast } from '@/components/ui/use-toast';
import { Loader } from '../../components/common/loader';
import axios from "axios";
import { BASE_URL } from "@/interfaces/config/constant";
import { useNavigate } from "react-router-dom";
import { CfetchCategory } from "@/redux/actions/companyAction";




function valuetext(value: number) {
    return `${value}°C`;
}


export const PostJob = () => {
    const navigate = useNavigate()
    const { toast } = useToast()
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
    const [icon, setIcon] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { data } = useSelector((state: RootState) => state.category)
    const company = useSelector((state: RootState) => state.company.data)
    const { loading } = useSelector((state: RootState) => state.job)

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(CfetchCategory());
        };

        fetchData();

    }, []);


    const [page, setPage] = useState('one')
    const [jobData, setJobData] = useState<Partial<IJobData>>({
        companyId: String(company?._id),
        job_title: "",
        type: "",
        salary_from: 0,
        salary_to: 0,
        category: "",
        required_skills: [],
        description: "",
        responsibilities: "",
        questions: [],
        qualification: "",
        requirements: "",
        benefits: [],
        location:"",
        slot: 0,
        start_date: "",
        end_date: "",
        level: "",
        createdAt: new Date()
    })
    const [skill, setSkill] = useState("")
    const [questions, setQuestions] = useState("")

    const [benefits, setBenefits] = useState({
        description: "",
        icon: 0,
        name: ""
    })

    const addQuestions = (qeust: string) => {
        if (jobData&&jobData?.questions&&!jobData?.questions?.includes(qeust) && qeust.trim() !== "") {
            setJobData(prev => ({
                ...prev,
                questions: [...(prev?.questions as any), qeust]
            }));
            setQuestions("")
            return
        }
        toast({
            description: `
         please add questions....
            `,
            className: "bg-red-600 text-white rounded"

        })
    };


    const handleBenefitsSubmit = () => {
        let error = false;
        let icon = "";
        let title = "";
        let description = "";
        if (benefits.icon == 0) {
            icon = "please select and icon"
            error = true
        }
        if (benefits.name.trim() == "") {
            title = "please enter an title"
            error = true
        }
        if (benefits.description.trim() == "") {
            description = "please enter an description"
            error = true
        }

        setError(prev => ({
            ...prev,
            titleError: title,
            iconsdesError: description,
            iconError: icon
        }))

        if (!error) {
            setJobData(prev => ({
                ...prev,
                benefits: [...(prev?.benefits as any[]), benefits]
            }))
        }
        setBenefits({
            icon: 0,
            name: "",
            description: ""
        })
    }

    const deleteBenefits = (num: number) => {
        setJobData(prev => ({
            ...prev,
            benefits: (prev?.benefits as any[]).filter((_, index) => index !== num)
        }))
    }
    const deleteSkill = (num: number) => {
        setJobData(prev => ({
            ...prev,
            required_skills: (prev?.required_skills as any[]).filter((_, index) => index !== num)
        }))
    }
    const deleteQuestions = (num: number) => {
        setJobData(prev => ({
            ...prev,
            questions: (prev?.questions as any[]).filter((_, index) => index !== num)
        }))
    }

    const [error, setError] = useState({
        companyId: "",
        job_title: "",
        type: "",
        salary_from: "",
        salary_to: "",
        category: "",
        required_skills: "",
        description: "",
        responsibilities: "",
        qualification: "",
        requirements: "",
        benefits: "",
        slot: "",
        start_date: "",
        end_date: "",
        level: "",
        titleError: "",
        iconsdesError: "",
        iconError: ""
    })

    const handleStartDateChange = (newDate: any) => {
        if (dayjs(newDate).isValid()) {
            setJobData(prev => ({
                ...prev,
                start_date: newDate.format('YYYY,MM,DD')
            }));
            setError(prev => ({
                ...prev,
                start_date: ""
            }));
        } else {
            setError(prev => ({
                ...prev,
                start_date: "Invalid start date"
            }));
        }
    }

    const handleEndDateChange = (newDate: any) => {
        if (dayjs(newDate).isValid()) {
            setJobData(prev => ({
                ...prev,
                end_date: newDate.format('YYYY,MM,DD')
            }));
            setError(prev => ({
                ...prev,
                end_date: ""
            }));
        } else {
            setError(prev => ({
                ...prev,
                end_date: "Invalid end date"
            }));
        }
    }

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | any) => {
        const { name, value } = e.target;
        console.log("name", name, "value", value)
        setJobData(prev => ({
            ...prev,
            [name]: value
        }))
        setError(prev => ({
            ...prev,
            [name]: ""
        }))
    }

    const skillSubmit = (skill: string) => {
        if (jobData&&jobData?.required_skills&&!jobData?.required_skills.includes(skill) && skill.trim() !== "") {
            setJobData(prev => ({
                ...prev,
                required_skills: [...(prev.required_skills as any[]), skill]
            }));
            setSkill("")
            return
        }
        toast({
            description: `
         please add skill....
            `,
            className: "bg-red-600 text-white rounded"

        })
    };


    const [value, setValue] = useState<number[]>([1000, 300000]);

    const handleChange = (_: Event, newValue: number | number[]) => {
        console.log(newValue, "value from slider");
        setValue(newValue as number[]);
        setJobData(prev => ({
            ...prev,
            salary_from: Array.isArray(newValue) ? newValue[0] : 0,
            salary_to: Array.isArray(newValue) ? newValue[1] : 0
        }));
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const jobSubmit = async () => {
        try {
            await addJobValidation.validate(jobData, { abortEarly: false });
            await axios.post(`${BASE_URL}job/company/addjob`, jobData, { withCredentials: true }).then((res) => {
                if (res.data.success) {
                    toast({
                        description: `
                       job added successfully
                        `,
                        className: "bg-green-600 text-white rounded"

                    })
                    setError({
                        companyId: "",
                        job_title: "",
                        type: "",
                        salary_from: "",
                        salary_to: "",
                        category: "",
                        required_skills: "",
                        description: "",
                        responsibilities: "",
                        qualification: "",
                        requirements: "",
                        benefits: "",
                        slot: "",
                        start_date: "",
                        end_date: "",
                        level: "",
                        titleError: "",
                        iconsdesError: "",
                        iconError: ""
                    })
                    setJobData(prev => ({
                        ...prev,
                        job_title: "",
                        type: "",
                        salary_from: 0,
                        salary_to: 0,
                        category: "",
                        required_skills: [],
                        description: "",
                        responsibilities: "",
                        qualification: "",
                        requirements: "",
                        benefits: [],
                        slot: 0,
                        start_date: "",
                        end_date: "",
                        level: ""
                    }))
                    navigate('/company/joblist')
                } else {
                    toast({
                        description: `
                       error occured please try again
                        `,
                        className: "bg-red-600 text-white rounded"

                    })
                }

            })
        } catch (error: any) {
            console.log(error, "type of error")
            if (error.name === 'ValidationError') {
                const validationErrors: { [key: string]: string } = {};
                error.inner.forEach((err: { path: string | number; message: any; }) => {
                    if (typeof err.path === 'string') {
                        validationErrors[err.path] = err.message;
                    }
                });
                console.error("Validation error:", validationErrors);
                setError(prev => ({
                    ...prev,
                    ...validationErrors
                }))
                toast({
                    description: `
                    Please check all the fields,
                    Complete all the required fields,
                    re-ender the error data
                    `,
                    className: "bg-red-600 text-white rounded"

                })
            } else {
                console.error("Error:", error.message);
            }
        }
    }


    return (
        <>
            <div className="w-full flex-col  ">
                {loading && <Loader />}
                <div className="flex h-full  relative">
                    <CompanySideBar />
                    <div className="lg:w-[85%] w-full ">
                        <CompanyHeader />

                        <Modal
                            open={icon}

                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2" className="flex justify-between items-center">
                                    Select an Icon
                                    <RxCross2 className="cursor-pointer" onClick={() => setIcon(false)} />
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div className="flex flex-wrap w-full h-[500px] overflow-y-scroll">
                                        {icons.slice(1).map((key, index) => (
                                            <div key={index + 1} onClick={() => {
                                                setBenefits(prev => ({
                                                    ...prev,
                                                    icon: index + 1
                                                }));
                                                setIcon(false);
                                            }} className="w-[100px] h-[100px] border flex justify-center items-center text-4xl cursor-pointer">
                                                {key}
                                            </div>
                                        ))}
                                    </div>

                                </Typography>
                            </Box>
                        </Modal>

                        <div className="w-full p-6 flex flex-col gap-10 ">
                            <span className="flex gap-2 justify-start items-center font-bold text-md"><FaArrowLeft />post a job</span>
                            <div className="w-full h-20 flex relative border p-2 border-gray-400">
                                <div onClick={() => setPage("one")} className="w-1/3 h-full cursor-pointer  border-r border--gray-400 flex">
                                    <div className="w-[40%] h-full  flex justify-center items-center"><Bs1Circle className="text-5xl  rounded-full text-customviolet" /></div>
                                    <div className="w-[60%] h-full  flex flex-col items-start justify-center">
                                        <span className="text-customviolet text-xs lg:text-sm">Step 1/3</span>
                                        <span className="font-bold text-xs lg:text-lg">Job Infromation</span>
                                    </div>
                                </div>
                                <div onClick={() => setPage("two")} className="w-1/3 h-full cursor-pointer border-r border--gray-400 flex ">
                                    <div className="w-[40%] h-full  flex justify-center items-center"><Bs2Circle className={`text-5xl ${page == "three" || page == 'two' ? "text-customviolet" : "text-gray-300"}  rounded-full `} /></div>
                                    <div className="w-[60%] h-full  flex flex-col items-start justify-center">
                                        <span className={` ${page == "three" || page == "two" ? "text-customviolet" : "text-gray-400"} text-xs lg:text-sm`}>Step 2/3</span>
                                        <span className={`font-bold ${page == "three" || page == "two" ? "text-black" : "text-gray-400"} text-xs lg:text-lg`}>Job Description</span>
                                    </div>
                                </div>
                                <div onClick={() => setPage("three")} className="w-1/3 cursor-pointer h-full flex">
                                    <div className="w-[40%] h-full  flex justify-center items-center"><Bs3Circle className={`text-5xl  rounded-full ${[page == "three" ? "text-customviolet" : "text-gray-300"]} `} /></div>
                                    <div className="w-[60%] h-full  flex flex-col items-start justify-center">
                                        <span className={`${page == "three" ? "text-customviolet" : "text-gray-400"} text-xs lg:text-sm`}>Step 3/3</span>
                                        <span className={`font-bold ${page == "three" ? "text-black" : "text-gray-400"}  text-xs lg:text-lg`}>Benefits</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {page == "one" && (
                            <div className="w-full h-auto  flex flex-col  gap-6 bg-red  lg:p-4 items-center justify-center" >
                                <div className="w-full  p-1  flex flex-col">
                                    <span className="font-bold">Basic Information</span>
                                    <span className="text-sm text-gray-400">This information will be displayed publicly</span>
                                </div>
                                <hr className="text-gray-500 w-[98%]" />

                                <div className="w-full flex p-1 gap-10 lg:gap-32">
                                    <div className=" w-[20%] flex flex-col">
                                        <span className="font-bold">Job Title</span>
                                        <span className=" text-gray-400 text-xs lg:text-sm">Job titles must be describe one position</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <input onChange={(e) => handleFieldChange(e)} name="job_title" value={jobData.job_title} className="w-64 h-9 lg:w-80 outline-none border border-gray-400 pl-1" placeholder="e.g Software Engineer" type="text" />
                                        <span className="text-red-500 text-xs">{error.job_title}</span>
                                        <span className="lg:text-sm text-xs text-gray-400">At least 5 character</span>
                                    </div>
                                </div>

                                <hr className="text-gray-500 w-[98%]" />
                                <div className="w-full flex p-1 gap-10 lg:gap-32">
                                    <div className=" w-[20%] flex flex-col">
                                        <span className="font-bold">Type of Employment</span>
                                        <span className=" text-gray-400 text-xs lg:text-sm">You can select multiple of employment</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center">
                                            <input type="radio" onChange={(e) => handleFieldChange(e)} name="type" className="mr-2" value="Full-Time" />
                                            <span className="text-gray-700">Full-Time</span>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="radio" onChange={(e) => handleFieldChange(e)} name="type" className="mr-2" value="Part-Time" />
                                            <span className="text-gray-700">Part-Time</span>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="radio" onChange={(e) => handleFieldChange(e)} name="type" className="mr-2" value="Remote" />
                                            <span className="text-gray-700">Remote</span>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="radio" onChange={(e) => handleFieldChange(e)} name="type" className="mr-2" value="Internship" />
                                            <span className="text-gray-700">Internship</span>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="radio" onChange={(e) => handleFieldChange(e)} name="type" className="mr-2" value="Contract" />
                                            <span className="text-gray-700">Contract</span>
                                        </div>
                                        <span className="text-red-500 text-xs">{error.type}</span>
                                    </div>

                                </div>
                                <hr className="text-gray-500 w-[98%]" />

                                <div className="w-full flex p-1 gap-10 lg:gap-32">
                                    <div className=" w-[20%] flex flex-col">
                                        <span className="font-bold">Salary</span>
                                        <span className=" text-gray-400 text-xs lg:text-sm">please specify the estimated salary range for role,"You can leave this blank"</span>
                                    </div>
                                    <div className="flex flex-col gap-1 w-36">
                                        <Slider
                                            getAriaLabel={() => 'Salary range'}
                                            value={value}
                                            onChange={handleChange}
                                            valueLabelDisplay="auto"
                                            getAriaValueText={valuetext}
                                            min={0}
                                            max={3000000}
                                            step={10000}
                                            valueLabelFormat={(value) => `${(value / 1000).toFixed(0)}k`}
                                            sx={{
                                                color: 'rgb(176,38,255)',
                                            }}
                                        />
                                        <span className="text-red-500 text-xs">{error.salary_from || error.salary_to}</span>

                                    </div>
                                </div>

                                <hr className="text-gray-500 w-[98%]" />


                                <div className="w-full flex p-1 gap-10 lg:gap-32">
                                    <div className=" w-[20%] flex flex-col">
                                        <span className="font-bold">Category</span>
                                        <span className=" text-gray-400 text-xs lg:text-sm">You can only select one job category</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="lg:text-sm text-xs font-bold">Select Job Category</span>
                                        <select name="category" onChange={(e) => handleFieldChange(e)} className="w-64 h-9 lg:w-80 outline-none border border-gray-400">
                                            {data && data
                                                .filter(key => !key.deleted)
                                                .map(key => (
                                                    <option key={String(key?._id)} value={String(key?._id)}>
                                                        {key.category}
                                                    </option>
                                                ))}
                                        </select>
                                        <span className="text-red-500 text-xs">{error.category}</span>
                                    </div>

                                </div>

                                <hr className="text-gray-500 w-[98%]" />

                                <div className="w-full flex p-1 gap-10 lg:gap-32">
                                    <div className=" w-[20%] flex flex-col">
                                        <span className="font-bold">Level</span>
                                        <span className=" text-gray-400 text-xs lg:text-sm">You can only select one job Level</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="lg:text-sm text-xs font-bold">Select Job Level</span>
                                        <select name="level" onChange={(e) => handleFieldChange(e)} className="w-64 h-9 lg:w-80 outline-none border border-gray-400">
                                            <option value="" disabled selected hidden>Select an option</option>
                                            <option value="entry">entry</option>
                                            <option value="mid">mid</option>
                                            <option value="director">director</option>
                                            <option value="vp or above">vp or above</option>
                                        </select>
                                        <span className="text-red-500 text-xs">{error.level}</span>
                                    </div>

                                </div>

                                <hr className="text-gray-500 w-[98%]" />

                                <div className="w-full flex p-1 gap-10 lg:gap-32">
                                    <div className=" w-[20%] flex flex-col">
                                        <span className="font-bold">Slots</span>
                                        <span className=" text-gray-400 text-xs lg:text-sm">You can enter number of slots available</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <input type="number" onChange={(e) => handleFieldChange(e)} name="slot" value={jobData.slot} className="w-64 h-9 lg:w-80 outline-none border border-gray-400 pl-1" placeholder="enter number of slots" />
                                        <span className="text-red-500 text-xs">{error.slot}</span>
                                        <span className="lg:text-sm text-xs text-gray-400">At least 1 slot</span>
                                    </div>
                                </div>

                                <hr className="text-gray-500 w-[98%]" />

                                <div className="w-full flex p-1 gap-10 lg:gap-32">
                                    <div className=" w-[20%] flex flex-col">
                                        <span className="font-bold">Start Date</span>
                                        <span className=" text-gray-400 text-xs lg:text-sm">You can select job publish date</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="lg:text-sm text-xs font-bold">Select Start Date</span>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={dayjs(jobData.start_date)}
                                                onChange={(newDate) => handleStartDateChange(newDate)}
                                            />
                                        </LocalizationProvider>
                                        <span className="text-red-500 text-xs">{error.start_date}</span>
                                    </div>
                                </div>

                                <hr className="text-gray-500 w-[98%]" />

                                <div className="w-full flex p-1 gap-10 lg:gap-32">
                                    <div className=" w-[20%] flex flex-col">
                                        <span className="font-bold">End Date</span>
                                        <span className=" text-gray-400 text-xs lg:text-sm">End date should be greater than or equal to the start date</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="lg:text-sm text-xs font-bold">Select End Date</span>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker value={dayjs(jobData.end_date)} onChange={(newDate) => handleEndDateChange(newDate)} />
                                        </LocalizationProvider>
                                        <span className="text-red-500 text-xs">{error.end_date}</span>
                                    </div>

                                </div>

                                <hr className="text-gray-500 w-[98%]" />


                                <div className="w-full flex p-1 gap-10 lg:gap-48">
                                    <div className=" w-[20%] flex flex-col">
                                        <span className="font-bold">Required Skills</span>
                                        <span className=" text-gray-400 text-xs lg:text-sm">Add required skills for the job</span>
                                    </div>
                                    <div className="md:flex lg:flex-col gap-4 ">
                                        <div className="flex-col  gap-2 flex">
                                            <input id="skills" onChange={(e) => setSkill(e.target.value)} value={skill} className="w-64 h-9 lg:w-80 outline-none border border-gray-400 pl-1" placeholder="e.g comminication" type="text" />
                                            <span className="text-red-500 text-xs">{error.required_skills}</span>
                                            <button onClick={() => skillSubmit(skill)} className="flex w-64 h-9 lg:w-80 justify-center items-center border border-customviolet p-2 rounded text-customviolet font-bold hover:bg-customviolet hover:text-white"><FiPlus />Add skills</button>
                                        </div>
                                        <div className="flex flex-wrap gap-4">
                                            {jobData&&jobData.required_skills&&jobData.required_skills.map((key, index) => (
                                                <div key={index} className="p-1 bg-gray-100 flex">
                                                    {key}
                                                    <RxCross2 onClick={() => deleteSkill(index)} className="text-customviolet text-xl cursor-pointer" />
                                                </div>
                                            ))}



                                        </div>
                                        <hr className="text-gray-500 w-[98%]" />
                                    </div>
                                </div>

                                <div className="w-full flex p-1 gap-10 lg:gap-48">
                                    <div className=" w-[20%] flex flex-col">
                                        <span className="font-bold">Custom Questions</span>
                                        <span className=" text-gray-400 text-xs lg:text-sm">Add custom questions for the job application</span>
                                    </div>
                                    <div className="md:flex lg:flex-col gap-4 ">
                                        <div className="flex-col  gap-2 flex">
                                            <input id="skills" onChange={(e) => setQuestions(e.target.value)} value={questions} className="w-64 h-9 lg:w-80 outline-none border border-gray-400 pl-1" placeholder="e.g why should we hire you?" type="text" />
                                            <span className="text-red-500 text-xs">{error.required_skills}</span>
                                            <button onClick={() => addQuestions(questions)} className="flex w-64 h-9 lg:w-80 justify-center items-center border border-customviolet p-2 rounded text-customviolet font-bold hover:bg-customviolet hover:text-white"><FiPlus />Add Questions</button>
                                        </div>
                                        <div className="flex flex-wrap gap-4">
                                            {jobData&&jobData.questions&&jobData.questions.map((key, index) => (
                                                <div key={index} className="p-1 bg-gray-100 flex">
                                                    {key}
                                                    <RxCross2 onClick={() => deleteQuestions(index)} className="text-customviolet text-xl cursor-pointer" />
                                                </div>
                                            ))}



                                        </div>
                                        <hr className="text-gray-500 w-[98%]" />
                                    </div>
                                </div>
                                <div className="w-full flex justify-end p-3">
                                    <button onClick={() => setPage("two")} className="border hover:text-customviolet hover:bg-white p-2 rounded bg-customviolet text-white">Next Step</button>
                                </div>

                            </div>
                        )}

                        {page == "two" && (
                            <div className="w-full h-auto  flex flex-col  gap-6 bg-red  lg:p-4 items-center justify-center" >
                                <div className="w-full  p-1  flex flex-col">
                                    <span className="font-bold">Details</span>
                                    <span className="text-sm text-gray-400">Add the description of the job.responsibilities,who you are ,and requirements</span>
                                </div>
                                <hr className="text-gray-500 w-[98%]" />

                                <div className="w-full flex p-1 gap-10 lg:gap-32">
                                    <div className=" w-[20%] flex flex-col">
                                        <span className="font-bold">Job Descriptions</span>
                                        <span className=" text-gray-400 text-xs lg:text-sm">Job title must be describe one position</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <textarea onChange={(e) => handleFieldChange(e)} value={jobData.description} name='description' className="w-72 h-36 lg:w-[800px] outline-none border border-gray-400" placeholder="Enter job description" ></textarea>
                                        <span className="text-red-500 text-xs">{error.description}</span>
                                        <span className="lg:text-sm text-xs text-gray-400">Maximum 1000 characters</span>
                                    </div>

                                </div>

                                <hr className="text-gray-500 w-[98%]" />

                                <div className="w-full flex p-1 gap-10 lg:gap-32">
                                    <div className=" w-[20%] flex flex-col">
                                        <span className="font-bold">Responsibilities</span>
                                        <span className=" text-gray-400 text-xs lg:text-sm">Outline the core responsibilities of the position</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <textarea onChange={(e) => handleFieldChange(e)} value={jobData.responsibilities} name='responsibilities' className="w-72 h-36 lg:w-[800px] outline-none border border-gray-400" placeholder="Enter job responsibilities" ></textarea>
                                        <span className="text-red-500 text-xs">{error.responsibilities}</span>
                                        <span className="lg:text-sm text-xs text-gray-400">Maximum 1000 characters</span>
                                    </div>

                                </div>

                                <hr className="text-gray-500 w-[98%]" />

                                <div className="w-full flex p-1 gap-10 lg:gap-32">
                                    <div className=" w-[20%] flex flex-col">
                                        <span className="font-bold">Qualification</span>
                                        <span className=" text-gray-400 text-xs lg:text-sm">Add your preferred candidates qualification</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <textarea onChange={(e) => handleFieldChange(e)} value={jobData.qualification} name='qualification' className="w-72 h-36 lg:w-[800px] outline-none border border-gray-400" placeholder="Enter qualification" ></textarea>
                                        <span className="text-red-500 text-xs">{error.qualification}</span>
                                        <span className="lg:text-sm text-xs text-gray-400">Maximum 1000 characters</span>
                                    </div>

                                </div>

                                <hr className="text-gray-500 w-[98%]" />

                                <div className="w-full flex p-1 gap-10 lg:gap-32">
                                    <div className=" w-[20%] flex flex-col">
                                        <span className="font-bold">Requirements</span>
                                        <span className=" text-gray-400 text-xs lg:text-sm">Add requirements and skills for the role to encourage a more diverse set of candidates to apply</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <textarea onChange={(e) => handleFieldChange(e)} value={jobData.requirements} name='requirements' className="w-72 h-36 lg:w-[800px] outline-none border border-gray-400" placeholder="Enter Requirements" ></textarea>
                                        <span className="text-red-500 text-xs">{error.requirements}</span>
                                        <span className="lg:text-sm text-xs text-gray-400">Maximum 1000 characters</span>
                                    </div>

                                </div>

                                <hr className="text-gray-500 w-[98%]" />

                                <div className="w-full flex justify-end p-3">
                                    <button onClick={() => setPage("three")} className="border hover:text-customviolet hover:bg-white p-2 rounded bg-customviolet text-white">Next Step</button>
                                </div>

                            </div>
                        )}

                        {page == "three" && (
                            <div className="w-full h-auto  flex flex-col  gap-6 bg-red  lg:p-4 items-center justify-center" >
                                <div className="w-full  p-1  flex flex-col">
                                    <span className="font-bold">Details</span>
                                    <span className="text-sm text-gray-400">Add the description of the job.responsibilities,who you are ,and requirements</span>
                                </div>
                                <hr className="text-gray-500 w-[98%]" />

                                <div className="w-full flex p-1 gap-10 lg:gap-32">
                                    <div className=" w-[20%] flex flex-col">
                                        <span className="font-bold">Perks and Benifits</span>
                                        <span className=" text-gray-400 text-xs lg:text-sm">Encourage more people to apply by sharing the attractive rewards and benefits you offer your employees</span>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                            <span>Image</span>
                                            <label onClick={() => setIcon(true)} className="text-4xl w-[100px] h-[100px] border flex justify-center items-center">

                                                {icons[benefits.icon]}

                                            </label>
                                            <span className="text-red-500 text-xs">{error.iconError}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span>Title</span>
                                            <input onChange={(e) => setBenefits(prev => ({
                                                ...prev,
                                                name: e.target.value
                                            }))} value={benefits.name} className="w-72 h-9 lg:w-[300px] outline-none border border-gray-400" placeholder="e.g Software Engineer" type="text" />
                                            <span className="text-red-500 text-xs">{error.titleError}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span>Description</span>
                                            <textarea onChange={(e) => setBenefits(prev => ({
                                                ...prev,
                                                description: e.target.value
                                            }))} value={benefits.description} className="w-72 h-36 lg:w-[300px] outline-none border border-gray-400" placeholder="Enter job description"></textarea>
                                            <span className="text-red-500 text-xs">{error.iconsdesError}</span>
                                            <span className="lg:text-sm text-xs text-gray-400">Maximum 500 characters</span>
                                        </div>
                                        <button onClick={handleBenefitsSubmit} className="p-1 border border-gray-400 bg-customviolet text-white hover:text-customviolet rounded hover:bg-white">Add Benefits</button>
                                    </div>


                                </div>
                                <style>
                                    {`.hide-scroll::-webkit-scrollbar {
                                    display: none;
  }

                             
                                .hide-scroll {
                                    scrollbar - width: none;
                                }`}

                                </style>

                                <hr className="text-gray-500 w-[98%]" />
                                <div className="w-full justify-center lg:justify-start   flex  gap-4 flex-wrap p-2">

                                    {jobData&&jobData.benefits&&jobData.benefits.map((key, index) => (

                                        <div key={index} className="flex flex-col gap-1 p-2 border w-[300px] h-[300px] border-gray-400 ">
                                            <div className="w-full h-1/6  flex justify-between text-4xl text-customviolet">
                                                {icons[key.icon]}
                                                <RxCross2 onClick={() => deleteBenefits(index)} className="text-lg text-black cursor-pointer" />
                                            </div>
                                            <div className="w-full h-1/6  flex justify-start p-2 items-center">
                                                <span className="font-bold text-customviolet">{key.name}</span>
                                            </div>
                                            <div className="w-full h-4/6  overflow-y-scroll overflow-x-hidden hide-scroll ">
                                                <span>
                                                    {key.description}
                                                </span>
                                            </div>
                                        </div>
                                    ))}










                                </div>


                                <div className="w-full flex justify-end p-3">
                                    <button onClick={jobSubmit} className="border hover:text-customviolet hover:bg-white p-2 rounded bg-customviolet text-white">Submit</button>
                                </div>

                            </div>
                        )}

                    </div>
                </div>
                {!loading && <Footer />}

            </div>
        </>
    )
}