import { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button as MButton } from '@mui/material';
import { planValidation } from "@/utils/validations/admin/planValidation";
import axios from 'axios';
import { BASE_URL } from '@/interfaces/config/constant';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchSubscription } from '@/redux/actions/adminAction';

export const AddPlansModal = ({ handleaddClose }: { handleaddClose: () => void }) => {
    const { toast } = useToast()

    const dispatch = useDispatch<AppDispatch>()
    const [plans, setPlans] = useState({
        name: "",
        duration: 0,
        price: 0,
        description: "",
        discount: 0
    })
    const [plansError, setPlansError] = useState({
        name: "",
        duration: "",
        price: "",
        description: "",
        discount: ""
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setPlans(prevPlans => ({
            ...prevPlans,
            [name]: value
        }));
    };
    const handleSubmit = async () => {
        try {
            setPlansError({
                name: "",
                duration: "",
                price: "",
                description: "",
                discount: ""
            })


            await planValidation.validate(plans, { abortEarly: false });
            console.log("Validation successful");


            await axios.post(`${BASE_URL}subscription/admin/addplans`, plans,{withCredentials:true}).then((res:any) => {
                console.log(res,"res from the add plan")
                handleaddClose()
                toast({
                    description: "plan added successfull",
                    className: "bg-customviolet text-white"

                })
                dispatch(fetchSubscription())
            }).catch((error:any)=>{
                setPlansError((prev)=>({
                    ...prev,
                    name:error?.response?.data?.message
                }))
            })

        } catch (error: any) {

            const errors: { [key: string]: string } = {};
            error.inner.forEach((err: { path: string | number; message: string; }) => {
                if (err.path) {
                    errors[err.path] = err.message;
                }
            });
            const errorsss = {
                name: errors.name,
                duration: errors.duration,
                price: errors.price,
                description: errors.description,
                discount: errors.discount
            }
            setPlansError(prev => ({
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
                        Add Plans
                    </Typography>
                    <Typography id="modal-modal-descriptions" sx={{ mt: 2 }}>
                        <div className="max-w-md mx-auto">

                            <div className="mb-4">
                                <label htmlFor="name" className=" block text-gray-700 text-sm font-bold mb-2">Name</label>
                                <input onChange={(e) => handleChange(e)} value={plans.name} id="name" name="name" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <p className="text-red-500 text-xs">{plansError.name}</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">Duration</label>
                                <input onChange={(handleChange)} value={plans.duration} id="duration" name="duration" type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <p className="text-red-500 text-xs">{plansError.duration}</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea onChange={(handleChange)} value={plans.description} id="description" name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                                <p className="text-red-500 text-xs">{plansError.description}</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                                <input onChange={(handleChange)} value={plans.price} id="price" name="price" type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <p className="text-red-500 text-xs">{plansError.price}</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="discount" className="block text-gray-700 text-sm font-bold mb-2">Discount</label>
                                <input onChange={(handleChange)} value={plans.discount} id="discount" name="discount" type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <p className="text-red-500 text-xs">{plansError.discount}</p>
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