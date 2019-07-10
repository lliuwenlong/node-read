/**
 * @file index_type model
 */
import { think } from 'thinkjs';

export default class extends think.Model {
    get tableName() {
        return 'read_under_line_user_join';
    }

    async getList(where: object): Promise<Array<Object>> {
        return await this.alias('a').join({
            table: 'under_line',
            join: 'left',
            as: 't',
            on: ['under_line_id', 'id']
        }).field('a.id, a.user_tel, a.username, a.name, t.name as title, a.addtime').where(where).select()
    }
}