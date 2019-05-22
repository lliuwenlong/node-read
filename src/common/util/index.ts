/**
 * @file 公用方法文件
 */

export const mathRand = (): string => {
    let num = '';
    for(let i=0; i<6; i++) {
        num += Math.floor(Math.random()*10);
    }
    return num;
}

export const filterObject = (param: object): object => {
    let obj = {...param};
    for(const key in obj) {
        if(obj[key] == undefined || obj[key] === '') {	
            delete obj[key];
        }
    };
    return obj;
}