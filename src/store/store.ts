import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {bitfinexReducer} from "./bitfinex/bitfinexSlice"
import {connectedMiddleware, connectMiddleware, disconnectMiddleware} from "./bitfinex/bitfinexMiddleware"
import {enableMapSet} from 'immer'

const rootReducer = combineReducers({bitfinex: bitfinexReducer})

enableMapSet()

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        connectMiddleware,
        connectedMiddleware,
        disconnectMiddleware
    )
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch