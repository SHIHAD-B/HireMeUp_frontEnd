
import { ChartsOverviewYear } from "@/components/company/YearGraph";
import { ChartsOverviewDay } from "@/components/company/dayGraph";
import { CompanyHeader } from "@/components/company/header";
import { ChartsOverviewMonth } from "@/components/company/monthGraph";
import { companyApplicantList, employeeList } from "@/redux/actions/companyAction";
import { fecthJob } from "@/redux/actions/jobAction";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { CiMemoPad } from "react-icons/ci";
import { MdPinEnd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";


export const CompanyDashboard = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { data } = useSelector((state: RootState) => state.company)
    const {  data:applicants }: any = useSelector((state: RootState) => state.applicantList)
    const { data: employees } = useSelector((state: RootState) => state.employee)
    const { data:jobs }: any = useSelector((state: RootState) => state.job)
    const { data:schedule }: any = useSelector((state: RootState) => state.schedule)
    const [graphPage,setGraphPage]=useState("week")
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(employeeList());
            await dispatch(fecthJob(data?._id));
            await dispatch(companyApplicantList(String(data?._id)))
        };

        fetchData();
    }, []);
    return (
        <>
            <div className="w-full">
                <div className="w-full">
                    <CompanyHeader />
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full h-20 flex flex-col p-2 justify-center">
                            <span><b>Welcome</b> {data?.company_name}</span>
                            <span className="text-sm">Here is Your job listings Statistic report</span>
                        </div>
                        <div className="w-full flex p-4 justify-evenly">
                            <div className="w-72 h-20 text-white flex gap-2 justify-center items-center bg-customviolet">
                                <span className="font-bold text-4xl">{applicants?.filter((item:any)=>item.hiring_status=="in-review").length}</span>
                                <span className="word-break">New Candidates to review</span>
                            </div>
                            <div className="w-72 h-20 text-white flex gap-2 justify-center items-center bg-customviolet">
                                <span className="font-bold text-4xl">{schedule?.filter((item:any)=>new Date(String(item.date)).getDate()==new Date().getDate()).length??0}</span>
                                <span className="word-break">Schedule for today</span>
                            </div>
                            <div className="w-72 h-20 text-white flex gap-2 justify-center items-center bg-customviolet">
                                <span className="font-bold text-4xl">0</span>
                                <span className="word-break">Message received</span>
                            </div>
                        </div>
                        <div className="w-full  flex ">
                            <div className="w-2/3 flex flex-col">

                                <div className="w-full  flex flex-col">
                                    <div className="w-full h-14  flex justify-between p-2">
                                        <div className="flex flex-col">
                                            <span>Job Statistics</span>
                                            <span className="text-sm text-gray-400">showing jobststics based on weeks</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={()=>setGraphPage("week")} className="p-2 border border-customviolet text-customviolet rounded hover:bg-customviolet hover:text-white">Week</button>
                                            <button onClick={()=>setGraphPage("month")} className="p-2 border border-customviolet text-customviolet rounded hover:bg-customviolet hover:text-white">Month</button>
                                            <button onClick={()=>setGraphPage("year")} className="p-2 border border-customviolet text-customviolet rounded hover:bg-customviolet hover:text-white">Year</button>
                                        </div>
                                    </div>
                                    <div className="w-full flex">
                                        <div className="w-2/3  bg-violet-100 flex flex-col">
                                        {graphPage=="week"&&(

                                            <ChartsOverviewDay />
                                        )}
                                        {graphPage=="month"&&(

                                            <ChartsOverviewMonth />
                                        )}
                                        {graphPage=="year"&&(

                                            <ChartsOverviewYear />
                                        )}
                                            <div className="flex gap-2 pl-10">
                                                <div className="flex gap-2 justify-center items-center">
                                                    <div className="w-4 h-4 bg-pink-300"></div>
                                                    <span className="text-sm text-gray-400 font-bold">Job Post</span>
                                                </div>
                                                <div className="flex gap-2 justify-center items-center">
                                                    <div className="w-4 h-4 bg-cyan-300"></div>
                                                    <span className="text-sm text-gray-400 font-bold">Job Applied</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/3  flex flex-col justify-center items-center gap-2">
                                            <div className="w-[70%] h-32 border border-gray-400 rounded flex flex-col p-2 justify-center gap-2 item">
                                                <div className="w-full flex justify-between">
                                                    <span className="text-xl font-bold text-gray-500">Job Post</span>
                                                    <MdPinEnd className="text-2xl text-customviolet" />
                                                </div>
                                                <span className="text-4xl font-bold text-gray-700">{jobs?.length}</span>
                                                <p className="text-sm text-gray-400">Entire Data</p>
                                            </div>
                                            <div className="w-[70%] h-32 border border-gray-400 rounded flex flex-col p-2 justify-center gap-2 item">
                                                <div className="w-full flex justify-between">
                                                    <span className="text-xl font-bold text-gray-500">Job Applied</span>
                                                    <CiMemoPad className="text-2xl text-customviolet" />
                                                </div>
                                                <span className="text-4xl font-bold text-gray-700">{applicants?.length}</span>
                                                <p className="text-sm text-gray-400">Entire Data</p>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3   flex flex-col justify-between items-center gap-2">
                                <div className="w-[50%] h-32 border border-gray-400 rounded flex flex-col justify-center p-4">
                                    <span className="text-xl text-gray-400 font-bold">Job open</span>
                                    <div className="w-full flex gap-1  items-center ">
                                        <span className="text-6xl font-bold">{jobs?.filter((item:any)=>item.deleted!==true).length}</span>
                                        <span className="text-sm text-gray-400"> jobs Opened</span>
                                    </div>
                                </div>
                                <div className="w-[50%] h-32 border border-gray-400 rounded flex flex-col justify-center p-4">
                                    <span className="text-xl text-gray-400 font-bold">Employees</span>
                                    <div className="w-full flex gap-1  items-center ">
                                        <span className="text-6xl font-bold">{employees?.filter((item) => item.companyId == data?._id&&item.deleted!==true).length}</span>
                                        <span className="text-sm text-gray-400"> employees available</span>
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