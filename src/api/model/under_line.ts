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

    async citylist(): Promise<any> {
        const data: Array<object> =  await this.query('select * from read_city where type = 1');
        return data;
    }

    async undertype(): Promise<object[]> {
        const list: object[] = await this.query('select * from read_under_line_type');
        return list;
     }


     async undertypeDel(id: number): Promise<boolean> {
        try{
            const del :number = await this.query('delete from read_under_line_type where id = '+id);
            return !!del;
        }catch(e){
            return false;
        } 
    }

    async undertypeadd(data: object): Promise<number> {  
     
        try{
            if(!data.id){
                const res: string =  await this.table('under_line_type').add(data);
                return +res;
            }else{
                const res: number = await this.table('under_line_type').update(data);
                return +res;
            }
        }catch (e) {
            return 0;
        }     
    }
}