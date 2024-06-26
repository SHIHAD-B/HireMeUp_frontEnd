import { BASE_URL } from "@/interfaces/config/constant";
import { RootState } from "@/redux/store";
import { contactValidation } from "@/utils/validations/company/contactValidation";
import axios from "axios";
import { useState } from "react";
import { GiSevenPointedStar } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";

export const SetProfiletwo = () => {
    const { toast } = useToast();
    const { data: company } = useSelector((state: RootState) => state.company);
    const [data, setData] = useState({
        instagram: company?.contact?.instagram,
        twitter: company?.contact?.twitter,
        linkedIn: company?.contact?.linkedIn
    });
    const [error, setError] = useState({
        instagram: "",
        twitter: "",
        linkedIn: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
        setError((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    const submit = async () => {

        setError({
            instagram: "",
            twitter: "",
            linkedIn: ""
        });

        try {
            await contactValidation.validate(data, { abortEarly: false });
            console.log("Validation success");
            const sendData = {
                userId: company?._id,
                ...data
            }
            await axios.patch(`${BASE_URL}company/company/addcontactlinks`, sendData, { withCredentials: true })
                .then((res: any) => {
                    console.log(res, "res from back")
                    toast({
                        description: "Contact links added.",
                        className: "bg-customviolet text-white"
                    });
                })
                .catch((error: any) => {
                    console.log(error);
                    toast({
                        description: "Failed to set contact links",
                        className: "bg-red-400 text-white"
                    });
                });

        } catch (error: any) {
            const errors: { [key: string]: string } = {};
            error.inner.forEach((err: { path: string | number; message: string }) => {
                if (err.path) {
                    errors[err.path] = err.message;
                }
            });
            console.error("Validation failed:", errors);

            const errorsss = {
                instagram: errors.instagram,
                twitter: errors.twitter,
                linkedIn: errors.linkedIn
            };

            setError((prev: any) => ({
                ...prev,
                ...errorsss
            }));
        }
    };

    return (
        <>
            <div className="w-full flex-col">
                <div className='w-full flex pt-4 flex-col lg:flex-row  border-b border-gray-200'>
                    <div className='h-full w-full lg:w-1/4 pl-2 flex flex-col'>
                        <span className='font-bold'>Basic Information</span>
                        <span className="text-sm text-gray-400">Add elsewhere links to your company profile. You can add only username without full https links</span>
                    </div>
                    <div className='w-full m-2 lg:w-2/5 flex flex-col gap-6'>
                        <div className='1/4 flex flex-col gap-2'>
                            <span className='flex '>Instagram<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <input name="instagram" onChange={handleChange} value={data.instagram || ''} type="text" className='w-full border bg-background rounded border-gray-400 h-10 p-2' />
                            <p className="text-xs text-red-400">{error.instagram}</p>
                        </div>
                        <div className='1/4 flex flex-col gap-2'>
                            <span className='flex '>Twitter<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <input name="twitter" onChange={handleChange} value={data.twitter || ''} type="text" className='w-full border rounded bg-background border-gray-400 h-10 p-2' />
                            <p className="text-xs text-red-400">{error.twitter}</p>
                        </div>
                        <div className='1/4 flex flex-col gap-2'>
                            <span className='flex '>LinkedIn<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <input name="linkedIn" onChange={handleChange} value={data.linkedIn || ''} type="text" className='w-full border rounded bg-background border-gray-400 h-10 p-2' />
                            <p className="text-xs text-red-400">{error.linkedIn}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-end pr-6 mt-10 pb-2'>
                    <button onClick={submit} className='p-2 border rounded text-white bg-customviolet hover:bg-white hover:text-customviolet'>Save Changes</button>
                </div>
            </div>
        </>
    );
};
