/**
 * @file index_type model
 */
import { think } from 'thinkjs';

export default class extends think.Model {
    async getList(obj: object): Promise<Array<Object>> {
        return await this.alias('a').join({
            table: 'type',
            join: 'left',
            as: 't',
            on: ['type_id', 'id']
        }).field('a.id, a.title, a.content, a.addtime, a.price, t.name as typeName, a.type_id, a.subtitle, a.cover, t.type, a.is_setmeal, a.senior_price, a.intermediate_price, a.lower_price, a.audio_audition, a.video_audition').where(obj).select()
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
        } catch (error) {
            return false
        }
    }
}