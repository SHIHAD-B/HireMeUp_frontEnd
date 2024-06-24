import { BASE_URL } from "@/interfaces/config/constant"
import axios from "axios"



export const updateApplicantStatus = async (inputData: any) => {
    try {
        let notificationMessage: string;

        switch (inputData.update.toLowerCase()) {
            case 'shortlisted':
                notificationMessage = `Congratulations! You have been shortlisted for the position ${inputData?.jobname}.`;
                break;
            case 'interview':
                notificationMessage = `You have an interview scheduled for the position  ${inputData?.jobname}.`;
                break;
            case 'rejected':
                notificationMessage = `We regret to inform you that you have been rejected for the position  ${inputData?.jobname}.`;
                break;
            case 'hired':
                notificationMessage = `Congratulations! You have been hired for the position  ${inputData?.jobname}.`;
                break;
            default:
                console.error(`Unknown status:', "please ignore this notification`);
                return null;
        }
        const data = {
            recipient: inputData.recipient,
            message: notificationMessage,
            sender: inputData.sender,
            type: "info"
        }
        axios.post(`${BASE_URL}notification/company/addnotification`, data, { withCredentials: true })
    } catch (error) {

    }
}