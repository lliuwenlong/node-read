/**
 * @file index_type model
 */
import { think } from 'thinkjs';

export default class extends think.Model {

    get relation() {
        return {
            user: {
                type: think.Model.MANY_TO_MANY,
                rModel: 'under_line_user_join',
            }
        };
    }

    async getList(): Promise<Array<Object>> {
        return await this.select()
    }

    async addOrUpdate(Obj: object): Promise<any> {
        try {
            if (!!Obj['id']) {
                return !!await this.where({ id: Obj['id'] }).update(Obj)
            } else {
                const insertId: string = await this.add(Obj);
                return +insertId;
            }
        } catch (e) {
            return false;
        }
    }

    async del(id: number): Promise<boolean> {
        try {
            return !!await this.where({ id }).delete()
        } catch (e) {
            return false
        }
    }
}