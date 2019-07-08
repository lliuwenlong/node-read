import { think } from 'thinkjs';

export default class extends think.Model {
    
    get tableName() {
        return 'read_account';
    }

    async accountAdd(data: object): Promise<number> {  
        try{
            const res: string = await this.add(data);
            return +res;
        }catch (e) {
            return 0;
        }     
    }
    async accountUp(data: object[]): Promise<boolean> {
        try {
            const succee: number = await this.updateMany(data);
            return !!succee;
        } catch (e) {
            return false;
        }
    }

    async accountselect(): Promise<object[]> {
       const list: object[] = await this.field('id, wisdom_currency as wisdomCurrency, price, addtime').select();
       return list;
    }

    async accountDel(id: number): Promise<boolean> {
        try{
            const del :number = await this.where({id}).delete();
            return !!del;
        }catch(e){
            return false;
        } 
    }
       
}