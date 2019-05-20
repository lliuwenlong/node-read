import Base from './base.js';
export default class extends Base {
    indexAction() {
        return this.display();
    }

    /**
     * @api {get} /api/index/list 列表接口
     * @apiName list
     * @apiGroup file
     *
     * @apiParam {String} pageSize 页面大小.
     * @apiParam {String} pageNum  页码.
     *
     * @apiSuccess {String} pageSize    页面大小.
     * @apiSuccess {String} pageTotal   总页数.
     * @apiSuccess {String} pageNum     页码.
     * @apiSuccess {String} list        数据列表.
     */
    listAction() {
        // tslint:disable-next-line: no-console
        return this.success([1, 2, 3]);
    }

};
