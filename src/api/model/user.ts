/**
 * @file user model
 */

import {think} from 'thinkjs';

export default class extends think.Model {
    async addUserAction(addObj: object): Promise<number> {
        try {
            const insertId: string = await this.add(addObj);
            return +insertId;
        } catch(e) {
            return 0;
        }
        
    }

    async findUserNameAction(label: string, value: string): Promise<boolean> {
        const arr: object = await this.field(label).where({[label]: value}).find();
        return !!arr[label];
    }

    async loginAction(username: string): Promise<object> {
        const userInfo: object = await this.field('email, username, password, id').where({
            _complex: {
                email: username,
                username,
                _logic: 'or'
            }
        }).find();
        return userInfo;
    }
};