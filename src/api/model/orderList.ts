import { think } from 'thinkjs';
import {OrderList} from '../Interfaces/user';

export default class extends think.Model {
    get tableName() {
        return 'read_transaction_record';
    }

    async getOrderList(where: object): Promise<OrderList[]> {
        const list: OrderList[] = await this.alias('a').join({
            table: 'user_app',
            join: 'left',
            as: 't',
            on: ['uid', 'id']
        }).field(`
            a.id, a.transaction_name as name,
            a.transaction_price as price, a.addtime as 
            addTime, a.mentmethod, t.username, type`
        ).where(where).select();
        return list;
    }
}
