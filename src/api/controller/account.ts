import Base from './base.js';
import {errorCode, successCode} from '../../common/codeConfig/codeConfig';
import moment from 'moment';
export default class extends Base {
    private account = this.model('account');
     
    /**
     *
     * @api {post} /api/account/accountAdd 添加智惠币价格
     * @apiName accountAdd
     * @apiParam {string} wisdom_currency 智惠币
     * @apiParam {number} price 价格
     * @apiGroup account
     * @apiSampleRequest /api/account/accountAdd
     */

    async accountAddAction(){
        const wisdom_currency: string = this.post('wisdom_currency');
        const price: number = +this.post('price');
        const success: boolean = await this.account['accountAdd']({
            wisdom_currency,
            price,
            addtime: moment().format('YYYY-MM-DD')
        });
        return success
            ? this.success(null, successCode.get(1)['message'])
            : this.fail(errorCode.get(1)['code'], errorCode.get(1)['message']);
    }

    /**
     *
     * @api {post} /api/account/accountup 修改智惠币价格
     * @apiName accountup
     * @apiParam {string} wisdom_currency 智惠币
     * @apiParam {number} price 价格
     * @apiParam {number} id id
     * @apiGroup account
     * @apiSampleRequest /api/account/accountup
     */

    async accountupAction(){
        const id: string = this.post('id');
        const wisdom_currency: string = this.post('wisdom_currency');
        const price: number = this.post('price');
        const success: boolean = await this.account['accountUp']({wisdom_currency,price},id)
        return success
            ? this.success(null, successCode.get(2)['message'])
            : this.fail(errorCode.get(2)['code'], errorCode.get(2)['message']);
    }

     /**
     *
     * @api {post} /api/account/accountshow 查询智惠币价格
     * @apiName accountshow
     * @apiGroup account
     * @apiSampleRequest /api/account/accountshow
     */

    async accountshowAction(){
        const list: object[] = await this.account['accountselect']();
        return this.success(list, successCode.get(4)['message']);
    }

    /**
     *
     * @api {post} /api/account/accountDel 删除智惠币价格
     * @apiName accountDel
     * @apiParam {number} id id
     * @apiGroup account
     * @apiSampleRequest /api/account/accountDel
     */

    async accountDelAction(){
        const id: number = this.post('id');
        const del: boolean = await this.account['accountDel'](id);
        return del
        ? this.success(null, successCode.get(3)['message'])
        : this.fail(errorCode.get(3)['code'], errorCode.get(3)['message']);
    }
    
}
