
import { UserHeader } from "@/components/user/header";
import { Subscribed } from "@/components/user/subscribed";
import { SubscriptionPlan } from "@/components/user/subscriptionPlan";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";


export const Subscription = () => {

    const { user } = useSelector((state: RootState) => state.user)

    return (
        <>
            <div className="w-full flex flex-col bg-backgournd">
                <UserHeader prop="Subcription" />
                {user?.subscription ? <><Subscribed /></> : <><SubscriptionPlan /></>}

            </div>
        </>
    )
}