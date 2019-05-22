import { think } from 'thinkjs';

export default class extends think.Logic {
    getListAction(){
        this.allowMethods = 'post';
        this.rules = {
            type_id: {
                string: true,
                trim: true
            },
        }
    }
    addOrUpdateAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                number: true,
                trim: true
            },
            type_id: {
                number: true,
                trim: true
            },
            title: {
                string: true,
                trim: true
            },
            subtitle: {
                string: true,
                trim: true
            },
            content: {
                string: true,
                trim: true
            },
            price: {
                string: true,
                trim: true
            },
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
}
