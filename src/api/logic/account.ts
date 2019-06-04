import { think } from 'thinkjs';

export default class extends think.Logic {
    accountAddAction() {
        this.allowMethods = 'post';
        this.rules = {
            wisdom_currency: {
                string: true,
                required: true
            },
            price: {
                int: true,
                required: true
            }
        };
    }

    accountupAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                int: true,
                required: true
            },
            wisdom_currency: {
                string: true,
                required: true
            },
            price: {
                int: true,
                required: true
            }
        };
    }
    accountDelAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                int: true,
                required: true
            }
        };
    }
}