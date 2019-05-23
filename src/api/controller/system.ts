/**
 * @file 系统
 */

import { think } from 'thinkjs';
import { errorCode, successCode } from '../../common/codeConfig/codeConfig';
import Base from './base.js';
export default class extends Base {
    private curriculumTypeModel: object;
    constructor(ctx: any) {
        super(ctx);
        this.curriculumTypeModel = this.model('curriculum_type');
    }

    /**
     *
     * @api {post} /api/system/getCurriculumType 首页分类获取
     * @apiName getCurriculumType
     * @apiGroup System
     * @apiDescription 首页分类获取
     * @apiSampleRequest /api/system/getCurriculumType
     */
    async getCurriculumTypeAction() {
        const data:Array<object> = await this.curriculumTypeModel['getList']();
        return this.success(data,successCode.get(4)['message']);
    }

    /**
     *
     * @api {post} /api/system/updateCurriculumType 首页分类添加修改
     * @apiName updateCurriculumType
     * @apiGroup System
     * @apiParam {number} id Id
     * @apiParam {string} name 标题
     * @apiParam {number} sort 排序
     * @apiDescription 首页分类添加修改
     * @apiSampleRequest /api/system/updateCurriculumType
     */
    async updateCurriculumTypeAction() {
        const id: number = this.post('id');
        const name: string = this.post('name');
        const sort: number = this.post('sort');
        const state: any = await this.curriculumTypeModel['addOrUpdate']({
            id, name, sort
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
     *
     * @api {post} /api/system/delcurriculumType 首页分类删除
     * @apiName delcurriculumType
     * @apiGroup System
     * @apiDescription 首页分类删除
     * @apiParam {number} id Id
     * @apiSampleRequest /api/system/delcurriculumType
     */
    async delcurriculumTypeAction() {
        const id: number = this.post('id');
        if (await this.curriculumTypeModel['del'](id))
            return this.success(successCode.get(3)['code'], successCode.get(3)['message']);
        else {
            return this.fail(errorCode.get(3)['code'], errorCode.get(3)['message']);
        }
    }
}