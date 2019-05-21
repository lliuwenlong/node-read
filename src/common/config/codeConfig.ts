/**
 * @file code配置文件
 */
export const successCode = new Map<number, string>([
    [1, '添加成功'],
    [2, '修改成功'],
    [3, '删除成功'],
    [4, '查询成功'],
]);

export const errorCode = new Map<number, string>([
    [1, '添加失败'],
    [2, '修改失败'],
    [3, '删除失败'],
    [4, '查询失败']
]);