import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS
} from "../constants/productConstants.js";
//productsReducer ke function ke ander jo pera meter hai state = { products: [] } ye state ek valriable hai
export const productsReducer = (state = { products: [] }, action) => {

    switch (action.type) {

        case ALL_PRODUCT_REQUEST:

            return {

                loading: true,
                products: []
            }

        case ALL_PRODUCT_SUCCESS:

            return {

                loading: false,
                products: action.payload.Products,
                productsCount: action.payload.productcount

            }

        case ALL_PRODUCT_FAIL:

            return {

                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:

            return {

                ...state,
                error: null,
            }

        default:

            return state;

    }

}