import { think } from 'thinkjs';

export default class extends think.Model {
    get tableName() {
        return 'read_gift_card';
    }

    async addGiftCard(addObj: object): Promise<boolean> {
        try {
            const id: number = +await this.add(addObj);
            return !!id;
        } catch (e) {
            return false;
        }
    }

    async getGiftCardList(): Promise<object[]> {
        const list: object[] = await this.field('id, name, process,cover_photo as coverPhoto, addTime, content, purchase_instructions as purchaseInstructions').select();
        return list;
    }

    async updateGiftCard(data: object, id: number): Promise<boolean> {
        try {
            const updateStatus: number = await this.where({id: id}).update(data);
            return !!updateStatus;
        } catch (e) {
            return false;
        }
    }

    async delGiftCard(id: number): Promise<boolean> {
        try {
            const status: number = await this.where({id: id}).delete();
            return !!status;
        } catch (e) {
            return false;
        }
    }
}
