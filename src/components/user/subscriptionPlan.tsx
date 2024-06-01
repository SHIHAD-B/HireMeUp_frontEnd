import { fetchSubscription } from "@/redux/actions/userAction"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


export const SubscriptionPlan = () => {
    const dispatch=useDispatch<AppDispatch>()
    const { data } = useSelector((state: RootState) => state.subscription)

    useEffect(()=>{
       dispatch(fetchSubscription())
    },[])

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

                    {data&&data.filter(key=>!key.deleted).map((data, index) => (

                        <div key={index} className="w-[300px] h-80 flex flex-col bg-violet-300">
                            <div className="w-full h-24 border-4 bg-gray-300 flex flex-col justify-center items-center">
                                <span className="text-2xl font-bold text-gray-700">{data.name}</span>
                                <del className="text-2xl font-mono text-red-600">₹{data.price}</del>
                                <span className="text-2xl text-customviolet font-bold">₹{data.price-data.price*data.discount/100}/ <span className="text-xl text-white">{data.duration} days</span> </span>
                            </div>
                            <div className="font-finger text-2xl text-white w-full flex justify-center">{data.discount}% OFF</div>
                            <div className="w-full p-2 overflow-y-auto h-36   break-words">
                                {data.description}
                            </div>
                            <button className="p-2 border rounded bg-customviolet text-white"> upgrade</button>
                        </div>
                    ))}




                </div>

            </div>
        </>
    )
}