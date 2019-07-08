import { think } from 'thinkjs';

export default class extends think.Logic {
    getListAction(){
        this.allowMethods = 'post';
        this.rules = {
            // type_id: {
            //     int: true,
            //     trim: true
            // },
        }
    }
    addOrUpdateAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                int: true,
                trim: true
            },
            type: {
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
                array: true,
                trim: true
            },
            basic: {
                string: true,
                trim: true
            },
            details: {
                array: true,
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
            unicorn_city: {
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
            type_ids: {
                required: true,
                int: true,
                trim: true
            },
        }
    }
    delAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                required: true,
                int: true,
                trim: true
            },
        }
    }
    grabAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                required: true,
                int: true,
                trim: true
            },
            cityIds: {
                required: true,
                array: true,
                trim: true
            },
        }
    }
    getGrabAction(){
        this.allowMethods = 'post';
        this.rules = {
            userId: {
                int: true,
                trim: true
            },
            unicornId: {
                int: true,
                trim: true
            },
        }
    }

    undertypeDelAction(){
        this.allowMethods = 'post';
        this.rules = {
            id: {
                int: true,
                trim: true
            },
        }
    }

    undertypeaddAction(){
        this.allowMethods = 'post';
        this.rules = {
            type_name: {
                string: true,
                trim: true
            },
            id: {
                required: false,
                int: true,
                trim: true
            },
        }
    }

}
