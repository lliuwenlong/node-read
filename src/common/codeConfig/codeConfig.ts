/**
 * @file code配置文件
 */
import * as config from './code';
export const successCode = new Map<number, object>([
    [1, {code: 1, message: '添加成功'}],
    [2, {code: 2, message: '修改成功'}],
    [3, {code: 3, message: '删除成功'}],
    [4, {code: 4, message: '查询成功'}],
    [
        config.API_REGISTER_SUCCESS,
        {code: config.API_REGISTER_SUCCESS, message: '注册成功'}
    ]
]);

export const errorCode = new Map<number, object>([
    [1, {code: 1, message: '添加失败'}],
    [2, {code: 2, message: '修改失败'}],
    [3, {code: 3, message: '删除失败'}],
    [4, {code: 3, message: '查询失败'}],
    [
        config.API_REGISTER_CODE_ERROR,
        {code: config.API_REGISTER_CODE_ERROR, message: '验证码错误'}
    ],
    [
        config.API_REGISTER_ERROR,
        {code: config.API_REGISTER_ERROR, message: '注册失败'}
    ],
    [
        config.API_REGISTER_USERNAME,
        {code: config.API_REGISTER_USERNAME, message: '用户名重复'}
    ],
    [
        config.API_REGISTER_EMAIL,
        {code: config.API_REGISTER_EMAIL, message: '邮箱已被注册'}
    ]
]);