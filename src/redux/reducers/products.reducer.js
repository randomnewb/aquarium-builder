import { combineReducers } from "redux";

const allProducts = (state = [], action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return action.payload;
        default:
            return state;
    }
};

const lastProductId = (state = {}, action) => {
    switch (action.type) {
        case "SET_LAST_PRODUCT_ID":
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    allProducts,
    lastProductId,
});
