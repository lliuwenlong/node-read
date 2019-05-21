/**
 * @file 用户控制器
 */

import Base from './base';
import nodemailer from 'nodemailer';
import mailConfig from '../config/mailConfig.js';
import {mathRand} from '../../common/util/index.js';
import {errorCode, successCode} from '../../common/codeConfig/codeConfig';
import md5 from 'js-md5';
import moment from 'moment';
import {
    API_REGISTER_CODE_ERROR,
    API_REGISTER_SUCCESS,
    API_REGISTER_ERROR,
    API_REGISTER_USERNAME,
    API_REGISTER_EMAIL
} from '../../common/codeConfig/code';
export default class extends Base {
    private userModel: object;
    constructor(ctx: any) {
        super(ctx);
        this.userModel = this.model('user');
    }
    /**
     *
     * @api {post} /api/user/sendMail 发送邮箱
     * @apiName sendMail
     * @apiGroup User
     * @apiDescription 发送邮箱
     * @apiParam {String} email 邮箱
     * @apiSampleRequest /api/user/sendMail
     */
    async sendMailAction() {
        const email: string = this.post('email');
        const transporter = nodemailer.createTransport(mailConfig);
        const number: string = mathRand();
        var mail = {
            // 发件人
            from: `<18801295284@163.com>`,
            // 主题
            subject: '接受凭证',//邮箱主题
            // 收件人
            to: email,
            text: number
        };
        try {
            await transporter.sendMail(mail);
            await this.cache(`send${email}`, number, {
                timeout: 5 * 60 * 1000
            });
            return this.success(null, '发送成功')
        } catch(e) {
            return this.fail('发送失败');
        }
    }
    
    /**
     *
     * @api {post} /api/user/registerUser 注册账号
     * @apiName registerUser
     * @apiGroup User
     * @apiDescription 注册账号
     * @apiParam {String} email 邮箱
     * @apiParam {String} accountNumber 账号
     * @apiParam {String} password 账号
     * @apiParam {number} emailCode 邮箱验证码 账号
     * @apiSampleRequest /api/user/registerUser
     */
    async registerUserAction() {
        const email: string = this.post('email');
        const emailCode: number = this.post('emailCode');
        const accountNumber: any = this.post('accountNumber');
        const password: any = md5(this.post('password'));
        const date: string = moment().format('YYYY-MM-DD');
        const data = await this.cache(`send${email}`);
        if (+data !== emailCode) {
            return this.fail(
                errorCode.get(API_REGISTER_CODE_ERROR)['code'],
                errorCode.get(API_REGISTER_CODE_ERROR)['message']
            );
        }
        const success = await this.userModel['findUserNameAction']('username', accountNumber);
        const isEmail = await this.userModel['findUserNameAction']('email', email);
        // 判断用户名是否被注册
        if (success) {
            return this.fail(
                errorCode.get(API_REGISTER_USERNAME)['code'],
                errorCode.get(API_REGISTER_USERNAME)['message']
            )
        }
        // 判断邮箱是否被注册
        if (isEmail) {
            return this.fail(
                errorCode.get(API_REGISTER_EMAIL)['code'],
                errorCode.get(API_REGISTER_EMAIL)['message']
            )
        }
        const id = await this.userModel['addUserAction']({
            email,
            username: accountNumber,
            password,
            addTime: date
        });
        return !!id
            ? this.success(null, successCode.get(API_REGISTER_SUCCESS)['message'])
            : this.fail(
                errorCode.get(API_REGISTER_ERROR)['code'],
                errorCode.get(API_REGISTER_ERROR)['message']
            )
    }
};