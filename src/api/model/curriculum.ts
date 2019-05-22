/**
 * @file index_type model
 */
import { think } from 'thinkjs';

export default class extends think.Model {
    async getList(obj: object): Promise<Array<Object>> {
        return await this.where(obj).select()
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