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
        const arr: object[] = data.map(item => {
            return {...item, timeSlot: [item['startTime'], item['endTime']]};
        });
        return this.success(arr, successCode.get(4)['message']);
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
        const timeSlot: string[] = this.post('timeSlot');
        const id: number = this.post('id');
        const name: string = this.post('name');
        const img: string = this.post('img');
        const place: string = this.post('place');
        const content: string = this.post('content');
        const startPrice: string = this.post('startPrice');
        const endPrice: string = this.post('endPrice');
        const startTime: string = timeSlot[0];
        const endTime: string = timeSlot[1];
        const contactsImg: string = this.post('contactsImg');
        const contactsName: string = this.post('contactsName')
        const contactsTel: string = this.post('contactsTel');
        const addTime: string = moment().format('YYYY-MM-DD');
        const type_id: number = this.post('type_id');
        const state: any = await this.underLineModel['addOrUpdate']({
            id, name, img, place, content, startPrice, endPrice, startTime, endTime, addTime, contactsImg, contactsName, contactsTel, type_id
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

    /**
     * @api {post} /api/underLine/citylist 线下活动展示地区
     * @apiName citylist
     * @apiGroup underLine
     * @apiDescription 线下活动展示地区
     * @apiSampleRequest /api/underLine/citylist
     */
    async citylistAction(){
        const data: object[] = await this.underLineModel['citylist']();
        return this.success(data, successCode.get(4)['message']);
    }



     /**
     *
     * @api {post}  /api/underLine/undertype 线下活动type
     * @apiName undertype
     * @apiGroup underLine
     * @apiSampleRequest /api/underLine/undertype
     */

    async undertypeAction(){
        const list: object[] = await this.underLineModel['undertype']();
        return this.success(list, successCode.get(4)['message']);
    }
/**
     *
     * @api {post}  /api/underLine/undertypeDel 线下活动type删除
     * @apiName undertypeDel
     * @apiGroup underLine
     * @apiParam {number}	id	ID
     * @apiSampleRequest /api/underLine/undertypeDel
     */

    async undertypeDelAction(){
        const id: number = this.post('id');
        const del: boolean = await this.underLineModel['undertypeDel'](id);
        return del
        ? this.success(null, successCode.get(3)['message'])
        : this.fail(errorCode.get(3)['code'], errorCode.get(3)['message']);
    }


     /**
     *
     * @api {post} /api/underLine/undertypeadd 添加线下typeadd
     * @apiName undertypeadd
     * @apiParam {string} type_name name
     * @apiParam {int} id id
     * @apiGroup underLine
     * @apiSampleRequest /api/underLine/undertypeadd
     */

    async undertypeaddAction(){
        const type_name: string = this.post('type_name');
        const id: string = this.post('id');
        const success: boolean = await this.underLineModel['undertypeadd']({
            type_name,
            id,
            addtime: moment().format('YYYY-MM-DD')
        });
        return success
            ? this.success(null, successCode.get(1)['message'])
            : this.fail(errorCode.get(1)['code'], errorCode.get(1)['message']);
    }

}