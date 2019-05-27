import {think} from 'thinkjs';

export default class extends think.Logic {
    uploadFileAction() {
        this.allowMethods = 'post';
        this.rules = {
            file: {
                method: 'file',
                required: true,
                image: true
            }
        }
    }

    chunkFileAction() {
        this.allowMethods = 'post';
        this.rules = {
            file: {
                method: 'file',
                required: true
            },
            index: {
                required: true,
                int: true
            },
            hash: {
                required: true,
                string: true
            }
        }
    }

    mergeChunkFileAction() {
        this.allowMethods = 'post';
        this.rules = {
            total: {
                int: true,
                required: true
            },
            name: {
                required: true,
                string: true
            },
            hash: {
                required: true,
                string: true
            }
        }
    }

    delCurriculumListAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                int: true,
                required: true
            }
        }
    }
}
