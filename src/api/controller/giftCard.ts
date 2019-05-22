import Base from './base.js';
import moment from 'moment';
import {successCode, errorCode} from '../../common/codeConfig/codeConfig';
import {filterObject} from '../../common/util/index';
export default class extends Base {
    private giftCardModel: object;
    constructor(ctx: any) {
        super(ctx);
        this.giftCardModel = this.model('giftCard');
    }

    /**
     *
     * @api {post} /api/giftCard/getGiftCardList 查看礼品卡列表
     * @apiName getGiftCardList
     * @apiGroup GiftCard
     * @apiDescription 查看礼品卡列表
     * @apiSampleRequest /api/giftCard/getGiftCardList
     */
    async getGiftCardListAction(): Promise<boolean> {
        const list = await this.giftCardModel['getGiftCardList']();
        return this.success(list, successCode.get(4)['message']);
    }

    /**
     *
     * @api {post} /api/giftCard/addGiftCard 添加/修改礼品卡
     * @apiName addGiftCard
     * @apiGroup GiftCard
     * @apiDescription 添加礼品卡
     * @apiParam {String} name 礼品卡名字
     * @apiParam {String} purchaseInstructions 购买须知
     * @apiParam {String} process 流程
     * @apiParam {String} coverPhoto 封面图片
     * @apiParam {Boolean} isMod 是否修改
     * @apiParam {int} id 
     * @apiSampleRequest /api/giftCard/addGiftCard
     */
    async addGiftCardAction(): Promise<boolean> {
        const name: string = this.post('name');
        const purchaseInstructions: string = this.post('purchaseInstructions');
        const process: string = this.post('process');
        const coverPhoto: string = this.post('coverPhoto');
        const date: string = moment().format('YYYY-MM-DD');
        const isMod: boolean = !!this.post('isMod');
        const id: number = this.post('id');
        if (!isMod) {
            const isAddSuccess: boolean = await this.giftCardModel['addGiftCard']({
                name,
                purchase_instructions: purchaseInstructions,
                process,
                cover_photo: coverPhoto,
                addTime: date
            });
            return isAddSuccess
                ? this.success(null, successCode.get(1)['message'])
                : this.fail(errorCode.get(1)['code'], errorCode.get(1)['message']);
        } else {
            let param = {
                name,
                purchase_instructions: purchaseInstructions,
                process,
                cover_photo: coverPhoto,
            };
            const isUpdateSuccess: boolean = await this.giftCardModel['updateGiftCard'](filterObject(param), id);
            return isUpdateSuccess
                ? this.success(null, successCode.get(2)['message'])
                : this.fail(errorCode.get(1)['code'], errorCode.get(2)['message']);
        }
    }

    /**
     *
     * @api {post} /api/giftCard/delGiftCard 删除礼品卡
     * @apiName delGiftCard
     * @apiGroup GiftCard
     * @apiDescription 删除礼品卡
     * @apiParam {int} id 
     * @apiSampleRequest /api/giftCard/delGiftCard
     */
    async delGiftCardAction(): Promise<boolean> {
        const id: number = this.post('id');
        const isDel: boolean = this.giftCardModel['delGiftCard'](id);
        return isDel
            ? this.success(null, successCode.get(3)['message'])
            : this.fail(errorCode.get(1)['code'], errorCode.get(3)['message']);
    }
}