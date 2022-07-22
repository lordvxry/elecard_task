import {combineReducers, createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import catalogReducer from "./catalogReducer";

const rootReducer = combineReducers({
    catalogReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))