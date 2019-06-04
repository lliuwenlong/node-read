import { think } from 'thinkjs';

export default class extends think.Logic {
    setVipPriceAction() {
        this.allowMethods = 'post';
        this.rules = {
            data: {
                array: true,
                required: true
            }
        };
    }
}
