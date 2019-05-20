import Base from './base.js';
export default class extends Base {
    addTypeAction ():void {
        const name: string = this.post('name');
    }
};