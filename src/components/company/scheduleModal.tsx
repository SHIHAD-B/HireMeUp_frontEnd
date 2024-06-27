
import { BASE_URL } from "@/interfaces/config/constant";
import { Modal, Typography, Box, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Button as MButton } from '@mui/material';
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { RootState } from "@/redux/store";
import { updateApplicantStatus } from "@/utils/notificationManager/updateApplicantStatus";

interface IAbout {
    id: string,
    jobId: string,
    close: () => void

}

export const ScheduleModal = (data: IAbout) => {
    const { toast } = useToast()
    const { close, id, jobId } = data
    const { data: companyData } = useSelector((state: RootState) => state.company)
    const { data: jobs } = useSelector((state: RootState) => state.job)
    const { data: employee } = useSelector((state: RootState) => state.employee)
    const [error, setError] = useState({
        title: "",
        date: "",
        time: "",
        interviewer: "",
    })
    const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
    const [title, setTitle] = useState("")
    const [time, setTime] = useState<Dayjs | null>(dayjs(new Date()));
    const [interviewer, setInterviewer] = useState("")



    const continues = async () => {
        let hasError = false;
        const currentErrors = { ...error };

        if (title.trim() === "") {
            currentErrors.title = "Title is required";
            hasError = true;
        } else {
            currentErrors.title = "";
        }

        if (!date || date.isBefore(dayjs(), 'day')) {
            currentErrors.date = "Date should be valid and not in the past";
            hasError = true;
        } else {
            currentErrors.date = "";
        }
        if (!interviewer || interviewer.trim()=="") {
            currentErrors.interviewer = "interviewer is required";
            hasError = true;
        } else {
            currentErrors.interviewer = "";
        }

        if (!time) {
            currentErrors.time = "Time should be valid";
            hasError = true;
        } else {
            const nowPlusOneHour = dayjs().add(1, 'hour');
            const selectedDateTime = date?.hour(time.hour()).minute(time.minute());

            if (date?.isBefore(dayjs(), 'day') || (date?.isSame(dayjs(), 'day') && selectedDateTime?.isBefore(nowPlusOneHour))) {
                currentErrors.time = "Time should be valid and at least one hour from now";
                hasError = true;
            } else {
                currentErrors.time = "";
            }
        }

        setError(currentErrors);

        if (hasError) {
            return;
        }

        let scheduledDateTime = null;
        if (date && time) {
            scheduledDateTime = `${date.format('YYYY-MM-DD')}T${time.format('HH:mm:ss')}`;
        }

        try {
            await axios.post(`${BASE_URL}job/company/sheduleinterview`, {
                title: title,
                jobId: jobId,
                date: scheduledDateTime,
                userId: id,
                interviewer:interviewer,
                companyId: companyData?._id
            }, { withCredentials: true }).then(() => {
                toast({
                    description: "Scheduled an interview",
                    className: "bg-customviolet text-white rounded"
                });
                close();
                const jobname = jobs?.find((item: any) => item._id == jobId)?.job_title
                const data = {
                    sender: companyData?._id,
                    recipient: id,
                    update: 'interview',
                    jobname: jobname
                }
                updateApplicantStatus(data)
            }).catch((error: any) => {
                console.log(error, "errorrrrr");
                setError((prev) => ({
                    ...prev,
                    date: error?.response?.data?.message
                }));
                toast({
                    description: "Failed to Schedule an interview",
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
        width: 520,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        rounded: "10px"
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
                            Schedule An Interview
                        </Typography>
                        <TextField
                            label="Title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            variant="outlined"
                            error={Boolean(error.title)}
                            helperText={error.title}
                            sx={{ mt: 1, mb: 2 }}
                        />
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label" >
                                Interviewer
                            </InputLabel>
                            <Select
                                name="interviewer"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="interviewer"
                                value={interviewer}
                                error={Boolean(error.interviewer)}
                                onChange={(e) => setInterviewer(e.target.value)}
                                sx={{ mb: 1 }}
                            >
                                {employee?.filter((items)=>items.companyId==companyData?._id).map((item,index)=>(

                                <MenuItem key={index} value={item.firstName}>{item.firstName}</MenuItem>
                                ))}
                               
                            </Select>
                            {error.interviewer && <div className="text-xs ml-5 text-red-600">{error.interviewer}</div>}
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    sx={{ width: "100%" }}
                                    label="Date"
                                    value={date}
                                    onChange={(newValue) => setDate(newValue)}

                                />
                            </DemoContainer>
                            <span className="text-red-500 text-xs">{error.date}</span>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <Box sx={{ transform: 'scale(0.8)', height: '250px' }}>
                                <StaticTimePicker
                                    orientation="landscape"
                                    value={time}
                                    onChange={(newValue) => setTime(newValue)}
                                />
                            </Box>
                        </LocalizationProvider>
                        <div className="w-full p-2">
                        <span className="text-red-500 text-xs">{error.time}</span>
                        </div>
                        <MButton onClick={continues} color="success" className="bg-customviolet" variant="contained" sx={{ mr: 2, mt: 4 }}>
                            Schedule
                        </MButton>
                        <MButton onClick={close} variant="outlined" color="secondary" sx={{ mt: 4 }} >
                            Cancel
                        </MButton>
                    </Box>
                </Modal>
            </div>

        </>
    )
}