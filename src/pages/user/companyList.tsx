import { RiSearchLine } from "react-icons/ri";
import Pagination from '@mui/material/Pagination';
import { IoLocationOutline } from "react-icons/io5";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { IJobData, IState } from "@/interfaces/IUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { ListJob } from '@/redux/actions/jobAction';
import { companyList, companyUserList } from '@/redux/actions/companyAction';
import { fetchCategory } from '@/redux/actions/adminAction';
import { IFilterData } from '@/interfaces/IUser';
import { UserHeader } from "@/components/user/header";
import { JobDescription } from "@/components/user/jobDescription";
import pro from '../../assets/images/pro.jpg'

export const CompanyList = () => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const dispatch = useDispatch<AppDispatch>()

    const { data } = useSelector((state: RootState) => state.companyList)
    const { data: job } = useSelector((state: RootState) => state.job)
    const [states, setStates] = useState<IState[]>()
    const category = useSelector((state: RootState) => state.category.data)
    const [list, setList] = useState(data)
    const [searchData, setSearchData] = useState("")
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    // const [filterData, setFilterData] = useState({
    //     type: [""],
    //     category: [""],
    //     level: [""],
    //     salary_from: [""],
    //     salary_to: [""]

    // })
    useEffect(() => {
        dispatch(ListJob())
        dispatch(companyList())
        dispatch(fetchCategory())
        setList(data)
    }, [])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(ListJob());
            await dispatch(companyUserList());
            await dispatch(fetchCategory());
            setLoading(false);
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (!loading) {
            setList(data);
        }
    }, [data, loading]);

    // useEffect(() => {
    //     const filteredSet = new Set(data?.filter(item => {
    //         const conditions = [];

    //         if (filterData.category.length !== 1) {
    //             conditions.push(filterData.category.includes(item.category));
    //         }

    //         if (filterData.level.length !== 1) {
    //             conditions.push(filterData.level.includes(item.level));
    //         }

    //         if (filterData.salary_from.length !== 1) {
    //             conditions.push(filterData.salary_from.includes(String(item.salary_from)));
    //         }

    //         if (filterData.salary_to.length !== 1) {
    //             conditions.push(filterData.salary_to.includes(String(item.salary_to)));
    //         }

    //         if (filterData.type.length !== 1) {
    //             conditions.push(filterData.type.includes(item.type));
    //         }

    //         return conditions.every(condition => condition);
    //     }));

    //     const filteredList = Array.from(filteredSet);

    //     setList(filteredList);
    // }, [filterData, data]);


    // const salaryFilterChange = (e: any) => {
    //     const { value, checked } = e.target;
    //     const [start, end] = value.split('-');
    //     setFilterData((prev) => ({
    //         ...prev,
    //         salary_from: checked ? [...prev.salary_from, start] : prev.salary_from.filter((item: any) => item !== start),
    //         salary_to: checked ? [...prev.salary_to, end] : prev.salary_to.filter((item: any) => item !== end)
    //     }));

    // };

    // const categoryFilterChange = (e: any) => {
    //     const { value, checked } = e.target;
    //     const valueId = category?.find((values) => values.category === value)?._id || '';
    //     setFilterData((prev) => ({
    //         ...prev,
    //         category: checked ? [...prev.category, valueId] : prev.category.filter((item: string) => item !== valueId),
    //     }));

    // };

    // const FilterChange = (e: any) => {
    //     const { name, value, checked } = e.target;
    //     setFilterData((prev) => ({
    //         ...prev,
    //         [name]: checked ? [...prev[name as keyof IFilterData], value] : prev[name as keyof IFilterData].filter((item: string) => item !== value),
    //     }));

    // };






    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get('https://api.countrystatecity.in/v1/countries', {
                    headers: {
                        'X-CSCAPI-KEY': 'c2J0MHBQSlhRQjFJOWVCd3NlWVRLcTJjeTZMcFJ1cmFVcDd2SndlWg=='
                    }
                });
                setStates(response.data);
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };

        fetchStates();
    }, []);

    const search = (e: any) => {
        setSearchData(e.target.value);
        if (e.target.value.trim() !== "") {
            const regex = new RegExp(e.target.value, 'i');
            const filteredData = data?.filter((dvalue: any) => regex.test(dvalue.job_title));
            console.log(filteredData, "filtered data")
            setList(filteredData as IJobData[])
        } else {
            setList(data)
        }

    }

    // const handleJobClick = (id: string) => {
    //     setSelectedJobId(id);
    //     console.log('Job clicked:', id);
    // };

    const back = () => {
        setSelectedJobId(null)
    }

    return (
        <>
            {selectedJobId ? (
                <JobDescription id={String(selectedJobId)} back={back} />
            ) : (
                <div className="w-full felx felx-col ">
                    <UserHeader prop="Find Jobs" />
                    <div className="w-full h-36 flex justify-center  p-6">
                        <div className="w-full lg:w-[70%] h-[90%] border border-gray-300 rounded  flex flex-col lg:flex-row">
                            <div className="w-full lg:w-[50%] h-full  flex justify-center items-center">
                                <RiSearchLine className="text-2xl" />
                                <input type="text" name="search" onChange={(e) => search(e)} value={searchData} id="" className="h-10  lg:w-80 p-2 bg-background  border-b border-foreground outline-none" placeholder="Job title or keywords" />
                            </div>
                            <div className="w-full lg:w-[50%] h-full flex justify-center items-center ">
                                <IoLocationOutline className="text-2xl" />
                                <select name='employees' className='appearance-none lg:w-80 outline-none bg-background   border-b border-foreground h-10 px-4' defaultValue="">
                                    <option value='' disabled hidden >Location</option>
                                    {states?.map((value: IState, index) => (
                                        <option key={index} value={value?.name}>{value?.name}</option>

                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-auto  flex border-t border-gray-100">
                        <div className="hidden lg:block w-[20%] h-full  gap-4 flex-col">

                            <div className="w-full h-auto  flex flex-col pl-4 pt-2 pb-2 space-y-2">
                                <span className="font-bold text-lg">Industry</span>
                                {category?.map((value, index) => (

                                    <label className="flex items-center gap-2" key={index}>
                                        <input type="checkbox" name="employment" value={String(value.category)} className="form-checkbox h-5 w-5 text-blue-600" />
                                        <span className="text-base">{value.category}</span>
                                    </label>
                                ))}

                            </div>

                            <div className="w-full h-auto  flex flex-col pl-4 pt-2 pb-2 space-y-2">
                                <span className="font-bold text-lg">Company Size</span>

                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="salary" value="10000-50000" className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">1-50</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="salary" value="50000-100000" className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">51-150</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="salary" value="100000-1000000" className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">151-250</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="salary" value="1000000-2000000" className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">251-500</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="salary" value="2000000-100000000" className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">500-Above</span>

                                </label>
                            </div>

                        </div>
                        <div className="w-full lg:w-[80%]  flex flex-col gap-4 items-center">
                            <div className="w-full lg:w-full flex  pt-4 gap-4 flex-wrap">

                                {list?.length ? (
                                    list.filter((item) => !item?.deleted).map((value, index) => (
                                        <div key={index} className="w-80 h-80 border bg-background dark:border-gray-600 border-gray-300 rounded  flex flex-col">
                                            <div className="w-full h-[35%] flex">
                                                <div className="h-full w-[50%] flex justify-center items-center">
                                                    {value && value.icon && <img src={value.icon} alt="" className="w-20" />}
                                                </div>
                                                <div className="w-[50%] h-full flex justify-end items-start">
                                                    <div className="m-2 p-2 border border-gray-400 rounded bg-blue-50 text-customviolet">
                                                        {job?.filter((item) => item.companyId === value._id)?.length} Jobs
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full h-[45%] flex flex-col gap-2 p-4">
                                                <span className="font-bold text-xl">{value?.company_name}</span>
                                                <span className="line-clamp-4">{value.description}</span>
                                            </div>
                                            <div className="w-full h-[20%] pl-4 pt-2">
                                                <span className="flex gap-2 ">
                                                    <span className="font-bold ">Location: </span>

                                                    {value?.location?.map((location, index) => (
                                                        <Fragment key={index}>
                                                            {index > 0 && ", "}
                                                            {location}
                                                        </Fragment>
                                                    ))}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : null}

                            </div>
                            <Pagination
                                count={1}
                                size="small"
                                sx={{
                                    '& .MuiPaginationItem-page, & .MuiSvgIcon-root': {
                                        color: isDarkMode ? 'white' : 'black',
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}