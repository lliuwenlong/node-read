import Base from './base.js';
import {errorCode, successCode} from '../../common/codeConfig/codeConfig';
import moment from 'moment';
export default class extends Base {
    private label = this.model('label');

   /**
     *
     * @api {post} /api/label/labelAdd 添加标签
     * @apiName labelAdd
     * @apiParam {string} name 添加标签
     * @apiGroup label
     * @apiSampleRequest /api/label/labelAdd
     */

    async labelAddAction(){
        const name: string = this.post('name');
        const add: number = await this.label['labelAdd']({
            name,
            addtime: moment().format('YYYY-MM-DD')
        });
        return add ? this.success(null, successCode.get(1)['message'])
        : this.fail(errorCode.get(1)['code'], errorCode.get(1)['message']);
    }
   /**
     *
     * @api {post} /api/label/labelShow 查询标签
     * @apiName labelShow
     * @apiGroup label
     * @apiSampleRequest /api/label/labelShow
     */

    async labelShowAction(){
        const list: object[] = await this.label['labelSelect']();
        return this.success(list, successCode.get(4)['message']);
    
    }
  /**
     *
     * @api {post} /api/label/labelDel 删除标签
     * @apiName labelDel
     * @apiParam {number} id id
     * @apiGroup label
     * @apiSampleRequest /api/label/labelDel
     */
    async labelDelAction(){
        const id: number = this.post('id');
        const res: number = await this.label['labelDel'](id);
        return res ? this.success(null, successCode.get(3)['message'])
        : this.fail(errorCode.get(3)['code'], errorCode.get(3)['message']);
    }

   /**
     *
     * @api {post} /api/label/labelUp 修改标签
     * @apiName labelUp
     * @apiParam {number} id id
     * @apiParam {string} name 名称
     * @apiGroup label
     * @apiSampleRequest /api/label/labelUp
     */

    async labelUpAction(){
        const id: number = this.post('id');
        const name: object = this.post('name');
        const res: boolean = await this.label['labelUp'](
            id,
            {name}
        )
        return res ? this.success(null, successCode.get(2)['message'])
        : this.fail(errorCode.get(2)['code'], errorCode.get(2)['message']);
    }

}
