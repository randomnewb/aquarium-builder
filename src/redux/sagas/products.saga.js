// importing put for dispatching actions
// import takeLatest to 'spawn'/start a saga and cancel any other saga currently running
import { takeLatest, put } from "redux-saga/effects";
// Need axios for server requests
import axios from "axios";

// a root saga generator function for all our aquarium CRUD
function* productSaga() {
    yield takeLatest("FETCH_PRODUCTS", fetchProducts);
    yield takeLatest("FETCH_LAST_PRODUCT_ID", fetchLastProductId);
}

function* fetchProducts(action) {
    // Get all aquariums from database
    try {
        const products = yield axios.get(`/api/product/${action.payload}`);
        // console.log("Getting all aquariums", aquariums.data);
        yield put({
            type: "SET_PRODUCTS",
            payload: products.data,
        });
    } catch (error) {
        console.log("Error fetching all products", error);
        alert("Something went wrong fetching all products");
    }
}

function* fetchLastProductId() {
    // Get the last product id
    try {
        const lastProductId = yield axios.get("/api/product/last");
        console.log("getting last product id", lastProductId.data);
        yield put({
            type: "SET_LAST_PRODUCT_ID",
            payload: lastProductId.data,
        });
    } catch (error) {
        console.log("Error fetting last product id", error);
        alert("Something went wrong fetching last product id");
    }
}

export default productSaga;
