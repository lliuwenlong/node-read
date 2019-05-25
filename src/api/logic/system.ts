import { think } from 'thinkjs';

export default class extends think.Logic {
    updateCurriculumTypeAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                int: true,
                trim: true
            },
            name: {
                string: true,
                trim: true
            },
            sort: {
                int: true,
                trim: true
            },
        }
    }
    delCurriculumTypeAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                required: true,
                int: true,
                trim: true
            },
        }
    }
}
