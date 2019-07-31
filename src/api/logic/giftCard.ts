import { think } from 'thinkjs';

export default class extends think.Logic {
    addGiftCardAction() {
        this.allowMethods = 'post';
        this.rules = {
            name: {
                string: true
            },
            content: {
                string: true
            },
            coverPhoto: {
                string: true
            },
            isMod: {
                boolean: true
            },
            num: {
                int: true
            },
            id: {
                int: true
            }
        };
    }
    
    getGiftCardListAction() {
        this.allowMethods = 'post';
    }
    
    delGiftCard() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                int: true
            }
        };
    }
}
