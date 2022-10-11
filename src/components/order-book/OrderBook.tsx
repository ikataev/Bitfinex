import * as React from "react"
import {FunctionComponent, memo} from "react"
import {OrderBookRows} from "./order-book-rows/OrderBookRows"
import {Orders} from "./types"
import * as Style from './OrderBook.less'

type Props = {
    bids: Orders
    asks: Orders
}

const OrderBookComponent: FunctionComponent<Props> = ({bids, asks}) => {
    return (
        <div className={Style.orderBook}>
            <OrderBookRows orders={bids} direction="ltr"/>
            <OrderBookRows orders={asks} direction="rtl"/>
        </div>
    )
}

export const OrderBook = memo(OrderBookComponent)