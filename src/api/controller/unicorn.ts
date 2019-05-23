/**
 * @file 独角兽
 */

import { think } from 'thinkjs';
import { errorCode, successCode } from '../../common/codeConfig/codeConfig';
import moment from 'moment'
export default class extends think.Controller {
    private unicornModel: object;
    constructor(ctx: any) {
        super(ctx);
        this.unicornModel = this.model('unicorn');
    }

    /**
     *
     * @api {post} /api/unicorn/getList 独角兽获取
     * @apiName getList
     * @apiGroup Unicorn
     * @apiParam {number} type_id 分类Id
     * @apiDescription 独角兽获取
     * @apiSampleRequest /api/unicorn/getList
     */
    async getListAction() {
        const type_id: number = this.post('type_id');
        const data: Array<object> = await this.unicornModel['getList'](type_id ? { type_id } : null);
        return this.success(data, successCode.get(4)['message']);
    }

    /**
     *
     * @api {post} /api/unicorn/addOrUpdate 独角兽添加修改
     * @apiName addOrUpdate
     * @apiGroup Unicorn
     * 
     * @apiParam {number} id Id
     * @apiParam {number} type_id 项目类别
     * @apiParam {string} title 标题
     * @apiParam {string} starttime 开播时间
     * @apiParam {string} time 项目时间
     * @apiParam {string} subtitle 副标题
     * @apiParam {string} place 地点
     * @apiParam {string} basic 基本信息
     * @apiParam {string} details 详细信息
     * @apiParam {string} about_info 相关资讯
     * @apiParam {string} about_video 相关视频
     * @apiParam {array} unicorn_tags 标签Id
     * @apiParam {array} unicorn_city 抢占城市Id
     * @apiParam {array} unicorn_info 项目信息
     * @apiParam {array} unicorn_member 成员
     * 
     * @apiParam (unicorn_info) {string} name *轮
     * @apiParam (unicorn_info) {string} price 金额（万）
     * @apiParam (unicorn_info) {string} valuation 估值（万）
     * @apiParam (unicorn_info) {string} company 投资公司
     * 
     * @apiParam (unicorn_member) {string} name 姓名
     * @apiParam (unicorn_member) {string} post 职务
     * @apiParam (unicorn_member) {string} img 头像
     * 
     * @apiDescription 独角兽添加修改
     * @apiSampleRequest /api/unicorn/addOrUpdate
     */
    async addOrUpdateAction() {
        const id: number = this.post('id');
        const type_id: number = this.post('type_id');
        const title: string = this.post('title');
        const starttime: string = this.post('starttime');
        const time: string = this.post('time');
        const subtitle: string = this.post('subtitle');
        const place: string = this.post('place');
        const basic: string = this.post('basic');
        const details: string = this.post('details');
        const about_info: string = this.post('about_info');
        const about_video: string = this.post('about_video');
        const addtime: string = moment().format('YYYY-MM-DD');

        const unicorn_tags: Array<object> = this.post('unicorn_tags');
        const unicorn_city: Array<object> = this.post('unicorn_city');
        const unicorn_info: Array<object> = this.post('unicorn_info');
        const unicorn_member: Array<object> = this.post('unicorn_member');

        const state: any = await this.unicornModel['addOrUpdate']({
            id, type_id, title, starttime, time, subtitle, place, basic, details, about_info, about_video, addtime
        })
        if (typeof (state) === "number") {
            try {
                unicorn_tags.map(v => v['unicorn_id'] = state);
                unicorn_city.map(v => v['unicorn_id'] = state);
                unicorn_info.map(v => v['unicorn_id'] = state);
                unicorn_member.map(v => v['unicorn_id'] = state);
                await this.model('unicorn_tags_join').addMany(unicorn_tags);
                await this.model('unicorn_city_join').addMany(unicorn_city);
                await this.model('unicorn_info').addMany(unicorn_info);
                await this.model('unicorn_member').addMany(unicorn_member);
                this.success(`${state}`, successCode.get(1)['message']);
            } catch (e) {
                console.log(e);
                think.logger.error(e);
                this.fail(errorCode.get(1)['code'], errorCode.get(1)['message']);
            }
        }
        else if (state) {
            try {
                unicorn_tags.map(v => v['unicorn_id'] = id);
                unicorn_city.map(v => v['unicorn_id'] = id);
                unicorn_info.map(v => v['unicorn_id'] = id);
                unicorn_member.map(v => v['unicorn_id'] = id);
                await this.model('unicorn_tags_join').where({ unicorn_id: id }).delete();
                await this.model('unicorn_city_join').where({ unicorn_id: id }).delete();
                await this.model('unicorn_info').where({ unicorn_id: id }).delete();
                await this.model('unicorn_member').where({ unicorn_id: id }).delete();
                await this.model('unicorn_tags_join').addMany(unicorn_tags);
                await this.model('unicorn_city_join').addMany(unicorn_city);
                await this.model('unicorn_info').addMany(unicorn_info);
                await this.model('unicorn_member').addMany(unicorn_member);
                this.success(successCode.get(2)['code'], successCode.get(2)['message']);
            } catch (e) {
                console.log(e);
                think.logger.error(e);
                this.fail(errorCode.get(2)['code'], errorCode.get(2)['message']);
            }
        }
        else if (!!id)
            this.fail(errorCode.get(2)['code'], errorCode.get(2)['message']);
        else
            this.fail(errorCode.get(1)['code'], errorCode.get(1)['message']);
    }

    /**
     *
     * @api {post} /api/unicorn/del 独角兽删除
     * @apiName del
     * @apiGroup Unicorn
     * @apiDescription 独角兽删除
     * @apiParam {number} id Id
     * @apiSampleRequest /api/unicorn/del
     */
    async delAction() {
        const id: number = this.post('id');
        if (await this.unicornModel['del'](id))
            return this.success(successCode.get(3)['code'], successCode.get(3)['message']);
        else {
            return this.fail(errorCode.get(3)['code'], errorCode.get(3)['message']);
        }
    }

    // /**
    //  *
    //  * @api {post} /api/unicorn/setCity 独角兽设置区域
    //  * @apiName setCity
    //  * @apiGroup Unicorn
    //  * @apiDescription 独角兽设置区域
    //  * @apiParam {number} id 独角兽Id
    //  * @apiParam {array} city_ids 城市Id
    //  * @apiSampleRequest /api/unicorn/setCity
    //  */
    // async setCityAction() {
    //     const id:number = this.post('id');
    //     const city_ids:Array<any> = this.post('city_ids');
    //     // await this.unicornModel['setCity'](id,city_ids);
    //     // return this.success()
    //     // const id: number = this.post('id');
    //     if (await this.unicornModel['setCity'](id,city_ids))
    //         return this.success(successCode.get(1)['code'], successCode.get(1)['message']);
    //     else {
    //         return this.fail(errorCode.get(1)['code'], errorCode.get(1)['message']);
    //     }
    // }
}