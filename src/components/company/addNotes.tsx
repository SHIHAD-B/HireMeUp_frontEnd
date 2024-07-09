import { IApplicants } from "@/interfaces/IUser";
import { BASE_URL } from "@/interfaces/config/constant";
import { Modal, Typography, Box, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Button as MButton } from '@mui/material';
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { employeeList } from "@/redux/actions/companyAction";



interface INotes {
    id: string,
    close: () => void,
    setApplicantDetails: Dispatch<SetStateAction<IApplicants | undefined>>;
}
export const AddNotesModal = (data: INotes) => {
    const dispatch = useDispatch<AppDispatch>()
    const { toast } = useToast()
    const { close, setApplicantDetails, id } = data
    const { data: employeeLists } = useSelector((state: RootState) => state.employee)
    const { data: company } = useSelector((state: RootState) => state.company)
    const [employee, setEmployee] = useState("")
    const [notes, setNotes] = useState("")
    const [error, setError] = useState({
        employee: "",
        note: ""
    })
    useEffect(() => {
        dispatch(employeeList());
    }, [])

    const continues = async () => {
        let hasError = false;
        const currentErrors = { ...error };

        if (employee.trim() === "") {
            currentErrors.employee = "Employee is required";
            hasError = true;
        } else {
            currentErrors.employee = "";
        }
        if (notes.trim() === "") {
            currentErrors.note = "Note  is required";
            hasError = true;
        } else {
            currentErrors.note = "";
        }



        setError(currentErrors);

        if (hasError) {
            return;
        }


        try {
            const data = {
                id, employee, notes
            }
            await axios.post(`${BASE_URL}job/company/addnotes`, data, { withCredentials: true }).then((res) => {
                const responseData=res.data.user.hiring_info[res.data.user.hiring_info.length-1]
                setApplicantDetails((prev: any) => ({
                    ...prev,
                    hiring_info: [...prev?.hiring_info,responseData]
                }))
                toast({
                    description: "note added",
                    className: "bg-customviolet text-white rounded"
                });
                close();

            }).catch((error: any) => {
                console.log(error, "errorrrrr");
                setError((prev) => ({
                    ...prev,
                    date: error?.response?.data?.message
                }));
                toast({
                    description: "Failed to add notes",
                    className: "bg-red-500 text-white rounded"
                });
            });
        } catch (error) {
            console.error('Error scheduling interview:', error);
        }
    };


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
            <div>
                <Modal
                    open={true}

                    aria-labelledby="modal-modal-titles"
                    aria-describedby="modal-modal-descriptions"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-titles" variant="h6" component="h2">
                            Add Notes
                        </Typography>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label" >
                                Employee
                            </InputLabel>
                            <Select
                                name="interviewer"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="interviewer"
                                value={employee}
                                error={Boolean(error.employee)}
                                onChange={(e) => setEmployee(e.target.value)}
                                sx={{ mb: 1 }}
                            >
                                {employeeLists?.filter((items:any) => items.companyId == company?._id).map((item:any, index:any) => (

                                    <MenuItem key={index} value={item.firstName}>{item.firstName}</MenuItem>
                                ))}

                            </Select>
                            {error.employee && <div className="text-xs ml-5 text-red-600">{error.employee}</div>}
                        </FormControl>
                        <TextField
                            label="Note"
                            name="Note"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            fullWidth
                            variant="outlined"
                            error={Boolean(error.note)}
                            helperText={error.note}
                            multiline
                            rows={4}
                            sx={{ mt: 1 }}
                        />

                        <MButton onClick={continues} color="success" variant="contained" sx={{ mr: 2, mt: 2 }}>
                            Add
                        </MButton>
                        <MButton onClick={close} variant="outlined" color="secondary" sx={{ mt: 2 }} >
                            Cancel
                        </MButton>
                    </Box>
                </Modal>
            </div>

        </>
    )
}