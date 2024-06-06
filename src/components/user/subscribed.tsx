import { IPlans } from '@/interfaces/IUser';
import { fetchSubscription } from '@/redux/actions/userAction';
import { AppDispatch, RootState } from '@/redux/store';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}


export const Subscribed: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.user);
    const { data } = useSelector((state: RootState) => state.subscription);
    const [subscriptionData, setSubscriptionData] = useState<IPlans>()
    useEffect(() => {
        dispatch(fetchSubscription())
        console.log(data)
        const filteredSubscription = data?.find((item) => item._id == user?.subscription.planId)
        console.log(filteredSubscription, "fill")
        setSubscriptionData(filteredSubscription)
    }, [])

    const endDate: Date | undefined = user?.subscription?.end_date ? new Date(user.subscription.end_date) : undefined;



    const calculateTimeLeft = (): TimeLeft => {
        if (!endDate || isNaN(endDate.getTime())) {

            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        const now = new Date();
        const difference = endDate.getTime() - now.getTime();

        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        const timeLeft: TimeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };

        return timeLeft;
    };


    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const formatTime = (time: number) => String(time).padStart(2, '0');

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 dark:bg-background bg-gray-200">
            <span className='text-foreground text-2xl font-bold'>Your Subscription Validity</span>
            <div className="flex space-x-4 text-white text-5xl font-bold">
                <div className="flex flex-col items-center">
                    <div className="bg-gray-800 w-20 h-20 rounded-lg flex justify-center items-center">{formatTime(timeLeft.days)}</div>
                    <div className="text-sm mt-2  text-foreground">Days</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-gray-800 w-20 h-20 rounded-lg flex justify-center items-center">{formatTime(timeLeft.hours)}</div>
                    <div className="text-sm mt-2  text-foreground">Hours</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-gray-800 w-20 h-20 rounded-lg flex justify-center items-center">{formatTime(timeLeft.minutes)}</div>
                    <div className="text-sm mt-2  text-foreground">Minutes</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-gray-800 w-20 h-20 rounded-lg flex justify-center items-center">{formatTime(timeLeft.seconds)}</div>
                    <div className="text-sm mt-2  text-foreground">Seconds</div>
                </div>
            </div>
            <div className='w-full flex justify-center items-center'>
                <div className='flex flex-col p-4 w-[50%] rounded border dark:border-forground border-gray-300'>
                    <span>Subscription Details:</span>
                    <span className='flex gap-2 text-xl'><span className='font-bold text-foreground'>Plan Name:</span>{subscriptionData?.name}</span>
                    <span className='flex gap-2 text-xl'><span className='font-bold text-foreground'>Description:</span>
                        <span className="whitespace-normal break-words">{subscriptionData?.description}</span>
                    </span>
                    <span className='flex gap-2 text-xl'><span className='font-bold text-foreground'>Price:</span>₹ {subscriptionData?.price}</span>
                    <span className='flex gap-2 text-xl'><span className='font-bold text-foreground'>Validity:</span>{subscriptionData?.duration} days</span>
                    <span className='flex gap-2 text-xl'><span className='font-bold text-foreground'>Discount:</span> {subscriptionData?.discount} %</span>
                    <span className='flex gap-2 text-xl'><span className='font-bold text-foreground'>Discount Price:</span>₹ {Math.floor(Number(subscriptionData?.price)-(Number(subscriptionData?.price)*Number(subscriptionData?.discount)/100))} </span>
                </div>
            </div>


        </div>
    );
};

export default Subscribed;
