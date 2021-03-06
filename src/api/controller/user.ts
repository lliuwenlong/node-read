/**
 * @file 用户控制器
 */

import { think } from 'thinkjs';
import nodemailer from 'nodemailer';
import mailConfig from '../config/mailConfig.js';
import { mathRand } from '../../common/util/index.js';
import { errorCode, successCode } from '../../common/codeConfig/codeConfig';
import {filterObject} from '../../common/util/index';
import fs from 'fs';
import path from 'path';
import md5 from 'js-md5';
import moment from 'moment';
import {OrderList} from '../Interfaces/user';
import {
    API_REGISTER_CODE_ERROR,
    API_REGISTER_SUCCESS,
    API_REGISTER_ERROR,
    API_REGISTER_USERNAME,
    API_REGISTER_EMAIL,
    API_LOGIN_NO_USERNAME,
    API_LOGIN_PWD_ERROR,
    API_LOGIN_SUCCESS,
    API_POSSWORD_SUCCESS
} from '../../common/codeConfig/code';
export default class extends think.Controller {
    private userModel: object;
    private orderList: object;
    constructor(ctx: any) {
        super(ctx);
        this.userModel = this.model('user');
        this.orderList = this.model('orderList');
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
        const num: string = mathRand();
        const mail = {
            // 发件人
            from: `<18801295284@163.com>`,
            // 主题
            subject: '接受凭证', // 邮箱主题
            // 收件人
            to: email,
            text: num
        };
        try {
            await transporter.sendMail(mail);
            await this.cache(`send${email}`, num, {
                timeout: 5 * 60 * 1000
            });
            return this.success(null, '发送成功')
        } catch (e) {
            think.logger.error(e);
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
     * @apiParam {String} password 密码
     * @apiParam {number} emailCode 邮箱验证码
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

    /**
     *
     * @api {post} /api/user/login 登陆
     * @apiName login
     * @apiGroup User
     * @apiDescription 登陆
     * @apiParam {String} username 账号
     * @apiParam {String} password 密码
     * @apiSampleRequest /api/user/login
     */
    async loginAction() {
        const username: string = this.post('username');
        const password: string = md5(this.post('password'));
        const userInfo: object = await this.userModel['loginAction'](username);
        if (!userInfo['username']) {
            return this.fail(
                errorCode.get(API_LOGIN_NO_USERNAME)['code'],
                errorCode.get(API_LOGIN_NO_USERNAME)['message']
            );
        };
        if (userInfo['password'] !== password) {
            return this.fail(
                errorCode.get(API_LOGIN_PWD_ERROR)['code'],
                errorCode.get(API_LOGIN_PWD_ERROR)['message']
            )
        }
        await this.session('userId', userInfo['id'], {
            maxAge: 5 * 60 * 60 * 1000,
        });
        this.success(null, successCode.get(API_LOGIN_SUCCESS)['message']);
    }

    /**
     *
     * @api {post} /api/user/getBackPassword 找回密码
     * @apiName getBack
     * @apiGroup User
     * @apiDescription 找回密码
     * @apiParam {String} email 邮箱
     * @apiParam {number} emailCode 验证码
     * @apiParam {String} password 密码
     * @apiSampleRequest /api/user/getBackPassword
     */
    async getBackPasswordAction() {
        const email: string = this.post('email');
        const emailCode: number = this.post('emailCode');
        const password: string = md5(this.post('password'));
        const emailCodeCache: number = await this.cache(`send${email}`);
        if (emailCodeCache !== emailCode) {
            return this.fail(
                errorCode.get(API_REGISTER_CODE_ERROR)['code'],
                errorCode.get(API_REGISTER_CODE_ERROR)['message']
            );
        }
        const state: boolean = await this.userModel['editUserAction'](email, password);
        if (state) {
            return this.success(null, successCode.get(API_POSSWORD_SUCCESS)['message'])
        } else {
            return this.fail(errorCode.get(2)['code'], errorCode.get(2)['message'])
        }
    }

    /**
     *
     * @api {post} /api/user/updatePassword 修改密码
     * @apiName updatePassword
     * @apiGroup User
     * @apiDescription 修改密码
     * @apiParam {String} username 账号
     * @apiParam {String} passwordOld 原密码
     * @apiParam {String} password 新密码
     * @apiSampleRequest /api/user/updatePassword
     */
    async updatePasswordAction() {
        const username: string = this.post('username');
        const passwordOld: string = md5(this.post('passwordOld'));
        const password: string = md5(this.post('password'));
        const userInfo: object = await this.userModel['loginAction'](username);
        if (!userInfo['username']) {
            return this.fail(
                errorCode.get(API_LOGIN_NO_USERNAME)['code'],
                errorCode.get(API_LOGIN_NO_USERNAME)['message']
            );
        };
        if (userInfo['password'] !== passwordOld) {
            return this.fail(
                errorCode.get(API_LOGIN_PWD_ERROR)['code'],
                errorCode.get(API_LOGIN_PWD_ERROR)['message']
            )
        }
        const state: boolean = await this.userModel['editUserAction'](userInfo['email'], password);
        if (state) {
            return this.success(successCode.get(2)['code'], successCode.get(2)['message'])
        } else {
            return this.fail(errorCode.get(2)['code'], errorCode.get(2)['message'])
        }
    }

    /**
     *
     * @api {post} /api/user/getUserList 获取用户列表
     * @apiName getUserList
     * @apiParam {int} vipStatus 0不是vip 1是vip
     * @apiGroup User
     * @apiSampleRequest /api/user/getUserList
     */
    
    async getUserListAction() {
        const vipStatus: number = this.post('vipStatus');
        try {
            const list: object[] = await this.userModel['getUserList'](filterObject({vip: vipStatus}));
            return this.success(list, successCode.get(4)['message'])
        } catch (e) {
            return this.fail(
                errorCode.get(-4)['code'],
                errorCode.get(-4)['message']
            )
        }
    }

    /**
     *
     * @api {post} /api/user/addUserGuide 添加或修改用户指南
     * @apiName addUserGuide
     * @apiParam {String} title 标题
     * @apiParam {String} text 内容
     * @apiParam {boolean} mod 是否修改 true 是
     * @apiParam {int} id 数据id
     * @apiGroup User
     * @apiSampleRequest /api/user/addUserGuide
     */
    async addUserGuideAction () {
        const title: String = this.post('title');
        const text: String = this.post('text');
        const id: number = this.post('id');
        const mod: boolean = this.post('mod');
        if (!mod) {
            const success: boolean = await this.userModel['addUserGuide']({
                title,
                text
            });
            return success
                ? this.success(null, successCode.get(1)['message'])
                : this.fail(errorCode.get(-1)['code'], successCode.get(-1)['message']);
        } else {
            const success: boolean = await this.userModel['updateUserGuide'](filterObject({
                title,
                text
            }), id);
            return success
                ? this.success(null, successCode.get(2)['message'])
                : this.fail(errorCode.get(-2)['code'], successCode.get(-2)['message']);
        }
    }

    /**
     *
     * @api {post} /api/user/getUserGuide 获取用户指南
     * @apiName getUserGuide
     * @apiGroup User
     * @apiSampleRequest /api/user/getUserGuide
     */

    async getUserGuideAction() {
        const list: object[] = await this.userModel['getUserGuide']();
        
    }

    /**
     *
     * @api {post} /api/user/getOrderList 订单列表
     * @apiName getOrderList
     * @apiGroup User
     * @apiParam {int} type
     * @apiParam {int} mentmethodType
     * @apiSampleRequest /api/user/getOrderList
     */
    async getOrderListAction() {
        const type: number = this.post('type');
        const mentmethod: number = this.post('mentmethodType');
        const list: OrderList[] = await this.orderList['getOrderList'](filterObject({
            type,
            mentmethod
        }));
        return this.success(list, successCode.get(4)['message']);
    }

    getVedioAction () {
        const response = this.ctx.res;
        const filePath = path.join(think.ROOT_PATH, 'public/uploadVdeio/1563502852316mda-hg1h1h86v0p5qzca (2).mp4');
        response.writeHead(200, {'Content-Type': 'video/mp4'});
        fs.createReadStream(filePath).pipe(response);
    }

    uploadVedioAction () {
        const filePath = path.join(think.ROOT_PATH, 'public/uploadVdeio/1563502713477mda-hb1rh5e6wcdszu98.mp4');
        console.log(filePath);
        this.ctx.attachment(filePath);
          // 实现文件下载 
        // const req = this.ctx.req;
        // const res = this.ctx.res;
        // const filePath = path.join(think.ROOT_PATH, 'public/uploadVdeio/1563502545219mda-jcvdrtv48sai9kxr.mp4');
        // var stats = fs.statSync(filePath); 
        // console.log(stats.size);
        // if(stats.isFile()){
        //     res.writeHead(200, {
        //         'Content-Type': 'application/octet-stream',
        //         'Content-Disposition': 'attachment; filename=aaa.mp4',
        //         'Content-Length': stats.size
        //     });
        //     fs.createReadStream(filePath).pipe(res);
        // } else {
        //     res.end(404);
        // }
    }
};