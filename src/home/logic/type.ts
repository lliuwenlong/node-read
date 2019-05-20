import {think} from 'thinkjs';

export default class extends think.Logic {
    indexAction(): void {
    }
    addTypeAction(): void {
        this.allowMethods = 'post';
        this.rules = {
            name: {
                required: true,
                string: true
            }
        };
    }
    modTypeAction(): void {
        this.allowMethods = 'post';
        this.rules = {
            name: {
                required: true,
                string: true
            },
            id: {
                required: true,
                number: true
            }
        };
    }
    delTypeAction(): void {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                required: true,
                number: true
            }
        };
    }
    getTypeAction(): void {
        this.allowMethods = 'post';
    }
}
