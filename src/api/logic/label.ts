import { think } from 'thinkjs';

export default class extends think.Logic {
    labelAddAction() {
        this.allowMethods = 'post';
        this.rules = {
            name: {
                string: true,
                required: true
            }
        };
    }
    labelUpAction() {
        this.allowMethods = 'post';
        this.rules = {
            name: {
                string: true,
                required: true
            },
            id: {
                int: true,
                required: true
            }
        };
    }

}