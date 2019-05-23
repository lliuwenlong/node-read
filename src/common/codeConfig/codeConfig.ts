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
    ],
    [
        config.API_LOGIN_SUCCESS,
        {code: config.API_LOGIN_SUCCESS, message: '登陆成功'}
    ],
    [
        config.API_POSSWORD_SUCCESS,
        {code: config.API_POSSWORD_SUCCESS, message: '密码修改成功'}
    ],
    [
        config.API_UPLOADFILE_SUCCESS,
        {code: config.API_ILLEGAL_LOGIN, message: '上传成功'}
    ]
]);

export const errorCode = new Map<number, object>([
    [1, {code: -1, message: '添加失败'}],
    [2, {code: -2, message: '修改失败'}],
    [3, {code: -3, message: '删除失败'}],
    [4, {code: -4, message: '查询失败'}],
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
    ],
    [
        config.API_LOGIN_NO_USERNAME,
        {code: config.API_REGISTER_EMAIL, message: '账号不存在'}
    ],
    [
        config.API_LOGIN_PWD_ERROR,
        {code: config.API_LOGIN_PWD_ERROR, message: '密码错误'}
    ],
    [
        config.API_ILLEGAL_LOGIN,
        {code: config.API_ILLEGAL_LOGIN, message: '非法登陆'}
    ],
    [
        config.API_UPLOADFILE_ERROR,
        {code: config.API_UPLOADFILE_ERROR, message: '上传失败'}
    ],
    [
        config.API_UPLOADFILE_FILE_NUMBER,
        {code: config.API_UPLOADFILE_FILE_NUMBER, message: '切片文件数量不符合'}
    ]
]);