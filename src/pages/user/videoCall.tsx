import  { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSocketContext } from '@/assets/context/socketContext';
import { useLocation } from 'react-router-dom';

function randomID(len: any) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
        maxPos = chars.length,
        i;
    len = len || 5;
    for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

export function getUrlParams(url = window.location.href) {
    let urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
}

const VideoCall = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const senderId=queryParams.get('senderId')
    const { socket } = useSocketContext();
    const roomID = getUrlParams().get('roomID') || randomID(5);
    const meetingContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (meetingContainerRef.current) {
            myMeeting(meetingContainerRef.current);
        }
    
        async function myMeeting(element: any) {
            const appID = 1641629677;
            const serverSecret = "02fa6ccc8f061c489220e8c28f649c88";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));
    
            const zp = ZegoUIKitPrebuilt.create(kitToken);
    
            zp.joinRoom({
                container: element,
                sharedLinks: [
                    {
                        name: 'Copy link',
                        url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
            });
    
            const data = {
                id:id,
                senderId:senderId,
                link: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
            };
    
            
            socket?.emit("join_video", data);
        }
    }, [roomID, socket, id]);
    
    

    return (
        <div
            className="myCallContainer"
            ref={meetingContainerRef}
            style={{ width: '100vw', height: '100vh' }}
        ></div>
    );
};

export default VideoCall;
