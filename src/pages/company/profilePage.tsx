
import { CompanyHeader } from "@/components/company/header";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsBuildings } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { FaFire, FaInstagram } from "react-icons/fa";
import { CiLinkedin, CiTwitter } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { SiWebmoney } from "react-icons/si";
import { employeeList } from "@/redux/actions/companyAction";



export const ProfilePage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { data } = useSelector((state: RootState) => state.company)
    const { data: employee } = useSelector((state: RootState) => state.employee)

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(employeeList());
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="w-full">
                <div className="w-full">
                    <CompanyHeader />

                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full h-48  flex border-b border-gray-300">
                            <div className="w-1/4 h-full  p-2 flex justify-center items-center">
                                <img src={data?.icon} alt="" className="w-40 h-40 rounded-full" />
                            </div>
                            <div className="w-3/4 h-full  flex flex-col justify-between p-2">
                                <span className="text-4xl font-bold">{data?.company_name}</span>
                                <p className="text-sm text-customviolet">{data?.website}</p>
                                <div className="w-full border border-gray-300 rounded h-14 flex">
                                    <div className="w-1/4 h-full flex justify-center items-center gap-2">
                                        <div ><FaFire className="text-2xl text-customviolet" /></div>
                                        <div className="flex flex-col">
                                            <p className="text-sm">Founded</p>
                                            <p className="text-sm font-bold">{new Date(String(data?.founded)).toDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="w-1/4 h-full flex justify-center items-center gap-2">
                                        <div ><HiUserGroup className="text-2xl text-customviolet" /></div>
                                        <div className="flex flex-col">
                                            <p className="text-sm">Employees</p>
                                            <p className="text-sm font-bold">{data?.employees}</p>
                                        </div>
                                    </div>
                                    <div className="w-1/4 h-full flex justify-center items-center gap-2">
                                        <div ><IoLocationOutline className="text-2xl text-customviolet" /></div>
                                        <div className="flex flex-col">
                                            <p className="text-sm">Location</p>
                                            <p className="text-sm font-bold">{data?.location?.length} countries</p>
                                        </div>
                                    </div>
                                    <div className="w-1/4 h-full flex justify-center items-center gap-2">
                                        <div ><BsBuildings className="text-2xl text-customviolet" /></div>
                                        <div className="flex flex-col">
                                            <p className="text-sm">industry</p>
                                            <p className="text-sm font-bold">{data?.industry}</p>
                                        </div>
                                    </div>




                                </div>
                            </div>

                        </div>
                        <div className="w-full  flex ">
                            <div className="w-2/3 h-full  flex flex-col p-2 gap-4">
                                <div className="w-full flex flex-col gap-4 border border-gray-300 rounded p-2">
                                    <span className="text-md font-bold">Company profile</span>
                                    <p>
                                        {data?.description}
                                    </p>
                                </div>

                                <div className="w-full flex flex-col border border-gray-300 rounded p-2">
                                    <div className="w-full flex gap-2 flex-col">
                                        <span className="text-md font-bold">Team</span>
                                        <div className="w-full flex flex-wrap gap-1">
                                            {employee?.length ? (
                                                <>
                                                    {employee?.filter((item) => item.companyId == data?._id && item.deleted !== true).map((items, index) => (

                                                        <span key={index} className="p-2 flex flex-col border border-customviolet rounded max-w-xs">
                                                            <span className="font-bold">{items.firstName} {items.lastName}</span>
                                                            <span className="text-sm text-customviolet">{items.position}</span>
                                                        </span>
                                                    ))}
                                                </>
                                            ) : (
                                                <>
                                                    <span>Kindly visit resource page to add employee</span>
                                                </>
                                            )}

                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col gap-2 border border-gray-300 rounded p-2">
                                    <span className="text-md font-bold">Tech Stack</span>
                                    {data?.tech_stack?.length ? (
                                        <>
                                            <div className="w-full flex flex-wrap gap-1 p-2 ">
                                                {data.tech_stack.map((items, index) => (

                                                    <span key={index} className="p-2 border border-customviolet rounded text-customviolet flex justify-center items-center gap-4">
                                                        {items}
                                                    </span>

                                                ))}
                                            </div>
                                        </>

                                    ) : (
                                        <>
                                            <span>Kindly visit settings to add Stacks</span>
                                        </>
                                    )}
                                </div>

                            </div>
                            <div className="w-1/3  p-2  flex flex-col gap-4">
                                <div className="w-full min-h-80 rounded border border-gray-300 flex flex-col p-4 gap-2">
                                    <div className="-w-full flex justify-between">
                                        <span className="text-md font-bold">Contacts</span>

                                    </div>
                                    <div className="w-full   flex flex-col gap-4">
                                        <div className="w-full min-h-8 flex flex-col">
                                            <span className="flex gap-2 justify-start items-center  text-gray-500"><MdEmail />Email</span>
                                            <a href="" className="text-sm break-words text-customviolet">{data?.email}</a>
                                        </div>
                                        <div className="w-full min-h-8 flex flex-col">
                                            <span className="flex gap-2 justify-start items-center  text-gray-500"><FaInstagram />Instagram</span>
                                            <a href="" className="text-sm break-words text-customviolet">{data?.contact?.instagram}</a>
                                        </div>
                                        <div className="w-full min-h-8 flex flex-col">
                                            <span className="flex gap-2 justify-start items-center  text-gray-500"><CiLinkedin />Linkedin</span>
                                            <a href="" className="text-sm break-words text-customviolet">{data?.contact?.linkedIn}</a>
                                        </div>
                                        <div className="w-full min-h-8 flex flex-col">
                                            <span className="flex gap-2 justify-start items-center  text-gray-500"><CiTwitter />Twitter</span>
                                            <a href="" className="text-sm break-words text-customviolet">{data?.contact?.twitter}</a>
                                        </div>
                                        <div className="w-full min-h-8 flex flex-col">
                                            <span className="flex gap-2 justify-start items-center  text-gray-500"><SiWebmoney />Website</span>
                                            <a href="" className="text-sm break-words text-customviolet">{data?.website}</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full  rounded border border-gray-300 flex flex-col p-4 gap-2">
                                    <div className="-w-full flex justify-between">
                                        <span className="text-md font-bold">Office Locations</span>

                                    </div>
                                    <div className="w-full   flex flex-col gap-4">
                                        {data?.location?.length ? (

                                            <div className="w-full  flex flex-wrap gap-2">
                                                {data.location.map((item, index) => (

                                                    <span key={index} className="flex gap-2 justify-between items-center border border-customviolet p-1 rounded text-customviolet">
                                                        {item}
                                                    </span>
                                                ))}


                                            </div>
                                        ) : (
                                            <>
                                                <span>Kindly visit settings to add Location</span>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}