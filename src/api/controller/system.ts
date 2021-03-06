/**
 * @file 系统
 */
import { filterObject } from '../../common/util/index'
import { errorCode, successCode } from '../../common/codeConfig/codeConfig';
import Base from './base.js';
export default class extends Base {
    private curriculumTypeModel: object;
    constructor(ctx: any) {
        super(ctx);
        this.curriculumTypeModel = this.model('type');
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

    /**
     *
     * @api {post} /api/system/setBasic 基础设置
     * @apiName setBasic
     * @apiGroup System
     * @apiDescription 基础设置
     * @apiParam {number} status 1: 联系客服电话   2:banner管理  3:用户指南 4:关于我们  5:签到规则设置 6 购买慧币流程 7 购买慧币须知 8 礼品卡购买流程

     * @apiParam {string} text 内容
     * @apiParam {int} id id
     * @apiSampleRequest /api/system/setBasic
     */
    async setBasicAction() {
        const status: number = this.post('status');
        const text: string = this.post('text');
        const id: string = this.post('id');
        const name: string = this.post('name');
        let list = '';
        let data = '';
        if(!id){
            list = await this.model('basic_set').add({name,status,text});
            data = await this.query('select * from read_basic_set where id = '+list);
        }else{
            list = await this.model('basic_set').where({id}).update({name,text});
        }
        if (list){
            return this.success(data,successCode.get(5)['message']);
        } else {
            return this.fail(errorCode.get(5)['code'], errorCode.get(5)['message']);
        }
    }

    /**
     *
     * @api {post} /api/system/Basic 基础查询
     * @apiName Basic
     * @apiGroup System
     * @apiDescription 基础查询
     * @apiParam {number} status 1:联系客服电话，2:banner管理，3:用户指南，4:关于我们，5:签到规则设置
     * @apiSampleRequest /api/system/Basic
     */
    async BasicAction() {
        const status: number = this.post('status');
        const data:Array<object> = await this.model('basic_set').where(filterObject({status})).select();
        if (data){
            return this.success(data, successCode.get(4)['message']);
        } else {
            return this.fail(errorCode.get(4)['code'], errorCode.get(4)['message']);
        }
    }

    /**
     *
     * @api {post} /api/system/addBanner 基础查询
     * @apiName addBanner
     * @apiGroup System
     * @apiDescription 基础查询
     * @apiParam {array} url
     * @apiSampleRequest /api/system/addBanner
     */
    async addBannerAction() {
        const urlArr: object[] = this.post('urlArr');
        if (await this.model('banner').addMany(urlArr)){
            return this.success(successCode.get(1)['code'], successCode.get(1)['message']);
        } else {
            return this.fail(errorCode.get(1)['code'], errorCode.get(1)['message']);
        }
    }

    async bannerListAction() {
        const data: object[] = await this.model('banner').select();
        if (data){
            return this.success(data, successCode.get(4)['message']);
        } else {
            return this.fail(errorCode.get(4)['code'], errorCode.get(4)['message']);
        }
    }

    async updateBannerAction() {
        const urlArr: object[] = this.post('urlArr');
        if (await this.model('banner').updateMany(urlArr)){
            return this.success(successCode.get(2)['code'], successCode.get(2)['message']);
        } else {
            return this.fail(errorCode.get(2)['code'], errorCode.get(2)['message']);
        }
    }

    async delBannerAction() {
        const id: number = this.post('id');
        if (await this.model('banner').where({id}).delete()){
            return this.success(successCode.get(3)['code'], successCode.get(3)['message']);
        } else {
            return this.fail(errorCode.get(3)['code'], errorCode.get(3)['message']);
        }
    }

 /**
     *
     * @api {post} /api/system/delBasic 删除基础设置
     * @apiName delBasic
     * @apiGroup System
     * @apiDescription 删除基础设置
     * @apiParam {int} id id
     * @apiSampleRequest /api/system/delBasic
     */
    async delBasicAction() {
          const id: string = this.post('id');
          const list = await this.model('basic_set').where({id}).delete();
        if (list){
            return this.success(successCode.get(2)['code'], successCode.get(2)['message']);
        } else {
            return this.fail(errorCode.get(2)['code'], errorCode.get(2)['message']);
        }
    }
}

