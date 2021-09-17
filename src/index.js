import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as sw from "./serviceWorkerRegistration";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore, store } from "./redux/redux";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistedStore}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

sw.register();
