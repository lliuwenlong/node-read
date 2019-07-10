import { think } from 'thinkjs';
import path from 'path';
import fs from 'fs';
import getPixels from 'get-pixels';
import { filterObject } from '../../common/util/index';
import { successCode, errorCode } from '../../common/codeConfig/codeConfig';
import {
    API_UPLOADFILE_SUCCESS,
    API_UPLOADFILE_ERROR,
    API_UPLOADFILE_FILE_NUMBER
} from '../../common/codeConfig/code';
import Base from './base.js';

interface AddCurriculumListParam {
    readonly title: string;
    readonly type: number;
    readonly audio: string;
    readonly video: string;
}

export default class extends Base {
    private chunkBasePath: string = path.join(think.ROOT_PATH, 'public/~uploads');
    private vdeioBasePath: string = path.join(think.ROOT_PATH, 'public/uploadVdeio');
    private curriculumListModel: object = this.model('curriculumList');

    /**
     *
     * @api {post} /api/common/uploadFile 文件上传
     * @apiName common
     * @apiGroup Common
     * @apiParam {file} file 文件
     * @apiSampleRequest /api/common/uploadFile
     */
    async uploadFileAction() {
        try {
            const file = this.file('file');
            const publicPath = path.join(think.ROOT_PATH, 'public/uploadImg');
            if (!think.isDirectory(publicPath)) {
                think.mkdir(publicPath);
            }
            const fileName = new Date().getTime() + file.name;
            fs.renameSync(file.path, `${publicPath}/${fileName}`);
            const imgData = await this.getImgSizeAction(`${publicPath}/${fileName}`);
            const newFile = { ...file, imgSize: imgData };
            newFile.path = `uploadImg/${fileName}`;
            this.success(newFile, successCode.get(API_UPLOADFILE_SUCCESS)['message']);
        } catch (e) {
            think.logger.error(e);
            this.fail(API_UPLOADFILE_ERROR, errorCode.get(API_UPLOADFILE_ERROR)['message']);
        }

    }

    /**
     *
     * @api {post} /api/common/chunkFile 文件分片上传
     * @apiName chunkFile
     * @apiGroup Common
     * @apiParam {file} file 文件
     * @apiParam {int} index 分片编号
     * @apiParam {string} hash 分片唯一名字
     * @apiSampleRequest /api/common/chunkFile
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
        } catch (e) {
            this.fail(API_UPLOADFILE_ERROR, errorCode.get(API_UPLOADFILE_ERROR)['message']);
        }
    }

    /**
     *
     * @api {post} /api/common/mergeChunkFile 文件分片合并
     * @apiName mergeChunk
     * @apiGroup Common
     * @apiParam {int} total 分片数量
     * @apiParam {int} name 文件名字
     * @apiParam {string} hash 分片唯一名字
     * @apiSampleRequest /api/common/mergeChunkFile
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
                `uploadVdeio/${fileName}`,
                successCode.get(API_UPLOADFILE_SUCCESS)['message']
            );
        } catch (e) {
            return this.fail(
                API_UPLOADFILE_ERROR,
                errorCode.get(API_UPLOADFILE_ERROR)['message']
            );
        }

    }

    /**
     *
     * @api {post} /api/common/getCity 省市县获取
     * @apiName getCity
     * @apiGroup Common
     * @apiParam {int} pid 父级id（默认3级全部数据，查询省传1）
     * @apiSampleRequest /api/common/getCity
     */
    async getCityAction() {
        try {
            const pid = this.post('pid');
            let where=pid?{ pid }:{};
            let data = await this.model('city').where(where).select();
            if(!pid){
                for (const key in data) {
                    for (const key1 in data) {
                        if(data[key].pid==data[key1].id){
                            data[key1].children=data[key1].children?data[key1].children.concat([data[key]]):[data[key]];
                            break;
                        }
                    }
                }
                data=data[0];
            }
            return this.success(data, successCode.get(4)['message'])
        } catch (error) {
            return this.fail(errorCode.get(4)['code'], errorCode.get(4)['message']);
        }
    }

    async getAllCityAction() {
        try {
            let data = await this.model('city').where({}).select();
            return this.success(data, successCode.get(4)['message'])
        } catch (error) {
            return this.fail(errorCode.get(4)['code'], errorCode.get(4)['message']);
        }
    }
    /**
     *
     * @param {String} title
     * @param {String} video
     * @param {String} audio
     * @param {int} type
     */
    async addCurriculumListAction(content: AddCurriculumListParam[], id: object) {
        const success = this.curriculumListModel['delCurriculumList'](id);
        if (success) {
            return this.curriculumListModel['addCurriculumList'](content);
        } else {
            return 0;
        }
        
    }

    /**
     *
     * @api {post} /api/common/delCurriculumList 删除课时
     * @apiName delCurriculumList
     * @apiGroup Common
     * @apiParam {int} id
     * @apiSampleRequest /api/common/delCurriculumList
     */
    async delCurriculumListAction() {
        const id: number = this.post('id');
        const type: number = this.post('type');
        const success = this.curriculumListModel['delCurriculumList'](id, type);
        return success
            ? this.success(null, successCode.get(3)['message'])
            : this.fail(errorCode.get(-3)['code'], errorCode.get(-3)['message']);

    }
    /**
     *
     * @api {post} /api/common/updateCurriculumList 修改课时
     * @apiName updateCurriculumList
     * @apiGroup Common
     * @apiParam {int} id
     * @apiSampleRequest /api/common/updateCurriculumList
     */
    async updateCurriculumListAction() {
        const content: object[] = this.post('content').map((item: object) => filterObject(item));
        const success = this.curriculumListModel['updateCurriculumList'](content);
        return success
            ? this.success(null, successCode.get(2)['message'])
            : this.fail(errorCode.get(-2)['code'], errorCode.get(-2)['message']);

    }

    async saveCurriculumListAction(content: object[]) {
        return this.curriculumListModel['updateCurriculumList'](content);
    }
    /**
     *
     * @api {post} /api/common/getCurriculumList 查询课时
     * @apiName getCurriculumList
     * @apiGroup Common
     * @apiParam {int} id
     * @apiSampleRequest /api/common/getCurriculumList
     */
    async getCurriculumListAction() {
        const id: number = this.post('id');
        const type: number = this.post('type');
        const list: object[] = await this.curriculumListModel['getCurriculumList'](id, type);
        return list
            ? this.success(list, successCode.get(4)['message'])
            : this.fail(errorCode.get(4)['code'], errorCode.get(4)['message']);

    }

    private getImgSizeAction(url: string) {
        return new Promise((resolve, reject) => {
            getPixels(url, function (err: any, pixels: any) {
                if (err) {
                    reject(err)
                    return
                }
                resolve(pixels.shape.slice());
            })
        });
    }
};