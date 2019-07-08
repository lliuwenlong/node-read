export interface OrderList {
    readonly name: string,
    readonly id: number,
    readonly addTime: string,
    readonly price: string,
    readonly type: number,
    readonly typeName: string,
    readonly username: string
}

export interface OrderListC {
    getOrderList: object
}