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
import { editCompanyValidation } from '@/utils/validations/admin/editCompanyValidation';

type EditCompanyProp = {
    handleEditClose: () => void;
    data: any;
};

export const EditCompany = ({ handleEditClose, data }: EditCompanyProp) => {
    const { toast } = useToast()

    const dispatch = useDispatch<AppDispatch>()

    const [addData, setAddData] = useState(data)
    useEffect(() => {
        if (addData.password) {
            setAddData((prev: any) => ({
                ...prev,
                password: ""
            }))

        }
    }, [])
    const [addDataError, setAddDataError] = useState({
        company_name: "",
        email: "",
        password: "",
        confirmPassword: ""
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
                company_name: "",
                email: "",
                password: "",
                confirmPassword: ""
            })

            if (addData.password == "") {
                delete addData.password
            }
            
              

            await editCompanyValidation.validate(addData, { abortEarly: false });
            console.log("Validation successful");


            await axios.patch(`${BASE_URL}company/admin/editadcompany`, addData,{withCredentials:true}).then((res: any) => {
                console.log(res, "res from the add company")
                handleEditClose()
                toast({
                    description: "company edited successfully",
                    className: "bg-customviolet text-white"

                })
                dispatch(fetchUser())
            }).catch((error: any) => {
                if (error.response.data.message) {
                    setAddDataError(prev => ({
                        ...prev,
                        company_name: error.response.data.message
                    }))
                }
                console.log(error, "error from the edited company")
            })

        } catch (error: any) {

            const errors: { [key: string]: string } = {};
            error.inner.forEach((err: { path: string | number; message: string; }) => {
                if (err.path) {
                    errors[err.path] = err.message;
                }
            });
            const errorsss = {
                company_name: errors.company_name,
                email: errors.email,
                password: errors.password,
                confirmPassword: errors.comfirmPassword
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
                        Edit Company
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Enter Company details:
                    </Typography>
                    <TextField
                        name="company_name"
                        id="company_name"
                        onChange={(e) => handleAddChange(e)}
                        value={addData.company_name}
                        label="company_name"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                        helperText={addDataError.company_name}
                        error={Boolean(addDataError.company_name)}
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

                    <MButton
                        onClick={() => handleSubmit()}
                        variant="contained"
                        color="success"
                        sx={{ mr: 2, mt: 2 }}
                    >
                        Add
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