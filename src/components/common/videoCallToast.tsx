import { companyList, companyUserList, listcompanyUsers } from '@/redux/actions/companyAction';
import { UlistUsers } from '@/redux/actions/userAction';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import audios from '../../assets/audio/facebook_tone.mp3'

const VideoCallToast = ({ data, onAccept, onDecline }: { data: any, onAccept: () => void, onDecline: () => void }) => {
    const dispatch = useDispatch<AppDispatch>()
    const { data: user } = useSelector((state: RootState) => state.usersList)
    const { data: companyData } = useSelector((state: RootState) => state.companyList)
    useEffect(() => {
        dispatch(UlistUsers())
        dispatch(listcompanyUsers())
        dispatch(companyList())
        dispatch(companyUserList())
    }, [])

   
    const value = user?.find((item: any) => item._id == data.senderId)
    const compValue = companyData?.find((item) => item._id == data.senderId)
 
   
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={value?.profile?value.profile:compValue?.icon?compValue.icon:""} alt={data.name} style={{ borderRadius: '50%', width: 50, height: 50, marginRight: 10 }} />
                <div>
                    <div>{value?.username?value.username:compValue?.company_name?compValue.company_name:""}</div>
                    <div>Incoming Video Call...</div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
                    <button onClick={onAccept} style={{ padding: '5px 10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: 5 }}>Accept</button>
                    <button onClick={onDecline} style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: 5 }}>Decline</button>
                </div>
            </div>
        );
}

export const VideoCallNotification = ({ data }: { data: any }) => {
    const [audio] = useState(new Audio(audios));

    useEffect(() => {
        audio.play();

        const onAccept = () => {
            audio.pause();
            window.location.href = `${data.link}`;
        };

        const onDecline = () => {
            audio.pause();
            toast.dismiss();
        };

        toast(
            <VideoCallToast data={data} onAccept={onAccept} onDecline={onDecline} />,
            {
                position: "top-center",
                duration: 10000,
            }
        );

        return () => {
            audio.pause();
        };
    }, [audio, data]);

    return null;
};


