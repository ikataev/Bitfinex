export type Order = {
    count: number
    amount: number
}

export type Orders = Record<string, Order>