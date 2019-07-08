/**
 * @file 课程
 */

import {errorCode, successCode} from '../../common/codeConfig/codeConfig';
import moment from 'moment'
import Base from './base.js';
import { filterObject } from '../../common/util/index';
export default class extends Base {
    private marketModel: object;
    private curriculumListModel: object = this.model('curriculumList');
    constructor(ctx: any) {
        super(ctx);
        this.marketModel = this.model('market');
    }

    /**
     *
     * @api {post} /api/market/getList 课程获取
     * @apiName getList
     * @apiGroup market
     * @apiDescription 课程获取
     * @apiSampleRequest /api/market/getList
     */
    async getListAction() {
        const id: number = this.post('id');
        const data: Array<object> = await this.marketModel['getList'](filterObject({id}));
        return this.success(data, successCode.get(4)['message']);
    }

    /**
     *
     * @api {post} /api/market/addOrUpdate 课程添加修改
     * @apiName addOrUpdate
     * @apiGroup market
     * @apiParam {number} id Id
     * @apiParam {string} name 课程名称
     * @apiParam {string} img 封面图
     * @apiParam {string} speaker 主讲人
     * @apiParam {string} basic 简介
     * @apiParam {string} price 价格
     * @apiParam {string} vipPrice vip价格
     * @apiDescription 课程添加修改
     * @apiSampleRequest /api/market/addOrUpdate
     */
    async addOrUpdateAction() {
        const id: number = this.post('id');
        const name:string = this.post('name');
        const img:string = this.post('img');
        const speaker:string = this.post('speaker');
        const basic:string = this.post('basic');
        const price:string = this.post('price');
        const vipPrice:string = this.post('vipPrice');
        const addtime: string = moment().format('YYYY-MM-DD');
        const subtitle:string = this.post('subtitle');
        const content: string = this.post('content');
        const list: object[] = this.post('list');
        const deleteId: number[] = this.post('deleteId');
        const type: number = this.post('type');

        const state: any = await this.marketModel['addOrUpdate']({
            id, name, img, speaker, basic, price, vipPrice, addtime, subtitle, content, type
        })
        if (typeof (state) === "number") {
            const curriculum = this.controller('common', 'api');
            const listId = await curriculum['addCurriculumListAction']
                (list.map(item => ({ ...item, c_id: state, addtime: moment().format('YYYY-MM-DD') })));
            if (listId) {
                this.success(`${state}`, successCode.get(1)['message']);
            } else {
                this.fail(errorCode.get(1)['code'], errorCode.get(1)['message']);
            }
        } else if (state) {
            const status: boolean = await this.curriculumListModel['saveCurriculumList'](deleteId, list, id, 1);
            console.log(status);
            if (status) {
                this.success(successCode.get(2)['code'], successCode.get(2)['message']);
            } else {
                this.fail(errorCode.get(2)['code'], errorCode.get(2)['message']);
            }
        }
        else if (!!id) {
            this.fail(errorCode.get(2)['code'], errorCode.get(2)['message']);
        }
        else {
            this.fail(errorCode.get(1)['code'], errorCode.get(1)['message']);
        }
    }

    /**
     *
     * @api {post} /api/market/del 课程删除
     * @apiName del
     * @apiGroup market
     * @apiDescription 课程删除
     * @apiParam {number} id Id
     * @apiSampleRequest /api/market/del
     */
    async delAction() {
        const id: number = this.post('id');
        if (await this.marketModel['del'](id))
            return this.success(successCode.get(3)['code'], successCode.get(3)['message']);
        else {
            return this.fail(errorCode.get(3)['code'], errorCode.get(3)['message']);
        }
    }
}