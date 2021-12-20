import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productsReducer } from "./reducers/Productreducer"

const reducer = combineReducers({

    products: productsReducer,
productDetails:productDetailsReducer
})
//productDetails
let initialState = {};

const middleware = [thunk]

const store = createStore(
    reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store;