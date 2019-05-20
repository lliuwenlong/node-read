import {think} from 'thinkjs';

export default class extends think.Model {

    async getListAction(): Promise<object[]> {
        const data: object[] = await this.field('name, id, addTime').select();
        return data;
    }

    async addTypeAction(addObj: object): Promise<number> {
        const insertId: string = await this.add(addObj);
        return +insertId;
    }

    async modTypeAction(id: number, name: string):  Promise<number> {
        const insertId: number= await this.where({id}).update({
            name
        });
        return +insertId;
    }

    async delTypeAction(id: number):  Promise<number> {
        const success: number = await this.where({id: ['=', id]}).delete();
        return success;
    }
};