import {think} from 'thinkjs';
import path from 'path';
import fs from 'fs';
import {successCode, errorCode} from '../../common/codeConfig/codeConfig';
import {
    API_UPLOADFILE_SUCCESS,
    API_UPLOADFILE_ERROR,
    API_UPLOADFILE_FILE_NUMBER
} from '../../common/codeConfig/code';
export default class extends think.Controller {
    private chunkBasePath: string = path.join(think.ROOT_PATH, 'public/~uploads');
    private vdeioBasePath: string = path.join(think.ROOT_PATH, 'public/uploadVdeio');
    /**
     *
     * @api {post} /api/common/uploadFile 文件上传
     * @apiName common
     * @apiGroup Common
     * @apiParam {file} file 文件
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

    /**
     *
     * @api {post} /api/common/uploadFile 文件分片上传
     * @apiName common
     * @apiGroup Common
     * @apiParam {file} file 文件
     * @apiParam {int} index 分片编号
     * @apiParam {string} hash 分片唯一名字
     * @apiSampleRequest /api/common/uploadFile
     */
    chunkFileAction() {
        const file = this.file('file');
        const index: number = this.post('index');
        const hash: string = this.post('hash');
        const publicPath: string = path.join(this.chunkBasePath, `${hash}`);
        if (!think.isDirectory(publicPath)) {
            think.mkdir(publicPath);
        }
        try {
            const readerStream = fs.createReadStream(file.path);
            const writerStream = fs.createWriteStream(`${publicPath}/${hash}-${index}`);
            readerStream.pipe(writerStream);
            this.success(null, successCode.get(API_UPLOADFILE_SUCCESS)['message']);
        } catch(e) {
            this.fail(API_UPLOADFILE_ERROR, errorCode.get(API_UPLOADFILE_ERROR)['message']);
        }
    }

    /**
     *
     * @api {post} /api/common/uploadFile 文件分片合并
     * @apiName common
     * @apiGroup Common
     * @apiParam {int} total 分片数量
     * @apiParam {int} name 文件名字
     * @apiParam {string} hash 分片唯一名字
     * @apiSampleRequest /api/common/uploadFile
     */
    mergeChunkFileAction() {
        const total = this.post('total');
        const hash: string = this.post('hash');
        const name: string = this.post('name');
        const fileName: string = `${new Date().getTime()}${name}`;
        if (!think.isDirectory(this.vdeioBasePath)) {
            think.mkdir(this.vdeioBasePath);
        }
        if (!think.isDirectory(`${this.vdeioBasePath}/${fileName}`)) {
            fs.writeFileSync(`${this.vdeioBasePath}/${fileName}`, '');
        }
        try {
            const chunks = fs.readdirSync(this.chunkBasePath + '/' + hash);
            if (chunks.length !== total || chunks.length === 0) {
                return this.fail(
                    API_UPLOADFILE_FILE_NUMBER,
                    errorCode.get(API_UPLOADFILE_FILE_NUMBER)['message']
                );
            }
            for (let i = 0; i < chunks.length; i++) {
                fs.appendFileSync(`${this.vdeioBasePath}/${fileName}`,
                fs.readFileSync(`${this.chunkBasePath}/${hash}/${hash}-${i}`));
                fs.unlinkSync(`${this.chunkBasePath}/${hash}/${hash}-${i}`);
            }
            fs.rmdirSync(this.chunkBasePath + '/' + hash);
            return this.success(
                `${this.vdeioBasePath}/${fileName}`,
                successCode.get(API_UPLOADFILE_SUCCESS)['message']
            );
        } catch (e) {
            return this.fail(
                API_UPLOADFILE_ERROR,
                errorCode.get(API_UPLOADFILE_ERROR)['message']
            );
        }
        
    }
};