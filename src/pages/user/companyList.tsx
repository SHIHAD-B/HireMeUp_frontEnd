import { RiSearchLine } from "react-icons/ri";
import Pagination from '@mui/material/Pagination';
import { IoLocationOutline } from "react-icons/io5";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { ICompanyData, IState } from "@/interfaces/IUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { ListJob } from '@/redux/actions/jobAction';
import { companyUserList } from '@/redux/actions/companyAction';
import { UserHeader } from "@/components/user/header";
import { CompanyDescription } from "@/components/user/companyDescription";
import { ChatList, UfetchCategory } from "@/redux/actions/userAction";
import { TiMessages } from "react-icons/ti";
import { BASE_URL } from "@/interfaces/config/constant";
import { useNavigate } from "react-router-dom";
import { Unauth_header } from "@/components/user/unauth-header";


export const CompanyList = () => {
    const navigate = useNavigate()
    const isDarkMode = document.documentElement.classList.contains('dark');
    const dispatch = useDispatch<AppDispatch>()
    const ITEMS_PER_PAGE = 9;
    const { data } = useSelector((state: RootState) => state.companyList)
    const { data: job } = useSelector((state: RootState) => state.job)
    const { user } = useSelector((state: RootState) => state.user)
    const [states, setStates] = useState<IState[]>()
    const category = useSelector((state: RootState) => state.category.data)
    const { data: chat } = useSelector((state: RootState) => state.chat)
    const [list, setList] = useState(data)
    const [searchData, setSearchData] = useState("")
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(ListJob())
        dispatch(UfetchCategory())
        dispatch(ChatList(String(user?._id)))

        setList(data)
        pageLogic()
    }, [])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(ListJob());
            await dispatch(companyUserList());
            setLoading(false);
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (!loading) {
            setList(data);
        }
        pageLogic()
    }, [data, loading]);


    const searchByLocation = (e: any) => {
        if (e.target.value == '') {
            setList(data)
        }
        const filteredData = data?.filter((item:any) => item.location?.includes(e.target.value))
        setList(filteredData as ICompanyData[])
    }



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
                console.error("Error fetching states::", error);
            }
        };

        fetchStates();
        pageLogic()
    }, []);

    const search = (e: any) => {
        setSearchData(e.target.value);
        if (e.target.value.trim() !== "") {
            const regex = new RegExp(e.target.value, 'i');
            const filteredData = data?.filter((dvalue: any) => regex.test(dvalue.company_name));
            setList(filteredData as ICompanyData[])
        } else {
            setList(data)
        }
        setPage(1)
    }

    const handleCompanyClick = (id: string) => {
        setSelectedCompanyId(id);

    };

    const back = () => {
        setSelectedCompanyId(null)
    }

    const pageLogic = () => {
        let start = (page - 1) * ITEMS_PER_PAGE;
        let end = start + ITEMS_PER_PAGE;
        const slicedData = data?.slice(start, end);
        setList(slicedData as ICompanyData[]);
    }


    useEffect(() => {
        pageLogic()
    }, [page]);


    const chatwithCompany = async (companyId: string) => {
        const data = {
            sender: user?._id,
            receiver: companyId
        }

        const already = chat?.find((item:any) =>
            item.participants.includes(String(user?._id)) && item.participants.includes(companyId)
        );
        if (already) {
            navigate('/chat')
            return

        }

        await axios.post(`${BASE_URL}chat/company/createroom`, data, { withCredentials: true }).then(() => {
            navigate('/chat')
        }).catch((error: any) => {
            console.log(error)
        })
    }
    return (
        <>
            {selectedCompanyId ? (
                <CompanyDescription id={String(selectedCompanyId)} back={back} />
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
                                <select onChange={(e) => searchByLocation(e)} name='employees' className='appearance-none lg:w-80 outline-none bg-background   border-b border-foreground h-10 px-4' defaultValue="">
                                    <option value='' disabled hidden >Location</option>
                                    <option value=''>Any Where</option>
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
                                {category?.map((value:any, index:any) => (

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
                            <div className="w-full lg:w-full flex justify-center  pt-4 gap-4 flex-wrap">

                                {list?.length ? (
                                    list.filter((item:any) => !item?.deleted&&item.icon&&item.description?.length&&item.location?.length).map((value:any, index:any) => (
                                        <div key={index} onClick={() => handleCompanyClick(String(value._id))} className="w-80 h-80 border bg-background dark:border-gray-600 border-gray-300 rounded  flex flex-col">
                                            <div className="w-full h-[35%] flex">
                                                <div className="h-full w-[50%] flex justify-center items-center">
                                                    {value && value.icon && <img src={value.icon} alt="" className="w-20" />}
                                                </div>
                                                <div className="w-[50%] h-full flex gap-2 justify-end items-start">
                                                    {user?.subscription?.subscriptionId&&(

                                                    <span onClick={() => chatwithCompany(String(value._id))} className="p-2 m-2 border border-customviolet rounded hover:text-white hover:bg-customviolet text-customviolet cursor-pointer"><TiMessages className="text-2xl  " /></span>
                                                    )}
                                                    <div className="m-2 p-2 border border-gray-400 rounded bg-blue-50 text-customviolet">
                                                        {job?.filter((item:any) => item.companyId === value._id)?.length} Jobs
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

                                                    {value?.location?.map((location:any, index:any) => (
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