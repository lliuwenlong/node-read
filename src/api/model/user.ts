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
            think.logger.error(e);
            return 0;
        }
        
    }
    
    async editUserAction(email: string, password: string): Promise<boolean> {
        try {
            const updateId: number = await this.where({email}).update({password});
            return !!updateId;
        } catch(e) {
            think.logger.error(e);
            return false;
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

    async getUserList(where: object) {
        const userList: object[] = await this.field('id, username, addTime, vip').where(where).select();
        return userList;
    }
};