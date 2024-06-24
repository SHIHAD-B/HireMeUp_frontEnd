import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { AdminHeader } from "@/components/admin/header";
import { useDispatch, useSelector } from "react-redux";
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
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
import { ListAdmin } from "@/redux/actions/adminAction";
import { AppDispatch } from "@/redux/store";
import axios from "axios";
import { BASE_URL } from "@/interfaces/config/constant";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button as MButton } from '@mui/material';
import { FaPlus } from "react-icons/fa6";
import { AddAdmin } from "@/components/admin/addAdmin";
import { EditAdmin } from "@/components/admin/editAdmin";
import { useNavigate } from "react-router-dom";




export const AdminManagement = () => {
    const { data, loading }: any = useSelector((state: RootState) => state.adminList)
    const { admin } = useSelector((state: RootState) => state.admin)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [addUserOpen, setAddAdminOpen] = useState(false);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [blockOpen, setblockOpen] = useState(false);
    const [unblockOpen, setunblockOpen] = useState(false);

    const [editData, setEditData] = useState({
        _id: "",
        username: "",
        phone: "",
        email: "",
        password: ""
    })
    useEffect(() => {
        if (admin?.role !== "super-admin") {
            navigate('/admin/dashboard')
        }
    }, [])

    const [block, setBlock] = useState("")
    const [unblock, setUnblock] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(ListAdmin())
        }

        fetchData();

    }, []);

    const handleaddClose = () => {
        setAddAdminOpen(false)
    }
    const handlEditClose = () => {
        setEditUserOpen(false)
    }

    const handleEditOpen = (data: any) => {
        setEditData(data)
        setEditUserOpen(true)
    }

    const handleModalblock = (email: string) => {
        setBlock(email)
        setblockOpen(true)
        setunblockOpen(false)

    }
    const handleModalunblock = (email: string) => {
        setUnblock(email)
        setblockOpen(false)
        setunblockOpen(true)

    }



    const handleBlock = async (email: string) => {
        await axios.patch(`${BASE_URL}user/admin//blockunblockadmin`, { email: email }, { withCredentials: true }).then(() => {
            dispatch(ListAdmin());
            setblockOpen(false)
            setunblockOpen(false)

        })
    }
  



    type Payment = {
        _id: string;
        password?: string;
        email: string;
        name: string;
        access: string;
        blocked: boolean;
        role: string;
        createdAt: Date;
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
            accessorKey: "name",
            header: "AdminName",
            cell: ({ row }) => <div className={`capitalize ${row.getValue("blocked") && "text-red-600"}`}>{row.getValue("name")}</div>,
        },

        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className={`lowercase ${row.getValue("blocked") && "text-red-600"}`}>{row.getValue("email")}</div>,
        },

        {
            accessorKey: "access",
            header: () => <div className="text-right">Access</div>,
            cell: ({ row }) => {
                return (
                    <div className={`text-right font-medium ${row.getValue("blocked") && "text-red-600"}`}>
                        {row.getValue("access")}
                    </div>
                );
            },
        }
        ,
        {
            accessorKey: "blocked",
            header: () => <div className="text-right">Blocked</div>,
            cell: ({ row }) => {
                return (
                    <div className={`text-right font-medium ${row.getValue("blocked") && "text-red-600"}`}>
                        {row.getValue("blocked") ? "true" : "false"}
                    </div>
                );
            },
        }
        ,

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

                            <DropdownMenuItem onClick={() => handleEditOpen(row.original)}>Edit</DropdownMenuItem>
                            {row.getValue("blocked") == true && (
                                <>
                                    <DropdownMenuItem onClick={() => handleModalunblock(row.getValue("email"))}>unblock</DropdownMenuItem>

                                </>
                            )}
                            {row.getValue("blocked") == false && (
                                <>
                                    <DropdownMenuItem onClick={() => handleModalblock(row.getValue("email"))}>block</DropdownMenuItem>
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
                {addUserOpen && (
                    <AddAdmin handleaddClose={handleaddClose} />

                )}
                {editUserOpen && (
                    <EditAdmin handleEditClose={handlEditClose} data={editData} />

                )}


                {blockOpen && (
                    <div>
                        <Modal
                            open={blockOpen}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Block User
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Sure to block {block}?
                                </Typography>
                                <MButton onClick={() => handleBlock(block)} variant="contained" color="error" sx={{ mr: 2, mt: 2 }}>
                                    Block
                                </MButton>
                                <MButton onClick={() => setblockOpen(false)} variant="outlined" color="secondary" sx={{ mt: 2 }}>
                                    Cancel
                                </MButton>
                            </Box>
                        </Modal>
                    </div>
                )}
                {unblockOpen && (
                    <div>
                        <Modal
                            open={unblockOpen}
                            aria-labelledby="modal-modal-titles"
                            aria-describedby="modal-modal-descriptions"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-titles" variant="h6" component="h2">
                                    Unblock User
                                </Typography>
                                <Typography id="modal-modal-descriptions" sx={{ mt: 2 }}>
                                    Sure to unblock {unblock}?
                                </Typography>
                                <MButton onClick={() => handleBlock(unblock)} variant="contained" color="primary" sx={{ mr: 2, mt: 2 }}>
                                    unBlock
                                </MButton>
                                <MButton onClick={() => setunblockOpen(false)} variant="outlined" color="secondary" sx={{ mt: 2 }}>
                                    Cancel
                                </MButton>
                            </Box>
                        </Modal>
                    </div>
                )}


                {loading && (

                    <AdminLoader />
                )}
                <div className="w-full flex-col">
                    <div className=" w-full flex">

                        <div className="flex flex-col w-full ">
                            <AdminHeader />
                            {data && (

                                <div className="w-full p-6">
                                    <div className="flex items-center py-4">
                                        <Input
                                            placeholder="Filter emails..."
                                            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                                            onChange={(event) =>
                                                table.getColumn("email")?.setFilterValue(event.target.value)
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
                                                                className="capitalize"
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
                                    <div className="w-full h-auto  flex justify-end pb-2">
                                        <button onClick={() => setAddAdminOpen(true)} className="flex gap-2 p-3 rounded bg-customviolet justify-center items-center text-white hover:rounded-xl"><FaPlus />Add Admin</button>
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
