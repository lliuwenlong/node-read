import Base from './base.js';
import moment from 'moment';
export default class extends Base {
    private typeModel: any;
    constructor(ctx: any) {
        super(ctx);
        this.typeModel =  this.model('type');
    }

    /**
     *
     * @api {post} /home/type/addType 添加数据
     * @apiName add
     * @apiGroup Type
     * @apiDescription 接口详细描述
     * @apiParam {String} name 添加类型名字
     * @apiSampleRequest /home/type/addType
     * @apiSuccess {Number} id 结果码
     * @apiSuccess {String} name 消息说明
     * @apiSuccessExample Success-Response:
     * {
     *      errno: 0,
     *      errmsg: "",
     *      data: [
     *          {
     *              name: "娱乐",
     *              id: 1
     *          }
     *       ]
     * }
     */
    async addTypeAction () {
        const typeModel = this.typeModel
        const name: string = this.post('name');
        const addTime: string = moment().format('YYYY-MM-DD');
        const insertId: Promise<number> = await typeModel.addTypeAction({
            name,
            addTime
        });
        !!insertId ? this.success(null, '添加成功') : this.fail(100, '添加失败', null);
    }

    /**
     *
     * @api {post} /home/type/modType 修改数据
     * @apiName mod
     * @apiGroup Type
     * @apiDescription 修改数据
     * @apiParam {String} name 类型名字
     * @apiParam {number} id 类型id
     * @apiSampleRequest /home/type/modType
     * @apiSuccess {Number} id 结果码
     * @apiSuccess {String} name 消息说明
     * @apiSuccessExample Success-Response:
     * {
     *      errno: 0,
     *      errmsg: "",
     *      data: [
     *          {
     *              name: "娱乐",
     *              id: 1
     *          }
     *       ]
     * }
     */
    async modTypeAction () {
        const typeModel = this.typeModel
        const name: string = this.post('name');
        const id: number = this.post('id');
        const insertId: Promise<number> = await typeModel.modTypeAction(id, name);
        !!insertId ? this.success(null, '修改成功') : this.fail(100, '修改失败', null);
    }

    /**
     *
     * @api {post} /home/type/delType 数据删除
     * @apiName del
     * @apiGroup Type
     * @apiDescription 数据删除
     * @apiParam {number} id 类型id
     * @apiSampleRequest /home/type/delType
     * @apiSuccess {Number} id 结果码
     * @apiSuccess {String} name 消息说明
     * @apiSuccessExample Success-Response:
     * {
     *      errno: 0,
     *      errmsg: "",
     *      data: null
     * }
     */
    async delTypeAction () {
        const typeModel = this.typeModel
        const id: number = this.post('id');
        const insertId: Promise<number> = await typeModel.delTypeAction(id);
        !!insertId ? this.success(null, '删除成功') : this.fail(100, '删除失败', null);
    }

    /**
     *
     * @api {post} /home/type/getType 查询数据
     * @apiName query
     * @apiGroup Type
     * @apiDescription 查询数据
     * @apiSampleRequest /home/type/getType
     * @apiSuccess {Number} id 结果码
     * @apiSuccess {String} name 消息说明
     * @apiSuccessExample Success-Response:
     * {
     *      errno: 0,
     *      errmsg: "",
     *      data: null
     * }
     */
    async getTypeAction () {
        const typeModel = this.typeModel
        const data: Promise<object> = await typeModel.getListAction();
        this.success(data);
    }
};