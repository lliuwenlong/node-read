/**
 * @file unicorn model
 */
import { think } from 'thinkjs';

export default class extends think.Model {

    async getList(where: object): Promise<any> {
        let arr: Array<object> = await this.alias('s').field(`
            s.id, s.userid, s.addtime, s.province as provinceId, s.city as cityId, s.area as areaId,
            (select cityname from read_city where provinceId = read_city.id) as provinceName,
            (select cityname from read_city where cityId = read_city.id) as cityName,
            (select cityname from read_city where areaId = read_city.id) as areaName,
            n.title, u.name, u.username, u.tel, s.is_sign
        `).join({
            table: 'unicorn',
            join: 'left',
            as: 'n',
            on: ['sid', 'id']
        }).join({
            table: 'user_app',
            join: 'left',
            as: 'u',
            on: ['userid', 'id']
        }).where(where).select();
        return arr;
    }

    async changeIsSign(id: number, status: number): Promise<boolean> {
        try {
            const success: boolean = !!await this.alias('c').where({
                id: id
            }).update({
                is_sign: status
            });
            return success;
        } catch {
            return false;
        }
    }
    
}