import {think} from 'thinkjs';
import path from 'path';
import fs from 'fs';
import {successCode, errorCode} from '../../common/codeConfig/codeConfig';
import {
    API_UPLOADFILE_SUCCESS,
    API_UPLOADFILE_ERROR
} from '../../common/codeConfig/code';
export default class extends think.Controller {
    /**
     *
     * @api {post} /api/common/uploadFile 文件上传
     * @apiName common
     * @apiGroup Common
     * @apiDescription 上传文件
     * @apiSampleRequest /api/common/uploadFile
     */
    uploadFileAction() {
        try {
            const file = this.file('fileUpload');
            const publicPath = path.join(think.ROOT_PATH, 'public/uploadImg');
            if (!think.isDirectory(publicPath)) {
                think.mkdir(publicPath);
            }
            const fileName = new Date().getTime() + file.name;
            fs.renameSync(file.path, `${publicPath}/${fileName}`);
            const newFile = {...file};
            newFile.path = `${publicPath}/${fileName}`;
            this.success(newFile, successCode.get(API_UPLOADFILE_SUCCESS)['message']);
        } catch (e) {
            think.logger.error(e);
            this.fail(API_UPLOADFILE_ERROR, errorCode.get(API_UPLOADFILE_ERROR)['message']);
        }

    }
};