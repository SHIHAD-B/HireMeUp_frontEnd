import { ChangeEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '@/interfaces/config/constant';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { employeeValidation } from '@/utils/validations/company/employeeValidation';
import { employeeList } from '@/redux/actions/companyAction';


type EditEmployeeProp = {
    handleClose: () => void;
    data: any;
}

export const EditEmployeeModal = ({ handleClose, data }: EditEmployeeProp) => {
    const { data: compData } = useSelector((state: RootState) => state.company)
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        _id:"",
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        department: '',
    });

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const [formError, setFormError] = useState({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        department: '',
    });
    const dispatch = useDispatch<AppDispatch>()

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setFormData(prevPlans => ({
            ...prevPlans,
            [name]: value
        }));
    };
    const handleSubmit = async () => {
        try {
            setFormError({
                firstName: '',
                lastName: '',
                email: '',
                position: '',
                department: '',
            })


            await employeeValidation.validate(formData, { abortEarly: false });
            console.log("Validation successful");

            const empData = {
                _id:formData._id,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                position: formData.position,
                department: formData.department,
                companyId: compData?._id
            }


            await axios.patch(`${BASE_URL}company/company/editemployee`, empData,{withCredentials:true}).then((res: any) => {
                handleClose()
                toast({
                    description: "Employee Edited successfull",
                    className: "bg-green-400 text-white"

                })
                dispatch(employeeList())
            }).catch((error: any) => {
                if (error.response.data.message) {
                    setFormError(prev => ({
                        ...prev,
                        firstName: error.response.data.message
                    }))
                }
                handleClose()
                if(error.response.data.message=="employee details are upToDate"){
                    toast({
                        description: "Employee datas are UpToDate",
                        className: "bg-blue-400 text-white"
    
                    })
                }else{
                    toast({
                        description:error.response.data.message,
                        className: "bg-red-400 text-white"
    
                    })

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
                firstName: errors.firstName,
                lastName: errors.lastName,
                email: errors.email,
                position: errors.position,
                department: errors.department,
            }
            setFormError(prev => ({
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
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Employee
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="max-w-md mx-auto">
                            <div className="mb-4">
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    error={!!formError.firstName}
                                    helperText={formError.firstName}
                                />
                            </div>
                            <div className="mb-4">
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    error={!!formError.lastName}
                                    helperText={formError.lastName}
                                />
                            </div>
                            <div className="mb-4">
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    error={!!formError.email}
                                    helperText={formError.email}
                                />
                            </div>
                            <div className="mb-4">
                                <TextField
                                    label="Position"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    error={!!formError.position}
                                    helperText={formError.position}
                                />
                            </div>
                            <div className="mb-4">
                                <TextField
                                    label="Department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    error={!!formError.department}
                                    helperText={formError.department}
                                />
                            </div>
                        </div>
                    </Typography>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="success"
                        sx={{ mr: 2, mt: 2 }}
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="secondary"
                        sx={{ mt: 2 }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </div>

    )
}
