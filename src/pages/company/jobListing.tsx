import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { fecthJob } from "@/redux/actions/jobAction";

import { useDispatch, useSelector } from "react-redux";
import Datepicker from "react-tailwindcss-datepicker";
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
import { BASE_URL } from "@/interfaces/config/constant";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button as MButton } from '@mui/material';

import { AddCategoryModal } from "@/components/admin/addCategory";
import { EditPlans } from "@/components/admin/editPlans";
import { useNavigate } from "react-router-dom";
import { IJobData } from "@/interfaces/IUser";
import { useToast } from '@/components/ui/use-toast';


export const JobListing = () => {
    const { toast } = useToast()
    const navigate = useNavigate()
    const [value, setValue] = useState({
        startDate: new Date('2023-01-01'),
        endDate: new Date()
    });


    const handleValueChange = (newValue: any) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    const { loading, data }: any = useSelector((state: RootState) => state.job)
    const company_Id = useSelector((state: RootState) => state.company.data?._id)
    const [__, setData] = useState<Payment>(data)
    const dispatch = useDispatch<AppDispatch>()


    const [delopen, setdelOpen] = useState(false);
    const [editOpen, seteditOpen] = useState(false);
    const [addopen, setaddopen] = useState(false);
    const [deleteData, setdeleteData] = useState({
        id: "",
        name: ""
    })
    const [plans, _] = useState({
        name: "",
        duration: 0,
        price: 0,
        description: "",
        discount: 0
    })


    const handleOpen = () => setdelOpen(true);
    const handleClose = () => setdelOpen(false);

    const handleaddClose = () => setaddopen(false);

    const handleditClose = () => seteditOpen(false);


    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fecthJob(company_Id));
        };

        fetchData();
    }, []);

    const filterData = () => {
        return data?.filter((data: any) => data.companyId == company_Id)
    }

    useEffect(() => {
        setData(filterData())
    }, [data])

    const handleModalDelete = (datas: any) => {
        setdeleteData({
            ...deleteData,
            id: datas.id,
            name: datas.name
        });
        handleOpen();
    }


    const handledelete = async (id: string) => {
        await axios.patch(`${BASE_URL}job/company/deletejob`, { id: id }, { withCredentials: true });
        await dispatch(fecthJob(company_Id));
        handleClose();
    }
    const handlePublish = async (id: string) => {
        await axios.patch(`${BASE_URL}job/company/publishUnpublish`, { id: id }, { withCredentials: true }).then((res) => {

            toast({
                description: `job ${res.data.user.publish ? "published" : "unpublished"} successfully`,
                className: "bg-customviolet text-white rounded"

            })
             dispatch(fecthJob(company_Id));
        }).catch(() => {
            toast({
                description: `Failed to edit publish`,
                className: "bg-red-600 text-white rounded"

            })
        });
        
    }


    type Payment = {
        _id: string;
        job_title: string;
        deleted: boolean
        type: string;
        publish: boolean;
        start_date: string;
        end_date: string;
        slot: Date;
        createdAt: Date;
    };
    const handleEditJob = (id: string) => {
        const jobData: IJobData | undefined = data.find((item: any) => item._id === id);
        if (jobData) {
            navigate('/company/editjob', { state: { jobData } });
        } else {
            console.error(`Job with id ${id} not found.`);
        }
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
            accessorKey: "job_title",
            header: "Roles",
            cell: ({ row }) => <div className={`capitalize ${row.original.deleted ? "text-red-500" : ""}`}>{row.getValue("job_title")}</div>
            ,
        },
        {
            accessorKey: "deleted",
            header: "Stauts",
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
            accessorKey: "start_date",
            header: () => <div className="text-right">Start Date</div>,
            cell: ({ row }) => {

                const formattedDate = new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }).format(new Date(row.getValue("start_date")));



                return <div className={`text-right font-medium ${row.original.deleted ? "text-red-500" : ""}`}>{formattedDate}</div>;
            },
        },
        {
            accessorKey: "end_date",
            header: () => <div className="text-right">Due Date</div>,
            cell: ({ row }) => {

                const formattedDate = new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }).format(new Date(row.getValue("end_date")));



                return <div className={`text-right  font-medium ${row.original.deleted ? "text-red-500" : ""}`}>{formattedDate}</div>;
            },
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                type JobType = 'Full-Time' | 'Part-Time' | 'Remote' | 'Internship' | 'Contract';
                const type = row.getValue("type") as JobType;
                const typeColors: Record<JobType, string> = {
                    'Full-Time': 'text-violet-500 border p-1 flex rounded border-violet-500 justify-center items-center',
                    'Part-Time': 'text-blue-500 border p-1 flex rounded border-blue-500 justify-center items-center',
                    'Remote': 'text-lime-500 border p-1 flex rounded border-lime-500 justify-center items-center',
                    'Internship': 'text-yellow-500 border p-1 flex rounded border-yellow-500 justify-center items-center',
                    'Contract': 'text-cyan-500 border p-1 flex rounded border-cyan-500 justify-center items-center'
                };
                const typeColorClass = typeColors[type] || '';

                return (
                    <div className={`capitalize ${typeColorClass}`}>
                        {type}
                    </div>
                );
            },
        },
        {
            accessorKey: "slots",
            header: "Applicants",
            cell: ({ row }) => <div className={`capitalize ${row.original.deleted ? "text-red-500" : ""}`}>12</div>
            ,
        },
        {
            accessorKey: "slot",
            header: "Applicants",
            cell: ({ row }) => <div className={`capitalize ${row.original.deleted ? "text-red-500" : ""}`}>12/{row.getValue("slot")}</div>
            ,
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

                            {row.getValue("name") !== "a" && (
                                <>
                                    {row.original.publish && (
                                        <>
                                            <DropdownMenuItem onClick={() => handlePublish(String(row.original._id))} >UnPublish</DropdownMenuItem>
                                        </>
                                    )}
                                    {!row.original.publish && (
                                        <>
                                            <DropdownMenuItem onClick={() => handlePublish(String(row.original._id))} >Publish</DropdownMenuItem>
                                        </>
                                    )}

                                    <DropdownMenuItem onClick={() => handleEditJob(String(row.original._id))} >Edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleModalDelete({ id: row.original._id, name: row.original.job_title })} >Delete</DropdownMenuItem>
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


        return (
            <>

                {delopen && (
                    <div>
                        <Modal
                            open={delopen}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Delete Job
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Sure to delete {deleteData.name}?
                                </Typography>
                                <MButton onClick={() => handledelete(deleteData.id)} variant="contained" color="error" sx={{ mr: 2, mt: 2 }}>
                                    Delete
                                </MButton>
                                <MButton onClick={handleClose} variant="outlined" color="secondary" sx={{ mt: 2 }}>
                                    Cancel
                                </MButton>
                            </Box>
                        </Modal>
                    </div>
                )}


                {addopen && <AddCategoryModal handleaddClose={handleaddClose} />}
                {editOpen && <EditPlans handleClose={handleditClose} data={plans} />}




                {loading && (

                    <AdminLoader />
                )}
                <div className="w-full flex-col">
                    <div className=" w-full flex">

                        <div className="flex flex-col w-full ">
                            <CompanyHeader />
                            <div className="w-full flex justify-between">
                                <div className="flex lg:flex-col p-1">
                                    <span className="font-bold">Job Listing</span>
                                    <span>Here is your jobs listing status from <b>{value.startDate.toDateString()}</b> to <b>{value.endDate.toDateString()}</b></span>
                                </div>
                                <div className="w-72 h-11 border border-gray-800 m-1 rounded">
                                    <Datepicker
                                        value={value}
                                        onChange={handleValueChange}
                                        showShortcuts={true}
                                        minDate={value.startDate}
                                        maxDate={value.endDate}
                                    />
                                </div>

                            </div>
                            {data && (

                                <div className="w-full p-6">
                                    <div className="flex items-center py-4">
                                        <Input
                                            placeholder="Filter name..."
                                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
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
