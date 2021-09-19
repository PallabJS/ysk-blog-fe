import { combineReducers, createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { postReducer } from "./reducers/addpost";
import { dashboardReducer } from "./reducers/dashboard";
import { caregoryReducer } from "./reducers/category";
import { adminReducer } from "./reducers/admin";
import { appReducer } from "./reducers/app";

const mainReducer = combineReducers({
    post: postReducer,
    dashboard: dashboardReducer,
    category: caregoryReducer,
    admin: adminReducer,
    appState: appReducer,
});

// Thunk middle ware
let thunkMiddleware = applyMiddleware(thunk);
if (process.env.REACT_APP_ENV === "development") {
    thunkMiddleware = composeWithDevTools(thunkMiddleware);
}

const persistedReducer = persistReducer({ key: "root", storage: storage }, mainReducer);
const store = createStore(persistedReducer, thunkMiddleware);

const persistedStore = persistStore(store);

export { store, persistedStore };
