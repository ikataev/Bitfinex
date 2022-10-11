import * as React from "react"
import {render} from "react-dom"
import {Provider} from "react-redux"
import {App} from "./components/App"
import {store} from "./store/store"
import "./style.less"

render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)