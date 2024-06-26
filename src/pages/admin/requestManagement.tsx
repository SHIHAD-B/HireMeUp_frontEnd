
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
import { allRequests } from "@/redux/actions/companyAction";
import { AppDispatch } from "@/redux/store";
import axios from "axios";
import { BASE_URL } from "@/interfaces/config/constant";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button as MButton } from '@mui/material';
import { useToast } from '@/components/ui/use-toast';





export const RequestManagement = () => {
  const { toast } = useToast()

  const { data, loading }: any = useSelector((state: RootState) => state.request)
  const { admin } = useSelector((state: RootState) => state.admin)
  const dispatch = useDispatch<AppDispatch>()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ropen, rsetOpen] = useState(false);
  const handleROpen = () => rsetOpen(true);
  const handleRClose = () => rsetOpen(false);

  const [reqopen, setReqopen] = useState(false);
  const handleReqOpen = () => setReqopen(true);
  const handleReqClose = () => setReqopen(false);

  const [approval1, setapproval1] = useState("")
  const [reject1, setReject1] = useState("")

  const [reqfileName,setReqfileName]=useState("")
  const [reqfile, setReqFile] = useState("")
  const [reqfiledata, setReqfiledata] = useState({
    id: "",
    view: false
  })

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(allRequests());
    };

    fetchData();

  }, []);

  const handleModalApprove = (email: string) => {
    setapproval1(email)
    handleOpen()
  }
  const handleModalReject = (email: string) => {
    setReject1(email)
    handleROpen()
  }



  const handleApprovereq = async (email: string) => {
    await axios.post(`${BASE_URL}company/admin/approverequest`, { email: email }, { withCredentials: true }).then(() => {
      dispatch(allRequests());
      handleClose()
      toast({
        description: "Request approved successfully",
        className: "bg-blue-600 text-white"

      })
    })
  }
  const handleRejectreq = async (email: string) => {
    await axios.post(`${BASE_URL}company/admin/rejectrequest`, { email: email }, { withCredentials: true }).then(() => {
      dispatch(allRequests());
      handleRClose()
      toast({
        description: "Request rejected successfully",
        className: "bg-orange-600 text-white"

      })
    })
  }

  const hanndleViewDoc = async () => {
    if (reqfiledata.id) {
      alert(reqfiledata.id)
      const data={
        id:reqfiledata.id,
        document:reqfileName
      }
      await axios.patch(`${BASE_URL}company/admin/viewdocument`, data, { withCredentials: true }).then(() => {
        dispatch(allRequests());
        handleReqClose()
        toast({
          description: "Document Marked as Read",
          className: "bg-blue-600 text-white"

        })
      }).catch((error) => {
        console.log(error, "errror in view doc")
        toast({
          description: "Failed to mark as read",
          className: "bg-red-600 text-white"

        })
      })
    } else {
      handleReqClose()
      toast({
        description: "Failed to mark as read",
        className: "bg-red-600 text-white"

      })
    }
  }


  type Payment = {
    _id: string;
    createdAt: Date;
    registration: string,
    license: string,
    tin: string,
    financialStatements: string,
    references: string
    viewdocument: {
      registration: boolean,
      license: boolean,
      tin: boolean,
      financialStatements: boolean,
      references: boolean
    }
    companyname: string;
    email: string;
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
      accessorKey: "companyname",
      header: "companyname",
      cell: ({ row }) => <div className="capitalize">{row.getValue("companyname")}</div>,
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
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },

    {
      accessorKey: "approval",
      header: () => <div className="text-right">Status</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("approval")}</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-right">createdAt</div>,
      cell: ({ row }) => {

        const formattedDate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(row.getValue("createdAt")));



        return <div className="text-right font-medium">{formattedDate}</div>;
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
              <DropdownMenuItem
                onClick={() => {
                  setReqfileName("registration")
                  setReqFile(row.original.registration);
                  handleReqOpen();
                  setReqfiledata({
                    id: row.original._id,
                    view: row.original.viewdocument.registration
                  })
                }}
                className="bg-white text-black cursor-pointer"
              >
                Registration
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setReqfileName("license")
                  setReqFile(row.original.license);
                  handleReqOpen();
                  setReqfiledata({
                    id: row.original._id,
                    view: row.original.viewdocument.license
                  })
                }}
                className="bg-white text-black cursor-pointer"
              >
                License
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setReqfileName("tin")
                  setReqFile(row.original.tin);
                  handleReqOpen();
                  setReqfiledata({
                    id: row.original._id,
                    view: row.original.viewdocument.tin
                  })
                }}
                className="bg-white text-black cursor-pointer"
              >
                TIN
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setReqfileName("financialStatements")
                  setReqFile(row.original.financialStatements);
                  handleReqOpen();
                  setReqfiledata({
                    id: row.original._id,
                    view: row.original.viewdocument.financialStatements
                  })
                }}
                className="bg-white text-black cursor-pointer"
              >
                Financial Statement
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setReqfileName("references")
                  setReqFile(row.original.references);
                  handleReqOpen();
                  setReqfiledata({
                    id: row.original._id,
                    view: row.original.viewdocument.references
                  })
                }}
                className="bg-white text-black cursor-pointer"
              >
                References
              </DropdownMenuItem>
              {admin?.access == "can-edit" && (
                <>
                  {row.getValue("approval") !== "approved" && row.original.viewdocument.registration !== false && row.original.viewdocument.license !== false && row.original.viewdocument.financialStatements !== false && row.original.viewdocument.references !== false && row.original.viewdocument.tin !== false && (
                    <>
                      <DropdownMenuItem onClick={() => handleModalApprove(row.getValue("email"))}>Approve</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleModalReject(row.getValue("email"))}>Reject</DropdownMenuItem>
                    </>
                  )}
                </>

              )}

            </DropdownMenuContent>
          </DropdownMenu >
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

    const stylefile = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 1000,
      height: 700,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };



    return (
      <>
        {reqopen && (
          <div>
            <Modal
              open={reqopen}
              onClose={handleReqClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={stylefile}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Document
                </Typography>

                <div className="w-full h-[90%]">
                  <iframe src={reqfile} className="w-full h-[90%]"></iframe>
                </div>
                {!reqfiledata.view && (

                  <MButton onClick={hanndleViewDoc} variant="contained" color="primary" sx={{ mr: 2, mt: 2 }}>
                    Mark as Read
                  </MButton>
                )}
                <MButton onClick={handleReqClose} variant="outlined" color="secondary" sx={{ mt: 2 }}>
                  Cancel
                </MButton>
              </Box>
            </Modal>
          </div>
        )}
        {open && (
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Approve Company Request
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Sure to approve {approval1}?
                </Typography>
                <MButton onClick={() => handleApprovereq(approval1)} variant="contained" color="primary" sx={{ mr: 2, mt: 2 }}>
                  Approve
                </MButton>
                <MButton onClick={handleClose} variant="outlined" color="secondary" sx={{ mt: 2 }}>
                  Cancel
                </MButton>
              </Box>
            </Modal>
          </div>
        )}
        {ropen && (
          <div>
            <Modal
              open={ropen}
              onClose={handleRClose}
              aria-labelledby="modal-modal-titles"
              aria-describedby="modal-modal-descriptions"
            >
              <Box sx={style}>
                <Typography id="modal-modal-titles" variant="h6" component="h2">
                  Reject Company Request
                </Typography>
                <Typography id="modal-modal-descriptions" sx={{ mt: 2 }}>
                  Sure to Reject {reject1}?
                </Typography>
                <MButton onClick={() => handleRejectreq(reject1)} variant="contained" color="error" sx={{ mr: 2, mt: 2 }}>
                  Reject
                </MButton>
                <MButton onClick={handleRClose} variant="outlined" color="secondary" sx={{ mt: 2 }}>
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
