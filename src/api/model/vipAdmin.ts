import { think } from 'thinkjs';

export default class extends think.Model {
    get tableName() {
        return 'read_vip_price';
    }

    async setVipPrice(data: object[]): Promise<boolean> {
        try {
            const success: number = await this.updateMany(data);
            return !!success;
        } catch (e) {
            return false;
        }
    }

    async getVipPrice(): Promise<object[]> {
        const list: object[] = await this.field('id, num, ifnull(price,0) as price').select();
        return list;
    }
}
