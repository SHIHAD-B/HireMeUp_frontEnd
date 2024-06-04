import { fetchSubscription, fetchUser } from "@/redux/actions/userAction"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadStripe } from '@stripe/stripe-js'
import { BASE_URL, ENCRYPTION_KEY, STRIPE_PUBLISH_KEY } from "@/interfaces/config/constant"
import axios from "axios"
import { ISubscriptions } from "@/interfaces/IUser"
import { useToast } from "../ui/use-toast"
import CryptoJS from 'crypto-js'
import { useNavigate } from "react-router-dom"


export const SubscriptionPlan = () => {
    const { toast } = useToast()
    const navgate=useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { data } = useSelector((state: RootState) => state.subscription)
    const { user } = useSelector((state: RootState) => state.user)

    useEffect(() => {
        const addsubscriptionData = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const encryptedData = urlParams.get('data');

            if (encryptedData) {
                try {
                    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
                    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    
                    if (decryptedData) {
                        const parsedData = JSON.parse(decryptedData);

                        if (parsedData && parsedData.planId) {
                            toast({
                                description: "Upgraded to premium",
                                className: "bg-blue-500 text-white rounded"
                            });
    
                            const payload = { userId: user?._id, planId: parsedData.planId };

                            await axios.post(`${BASE_URL}subscription/user/addSubscription`, payload, { withCredentials: true })
                                .then((res) => {
                                    console.log(res, "response from server");
                                    dispatch(fetchUser())
                                    navgate('/subscription');
                                })
                                .catch((error) => {
                                    console.error('Error in POST request:', error);
                                    toast({
                                        description: "Upgradation didn't happen",
                                        className: "bg-red-500 text-white rounded"
                                    });
                                });
    
                            return;
                        }
                    }
    
                    console.error('No plan ID found in decrypted data');
                    toast({
                        description: "Upgradation didn't happen",
                        className: "bg-red-500 text-white rounded"
                    });
                } catch (error) {
                    console.error('Failed to decrypt or parse data:', error);
                    toast({
                        description: "Failed to process data",
                        className: "bg-red-500 text-white rounded"
                    });
                }
            }
        };
    
        addsubscriptionData();
    }, []);
    



    useEffect(() => {
        dispatch(fetchSubscription())
    }, [])

    const [selectedPlan, setSelectedPlan] = useState<ISubscriptions>()

    const handleSelectPlan = (data: ISubscriptions) => {
        setSelectedPlan(data)
        makePayment()
    }


    const makePayment = async () => {
        try {
            const stripe = await loadStripe(STRIPE_PUBLISH_KEY);

            const body = {
                data: {
                    ...selectedPlan,
                    userId: user?._id,
                    planId: selectedPlan?._id
                }
            };

            const headers = {
                "Content-Type": "application/json",
                withCredentials: true
            };

            const response = await axios.post(`${BASE_URL}subscription/user/checkoutsubscription`, body, { headers });


            console.log(response, "response from stripe")
            const result: any = stripe?.redirectToCheckout({
                sessionId: response.data.id
            })
            if (result?.error) {
                console.log(result.error)
            }


        } catch (error) {

            console.error('Payment failed:', error);
        }
    };


    return (
        <>
            <div className=" w-full flex flex-col justify-center items-center bg-background">
                <div className="w-full min- ">
                    <div className="w-full h-[200px]  bg-gray-600 pt-8">
                        <div className="w-full h-16 bg-customviolet flex justify-center items-center">
                            <span className=" text-4xl text-white">SUBSCRIPTION PLAN</span>
                        </div>
                        <span className="w-full flex justify-center mt-4 text-white">Upgrade to premium and open doors to endless opportunities. Don't settle for less when you can have access to the best.</span>
                    </div>
                </div>
                <div className=" w-[90%]  border justify-start mt-2 mb-2 flex gap-2 flex-wrap">

                    {data && data.filter(key => !key.deleted).map((data, index) => (

                        <div key={index} className="w-[300px] h-80 flex flex-col bg-violet-300">
                            <div className="w-full h-24 border-4 bg-gray-300 flex flex-col justify-center items-center">
                                <span className="text-2xl font-bold text-gray-700">{data.name}</span>
                                <del className="text-2xl font-mono text-red-600">₹{data.price}</del>
                                <span className="text-2xl text-customviolet font-bold">₹{data.price - data.price * data.discount / 100}/ <span className="text-xl text-white">{data.duration} days</span> </span>
                            </div>
                            <div className="font-finger text-2xl text-white w-full flex justify-center">{data.discount}% OFF</div>
                            <div className="w-full p-2 overflow-y-auto h-36   break-words">
                                {data.description}
                            </div>
                            <button
                                onClick={() => handleSelectPlan(data)}
                                className="p-2 border rounded bg-customviolet text-white"> upgrade</button>
                        </div>
                    ))}




                </div>

            </div>
        </>
    )
}
