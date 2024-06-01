import { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button as MButton } from '@mui/material';
import { categoryValidation } from '@/utils/validations/admin/categoryValidation';
import axios from 'axios';
import { BASE_URL } from '@/interfaces/config/constant';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchCategory } from '@/redux/actions/adminAction';

export const AddCategoryModal = ({ handleaddClose }: { handleaddClose: () => void }) => {
    const { toast } = useToast()

    const dispatch = useDispatch<AppDispatch>()
    const [category, setCategory] = useState({
        category: "",
        description: ""
    })
    const [categoryError, setCategoryError] = useState({
        category: "",
        description: "",
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setCategory(prevPlans => ({
            ...prevPlans,
            [name]: value
        }));
    };
    const handleSubmit = async () => {
        try {
            setCategoryError({
                category: "",
                description: ""
            })


            await categoryValidation.validate(category, { abortEarly: false });
            console.log("Validation successful");


            await axios.post(`${BASE_URL}job/addcategory`, category,{withCredentials:true}).then((res:any) => {
                console.log(res,"res from the add plan")
                handleaddClose()
                toast({
                    description: "category added successfull",
                    className: "bg-customviolet text-white"

                })
                dispatch(fetchCategory())
            }).catch((error:any)=>{
                if(error.response.data.message){
                    setCategoryError(prev=>({
                        ...prev,
                        category:error.response.data.message
                    }))
                }
                console.log(error,"error from the add plan")
            })

        } catch (error: any) {

            const errors: { [key: string]: string } = {};
            error.inner.forEach((err: { path: string | number; message: string; }) => {
                if (err.path) {
                    errors[err.path] = err.message;
                }
            });
            const errorsss = {
                category: errors.category,
                description: errors.description,
            }
            setCategoryError(prev => ({
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

                aria-labelledby="modal-modal-titles"
                aria-describedby="modal-modal-descriptions"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-titles" variant="h6" component="h2">
                        Add Category
                    </Typography>
                    <Typography id="modal-modal-descriptions" sx={{ mt: 2 }}>
                        <div className="max-w-md mx-auto">

                            <div className="mb-4">
                                <label htmlFor="category" className=" block text-gray-700 text-sm font-bold mb-2">Name</label>
                                <input onChange={(e) => handleChange(e)} value={category.category} id="name" name="category" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <p className="text-red-500 text-xs">{categoryError.category}</p>
                            </div>
                         
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea onChange={(handleChange)} value={category.description} id="description" name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                                <p className="text-red-500 text-xs">{categoryError.description}</p>
                            </div>

                        </div>

                    </Typography>
                    <MButton onClick={handleSubmit} variant="contained" color="success" sx={{ mr: 2, mt: 2 }}>
                        submit
                    </MButton>
                    <MButton onClick={handleaddClose} variant="outlined" color="secondary" sx={{ mt: 2 }}>
                        Cancel
                    </MButton>
                </Box>
            </Modal>
        </div>

    )
}