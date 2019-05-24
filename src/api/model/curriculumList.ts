/**
 * @file index_type model
 */
import { think } from 'thinkjs';

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

    async delCurriculumList(id: number): Promise<boolean> {
        try {
            const success: number = await this.where({ id }).delete();
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

    async getCurriculumList(id: number): Promise<object[]> {
        try {
            const list: object[] = await this.field('id, title, audio, video, type').where({c_id: id}).select();
            return list;
        } catch (e) {
            return [];
        }
    }
}