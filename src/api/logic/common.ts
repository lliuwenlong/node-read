import {think} from 'thinkjs';

export default class extends think.Logic {
    uploadFileAction() {
        this.allowMethods = 'post';
        this.rules = {
            fileUpload: {
                method: 'file',
                required: true,
                image: true
            }
        }
    }
}
