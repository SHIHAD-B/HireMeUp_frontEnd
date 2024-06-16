import { IState, IUsers } from "@/interfaces/IUser";
import { BASE_URL } from "@/interfaces/config/constant";
import { Modal, Typography, Box, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Button as MButton } from '@mui/material';
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { experienceValidation } from "@/utils/validations/user/experienceValidation";
import dayjs from "dayjs";


interface IExperienceModalProps {
    id: string;
    data:IUsers
    close: () => void;
    setUser: Dispatch<SetStateAction<IUsers>>;
}


export const EditExperienceModal = (datas: IExperienceModalProps) => {

    const { toast } = useToast()
    const { close, id, setUser,data } = datas
    const [states, setStates] = useState<IState[]>()

    const [expData, setExpData] = useState({
        _id: "",
        designation: "",
        company: "",
        from: null,
        location: "",
        to: null
    })
    useEffect(() => {
        const datass = data?.experiences?.find((item:any) => item._id == id)
        setExpData(datass as any)
    }, [])

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get('https://api.countrystatecity.in/v1/countries', {
                    headers: {
                        'X-CSCAPI-KEY': 'c2J0MHBQSlhRQjFJOWVCd3NlWVRLcTJjeTZMcFJ1cmFVcDd2SndlWg=='
                    }
                });
                setStates(response.data);
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };

        fetchStates();
    }, []);

    const [error, setError] = useState({
        designation: "",
        company: "",
        from: "",
        location: "",
        to: ""
    })

    const handleDateChange = (name: any, date: any) => {
        setExpData(prev => ({
            ...prev,
            [name]: date ? date.toISOString() : null
        }));
    };
    const continues = async () => {

        setError({
            designation: "",
            company: "",
            from: "",
            location: "",
            to: ""
        })

        try {
            await experienceValidation.validate(expData, { abortEarly: false });

            const datato = {
                id: data?._id,
                data: expData
            }

            await axios.patch(`${BASE_URL}user/editexperience`, datato, { withCredentials: true }).then((res: any) => {
                console.log(res, "res from the add experience")
                toast({
                    description: "experience edited.",
                    className: "bg-customviolet text-white"
                });
              
                const experienceIndex = data?.experiences?.findIndex((item:any) => item._id == id)

                if (experienceIndex !== -1 && experienceIndex !== undefined) {
                    setUser((prev:any) => ({
                        ...prev,
                        experiences: prev?.experiences?.map((exp:any) =>
                          exp._id === id ? { ...exp, ...expData } : exp
                        ) || [] 
                      }));
                }

                    close()
                }).catch((error: any) => {
                    console.log(error)
                    toast({
                        description: "failed to edit experience",
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
                company: errors.company,
                designation: errors.designation,
                from: errors.from,
                location: errors.location,
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
        setExpData((prev) => ({
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
                            Add Experience
                        </Typography>

                        <TextField
                            label="company"
                            name="company"
                            value={expData.company}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={Boolean(error.company)}
                            helperText={error.company}
                            sx={{ mt: 1 }}
                        />
                        <TextField
                            label="designation"
                            name="designation"
                            value={expData.designation}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={Boolean(error.designation)}
                            helperText={error.designation}
                            sx={{ mt: 1, mb: 2 }}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" error={Boolean(error.location)}>
                                Location
                            </InputLabel>
                            <Select
                                name="location"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="location"
                                value={expData.location}
                                onChange={handleChange}
                                error={Boolean(error.location)}
                            >
                                {states?.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>{item.name}</MenuItem>

                                ))}

                            </Select>
                            {error.location && <div className="text-sm ml-5 text-red-600">{error.location}</div>}
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} >
                                <DatePicker
                                    value={expData.from ? dayjs(expData.from) : null}
                                    onChange={(date) => handleDateChange('from', date)}
                                    label="From"

                                    sx={{ width: '100%', mt: 1 }} />
                            </DemoContainer>
                            {error.from && <div className="text-sm ml-5 text-red-600">{error.from}</div>}
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    value={expData.from ? dayjs(expData.to) : null}
                                    onChange={(date) => handleDateChange('to', date)}
                                    label="To"
                                    sx={{ width: '100%', mt: 1 }} />
                            </DemoContainer>
                            {error.to && <div className="text-sm ml-5 text-red-600">{error.to}</div>}
                        </LocalizationProvider>

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