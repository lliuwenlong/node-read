/**
 * @file 课程
 */

import { think } from 'thinkjs';
import { errorCode, successCode } from '../../common/codeConfig/codeConfig';
import {filterObject} from '../../common/util/index';
import moment from 'moment'
import Base from './base.js';
export default class extends Base {
    private curriculumModel: object;
    private curriculumListModel: object = this.model('curriculumList');
    constructor(ctx: any) {
        super(ctx);
        this.curriculumModel = this.model('curriculum');
    }

    /**
     *
     * @api {post} /api/curriculum/getList 课程获取
     * @apiName getList
     * @apiGroup Curriculum
     * @apiParam {number} type_id 分类Id
     * @apiDescription 课程获取
     * @apiSampleRequest /api/curriculum/getList
     */
    async getListAction() {
        const type_id: number = this.post('type_id');
        const id: number = this.post('id');
        const data: Array<object> = await this.curriculumModel['getList'](filterObject({
            type_id,
            'a.id': id
        }));
        return this.success(data, successCode.get(4)['message']);
    }

    /**
     *
     * @api {post} /api/curriculum/addOrUpdate 课程添加修改
     * @apiName addOrUpdate
     * @apiGroup Curriculum
     * @apiParam {number} id Id
     * @apiParam {number} type_id 分类Id
     * @apiParam {string} title 标题
     * @apiParam {string} subtitle 副标题
     * @apiParam {string} content 内容
     * @apiParam {string} price 价格
     * @apiDescription 课程添加修改
     * @apiSampleRequest /api/curriculum/addOrUpdate
     */
    async addOrUpdateAction() {
        const id: number = this.post('id');
        const type_id: number = this.post('type_id');
        const title: string = this.post('title');
        const subtitle: string = this.post('subtitle');
        const content: string = this.post('content');
        const price: string = this.post('price');
        const addtime: string = moment().format('YYYY-MM-DD');
        const list: object[] = this.post('list');
        const cover: object[] = this.post('cover');
        const deleteId: number[] = this.post('deleteId');

        let state: any = await this.curriculumModel['addOrUpdate']({
            id, type_id, title, subtitle, content, addtime, price, cover
        });
        const curriculum = this.controller('common', 'api');
        if (typeof (state) === "number") {
            const listId = await curriculum['addCurriculumListAction']
                (list.map(item => ({ ...item, c_id: state, addtime: moment().format('YYYY-MM-DD') })));
            if (listId) {
                this.success(`${state}`, successCode.get(1)['message']);
            } else {
                this.fail(errorCode.get(1)['code'], errorCode.get(1)['message']);
            }
        } else if (state) {
            const status: boolean = await this.curriculumListModel['saveCurriculumList'](deleteId, list, id, 0);
            if (status) {
                this.success(successCode.get(2)['code'], successCode.get(2)['message']);
            } else {
                this.fail(errorCode.get(2)['code'], errorCode.get(2)['message']);
            }
        } else if (!!id) {
            this.fail(errorCode.get(2)['code'], errorCode.get(2)['message']);
        } else {
            this.fail(errorCode.get(1)['code'], errorCode.get(1)['message']);
        }
    }

    /**
     *
     * @api {post} /api/curriculum/del 课程删除
     * @apiName del
     * @apiGroup Curriculum
     * @apiDescription 课程删除
     * @apiParam {number} id Id
     * @apiSampleRequest /api/curriculum/delete
     */
    async deleteAction() {
        const id: number = +this.post('id');
        if (await this.curriculumModel['del'](id))
            return this.success(successCode.get(3)['code'], successCode.get(3)['message']);
        else {
            return this.fail(errorCode.get(3)['code'], errorCode.get(3)['message']);
        }
    }
}