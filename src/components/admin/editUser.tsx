import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button as MButton, TextField } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '@/interfaces/config/constant';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchUser } from '@/redux/actions/userAction';
import { editUserValidation } from '@/utils/validations/admin/editUserValidation';

type EditUserProp = {
    handleEditClose: () => void;
    data: any;
};

export const EditUser = ({ handleEditClose, data }: EditUserProp) => {
    const { toast } = useToast()

    const dispatch = useDispatch<AppDispatch>()

    const [addData, setAddData] = useState(data)

    useEffect(() => {
        if (addData.password) {
           setAddData((prev:any)=>({
            ...prev,
            password:""
           }))
           
        }
    },[])

    const [addDataError, setAddDataError] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    })

    const handleAddChange = (e: any) => {
        const { name, value } = e.target
        setAddData((prev: any) => ({
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
                username: "",
                email: "",
                password: "",
                phone: ""
            })
           if(addData.password==""){
            delete addData.password
           }

            await editUserValidation.validate(addData, { abortEarly: false });
            console.log("Validation successful");


            await axios.patch(`${BASE_URL}user/admin/editUser`, addData,{withCredentials:true}).then((res: any) => {
                console.log(res, "res from the add user")
                handleEditClose()
                toast({
                    description: "user edited successfully",
                    className: "bg-customviolet text-white"

                })
                dispatch(fetchUser())
            }).catch((error: any) => {
                if (error.response.data.message) {
                    setAddDataError(prev => ({
                        ...prev,
                        username: error.response.data.message
                    }))
                }
                console.log(error, "error from the add plan")
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
                phone: errors.phone,
                password: errors.password,
              
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
                        Edit User
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Enter user details:
                    </Typography>
                    <TextField
                        name="username"
                        id="username"
                        onChange={(e) => handleAddChange(e)}
                        value={addData.username}
                        label="Username"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                        helperText={addDataError.username}
                        error={Boolean(addDataError.username)}
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
                        name="phone"
                        value={addData.phone}
                        onChange={(e) => handleAddChange(e)}
                        error={Boolean(addDataError.phone)}
                        helperText={addDataError.phone}
                        id="phone"
                        label="Phone"
                        type="number"
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
                    
                    <MButton
                        onClick={() => handleSubmit()}
                        variant="contained"
                        color="primary"
                        sx={{ mr: 2, mt: 2 }}
                    >
                        Edit
                    </MButton>
                    <MButton
                        onClick={() => handleEditClose()}
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