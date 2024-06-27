import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { fecthJob } from "@/redux/actions/jobAction";

import { useDispatch, useSelector } from "react-redux";
import { CompanyHeader } from "@/components/company/header";
import { AdminLoader } from "@/components/common/adminLoader";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AppDispatch } from "@/redux/store";
import axios from "axios";
import { companyApplicantList, listcompanyUsers } from "@/redux/actions/companyAction";
import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/interfaces/config/constant";
import { useNavigate } from "react-router-dom";
import { updateApplicantStatus } from "@/utils/notificationManager/updateApplicantStatus";


export const Applicants = () => {
    const { toast } = useToast()
 
    const navigate=useNavigate()

    const { loading, data: Datas }: any = useSelector((state: RootState) => state.applicantList)
    const { data: jobs }: any = useSelector((state: RootState) => state.job)
    const { data: users }: any = useSelector((state: RootState) => state.usersList)
    const company_Id = useSelector((state: RootState) => state.company.data?._id)
    const [data, setData] = useState<Payment[]>(Datas)
    const dispatch = useDispatch<AppDispatch>()

    const [active, setActive] = useState("")

    const filter = (category: string) => {
        const applist = Datas?.filter((item: any) => item.companyId == company_Id);
        if (category == "") {
            setData(applist);
            setActive("");
        } else {
            const filJobs = applist?.filter((item: any) => item.hiring_status == category);
            setData(filJobs);
            setActive(category);
        }
    };

    const updateStatus = async (id: string, status: string,userId:string,jobId:string) => {
        const data = {
            id: id,
            status: status
        }
        const prevStatus = Datas.find((item: any) => item._id == id).hiring_status
        if (!id || !status) {
            toast({
                description: "Failed to update Status!..",
                className: "bg-red-500 text-white"
            });
        } else {
            await axios.patch(`${BASE_URL}job/company/updatestatus`, data, { withCredentials: true }).then((res:any) => {
                toast({
                    description: "Status updated",
                    className: "bg-customviolet text-white"
                });
                dispatch(companyApplicantList(String(company_Id)))
                const applist = res?.data?.user?.filter((item: any) => item.companyId == company_Id);
                const filJobs = applist?.filter((item: any) => item.hiring_status == prevStatus);
                setData(filJobs);
                setActive(prevStatus);
                const jobname=jobs.find((item:any)=>item._id==jobId).job_title
                const data={
                    sender:company_Id,
                    recipient:userId,
                    update:status,
                    jobname:jobname
                }
                updateApplicantStatus(data)
            }).catch((error: any) => {
                console.log(error,"error in fetching")
                toast({
                    description: "Failed to update Status!",
                    className: "bg-red-500 text-white"
                });
            })
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fecthJob(company_Id));
            await dispatch(companyApplicantList(String(company_Id))).then((res)=>{
                console.log(res,"resss")
                setData(res.payload)
            })
            await dispatch(listcompanyUsers())
        };

        fetchData();
    }, []);

    const filterData = () => {
        return data?.filter((data: any) => data.companyId == company_Id)
    }

    useEffect(() => {
        setData(filterData())
    }, [Datas])




    type Payment = {
        _id: string;
        companyId: string;
        jobId: string;
        userId: string;
        hiring_status: string;
        createdAt: Date;
        deleted: boolean;
    };

    const columns: ColumnDef<Payment>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "userId",
            header: "Full Name",
            cell: ({ row }) => <div className={`capitalize ${row.original.deleted ? "text-red-500" : ""}`}>{users?.find((item: any) => item._id == row.getValue("userId")).username}</div>
            ,
        },
        {
            accessorKey: "hiring_status",
            header: "Hiring_Status",
            cell: ({ row }) => <div className={`capitalize ${row.original.deleted ? "text-red-500" : ""}`}>{row.getValue("hiring_status")}</div>
            ,
        },




        {
            accessorKey: "jobId",
            header: "Job Role",
            cell: ({ row }) => {
                const isDeleted = row.original.deleted;
                return (
                    <div className={`capitalize ${isDeleted ? "text-red-500 border rounded p-1 flex justify-center items-center border-red-500" : "text-customviolet border rounded p-1 flex justify-center items-center border-customviolet"}`}>
                        {jobs.find((item: any) => item._id == row.getValue("jobId")).job_title}
                    </div>
                );
            },
        },
        {
            accessorKey: "deleted",
            header: "Status",
            cell: ({ row }) => {
                const isDeleted = row.original.deleted;
                return (
                    <div className={`capitalize ${isDeleted ? "text-red-500 border rounded p-1 flex justify-center items-center border-red-500" : "text-green-500 border rounded p-1 flex justify-center items-center border-green-500"}`}>
                        {isDeleted ? "Closed" : "Live"}
                    </div>
                );
            },
        },
        {
            accessorKey: "createdAt",
            header: () => <div className="text-right">Applied Date</div>,
            cell: ({ row }) => {

                const formattedDate = new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }).format(new Date(row.getValue("createdAt")));



                return <div className={`text-right  font-medium ${row.original.deleted ? "text-red-500" : ""}`}>{formattedDate}</div>;
            },
        },
        {
            accessorKey: "_id",
            header: "",
            cell: ({ row }) => {
                return (
                    <button onClick={()=>navigate('/company/applicantsdetails',{ state: { id:row.original._id  } })} className="p-2 rounded border border-customviolet bg-customviolet text-white hover:bg-white hover:text-customviolet">See Application</button>
                );
            },
        },

        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 ">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4 " />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white text-black">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            {row.getValue("hiring_status") == "in-review" && (
                                <>
                                    <DropdownMenuItem onClick={() => updateStatus(row.getValue("_id"), "shortlisted",row.original.userId,row.original.jobId)}  >Shortlist</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateStatus(row.getValue("_id"), "rejected",row.original.userId,row.original.jobId)} >Reject</DropdownMenuItem>
                                </>
                            )}
                            {row.getValue("hiring_status") == "shortlisted" && (
                                <>
                                    <DropdownMenuItem onClick={() => updateStatus(row.getValue("_id"), "interview",row.original.userId,row.original.jobId)}  >Schedule an interview</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateStatus(row.getValue("_id"), "rejected",row.original.userId,row.original.jobId)} >Reject</DropdownMenuItem>
                                </>
                            )}
                            {row.getValue("hiring_status") == "interview" && (
                                <>
                                    <DropdownMenuItem onClick={() => updateStatus(row.getValue("_id"), "hired",row.original.userId,row.original.jobId)}  >Hire</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateStatus(row.getValue("_id"), "rejected",row.original.userId,row.original.jobId)} >Reject</DropdownMenuItem>
                                </>
                            )}
                            {row.getValue("hiring_status") == "rejected" && (
                                <>
                                    <DropdownMenuItem  >Delete</DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    function DataTableDemo() {
        const [sorting, setSorting] = useState<SortingState>([]);
        const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
        const [columnVisibility, setColumnVisibility] =
            useState<VisibilityState>({});
        const [rowSelection, setRowSelection] = useState({});

        const table: any = useReactTable({
            data,
            columns,
            onSortingChange: setSorting,
            onColumnFiltersChange: setColumnFilters,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            onColumnVisibilityChange: setColumnVisibility,
            onRowSelectionChange: setRowSelection,
            state: {
                sorting,
                columnFilters,
                columnVisibility,
                rowSelection,
            },
        });



        return (
            <>

                {loading && (

                    <AdminLoader />
                )}
                <div className="w-full flex-col">
                    <div className=" w-full flex">

                        <div className="flex flex-col w-full ">
                            <CompanyHeader />
                            <div className="w-full flex justify-between">
                                <div className="flex lg:flex-col p-1">
                                    <span className="font-bold">Applicants</span>
                                    <span>Total:{Datas?.length}</span>
                                </div>
                                

                            </div>
                            <div className="w-full flex gap-4 p-6">
                                <button onClick={() => filter("")} className={` ${active == "" && 'border-b-4 border-customviolet'} text-sm font-bold cursor-pointer`}>All ({Datas?.length})</button>
                                <button onClick={() => filter("in-review")} className={`${active == "in-review" && 'border-b-4 border-customviolet'} text-sm font-bold cursor-pointer`}>In Review ({Datas?.filter((item: any) => item.hiring_status == "in-review").length})</button>
                                <button onClick={() => filter("shortlisted")} className={`${active == "shortlisted" && 'border-b-4 border-customviolet'} text-sm font-bold cursor-pointer`}>shortlisted ({Datas?.filter((item: any) => item.hiring_status == "shortlisted").length})</button>
                                <button onClick={() => filter("interview")} className={`${active == "interview" && 'border-b-4 border-customviolet'} text-sm font-bold cursor-pointer`}>interview ({Datas?.filter((item: any) => item.hiring_status == "interview").length})</button>
                                <button onClick={() => filter("hired")} className={`${active == "hired" && 'border-b-4 border-customviolet'} text-sm font-bold cursor-pointer`}>hired ({Datas?.filter((item: any) => item.hiring_status == "hired").length})</button>
                                <button onClick={() => filter("rejected")} className={`${active == "rejected" && 'border-b-4 border-customviolet'} text-sm font-bold cursor-pointer`}>rejected ({Datas?.filter((item: any) => item.hiring_status == "rejected").length})</button>
                            </div>
                            {data && (

                                <div className="w-full p-6">
                                    <div className="flex items-center py-4">
                                        <Input
                                            placeholder="Filter name..."
                                            value={(table.getColumn("_id")?.getFilterValue() as string) ?? ""}
                                            onChange={(event) =>
                                                table.getColumn("name")?.setFilterValue(event.target.value)
                                            }
                                            className="max-w-sm"
                                        />
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="ml-auto">
                                                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {table
                                                    .getAllColumns()
                                                    .filter((column: any) => column.getCanHide())
                                                    .map((column: any) => {
                                                        return (
                                                            <DropdownMenuCheckboxItem
                                                                key={column.id}
                                                                className="capitalize bg-white"
                                                                checked={column.getIsVisible()}
                                                                onCheckedChange={(value: any) =>
                                                                    column.toggleVisibility(!!value)
                                                                }
                                                            >
                                                                {column.id}
                                                            </DropdownMenuCheckboxItem>
                                                        );
                                                    })}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                {table.getHeaderGroups().map((headerGroup: any) => (
                                                    <TableRow key={headerGroup.id}>
                                                        {headerGroup.headers.map((header: any) => {
                                                            return (
                                                                <TableHead key={header.id}>
                                                                    {header.isPlaceholder
                                                                        ? null
                                                                        : flexRender(
                                                                            header.column.columnDef.header,
                                                                            header.getContext()
                                                                        )}
                                                                </TableHead>
                                                            );
                                                        })}
                                                    </TableRow>
                                                ))}
                                            </TableHeader>
                                            <TableBody>
                                                {table.getRowModel().rows?.length ? (
                                                    table.getRowModel().rows.map((row: any) => (
                                                        <TableRow
                                                            key={row.id}
                                                            data-state={row.getIsSelected() && "selected"}
                                                        >
                                                            {row.getVisibleCells().map((cell: any) => (
                                                                <TableCell key={cell.id}>
                                                                    {flexRender(
                                                                        cell.column.columnDef.cell,
                                                                        cell.getContext()
                                                                    )}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell
                                                            colSpan={columns?.length}
                                                            className="h-24 text-center"
                                                        >
                                                            No results.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <div className="flex items-center justify-end space-x-2 py-4">
                                        <div className="flex-1 text-sm text-muted-foreground">
                                            {table.getFilteredSelectedRowModel().rows?.length} of{" "}
                                            {table.getFilteredRowModel().rows?.length} row(s) selected.
                                        </div>
                                        <div className="space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => table.previousPage()}
                                                disabled={!table.getCanPreviousPage()}
                                            >
                                                Previous
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => table.nextPage()}
                                                disabled={!table.getCanNextPage()}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }


    return <DataTableDemo />;
};
