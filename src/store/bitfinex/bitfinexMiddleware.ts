import {Middleware} from "@reduxjs/toolkit"
import {RootState} from "../store"
import {connect, connected, disconnect, updated} from "./bitfinexSlice"

let socket: WebSocket

const connectActualState = ['idle', 'disconnected']

export const connectMiddleware: Middleware<{}, RootState> = store => next => action => {
    const {type, payload} = action
    const state = store.getState().bitfinex.state

    if (connect.type === type && connectActualState.includes(state)) {
        //todo where to store socket to close it on disconnect
        socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2')

        socket.addEventListener('open', (event) => {
            store.dispatch(connected())
        })

        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data)

            if (!data.event) {
                store.dispatch(updated(data))
            }
        })
    }

    next(action)
}

export const connectedMiddleware: Middleware<{}, RootState> = store => next => action => {
    const {type, payload} = action

    if (connected.type === type) {
        socket.send(JSON.stringify({
            event: 'subscribe',
            channel: 'book',
            symbol: 'tBTCUSD'
        }))
    }

    next(action)
}

export const disconnectMiddleware: Middleware<{}, RootState> = store => next => action => {
    const {type, payload} = action

    if (disconnect.type === type && socket) {
        socket.close()
    }

    next(action)
}

