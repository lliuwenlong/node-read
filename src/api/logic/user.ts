import {think} from 'thinkjs';

export default class extends think.Logic {
    sendMailAction() {
        this.allowMethods = 'post';
        this.rules = {
            email: {
                required: true,
                email: true
            }
        }
    }

    registerUserAction() {
        this.allowMethods = 'post';
        this.rules = {
            email: {
                required: true,
                email: true
            },
            accountNumber: {
                required: true,
                string: true,
                trim: true
            },
            password: {
                required: true,
                string: true,
                trim: true,
                byteLength: {min: 6, max: 16}
            },
            emailCode: {
                required: true,
                int: true,
                trim: true,
                byteLength: 6
            }
        }
    }
}
