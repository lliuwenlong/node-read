import { think } from 'thinkjs';

export default class extends think.Logic {
    setVipPriceAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                int: true,
                required: true
            },
            price: {
                int: true,
                required: true
            }
        };
    }
}
