import Base from './base.js';
import {errorCode, successCode} from '../../common/codeConfig/codeConfig';
export default class extends Base {
    private vipModel = this.model('vipAdmin');

    /**
     *
     * @api {post} /api/vipAdmin/setVipPrice 修改vip价格
     * @apiName vipAdmin
     * @apiParam {int} id
     * @apiParam {int} price 价格
     * @apiGroup Vip
     * @apiSampleRequest /api/vipAdmin/setVipPrice
     */
    async setVipPriceAction() {
        // const id: number = this.post('id');
        // const price: number = this.post('price');
        const data: object[] = this.post('data');
        const success: boolean = await this.vipModel['setVipPrice'](data);
        return success
            ? this.success(null, successCode.get(2)['message'])
            : this.fail(errorCode.get(2)['code'], errorCode.get(2)['message'])
    }

    /**
     *
     * @api {post} /api/vipAdmin/getVipPrice 获取vip价格表
     * @apiName getVipPrice
     * @apiGroup Vip
     * @apiSampleRequest /api/vipAdmin/getVipPrice
     */
    async getVipPriceAction() {
        const list: object[] = await this.vipModel['getVipPrice']();
        this.success(list, successCode.get(4)['message']);
    }
}
