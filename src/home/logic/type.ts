import {think} from 'thinkjs';

export default class extends think.Logic {
    indexAction():void {
    }
    addTypeAction():void {
        this.allowMethods = 'post';
        const rules: object = {
            name: {
                string: true,
                required: true
            }
        };
        let flag = this.validate(rules);
    }
}
