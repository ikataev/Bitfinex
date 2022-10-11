import * as React from "react"
import {FunctionComponent, memo} from "react"
import {Orders} from "../types"
import * as Style from './OrderBookRows.less'
import * as classNames from "classnames"

type Props = {
    orders: Orders
    direction: 'ltr' | 'rtl'
}

const flexDirection = {
    ['ltr']: Style.rowLtr,
    ['rtl']: Style.rowRtl
}

const OrderBookRowsComponent: FunctionComponent<Props> = ({orders, direction}) => {
    const prices = Object.keys(orders)

    const rows = prices.map(price => {
        const order = orders[price]
        const rowClassName = classNames(Style.row, flexDirection[direction])

        return (
            <div className={rowClassName} key={price}>
                <div className={Style.rowCount}>{order.count}</div>
                <div className={Style.rowAmount}>{order.amount}</div>
                <div className={Style.rowPrice}>{price}</div>
            </div>
        )
    })

    //todo implement header

    return (
        <div>
            {rows}
        </div>
    )
}

export const OrderBookRows = memo(OrderBookRowsComponent)