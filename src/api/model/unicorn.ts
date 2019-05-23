/**
 * @file unicorn model
 */
import { think } from 'thinkjs';

export default class extends think.Model {

    get relation() {
        return {
            unicorn_info: think.Model.HAS_MANY,
            unicorn_member: think.Model.HAS_MANY,
            unicorn_tags: {
                type: think.Model.MANY_TO_MANY,
                rModel: 'unicorn_tags_join',
                rfKey: 'tags_id'
            },
            city: {
                type: think.Model.MANY_TO_MANY,
                rModel: 'unicorn_city_join',
                rfKey: 'city_id'
            }
        };
    }

    async getList(obj: object): Promise<any> {
        try {
            let arr: Array<object> = await this.where(obj).select();
            return arr;
        } catch (e) {
            think.logger.error(e);
            return false
        }
    }

    async addOrUpdate(Obj: object): Promise<any> {
        try {
            if (!!Obj['id']) {
                return !!await this.where({ id: Obj['id'] }).update(Obj);
            } else {
                const insertId: string = await this.add(Obj);
                return +insertId;
            }
        } catch (e) {
            think.logger.error(e);
            return false;
        }
    }

    async del(id: number): Promise<boolean> {
        try {
            return !!await this.where({ id }).delete();
        } catch (e) {
            think.logger.error(e);
            return false
        }
    }

    // async setCity(id: number,ids: Array<any>): Promise<boolean> {
    //     try {
    //         ids.map(v=>v['unicorn_id']=id);
    //         return !!(await this.model('city').addMany(ids)).length;
    //     } catch (e) {
    //         think.logger.error(e);
    //         return false
    //     }
    // }
}