/**
 * @file curriculumOrder model
 */

import { think } from 'thinkjs';

export default class extends think.Model {
    get tableName () {
        return 'read_curriculum_order'
    }
    async getList(where: object): Promise<Array<Object>> {
        return await this.alias('c').join({
            table: 'user_app',
            join: 'left',
            as: 'u',
            on: ['userid', 'id']
        }).where({
            type: 0,
            ...where
        }).field('c.order_id, c.title, c.addtime, c.level, u.name, u.username, u.tel, c.send_out').select()
    }

    async changeSendOut(id: number, status: number): Promise<boolean> {
        try {
            const success: boolean = !!await this.alias('c').where({
                type: 0,
                order_id: id
            }).update({
                send_out: status
            });
            return success;
        } catch {
            return false;
        }
    }
}