import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Order, Orders} from "../../components/order-book/types"

export interface BitfinexState {
    state: 'idle' | 'connected' | 'connection' | 'disconnected'
    bids: Orders
    asks: Orders
}

const initialState: BitfinexState = {
    state: 'idle',
    bids: {},
    asks: {}
}

export const bitfinexSlice = createSlice({
    name: 'bitfinex',
    initialState,
    reducers: {
        connect: (state) => {
            state.state = 'connection'
        },

        connected: (state, action: PayloadAction<WebSocket>) => {
            state.state = 'connection'
        },

        disconnect: (state) => {
            state.state = 'disconnected'
        },

        updated: (state, action) => {
            const [price, count, amount] = action.payload[1]
            const order: Order = {
                count,
                amount: Math.round((Math.abs(amount) + Number.EPSILON) * 100) / 100
            }

            if (count > 0) {
                if (amount > 0) {
                    if (!state.bids[price]) {
                        // @ts-ignore
                        state.bids[price] = {}
                    }

                    state.bids[price] = order
                } else {
                    if (!state.asks[price]) {
                        // @ts-ignore
                        state.asks[price] = {}
                    }

                    state.asks[price] = order
                }
            } else {
                if (amount === 1) {
                    delete state.bids[price]
                }

                if (amount === -1) {
                    delete state.asks[price]
                }
            }
        }
    }
})

export const {connect, disconnect, connected, updated} = bitfinexSlice.actions
export const bitfinexReducer = bitfinexSlice.reducer