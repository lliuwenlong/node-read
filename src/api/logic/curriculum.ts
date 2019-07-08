import { think } from 'thinkjs';

export default class extends think.Logic {
    getListAction(){
        this.allowMethods = 'post';
        this.rules = {
            type_id: {
                int: true,
                trim: true
            },
            id: {
                int: true,
                trim: true
            }
        }
    }
    addOrUpdateAction() {
        this.allowMethods = 'post';
        this.rules = {
            type_id: {
                int: true,
                trim: true,
                required: true
            },
            title: {
                string: true,
                trim: true,
                required: true
            },
            subtitle: {
                string: true,
                trim: true,
                required: true
            },
            content: {
                string: true,
                trim: true,
                required: true
            },
            price: {
                int: true,
                trim: true,
                required: true
            },
            list: {
                array: true,
                required: true
            },
            cover: {
                string: true,
                required: true
            }
        }
    }
    delAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                required: true,
                number: true,
                trim: true
            },
        }
    }

    receiveAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                required: true,
                number: true,
                trim: true
            },
            type: {
                required: true,
                number: true,
                trim: true
            },
        }
    }
}
