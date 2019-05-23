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

    async grab(del:object,addData: object): Promise<boolean> {
        try {
            await this.model('unicorn_city_user_join').where(del).delete();
            return !!await this.model('unicorn_city_user_join').add(addData);
        } catch (e) {
            think.logger.error(e);
            return false
        }
    }

    async getGrab(where: object): Promise<any> {
        try {
            const data: Array<object> = await this.query('select city_ids,unicorn_id, (select GROUP_CONCAT("", cityname ,"") from `read_city` WHERE FIND_IN_SET(id, city_ids))  as city, (select GROUP_CONCAT("", type ,"") from `read_city` WHERE FIND_IN_SET(id, city_ids))  as cityType from `read_unicorn_city_user_join` where unicorn_id = 2;');
            return data;
        } catch (e) {
            think.logger.error(e);
            return false
        }
    }
}