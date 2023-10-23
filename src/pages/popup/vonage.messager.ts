import axios from 'axios'

export async function sendSms(from: string, to: string, message: string) {
    try {
        const response = await axios.post(
            'https://api.vonagebusiness.com/messages/9/users/3339353935382e35333239303730/messages',
            {
                "body": "hi",
                "trackId": "bf46a69e-e217-4cac-866d-4ef11e80e496",
                "fromDisplayName": "18133335600",
                "toDisplayName": "12056269972",
                "messageType": "SMS"
            }
        );
        console.log('SMS Sent:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}