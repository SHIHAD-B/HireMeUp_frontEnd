import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { employeeList } from "@/redux/actions/companyAction";
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
import { BASE_URL } from "@/interfaces/config/constant";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button as MButton } from '@mui/material';
import { FaPlus } from "react-icons/fa6";
import { AddEmployeeModal } from "@/components/company/addEmployee";
import { EditEmployeeModal } from "@/components/company/editEmployee";

export const ResourceManagement = () => {
    const { data: compData, loading }: any = useSelector((state: RootState) => state.employee);
    const company_Id = useSelector((state: RootState) => state.company.data?._id);
    const [data, setData] = useState<Payment[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    const [delopen, setdelOpen] = useState(false);
    const [editOpen, seteditOpen] = useState(false);
    const [addopen, setaddopen] = useState(false);
    const [deleteData, setdeleteData] = useState({
        id: "",
        email: "",
        name: ""
    });
    const [employee, setEmployee] = useState({
        name: "",
        duration: 0,
        price: 0,
        description: "",
        discount: 0
    });

    console.log(compData, "emp data");
    const handleOpen = () => setdelOpen(true);
    const handleClose = () => setdelOpen(false);

    const handleaddOpen = () => setaddopen(true);
    const handleaddClose = () => setaddopen(false);

    const handleditOpen = () => seteditOpen(true);
    const handleditClose = () => seteditOpen(false);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(employeeList());
        };

        fetchData();
    }, [dispatch]);

    const filterData = () => {
        return compData?.filter((data: any) => data.companyId == company_Id);
    }

    useEffect(() => {
        const filteredData = filterData();
        console.log('Filtered Data:', filteredData);
        setData(filteredData);
    }, [compData, company_Id]);

    const handleModalDelete = (datas: any) => {
        setdeleteData({
            ...deleteData,
            id: datas.id,
            email: datas.email,
            name: datas.name
        });
        handleOpen();
    }

    const handleModalEdit = (datas: any) => {
        setEmployee(datas);
        handleditOpen();
    }
    const handledelete = async (id: string) => {
        await axios.patch(`${BASE_URL}company/company/deleteemployee`, { id: id }, { withCredentials: true });
        await dispatch(employeeList());
        handleClose();
    }

    type Payment = {
        _id?: string;
        companyId: string;
        firstName: string;
        lastName: string;
        email: string;
        position: string;
        department: string;
        deleted: boolean;
        isActive: boolean;
        profile: string;
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
            accessorKey: "firstName",
            header: "FirstName",
            cell: ({ row }) => <div className={`capitalize ${row.original.deleted ? "text-red-500" : ""}`}>{row.getValue("firstName")}</div>
            ,
        },
        {
            accessorKey: "lastName",
            header: "LastName",
            cell: ({ row }) => <div className={`capitalize ${row.original.deleted ? "text-red-500" : ""}`}>{row.getValue("lastName")}</div>
            ,
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <div className={`capitalize ${row.original.deleted ? "text-red-500" : ""}`}>{row.getValue("email")}</div>
            ,
        },
        {
            accessorKey: "position",
            header: "Position",
            cell: ({ row }) => <div className={`capitalize ${row.original.deleted ? "text-red-500" : ""}`}>{row.getValue("position")}</div>
            ,
        },
        {
            accessorKey: "department",
            header: "Department",
            cell: ({ row }) => <div className={`capitalize ${row.getValue("deleted") ? "text-red-500" : ""}`}>{row.getValue("department")}</div>
            ,
        },
        {
            accessorKey: "deleted",
            header: "Status",
            cell: ({ row }) => {
                const isDeleted = row.getValue("deleted");
                return (
                    <div className={`capitalize ${isDeleted ? "text-red-500 border rounded p-1 flex justify-center items-center border-red-500" : "text-green-500 border rounded p-1 flex justify-center items-center border-green-500"}`}>
                        {isDeleted ? "Deleted" : "Active"}
                    </div>
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
                            {row.getValue("deleted") !== true && (
                                <>
                                    <DropdownMenuItem onClick={() => handleModalEdit(row.original)}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleModalDelete({ id: row.original._id, name: row.original.firstName, email: row.original.email })}>Delete</DropdownMenuItem>
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
        const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
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

                {addopen && <AddEmployeeModal handleaddClose={handleaddClose} />}
                {editOpen && <EditEmployeeModal handleClose={handleditClose} data={employee} />}

                {loading && <AdminLoader />}
                <div className="w-full flex-col">
                    <div className=" w-full flex">
                        <div className="flex flex-col w-full ">
                            <CompanyHeader />
                            <div className="w-full flex justify-between">
                                <div className="flex lg:flex-col p-1">
                                    <span className="font-bold">Resources</span>
                                    <span>Here is your resources listing status</span>
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
                                    <div className="w-full h-auto flex justify-end pb-2">
                                        <button onClick={handleaddOpen} className="flex gap-2 p-3 rounded bg-customviolet justify-center items-center text-white hover:rounded-xl"><FaPlus />Add Employee</button>
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
