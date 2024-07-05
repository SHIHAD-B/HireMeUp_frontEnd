
import { ICompanyData } from '@/interfaces/IUser';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { Loader } from '../common/loader';
import { FaArrowRight } from "react-icons/fa6";
import { ModeToggle } from '../common/mode-toggle';
import { FaArrowLeft } from "react-icons/fa6";
import pro from '../../assets/images/pro.jpg'
import { BsFire } from "react-icons/bs";
import { TbUsersGroup } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { PiBuildings } from "react-icons/pi";
import { UfetchCategory } from '@/redux/actions/userAction';
import { JobDescription } from './jobDescription';


interface CompanyDescriptionProps {
    id: string;
    back: () => void;
}
export const CompanyDescription: React.FC<CompanyDescriptionProps> = ({ id, back }) => {

    const dispatch = useDispatch<AppDispatch>()
    const [companyDatas, setCompanyData] = useState<ICompanyData | null>(null);
    const { data: jobData } = useSelector((state: RootState) => state.job);
    const { data: catdata } = useSelector((state: RootState) => state.category)
    const { data, loading } = useSelector((state: RootState) => state.companyList)
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    useEffect(() => {
        if (data) {
            const spec = data.filter((item: ICompanyData) => item._id === id);
            setCompanyData(spec.length > 0 ? spec[0] : null);
        }
        dispatch(UfetchCategory());
    }, [data, id]);

    const returns = () => {
        setSelectedJobId(null)
    }
    const handleJobClick = (id: string) => {
        setSelectedJobId(id);
    };

    return (
        <>
            {selectedJobId ? (
                <JobDescription id={String(selectedJobId)} back={returns} />
            ) : (
                <div className="w-full felx felx-col ">
                    {loading && <Loader />}

                    <div className="h-[70px] border-b border-gray-200 flex items-center pl-2 pr-4 justify-between">
                        <span className="text-xl font-bold flex gap-4 justify-center items-center"><FaArrowLeft onClick={back} className='cursor-pointer' />Company Details</span>
                        <ModeToggle />
                    </div>
                    <div className="w-full  flex justify-center p-6">
                        <div className='w-full p-2  flex border border-gray-300'>
                            <div className='w-[85%] h-full  flex'>
                                <div className='w-[20%] h-full flex justify-center items-center '>
                                    <img src={companyDatas?.icon ? companyDatas.icon : pro} alt="" className='w-32 ' />
                                </div>
                                <div className=' w-[90%] h-full  flex flex-col justify-center'>
                                    <div className='flex gap-2'>

                                        <span className='text-4xl font-bold'>{companyDatas?.company_name}</span>
                                        <div className='p-2 border border-customviolet text-customviolet'> {jobData?.filter((item:any) => item.companyId == companyDatas?._id).length} Jobs</div>
                                    </div>
                                    <span className='flex gap-1 text-lg flex-col'>
                                        <span className='text-sm text-customviolet font-bold'>{companyDatas?.website}</span>
                                        <span>
                                            {companyDatas?.location
                                                ?.map((location, index) => (
                                                    <Fragment key={index}>
                                                        {index > 0 && ", "}
                                                        {location}
                                                    </Fragment>
                                                ))}

                                        </span>
                                        <div className='w-full h-20 border rounded flex'>
                                            <div className='flex w-1/4 h-full '>
                                                <div className='w-1/3 h-full  flex justify-center items-center'>
                                                    <BsFire className='text-2xl text-customviolet' />
                                                </div>
                                                <div className='w-2/3 h-full flex flex-col items-center justify-center'>
                                                    <span className='text-md text-gray-500'>Founded</span>
                                                    <span className='text-sm '>{companyDatas?.founded ? new Date(companyDatas?.founded)?.toDateString() : ""}</span>
                                                </div>
                                            </div>
                                            <div className='flex w-1/4 h-full '>
                                                <div className='w-1/3 h-full  flex justify-center items-center'>
                                                    <IoLocationOutline className='text-2xl text-customviolet' />
                                                </div>
                                                <div className='w-2/3 h-full flex flex-col items-center justify-center'>
                                                    <span className='text-md text-gray-500'>Employees</span>
                                                    <span className='text-sm '>{companyDatas?.employees}</span>
                                                </div>
                                            </div>
                                            <div className='flex w-1/4 h-full '>
                                                <div className='w-1/3 h-full  flex justify-center items-center'>
                                                    <TbUsersGroup className='text-2xl text-customviolet' />
                                                </div>
                                                <div className='w-2/3 h-full flex flex-col items-center justify-center'>
                                                    <span className='text-md text-gray-500'>Location</span>
                                                    <span className='text-sm '>{companyDatas?.location?.length} countries</span>
                                                </div>
                                            </div>
                                            <div className='flex w-1/4 h-full  '>
                                                <div className='w-1/3 h-full  flex justify-center items-center'>
                                                    <PiBuildings className='text-2xl text-customviolet' />
                                                </div>
                                                <div className='w-2/3 h-full flex flex-col items-center justify-center'>
                                                    <span className='text-md text-gray-500'>Industry</span>
                                                    <span className='text-sm '>{companyDatas?.industry}</span>
                                                </div>
                                            </div>

                                        </div>
                                    </span>


                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='w-full   flex p-4'>
                        <div className='w-[60%] h-full flex flex-col gap-6'>
                            <div className='w-full flex flex-col gap-2'>
                                <span className='text-xl font-bold'>Company Profile</span>
                                <span>{companyDatas?.description}</span>
                            </div>
                            <div className='w-full flex flex-col gap-2'>
                                <span className='text-xl font-bold'>Contact</span>
                                <div className='w-full flex flex-wrap gap-1 '>
                                    <div className='p-1 border text-customviolet border-customviolet'>email: {companyDatas?.website}</div>
                                    {Object.entries(companyDatas?.contact || {}).map(([key, value], index) => (
                                        <div key={index} className='p-1 border text-customviolet border-customviolet'>
                                            {key}: {value}
                                        </div>
                                    ))}
                                    

                                </div>
                            </div>

                        </div>
                        <div className='w-[40%] h-full  flex items-start justify-center'>
                            <div className='w-[70%] flex flex-col item-center gap-6'>
                                <span className='text-xl font-bold'>Tech Stack</span>
                                <span>Learn about the technology and tools that company uses</span>
                                <div className='w-full flex flex-wrap gap-1 '>
                                    {companyDatas?.tech_stack?.map((item, index) => (
                                        <span key={index} className='p-2 border border-customviolet text-customviolet rounded'>{item}</span>

                                    ))}
                                </div>
                                <hr />
                                <div className='flex flex-col w-full gap-1'>
                                    <span className='font-bold text-xl'>Locations</span>
                                    <div className='w-full flex flex-wrap gap-1 '>
                                        {companyDatas?.location?.map((item, index) => (

                                            <span key={index} className='p-2 border border-customviolet text-customviolet rounded'>{item}</span>
                                        ))}

                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                    <span className='text-xl font-bold pl-4 w-full pt-16'>Open Jobs</span>
                    <div className="w-full justify-center lg:justify-between flex gap-4 flex-wrap  bg-gray-100 mt-4 p-8">
                        {jobData?.filter((item:any) => item.companyId == companyDatas?._id).map((item:any, index:any) => (

                            <div key={index} className="h-full flex pt-2 flex-col border border-customviolet p-4 rounded">
                                <div className='flex justify-between'>
                                    <span className="text-xl font-bold">{item.job_title}</span>
                                    <span onClick={() => handleJobClick(String(item?._id))} className='text-customviolet text-sm cursor-pointer flex gap-1 justify-center items-center'>view details <FaArrowRight /></span>
                                </div>
                                <div className="w-full flex h-auto gap-4 ">
                                    <span className="p-1 rounded border border-customviolet text-customviolet">{item?.type}</span>
                                    <span className="p-1 rounded border border-blue-900 text-blue-900">{catdata?.find((values:any) => values?._id === item?.category)?.category}</span>
                                    <span className="p-1 rounded border border-yellow-500 text-yellow-500">{item?.level}</span>
                                    <span className="p-1 rounded border border-green-500 text-green-500">salary up to: {item?.salary_to}</span>
                                </div>
                            </div>
                        ))}



                    </div>




                </div>
            )}
        </>
    )
}

