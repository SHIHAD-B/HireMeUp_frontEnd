import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { UserHeader } from "@/components/user/header";
import { useEffect, useState } from "react";
import {  userApplicantList } from "@/redux/actions/userAction";
import { companyUserList } from "@/redux/actions/companyAction";
import { ListJob } from "@/redux/actions/jobAction";
import { IApplicants } from "@/interfaces/IUser";
import cat from '../../assets/images/undraw_void_3ggu-removebg-preview.png';
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
import { JobDescription } from "@/components/user/jobDescription";


export const Application = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { user } = useSelector((state: RootState) => state.user);
    const { data } = useSelector((state: RootState) => state.companyList);
    const { data: schedules } = useSelector((state: RootState) => state.schedule);
    const { data: applicants } = useSelector((state: RootState) => state.applicantList);
    const { data: jobs } = useSelector((state: RootState) => state.job);
    const [appliation, setApplication] = useState<IApplicants[]>();
    const [_, setApplicationData] = useState<IApplicants[]>();
    const [active, setActive] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<IApplicants | null>(null);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    useEffect(() => {
        const execute = async () => {

            await dispatch(userApplicantList(String(user?._id))).then((res: any) => {
                const applist = res.payload?.filter((item: any) => item.userId == user?._id);
                setApplication(applist);
                setApplicationData(applist);
            })
            await dispatch(companyUserList());
            await dispatch(ListJob());
        }
        execute()

    }, []);


    const filter = (category: string) => {
        const applist = applicants?.filter((item: any) => item.userId == user?._id);
        if (category == "") {
            setApplication(applist);
            setActive("");
        } else {
            const filJobs = applist?.filter((item: any) => item.hiring_status == category);
            setApplication(filJobs);
            setActive(category);
        }
    };
    const returns = () => {
        setSelectedJobId(null)
    }
    const handleJobClick = (id: string) => {
        setSelectedJobId(id);
    };

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
            {selectedJobId ? (
                <JobDescription id={String(selectedJobId)} back={returns} />
            ) : (
                <>
                    <div className="w-full h-auto flex-col ">
                        <AlertDialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Application Details</AlertDialogTitle>
                                    <AlertDialogDescription>

                                        <div>
                                            <p><strong>Company Name:</strong> {data?.find((item) => item._id == selectedApplication?.companyId)?.company_name}</p>
                                            <p><strong>Role:</strong> {jobs?.find((item) => item._id == selectedApplication?.jobId)?.job_title}</p>
                                            <p><strong>Date Applied:</strong> {selectedApplication?.createdAt ? new Date(selectedApplication?.createdAt).toDateString() : ""}</p>
                                            <p className="mb-2"><strong>Status:</strong> {selectedApplication?.hiring_status}</p>
                                            {schedules?.length && (
                                                <>
                                                    <span className="font-bold underline">Interview Details</span>
                                                    {schedules.filter((item)=>item.jobId==selectedApplication?.jobId).map((item, index) => (
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

                        <div className="w-full h-auto flex ">
                            <div className="flex-1 h-auto bg-violete-50 flex flex-col pl-2 gap-4">
                                <UserHeader prop="My Applications" />
                                <div className="h-[100px] flex flex-col pl-2 border border-gray-200 justify-center">
                                    <span className="text-lg font-semibold">Keep {user?.username} . Explore, discover, and enjoy! </span>
                                    <span>Here is what's happened with your job search applications</span>
                                </div>

                                <div className="w-full flex gap-4 ">
                                    <span onClick={() => filter("")} className={` ${active == "" && 'border-b-4 border-customviolet'} text-sm font-bold cursor-pointer`}>All ({applicants?.length})</span>
                                    <span onClick={() => filter("in-review")} className={`${active == "in-review" && 'border-b-4 border-customviolet'} text-sm font-bold cursor-pointer`}>In Review ({applicants?.filter((item: any) => item.hiring_status == "in-review").length})</span>
                                    <span onClick={() => filter("shortlisted")} className={`${active == "shortlisted" && 'border-b-4 border-customviolet'} text-sm font-bold cursor-pointer`}>shortlisted ({applicants?.filter((item: any) => item.hiring_status == "shortlisted").length})</span>
                                    <span onClick={() => filter("interview")} className={`${active == "interview" && 'border-b-4 border-customviolet'} text-sm font-bold cursor-pointer`}>interview ({applicants?.filter((item: any) => item.hiring_status == "interview").length})</span>
                                    <span onClick={() => filter("hired")} className={`${active == "hired" && 'border-b-4 border-customviolet'} text-sm font-bold cursor-pointer`}>hired ({applicants?.filter((item: any) => item.hiring_status == "hired").length})</span>
                                    <span onClick={() => filter("rejected")} className={`${active == "rejected" && 'border-b-4 border-customviolet'} text-sm font-bold cursor-pointer`}>rejected ({applicants?.filter((item: any) => item.hiring_status == "rejected").length})</span>
                                </div>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4 ">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Company Name
                                                </th>
                                                <th scope="col" className="px-6 py-                                    3">
                                                    Roles
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Date Applied
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        {appliation?.length ? (
                                            <>
                                                <tbody>
                                                    {appliation?.map((item, index) => (
                                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                                            <th onClick={() => handleJobClick(String(item.jobId))} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {data?.find((items) => items._id == item.companyId)?.company_name}
                                                            </th>
                                                            <td onClick={() => handleJobClick(String(item.jobId))} className="px-6 py-4">
                                                                {jobs?.find((items) => items._id == item.jobId)?.job_title}
                                                            </td>
                                                            <td onClick={() => handleJobClick(String(item.jobId))} className="px-6 py-4">
                                                                {item.createdAt ? new Date(item?.createdAt).toDateString() : ""}
                                                            </td>
                                                            <td onClick={() => handleJobClick(String(item.jobId))} className="px-6 py-4">
                                                                {item.hiring_status}
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <span
                                                                    className="font-medium text-customviolet dark:text-blue-500 hover:underline cursor-pointer"
                                                                    onClick={() => handleViewMoreClick(item)}
                                                                >
                                                                    view more
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </>
                                        ) : ("")}
                                    </table>
                                </div>
                                {appliation?.length == 0 && (
                                    <div className="w-full flex flex-col justify-center items-center bg-background">
                                        <img src={cat} alt="" className="w-[25%]" />
                                        <span className="font-bold text-xl">No Data</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>

    );
};

