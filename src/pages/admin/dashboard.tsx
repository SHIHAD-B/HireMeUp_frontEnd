import CompanyLineChart from "@/components/admin/companyStatGraph"
import { AdminHeader } from "@/components/admin/header"
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { IoIosTimer } from "react-icons/io";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { BsPersonFillCheck } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import { IoBagHandleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { allRequests, companyList } from "@/redux/actions/companyAction";
import { AdminListApplicants, AdminListJob, listUsers } from "@/redux/actions/adminAction";
import { JobLineChart } from "@/components/admin/jobStatGraph";




export const AdminDashBoard = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { data: requests }: any = useSelector((state: RootState) => state.request)
    const { data: user }: any = useSelector((state: RootState) => state.usersList)
    const { data: company }: any = useSelector((state: RootState) => state.companyList)
    const { data: jobs } = useSelector((state: RootState) => state.job)
    const { data: applicants } = useSelector((state: RootState) => state.applicantList)
    const [companyPage, setCompanyPage] = useState("week")
    const [jobPage, setJobPage] = useState("week")
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(allRequests());
            await dispatch(listUsers());
            await dispatch(companyList());
            await dispatch(AdminListJob())
            await dispatch(AdminListApplicants())
        };

        fetchData();

    }, []);
    return (
        <>
            <div className="w-full flex-col">
                <div className=" w-full flex flex-col">

                    <div className="flex flex-col w-full ">
                        <AdminHeader />
                    </div>
                    <div className="w-full   flex flex-col p-2">
                        <div className="w-full h-28  flex gap-2 justify-evenly mt-8">
                            <div className="min-w-44 h-20 border border-gray-300 rounded flex justify-center items-center bg-customviolet">
                                <span className="text-4xl font-bold text-white">{user?.length} <span className="text-sm font-normal">User</span> </span>

                            </div>
                            <div className="min-w-44 h-20 border border-gray-300 rounded flex justify-center items-center bg-customviolet">
                                <span className="text-4xl font-bold text-white">{company?.length} <span className="text-sm font-normal">Companies</span> </span>

                            </div>
                            <div className="min-w-44 h-20 border border-gray-300 rounded flex justify-center items-center bg-customviolet">
                                <span className="text-4xl font-bold text-white">{jobs?.length} <span className="text-sm font-normal">Jobs</span> </span>

                            </div>
                            <div className="min-w-44 h-20 border border-gray-300 rounded flex justify-center items-center bg-customviolet">
                                <span className="text-4xl font-bold text-white">{applicants?.filter((item:any) => item.hiring_status == "hired")?.length} <span className="text-sm font-normal">Placed</span> </span>

                            </div>

                        </div>
                        <div className="w-full  flex flex-col justify-center">
                            <span className="text-md font-bold">Company Statistic</span>
                            <span className="text-sm text-gray-400">Showing company statistics</span>
                        </div>
                        <div className="w-full h-[400px]  flex gap-4">
                            <div className="w-[49%] h-full border border-gray-300 rounded flex flex-col justify-center items-center p-2">
                                <div className="w-full flex gap-2 justify-end">
                                    <button onClick={() => setCompanyPage("week")} className="border border-customviolet p-2 rounded text-customviolet hover:bg-customviolet hover:text-white" >Week</button>
                                    <button onClick={() => setCompanyPage("month")} className="border border-customviolet p-2 rounded text-customviolet hover:bg-customviolet hover:text-white" >Month</button>
                                    <button onClick={() => setCompanyPage("year")} className="border border-customviolet p-2 rounded text-customviolet hover:bg-customviolet hover:text-white" >year</button>
                                </div>
                                <CompanyLineChart page={String(companyPage)} />
                            </div>
                            <div className="w-[49%] h-full pl-10 pr-10 flex flex-wrap gap-6">
                                <div className="w-56 h-28 border rounded border-gray-300 flex flex-col p-2 gap-2 justify-center">
                                    <div className="flex justify-between ">
                                        <span className="text-xl font-semibold">Requests</span>
                                        <BsPersonFillCheck className="text-xl text-customviolet" />
                                    </div>
                                    <span className="text-4xl font-bold">{requests?.length}</span>

                                </div>
                                <div className="w-56 h-28 border rounded border-gray-300 flex flex-col p-2 gap-2 justify-center">
                                    <div className="flex justify-between ">
                                        <span className="text-xl font-semibold">Pending</span>
                                        <IoIosTimer className="text-xl text-customviolet" />
                                    </div>
                                    <span className="text-4xl font-bold">{requests?.filter((item: any) => item.approval == "inProgress").length}</span>

                                </div>
                                <div className="w-56 h-28 border rounded border-gray-300 flex flex-col p-2 gap-2 justify-center">
                                    <div className="flex justify-between ">
                                        <span className="text-xl font-semibold">Accepts</span>
                                        <RiVerifiedBadgeLine className="text-xl text-customviolet" />
                                    </div>
                                    <span className="text-4xl font-bold">{requests?.filter((item: any) => item.approval == "approved").length}</span>

                                </div>
                                <div className="w-56 h-28 border rounded border-gray-300 flex flex-col p-2 gap-2 justify-center">
                                    <div className="flex justify-between ">
                                        <span className="text-xl font-semibold">Re-applied</span>
                                        <FaArrowRotateLeft className="text-xl text-customviolet" />
                                    </div>
                                    <span className="text-4xl font-bold">{requests?.filter((item: any) => item.status == "secondAttempt").length}</span>

                                </div>
                                <div className="w-56 h-28 border rounded border-gray-300 flex flex-col p-2 gap-2 justify-center">
                                    <div className="flex justify-between ">
                                        <span className="text-xl font-semibold">Rejects</span>
                                        <MdErrorOutline className="text-xl text-customviolet" />
                                    </div>
                                    <span className="text-4xl font-bold">{requests?.filter((item: any) => item.approval == "rejected").length}</span>

                                </div>
                            </div>
                        </div>
                        <div className="w-full  flex flex-col justify-center mt-10">
                            <span className="text-md font-bold">Job Statistic</span>
                            <span className="text-sm text-gray-400">Showing job statistics</span>
                        </div>
                        <div className="w-full h-[400px]  flex gap-4">
                            <div className="w-[49%] h-full border border-gray-300 rounded flex flex-col justify-center items-center p-2">
                                <div className="w-full flex gap-2 justify-end">
                                    <button onClick={() => setJobPage("week")} className="border border-customviolet p-2 rounded text-customviolet hover:bg-customviolet hover:text-white" >Week</button>
                                    <button onClick={() => setJobPage("month")} className="border border-customviolet p-2 rounded text-customviolet hover:bg-customviolet hover:text-white" >Month</button>
                                    <button onClick={() => setJobPage("year")} className="border border-customviolet p-2 rounded text-customviolet hover:bg-customviolet hover:text-white" >year</button>
                                </div>
                                <JobLineChart page={String(jobPage)} />
                            </div>
                            <div className="w-[49%] h-full pl-10 pr-10 flex flex-wrap gap-6">
                                <div className="w-56 h-28 border rounded border-gray-300 flex flex-col p-2 gap-2 justify-center">
                                    <div className="flex justify-between ">
                                        <span className="text-xl font-semibold">Job Applications</span>
                                        <BsPersonFillCheck className="text-xl text-customviolet" />
                                    </div>
                                    <span className="text-4xl font-bold">{applicants?.length}</span>

                                </div>
                                <div className="w-56 h-28 border rounded border-gray-300 flex flex-col p-2 gap-2 justify-center">
                                    <div className="flex justify-between ">
                                        <span className="text-xl font-semibold">Pending</span>
                                        <IoIosTimer className="text-xl text-customviolet" />
                                    </div>
                                    <span className="text-4xl font-bold">{applicants?.filter((item:any) => item.hiring_status == "in-review").length}</span>

                                </div>
                                <div className="w-56 h-28 border rounded border-gray-300 flex flex-col p-2 gap-2 justify-center">
                                    <div className="flex justify-between ">
                                        <span className="text-xl font-semibold">Interviews</span>
                                        <RiVerifiedBadgeLine className="text-xl text-customviolet" />
                                    </div>
                                    <span className="text-4xl font-bold">{applicants?.filter((item:any) => item.hiring_status == "interview").length}</span>

                                </div>
                                <div className="w-56 h-28 border rounded border-gray-300 flex flex-col p-2 gap-2 justify-center">
                                    <div className="flex justify-between ">
                                        <span className="text-xl font-semibold">Placed</span>
                                        <IoBagHandleOutline className="text-xl text-customviolet" />
                                    </div>
                                    <span className="text-4xl font-bold">{applicants?.filter((item:any) => item.hiring_status == "hired").length}</span>

                                </div>
                                <div className="w-56 h-28 border rounded border-gray-300 flex flex-col p-2 gap-2 justify-center">
                                    <div className="flex justify-between ">
                                        <span className="text-xl font-semibold">Rejects</span>
                                        <MdErrorOutline className="text-xl text-customviolet" />
                                    </div>
                                    <span className="text-4xl font-bold">{applicants?.filter((item:any) => item.hiring_status == "rejected").length}</span>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}