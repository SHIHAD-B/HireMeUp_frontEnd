import { IUsers } from "@/interfaces/IUser";
import { BASE_URL } from "@/interfaces/config/constant";
import { RootState } from "@/redux/store";
import { Modal, Typography, Box, TextField, FormControl, InputLabel, MenuItem, Select, TextareaAutosize } from "@mui/material"
import { Button as MButton } from '@mui/material';
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { educationValidation } from "@/utils/validations/user/addEducationValidation";


interface IEducation{
    id: string,
    close: () => void,
    setUser: Dispatch<SetStateAction<IUsers>>;
}

export const AddEducationModal = (data: IEducation) => {

    const { toast } = useToast()
    const { close, setUser } = data
    const { user } = useSelector((state: RootState) => state.user)




    const [eduData, setEduData] = useState({
        university: "",
        course: "",
        description: "",
        from: null,
        grade: "",
        to: null
    })
    const [error, setError] = useState({
        university: "",
        course: "",
        description: "",
        from: "",
        grade: "",
        to: ""
    })

    const handleDateChange = (name: any, date: any) => {
        setEduData(prev => ({
            ...prev,
            [name]: date ? date.toISOString() : null
        }));
    };
    const continues = async () => {

        setError({
            university: "",
            course: "",
            description: "",
            from: "",
            grade: "",
            to: ""
        })

        try {
            await educationValidation.validate(eduData, { abortEarly: false });

            const data = {
                id: user?._id,
                data: eduData
            }

            await axios.patch(`${BASE_URL}user/addeducation`, data, { withCredentials: true }).then((res: any) => {
                console.log(res, "res from the add experience")
                toast({
                    description: "experience added.",
                    className: "bg-customviolet text-white"
                });
                const data = {
                    ...eduData,
                    _id: res.data.user.education[res?.data?.user?.education?.length - 1]._id
                }
                setUser((prev: any) => ({
                    ...prev,
                    education: [...prev.education, data]
                }))

                close()
            }).catch((error: any) => {
                console.log(error)
                toast({
                    description: "failed to add experience",
                    className: "bg-red-400 text-white"
                });
                close()

            })
        } catch (error: any) {
            const errors: { [key: string]: string } = {};
            error.inner.forEach((err: { path: string | number; message: string }) => {
                if (err.path) {
                    errors[err.path] = err.message;
                }
            });
            console.error("Validation failed:", errors);

            const errorsss = {
                university: errors.university,
                course: errors.course,
                description: errors.description,
                from: errors.from,
                grade: errors.grade,
                to: errors.to
            }

            setError((prev: any) => ({
                ...prev,
                ...errorsss
            }));
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setEduData((prev) => ({
            ...prev,
            [name]: value
        }))

        setError((prev) => ({
            ...prev,
            [name]: ""
        }))
    }

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
                            Add Education
                        </Typography>

                        <TextField
                            label="Course"
                            name="course"
                            value={eduData.course}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={Boolean(error.course)}
                            helperText={error.course}
                            sx={{ mt: 1 }}
                        />
                        <TextField
                            label="University"
                            name="university"
                            value={eduData.university}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={Boolean(error.university)}
                            helperText={error.university}
                            sx={{ mt: 1, mb: 2 }}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" error={Boolean(error.grade)}>
                                Grade
                            </InputLabel>
                            <Select
                                name="grade"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="grade"
                                value={eduData.grade}
                                onChange={handleChange}
                                error={Boolean(error.grade)}
                            >

                                <MenuItem value="Primary Education">Primary Education</MenuItem>
                                <MenuItem value="Secondary Education / High School">Secondary Education / High School</MenuItem>
                                <MenuItem value="Higher Secondary / Senior Secondary / Pre-University">Higher Secondary / Senior Secondary / Pre-University</MenuItem>
                                <MenuItem value="General Certificate of Secondary Education (GCSE)">General Certificate of Secondary Education (GCSE)</MenuItem>
                                <MenuItem value="International Baccalaureate (IB)">International Baccalaureate (IB)</MenuItem>
                                <MenuItem value="Bachelors / Undergraduate">Bachelors / Undergraduate</MenuItem>
                                <MenuItem value="Masters / Postgraduate">Masters / Postgraduate</MenuItem>
                                <MenuItem value="PhD / Doctorate">PhD / Doctorate</MenuItem>




                            </Select>
                            {error.grade && <div className="text-sm ml-5 text-red-600">{error.grade}</div>}
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} >
                                <DatePicker
                                    value={eduData.from ? dayjs(eduData.from) : null}
                                    onChange={(date) => handleDateChange('from', date)}
                                    label="From"

                                    sx={{ width: '100%', mt: 1 }} />
                            </DemoContainer>
                            {error.from && <div className="text-sm ml-5 text-red-600">{error.from}</div>}
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    value={eduData.from ? dayjs(eduData.to) : null}
                                    onChange={(date) => handleDateChange('to', date)}
                                    label="To"
                                    sx={{ width: '100%', mt: 1 }} />
                            </DemoContainer>
                            {error.to && <div className="text-sm ml-5 text-red-600">{error.to}</div>}
                        </LocalizationProvider>

                        <TextareaAutosize
                            name="description"
                            onChange={handleChange}
                            value={eduData.description}
                            aria-label="empty textarea"
                            placeholder="Write Description about this..."
                            style={{
                                width: '100%',
                                minHeight: 100,
                                padding: 10,
                                border: `1px solid ${error.description ? 'red' : 'gray'}`,
                                marginTop: '10px'
                            }}
                        />
                        <p className="ml-5 text-sm text-red-600">{error.description}</p>
                        <MButton onClick={continues} color="success" variant="contained" sx={{ mr: 2, mt: 2 }}>
                            Continue
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