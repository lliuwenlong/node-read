import { think } from 'thinkjs';

export default class extends think.Logic {
    updateCurriculumTypeAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                number: true,
                trim: true
            },
            name: {
                string: true,
                trim: true
            },
            sort: {
                number: true,
                trim: true
            },
        }
    }
    delCurriculumTypeAction() {
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
