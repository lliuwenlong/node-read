/**
 * @file 独角兽
 */
import { think } from 'thinkjs';
import { errorCode, successCode } from '../../common/codeConfig/codeConfig';
import { filterObject } from '../../common/util/index'
import moment from 'moment'
import Base from './base.js';
export default class extends Base {
    private unicornModel: object;
    private seizeModel: object;
    constructor(ctx: any) {
        super(ctx);
        this.unicornModel = this.model('unicorn');
        this.seizeModel = this.model('seize');
    }

    /**
     *
     * @api {post} /api/unicorn/getList 独角兽获取
     * @apiName getList
     * @apiGroup Unicorn
     * @apiDescription 独角兽获取
     * @apiSampleRequest /api/unicorn/getList
     */
    async getListAction() {
        // const type_id: number = this.post('type_id');
        let data: Array<object> = await this.unicornModel['getList']();
        data = data.map(v => {
            v['details'] = JSON.parse(v['details'])
            v['unicorn_videos'] = JSON.parse(v['unicorn_videos'])
            v['unicorn_tags'] = v['unicorn_tags'].map(v => v.id)
            v['unicorn_city'] = v['citys'].split(',')
            return v
        })
        return this.success(data, successCode.get(4)['message']);
    }

    /**
     *
     * @api {post} /api/unicorn/addOrUpdate 独角兽添加修改
     * @apiName addOrUpdate
     * @apiGroup Unicorn
     * 
     * @apiParam {number} id Id
     * @apiParam {string} type 项目类别
     * @apiParam {string} title 标题
     * @apiParam {string} starttime 开播时间
     * @apiParam {string} time 项目时间
     * @apiParam {string} subtitle 副标题
     * @apiParam {string} name 项目咨询人姓名
     * @apiParam {string} tel 项目咨询人电话
     * @apiParam {string} headImg 项目咨询人头像
     * @apiParam {string} place 地点
     * @apiParam {string} basic 基本信息
     * @apiParam {array} details 详细信息
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
        const type: number = this.post('type');
        const title: string = this.post('title');
        const time: string = this.post('time');
        const subtitle: string = this.post('subtitle');
        const name: string = this.post('name');
        const tel: string = this.post('tel');
        const headImg: string = this.post('headImg');
        // const place: string = this.post('place').join('-');

        const basic: string = this.post('basic');
        const details: string = JSON.stringify(this.post('details'));

        // const about_info: string = this.post('about_info');
        const unicorn_videos: string = JSON.stringify(this.post('unicorn_videos'));
        const citys: Array<object> = this.post('unicorn_city').join(',');
        const addtime: string = moment().format('YYYY-MM-DD');

        let unicorn_tags: Array<object> = this.post('unicorn_tags');
        const unicorn_info: Array<object> = this.post('unicorn_info');
        const unicorn_member: Array<object> = this.post('unicorn_member');

        const state: any = await this.unicornModel['addOrUpdate']({
            id, type, title, subtitle, name, tel, headImg, time, basic, details, unicorn_videos, citys, addtime
        });
        if (typeof (state) === "number") {
            try {
                unicorn_tags = unicorn_tags.map(v => {
                    let data = {}
                    data['tags_id'] = v
                    data['unicorn_id'] = state
                    return data
                });
                unicorn_info.map(v => v['unicorn_id'] = state);
                unicorn_member.map(v => v['unicorn_id'] = state);
                await this.model('unicorn_tags_join').addMany(unicorn_tags);
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
                unicorn_info.map(v => v['unicorn_id'] = id);
                unicorn_tags.map(v => v['unicorn_id'] = id);
                unicorn_member.map(v => v['unicorn_id'] = id);
                await this.model('unicorn_tags_join').where({ unicorn_id: id }).delete();
                await this.model('unicorn_info').where({ unicorn_id: id }).delete();
                await this.model('unicorn_member').where({ unicorn_id: id }).delete();
                console.log(unicorn_tags)
                await this.model('unicorn_tags_join').addMany(unicorn_tags);
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

    /**
     *
     * @api {post} /api/unicorn/grab 独角兽抢占
     * @apiName grab
     * @apiGroup Unicorn
     * @apiDescription 独角兽抢占
     * @apiParam {number} id Id
     * @apiParam {array} cityIds 城市Id
     * @apiSampleRequest /api/unicorn/grab
     */
    async grabAction() {
        const unicorn_id: string = this.post('id');
        const user_id: string = await this.session('userId');
        const cityIds: Array<number> = this.post('cityIds');
        if (await this.unicornModel['grab']({ unicorn_id, user_id }, {
            unicorn_id, user_id, city_ids: cityIds.join(',')
        })) {
            return this.success(successCode.get(1)['code'], successCode.get(1)['message']);
        } else {
            return this.fail(errorCode.get(1)['code'], errorCode.get(1)['message']);
        }

    }
    /**
     *
     * @api {post} /api/unicorn/getGrab 独角兽已抢占
     * @apiName getGrab
     * @apiGroup Unicorn
     * @apiDescription 独角兽已抢占（默认查询所有用户已抢占项目）
     * @apiParam {number} userId 用户Id（查询该用户已抢占项目）
     * @apiParam {number} unicornId 独角兽Id（查询该项目已抢占用户）
     * @apiSampleRequest /api/unicorn/getGrab
     */
    async getGrabAction() {
        const user_id: string = this.post('userId');
        const unicorn_id: string = this.post('unicornId');
        const data: any = await this.unicornModel['getGrab'](filterObject({ user_id, unicorn_id }));
        if (data) {
            return this.success(data, successCode.get(4)['message']);
        } else {
            return this.fail(errorCode.get(4)['code'], errorCode.get(4)['message']);
        }
    }

    async getSeizeAction () {
        const name: string = this.post('name');
        const tel: string = this.post('tel');
        const title: string = this.post('title');
        let where: object = {};
        if (name) {
            where['u.username|u.name'] = ['like', `${name}%`];
        }
        if (tel) {
            where['u.tel'] = ['like', `${tel}%`];
        }
        if (title) {
            where['n.title'] = ['like', `${title}%`];
        }
        const list: object[] = await this.seizeModel['getList'](where);
        return this.success(list, successCode.get(4)['message']);
    }

    async changeIsSignAction () {
        const id: number = this.post('id');
        const status: number = this.post('status');
        const success: boolean = await this.seizeModel['changeIsSign'](id, status);
        if (success) {
            return this.success(successCode.get(2)['code'], successCode.get(2)['message']);
        } else {
            return this.fail(errorCode.get(2)['code'], errorCode.get(2)['message']);
        }
    }
}