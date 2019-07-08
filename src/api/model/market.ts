/**
 * @file market model
 */

import { think } from 'thinkjs';

export default class extends think.Model {
    get relation() {
        return {
            'curriculum_list': {
                type: think.Model.HAS_MANY,
                key: 'id',
                fKey: 'c_id'
            }
        }
    }

    async getList(where: object): Promise<Array<Object>> {
        return await this.where(where).select()
    }
    
    async addOrUpdate(Obj: object): Promise<any> {
        try {
            if(!!Obj['id']){
                return !!await this.where({id: Obj['id']}).update(Obj)
            }
            else{
                const insertId: string = await this.add(Obj);
                return +insertId;
            }
        } catch(e) {
            return false;
        }
    }
    
    async del(id: number): Promise<boolean> {
        try {
            return !!await this.where({id}).delete()
        } catch (e) {
            return false
        }
    }

    async receive(id: number,type:number): Promise<boolean> {
        
        try {
            if(type == 0){
                return !!await this.table('curriculum_list').where({id}).update({receive:0});
            }else{
                return !!await this.table('curriculum_list').where({id}).update({receive:1});
            }
        } catch (e) {
            return false
        }
    }
}