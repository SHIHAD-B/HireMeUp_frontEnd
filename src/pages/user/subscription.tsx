
import { SubscriptionPlan } from "@/components/user/subscriptionPlan";

// import { TbHandClick } from "react-icons/tb";
export const Subscription = () => {



    return (
        <>
            <div className="w-full flex flex-col bg-backgournd">
                <div className="h-[70px]  border-b border-gray-200 flex items-center pl-2">
                    <span className="text-xl font-bold">Subscriptions</span>
                </div>
                <SubscriptionPlan/>
            </div>
        </>
    )
}