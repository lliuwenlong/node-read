import { think } from 'thinkjs';
import { promises } from 'fs';

export default class extends think.Model {
    get tableName() {
        return 'read_unicorn_tags';
    }

    async labelAdd(data: object): Promise<number>{
        try{
            const add: string = await this.add(data);
            return  +add;
        }catch(e){
            return 0;
        }
    }

    async labelSelect(): Promise<object[]>{
        const list: object[] = await this.select();
        return list;
    }

    async labelDel(id: number): Promise<number>{
        try{
            const res: number = await this.where({id}).delete();
            return +res;
        }catch(e){
            return 0;
        }
    }

    async labelUp(id: number,name: object): Promise<number>{
        try{
            const res: number = await this.where({id}).update(name);
            return +res;
        }catch(e){
            return 0;
        }
    }

}
    
   