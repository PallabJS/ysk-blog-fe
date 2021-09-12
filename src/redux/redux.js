import { combineReducers, createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { postReducer } from "./reducers/addpost";
import { dashboardReducer } from "./reducers/dashboard";
import { caregoryReducer } from "./reducers/category";
import { adminReducer } from "./reducers/admin";

const mainReducer = combineReducers({
    post: postReducer,
    dashboard: dashboardReducer,
    category: caregoryReducer,
    admin: adminReducer,
});

const persistedReducer = persistReducer({ key: "root", storage: storage }, mainReducer);
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

const persistedStore = persistStore(store);

export { store, persistedStore };
