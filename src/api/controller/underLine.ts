/**
 * @file 线下活动
 */

import { errorCode, successCode } from '../../common/codeConfig/codeConfig';
import moment from 'moment'
import Base from './base.js';
export default class extends Base {
    private underLineModel: object;
    constructor(ctx: any) {
        super(ctx);
        this.underLineModel = this.model('under_line');
    }

    /**
     *
     * @api {post} /api/underLine/getList 线下活动获取
     * @apiName getList
     * @apiGroup underLine
     * @apiDescription 线下活动获取
     * @apiSampleRequest /api/underLine/getList
     */
    async getListAction() {
        const data: Array<object> = await this.underLineModel['getList']();
        return this.success(data, successCode.get(4)['message']);
    }

    /**			
     * @api	{post}	/api/underLine/addOrUpdate	线下活动添加修改
     * @apiName	addOrUpdate		
     * @apiGroup	underLine		
     * @apiParam	{number}	id	ID
     * @apiParam	{string}	name	活动名称
     * @apiParam	{string}	img	封面图片
     * @apiParam	{string}	place	地址
     * @apiParam	{string}	content	内容（富文本）
     * @apiParam	{string}	startPrice	起始价格
     * @apiParam	{string}	endPrice	结束价格
     * @apiParam	{string}	startTime	开始时间
     * @apiParam	{string}	endTime	结束时间
     * @apiParam	{string}	addTime	添加时间
     * @apiParam	{string}	contactsImg	联系人头像
     * @apiParam	{string}	contactsName	联系人姓名
     * @apiParam	{string}	contactsTel	联系人电话
     * @apiDescription	线下活动添加修改		
     * @apiSampleRequest	/api/underLine/addOrUpdate		
     */

    async addOrUpdateAction() {
        const id: number = this.post('id')
        const name: string = this.post('name')
        const img: string = this.post('img')
        const place: string = this.post('place')
        const content: string = this.post('content')
        const startPrice: string = this.post('startPrice')
        const endPrice: string = this.post('endPrice')
        const startTime: string = this.post('startTime')
        const endTime: string = this.post('endTime')
        const addTime: string = this.post('addTime')
        const contactsImg: string = this.post('contactsImg')
        const contactsName: string = this.post('contactsName')
        const contactsTel: string = this.post('contactsTel')
        const addtime: string = moment().format('YYYY-MM-DD');
        const state: any = await this.underLineModel['addOrUpdate']({
            id, name, img, place, content, startPrice, endPrice, startTime, endTime, addTime, contactsImg, contactsName, contactsTel
        })
        if (typeof (state) === "number")
            this.success(`${state}`, successCode.get(1)['message']);
        else if (state)
            this.success(successCode.get(2)['code'], successCode.get(2)['message']);
        else if (!!id)
            this.fail(errorCode.get(2)['code'], errorCode.get(2)['message']);
        else
            this.fail(errorCode.get(1)['code'], errorCode.get(1)['message']);
    }

    /**
     * @api {post} /api/underLine/del 线下活动删除
     * @apiName del
     * @apiGroup underLine
     * @apiDescription 线下活动删除
     * @apiParam {number} id Id
     * @apiSampleRequest /api/underLine/del
     */
    async delAction() {
        const id: number = this.post('id');
        if (await this.underLineModel['del'](id)) {
            return this.success(successCode.get(3)['code'], successCode.get(3)['message']);
        } else {
            return this.fail(errorCode.get(3)['code'], errorCode.get(3)['message']);
        }
    }
}