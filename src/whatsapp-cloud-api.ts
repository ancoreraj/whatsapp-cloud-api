import axios from 'axios';
import {
    GraphAPIBaseUrl,
    MessageTypes,
} from './constants';

import {
    RequestHeader,
    RequestPayload,
} from './types';

class WhatsappCloudApi {
    private fromPhoneNumberId: String;
    private accessToken: string;

    constructor(options: { fromPhoneNumberId: string, accessToken: string,}){
        this.fromPhoneNumberId = options.fromPhoneNumberId;
        this.accessToken = options.accessToken;
    }

    private async sendRequest(url: string, payload: object | FormData) {
        const fullUrl: string = `${GraphAPIBaseUrl}/${url}`;
        const headers: RequestHeader = {
            Authorization: `Bearer ${this.accessToken}`,
        }

        try {
            const response = await axios.post(fullUrl, payload, {
                headers,
            })
            return response.data;
        } catch(err) {
            throw err;
        }
    }

    public async sendTextMessage(
        to: string,
        options: {
            message: string,
            preview_url?: boolean,
        },
    ) {
        const payload: RequestPayload = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to,
            type: MessageTypes.TEXT,
            text: {
                body: options.message,
                preview_url: options.preview_url || true,
            },
        }
        return this.sendRequest(`${this.fromPhoneNumberId}/messages`, payload);
    }

}

export default WhatsappCloudApi