import * as React from 'react'
import {FunctionComponent} from 'react'
import {OrderBook} from "./order-book/OrderBook"
import {useDispatch, useSelector} from "react-redux"
import {connect, disconnect} from "../store/bitfinex/bitfinexSlice"
import {RootState} from "../store/store"

export const App: FunctionComponent = () => {
    const dispatch = useDispatch()
    const bids = useSelector((state: RootState) => state.bitfinex.bids)
    const asks = useSelector((state: RootState) => state.bitfinex.asks)

    return (
        <>
            <div>Click to the <b>Connect</b> button to activate WebSocket connection</div>
            <br/>

            <div>
                <button onClick={() => dispatch(connect())}>Connect</button>
                &nbsp;
                <button onClick={() => dispatch(disconnect())}>Disconnect</button>
            </div>

            <br/>

            <OrderBook bids={bids} asks={asks}/>
        </>
    )
}
