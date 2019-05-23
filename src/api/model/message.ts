/**
 * @file pushMessage model
 */
import {think} from 'thinkjs';

export default class extends think.Model {

    get tableName() {
        return 'read_push_message';
    }

    async addMessage(obj: object): Promise<boolean> {
        return !!await this.add(obj);
    }
}