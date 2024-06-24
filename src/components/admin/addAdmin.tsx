import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, Button as MButton, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '@/interfaces/config/constant';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchUser } from '@/redux/actions/userAction';
import { addAdminValidation } from '@/utils/validations/admin/addAdminValidation';


export const AddAdmin = ({ handleaddClose }: { handleaddClose: () => void }) => {
    const { toast } = useToast()

    const dispatch = useDispatch<AppDispatch>()

    const [addData, setAddData] = useState({
        name: "",
        email: "",
        access:"",
        role: "",
        password: "",
        confirmPassword: ""
    })

    const [addDataError, setAddDataError] = useState({
        name: "",
        email: "",
        access:"",
        role: "",
        password: "",
        confirmPassword: ""
    })

    const handleAddChange = (e: any) => {
        const { name, value } = e.target
        setAddData((prev) => ({
            ...prev,
            [name]: value
        }))
        setAddDataError((prev) => ({
            ...prev,
            [name]: ""
        }))
    }



    const handleSubmit = async () => {
        try {
            setAddDataError({
                name: "",
                email: "",
                access:"",
                role: "",
                password: "",
                confirmPassword: ""
            })


            await addAdminValidation.validate(addData, { abortEarly: false });
            console.log("Validation successful");


            await axios.post(`${BASE_URL}user/admin/addadmin`, addData,{withCredentials:true}).then((res: any) => {
                console.log(res, "res from the add user")
                handleaddClose()
                toast({
                    description: "user added successfull",
                    className: "bg-customviolet text-white"

                })
                dispatch(fetchUser())
            }).catch((error: any) => {
                if (error.response.data.message) {
                    setAddDataError(prev => ({
                        ...prev,
                        email: error.response.data.message
                    }))
                }
               
            })

        } catch (error: any) {

            const errors: { [key: string]: string } = {};
            error.inner.forEach((err: { path: string | number; message: string; }) => {
                if (err.path) {
                    errors[err.path] = err.message;
                }
            });
            const errorsss = {
                username: errors.username,
                email: errors.email,
                phone:errors.phone,
                password: errors.password,
                confirmPassword: errors.confirmPassword
            }
            setAddDataError(prev => ({
                ...prev,
                ...errorsss
            }));
        }

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

        <div>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Admin
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Enter admin details:
                    </Typography>
                    <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label" >
                                Access
                            </InputLabel>
                            <Select
                                name="access"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="grade"
                                value={addData?.access}
                                error={Boolean(addDataError?.access)}
                                onChange={(e)=>handleAddChange(e)}
                                sx={{  mb: 1 }}
                            >
                                    <MenuItem  value="can-view">Can-View</MenuItem>
                                    <MenuItem  value="can-edit">Can-Edit</MenuItem>
                            </Select>
                            {addDataError?.access && <div className="text-sm ml-5 text-red-600">{addDataError?.access}</div>}
                        </FormControl>
                    <TextField
                        name="name"
                        id="name"
                        onChange={(e) => handleAddChange(e)}
                        value={addData.name}
                        label="AdminName"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                        helperText={addDataError.name}
                        error={Boolean(addDataError.name)}
                    />
                    <TextField
                        name="email"
                        value={addData.email}
                        onChange={(e) => handleAddChange(e)}
                        error={Boolean(addDataError.email)}
                        helperText={addDataError.email}
                        id="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                       
                    <TextField
                        name="password"
                        onChange={(e) => handleAddChange(e)}
                        value={addData.password}
                        error={Boolean(addDataError.password)}
                        helperText={addDataError.password}
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        name="confirmPassword"
                        onChange={(e) => handleAddChange(e)}
                        value={addData.confirmPassword}
                        error={Boolean(addDataError.confirmPassword)}
                        helperText={addDataError.confirmPassword}
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <MButton
                        onClick={() => handleSubmit()}
                        variant="contained"
                        color="success"
                        sx={{ mr: 2, mt: 2 }}
                    >
                        Add
                    </MButton>
                    <MButton
                        onClick={() => handleaddClose()}
                        variant="outlined"
                        color="secondary"
                        sx={{ mt: 2 }}
                    >
                        Cancel
                    </MButton>
                </Box>
            </Modal>
        </div>

    )
}