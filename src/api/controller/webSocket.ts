/**
 * @file 消息推送
 */
import Base from './base.js';
import moment from 'moment';
import { think } from 'thinkjs';import {
    API_SEND_MESSAGE_ERROR,
    API_SEND_MESSAGE_SUCCESS
} from '../../common/codeConfig/code';
import {errorCode, successCode} from '../../common/codeConfig/codeConfig';
export default class extends think.Controller {
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
                this.websocket.emit('success');
                this['broadcast']('messagePush', message);
            } else {
                this.websocket.emit('error');
            }
        } catch (e) {
        }
    }

    /**
     *
     * @api {post} /api/webSocket/getMessageList 获取消息推送
     * @apiName getMessageList
     * @apiGroup Message
     * @apiSampleRequest /api/webSocket/getMessageList
     */
    async getMessageListAction() {
        const data: object[] = await this.messageModel['getMessageList']();
        return this.success(data);
    }
}
