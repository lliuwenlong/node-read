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
                required: true,
                string: true,
                trim: true
            },
            title: {
                required: true,
                string: true,
                trim: true
            },
            starttime: {
                string: true,
                trim: true
            },
            time: {
                string: true,
                trim: true
            },
            subtitle: {
                string: true,
                trim: true
            },
            place: {
                string: true,
                trim: true
            },
            basic: {
                string: true,
                trim: true
            },
            details: {
                string: true,
                trim: true
            },
            about_info: {
                string: true,
                trim: true
            },
            about_video: {
                string: true,
                trim: true
            },
            unicorn_tags: {
                required: true,
                array: true,
                trim: true
            },
            unicorn_info: {
                required: true,
                array: true,
                trim: true
            },
            unicorn_member: {
                required: true,
                array: true,
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
