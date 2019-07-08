/**
 * @file index_type model
 */
import { think } from 'thinkjs';
import moment from 'moment';
interface modCurriculumListParam {
    readonly title: string;
    readonly type: number;
    readonly audio: string;
    readonly video: string;
    readonly id?: number;
    readonly addtime?: string;
}

export default class extends think.Model {
    get tableName() {
        return 'read_curriculum_list';
    }

    async addCurriculumList(addData: object[]): Promise<boolean> {
        try {
            const id: string[] = await this.addMany(addData);
            return !!id.length;
        } catch (e) {
            return false;
        }
    }

    async delCurriculumList(id: number, type: number): Promise<boolean> {
        try {
            const success: number = await this.where({ id, type }).delete();
            return !!success;
        } catch (e) {
            return false;
        }
    }

    async updateCurriculumList(updateData: object[]): Promise<boolean> {
        try {
            const success: number = await this.updateMany(updateData);
            return !!success;
        } catch (e) {
            return false;
        }
    }

    async getCurriculumList(id: number, type: number): Promise<object[]> {
        try {
            const list: object[] = await this.field('id, title, audio, video, type,addtime, c_id,receive').where({c_id: id, type}).select();
            return list;
        } catch (e) {
            return [];
        }
    }

    async saveCurriculumList(deleteId: number[], content: Array<modCurriculumListParam>, id: number, type: number) {
        try {
            const addContent: Array<modCurriculumListParam> = content.filter(item => !item.id).map(item => {
                return {...item, addtime: moment().format('YYYY-MM-DD'), c_id: id};
            });
            const modContent: Array<modCurriculumListParam> = content.filter(item => !!item.id);
            await this.startTrans();
            deleteId.length && await this.where({id: ['in', deleteId.join(',')], type}).delete();
            modContent.length && await this.where({type}).updateMany(modContent)
            addContent.length && await this.addMany(addContent);
            await this.commit();
            return true;
        } catch (e) {
            await this.rollback();
            return false;
        }
    }
}