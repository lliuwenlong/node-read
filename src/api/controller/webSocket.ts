/**
 * @file 消息推送
 */
import Base from './base.js';
import moment from 'moment';
import {
    API_SEND_MESSAGE_ERROR,
    API_SEND_MESSAGE_SUCCESS
} from '../../common/codeConfig/code';
import {errorCode, successCode} from '../../common/codeConfig/codeConfig';
export default class extends Base {
    private messageModel: object = this.model('message')
    constructor(ctx: any) {
        super(ctx);
    }
    /**
     *
     * @api {post} /api/webSocket/sendMessage 消息推送
     * @apiName sendMessage
     * @apiGroup Message
     * @apiParam {String} message 消息
     * @apiSampleRequest /api/webSocket/sendMessage
     */
    sendMessageAction() {
        const message: string = this.wsData.message;
        const label: string = this.wsData.label;
        const date: string = moment().format('YYYY-MM-DD hh:mm:ss');
        try {
            const success = this.messageModel['addMessage']({
                message,
                label,
                date
            });
            if (success) {
                this['broadcast']('messagePush', message);
            }
        } catch (e) {
        }
    }
}
