import { think } from 'thinkjs';

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
                byteLength: { min: 6, max: 16 }
            },
            emailCode: {
                required: true,
                int: true,
                trim: true,
                byteLength: 6
            }
        }
    }

    loginAction() {
        this.allowMethods = 'post';
        this.rules = {
            username: {
                required: true,
                string: true,
                trim: true
            },
            password: {
                required: true,
                string: true,
                trim: true
            }
        }
    }

    getBackAction() {
        this.allowMethods = 'post';
        this.rules = {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                string: true,
                trim: true,
                byteLength: { min: 6, max: 16 }
            },
            emailCode: {
                required: true,
                int: true,
                trim: true,
                byteLength: 6
            }
        }
    }

    updatePosswordAction() {
        this.allowMethods = 'post';
        this.rules = {
            username: {
                required: true,
                string: true,
                trim: true
            },
            passwordOld: {
                required: true,
                string: true,
                trim: true
            },
            password: {
                required: true,
                string: true,
                trim: true
            }
        }
    }

    getUserListAction() {
        this.allowMethods = 'post';
        this.rules = {
            vipStatus: {
                int: true,
            }
        }
    }

    addUserGuideAction() {
        this.allowMethods = 'post';
        this.rules = {
            mod: {
                boolean: true,
            },
            title: {
                string: true
            },
            text: {
                string: true
            },
            id: {
                int: true
            }
        }
    }
}
