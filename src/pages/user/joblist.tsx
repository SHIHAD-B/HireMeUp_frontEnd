import { RiSearchLine } from "react-icons/ri";
import Pagination from '@mui/material/Pagination';
import { IoLocationOutline } from "react-icons/io5";
import { Key, useEffect, useState } from "react";
import axios from "axios";
import { IJobData, IState } from "@/interfaces/IUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { ListJob } from '@/redux/actions/jobAction';
import { companyUserList } from '@/redux/actions/companyAction';
import { IFilterData } from '@/interfaces/IUser';
import { UserHeader } from "@/components/user/header";
import { JobDescription } from "@/components/user/jobDescription";
import { UfetchCategory } from "@/redux/actions/userAction";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Unauth_header } from "@/components/user/unauth-header";

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


export const Joblist = () => {
    const location = useLocation()
    const ITEMS_PER_PAGE = 6;
    const queryData = location.state
    const { toast } = useToast()
    const navigate = useNavigate()
    const isDarkMode = document.documentElement.classList.contains('dark');
    const dispatch = useDispatch<AppDispatch>()
    const { data } = useSelector((state: RootState) => state.job)
    const companyLists = useSelector((state: RootState) => state.companyList.data)
    const [states, setStates] = useState<IState[]>()
    const category = useSelector((state: RootState) => state.category.data)
    const { user } = useSelector((state: RootState) => state.user)
    const [list, setList] = useState(data)

    const [page, setPage] = useState(1)
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    const [filterData, setFilterData] = useState({
        type: [""],
        category: [""],
        level: [""],
        salary_from: [""],
        salary_to: [""]

    })
    const pageLogic = () => {
        let start = (page - 1) * ITEMS_PER_PAGE;
        let end = start + ITEMS_PER_PAGE;
        const slicedData = data?.slice(start, end);
        setList(slicedData as IJobData[]);
    }


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (queryData) {
            const { searchData: querySearchData, states: queryLocationData, category: queryCategoryData } = queryData;

            let filteredData = data;

            if (queryCategoryData !== "") {
                const valueId = category?.find((item: { category: any; }) => item.category == queryCategoryData)?._id
                filteredData = data?.filter((item: { category: any; }) => item.category === valueId) as IJobData[];
            } else if (querySearchData !== "") {
                const regex = new RegExp(querySearchData, 'i');
                filteredData = data?.filter((item: { job_title: string; }) => regex.test(item.job_title)) as IJobData[];
            } else if (queryLocationData !== "") {
                const companyLocationIds = companyLists
                    ?.filter((item: { location: string | any[]; }) => item.location?.includes(queryLocationData))
                    .map((item: { _id: any; }) => item._id);
                filteredData = data?.filter((item: { companyId: any; }) => companyLocationIds?.includes(item.companyId)) as IJobData[];
            }

            setList(filteredData as IJobData[]);
        } else {
            if (!loading) {
                setList(data);
            }
        }
    }, [data, loading, queryData, companyLists]);



    const handleSubmit = (id: string) => {
        id
        if (!user?.email) {
            navigate('/signin')
            toast({
                description: ' Please login to continue..',
                className: "bg-blue-600 text-white"
            });
        }

    }





    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(ListJob());
            await dispatch(companyUserList());
            await dispatch(UfetchCategory());
            setLoading(false);
        };
        fetchData();
        pageLogic()
    }, [dispatch]);


    useEffect(() => {
        const filteredSet = new Set(data?.filter((item: { category: string; level: string; salary_from: any; salary_to: any; type: string; }) => {
            const conditions = [];

            if (filterData.category.length !== 1) {
                conditions.push(filterData.category.includes(item.category));
            }

            if (filterData.level.length !== 1) {
                conditions.push(filterData.level.includes(item.level));
            }

            if (filterData.salary_from.length !== 1) {
                conditions.push(filterData.salary_from.includes(String(item.salary_from)));
            }

            if (filterData.salary_to.length !== 1) {
                conditions.push(filterData.salary_to.includes(String(item.salary_to)));
            }

            if (filterData.type.length !== 1) {
                conditions.push(filterData.type.includes(item.type));
            }

            return conditions.every(condition => condition);
        }));

        const filteredList = Array.from(filteredSet);

        setList(filteredList);
    }, [filterData, data]);


    const salaryFilterChange = (e: any) => {
        const { value, checked } = e.target;
        const [start, end] = value.split('-');
        setFilterData((prev) => ({
            ...prev,
            salary_from: checked ? [...prev.salary_from, start] : prev.salary_from.filter((item: any) => item !== start),
            salary_to: checked ? [...prev.salary_to, end] : prev.salary_to.filter((item: any) => item !== end)
        }));

    };

    const categoryFilterChange = (e: any) => {
        const { value, checked } = e.target;
        const valueId = category?.find((values: { category: any; }) => values.category === value)?._id || '';
        setFilterData((prev) => ({
            ...prev,
            category: checked ? [...prev.category, valueId] : prev.category.filter((item: string) => item !== valueId),
        }));

    };

    const FilterChange = (e: any) => {
        const { name, value, checked } = e.target;
        setFilterData((prev) => ({
            ...prev,
            [name]: checked ? [...prev[name as keyof IFilterData], value] : prev[name as keyof IFilterData].filter((item: string) => item !== value),
        }));

    };


    useEffect(() => {
        pageLogic()
    }, [page]);



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

    const [searchData, setSearchData] = useState("");
    const [locationItem, setLocationItem] = useState("");

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchData(e.target.value);
        filterBySearchAndLocation(e.target.value, locationItem);
    }

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        setLocationItem(e.target.value);
        filterBySearchAndLocation(searchData, e.target.value);
    }

    const filterBySearchAndLocation = (searchValue: string, locationValue: string) => {
        let filteredData: any = data;


        if (locationValue.trim() !== "") {
            const companyIds = companyLists?.filter((item: { location: string | string[]; }) => item.location?.includes(locationValue)).map((item: any) => item._id);
            filteredData = filteredData?.filter((item: any) => companyIds?.includes(item.companyId));
        }


        if (searchValue.trim() !== "") {
            const regex = new RegExp(searchValue, 'i');
            filteredData = filteredData?.filter((item: any) => regex.test(item.job_title));
        }

        setList(filteredData as IJobData[]);
    }

    const handleJobClick = (id: string) => {
        setSelectedJobId(id);
    };


    const back = () => {
        setSelectedJobId(null)
    }

    return (
        <>
            {selectedJobId ? (
                <JobDescription id={String(selectedJobId)} back={back} />
            ) : (
                <div className="w-full felx felx-col ">
                    {!user?.email && (
                        <Unauth_header />
                    )}
                    <UserHeader prop="Find Jobs" />
                    <div className="w-full h-36 flex justify-center  p-6">
                        <div className="w-full lg:w-[70%] h-[90%] border border-gray-300 rounded  flex flex-col lg:flex-row">
                            <div className="w-full lg:w-[50%] h-full  flex justify-center items-center">
                                <RiSearchLine className="text-2xl" />
                                <input type="text" name="search" onChange={(e) => search(e)} value={searchData} id="" className="h-10  lg:w-80 p-2 bg-background  border-b border-foreground outline-none" placeholder="Job title or keywords" />
                            </div>
                            <div className="w-full lg:w-[50%] h-full flex justify-center items-center ">
                                <IoLocationOutline className="text-2xl" />
                                <select onChange={(e) => handleLocationChange(e)} name='employees' className='appearance-none lg:w-80 outline-none bg-background   border-b border-foreground h-10 px-4' defaultValue="">
                                    <option value='' disabled hidden >Location</option>

                                    <option value=''>Any where</option>
                                    {states?.map((value: IState, index) => (
                                        <option key={index} value={value?.name}>{value?.name}</option>

                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <span className="flex lg:hidden pl-4"><button className="border p-1 border-customviolet rounded">Filter</button></span>
                    <div className="w-full h-auto  flex border-t border-gray-100">
                        <div className="hidden lg:block w-[20%] h-full  gap-4 flex-col">
                            <div className="w-full h-auto  flex flex-col pl-4 pt-2 pb-2 space-y-2">
                                <span className="font-bold text-lg">Type of Employment</span>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="type" onChange={(e) => FilterChange(e)} value="Full-Time" className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">Full-Time</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="type" onChange={(e) => FilterChange(e)} value="Part-Time" className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">Part-Time</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="type" onChange={(e) => FilterChange(e)} value="Remote" className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">Remote</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="type" onChange={(e) => FilterChange(e)} value="Internship" className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">Internship</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="type" onChange={(e) => FilterChange(e)} value="Contract" className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">Contract</span>
                                </label>
                            </div>
                            <div className="w-full h-auto  flex flex-col pl-4 pt-2 pb-2 space-y-2">
                                <span className="font-bold text-lg">Category</span>
                                {category?.map((value: { category: string | number | boolean | any }, index: Key | null | undefined) => (

                                    <label className="flex items-center gap-2" key={index}>
                                        <input type="checkbox" name="employment" value={String(value.category)} className="form-checkbox h-5 w-5 text-blue-600" onChange={categoryFilterChange} />
                                        <span className="text-base">{value.category}</span>
                                    </label>
                                ))}

                            </div>
                            <div className="w-full h-auto  flex flex-col pl-4 pt-2 pb-2 space-y-2">
                                <span className="font-bold text-lg">Job Level</span>

                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="level" onChange={(e) => FilterChange(e)} value="entry" className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">Entry Level</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="level" onChange={(e) => FilterChange(e)} value="mid" className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">Mid Level</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="level" onChange={(e) => FilterChange(e)} value="senior" className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">Senior Level</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="level" onChange={(e) => FilterChange(e)} value="director" className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">Director</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="level" onChange={(e) => FilterChange(e)} value="vp or above" className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">VP or Above</span>
                                </label>
                            </div>
                            <div className="w-full h-auto  flex flex-col pl-4 pt-2 pb-2 space-y-2">
                                <span className="font-bold text-lg">Salary Range(LPA)</span>

                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="salary" value="10000-50000" onChange={salaryFilterChange} className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">10k-50k</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="salary" value="50000-100000" onChange={salaryFilterChange} className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">50k-1L</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="salary" value="100000-1000000" onChange={salaryFilterChange} className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">1L-10L</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="salary" value="1000000-2000000" onChange={salaryFilterChange} className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">10L-20L</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="salary" value="2000000-100000000" onChange={salaryFilterChange} className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="text-base">20L-Above</span>

                                </label>
                            </div>

                        </div>
                        <div className="w-full lg:w-[90%]  flex flex-col pt-4 gap-4 items-center ">
                            {list?.length ? (
                                list.filter((item: { publish: boolean; }) => item.publish == true).map((value: any, index: any) => (
                                    <div onClick={() => handleJobClick(String(value?._id))} key={index} className="w-[90%] h-28 border border-gray-200 rounded flex flex-w">
                                        <div className="w-[20%] h-full flex justify-center items-center">
                                            <div className='lg:w-20 lg:h-20 w-10 h-10 rounded-full'>
                                                <img src={companyLists?.find((values: { _id: any; }) => values?._id === value?.companyId)?.icon} alt="" className='w-full h-full object-cover overflow-clip rounded-full' />
                                            </div>
                                        </div>
                                        <div className="lg:w-[60%] w=[79%] h-full flex pt-2 flex-col">
                                            <span className="lg:text-xl text-sm font-bold">{value.job_title}</span>
                                            <span className="text-sm lg:text-md">{companyLists?.find((values: { _id: any; }) => values?._id === value?.companyId)?.company_name}</span>
                                            <div className="w-full lg:flex h-auto flex gap-1 lg:gap-4 flex-wrap ">
                                                <span className="p-1 rounded border border-customviolet text-customviolet lg:text-sm text-xs">{value?.type}</span>
                                                <span className="p-1 rounded border border-blue-900 text-blue-900 lg:text-sm text-xs">{category?.find((values: { _id: any; }) => values?._id === value?.category)?.category}</span>
                                                <span className="p-1 rounded border border-yellow-500 text-yellow-500 lg:text-sm text-xs">{value?.level}</span>
                                                <span className="p-1 rounded border border-green-500 text-green-500 lg:text-sm text-xs">salary up to: {value?.salary_to}</span>
                                            </div>
                                        </div>
                                        <div className="hidden w-[20%] h-full lg:flex flex-col gap-1 p-2 justify-center">
                                            <button onClick={() => handleSubmit(String(value?._id))} className="p-1 bg-customviolet border border-gray-200 text-white font-bold lg:text-base text-xs">Apply</button>
                                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                                <BorderLinearProgress variant="determinate" value={50} />
                                            </Stack>
                                            <span className="text-sm font-bold w-full">5 applied <span className="text-sm text-gray-400">of {value?.slot} capacity</span></span>
                                            <span className='text-xs'>posted on: {new Date(value?.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div><span className='text-4xl font-bold'>No such data</span></div>
                            )}
                            <Pagination
                                count={Math.ceil((data?.length || 0) / ITEMS_PER_PAGE)}
                                page={page}
                                onChange={(_, page) => setPage(page)}
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