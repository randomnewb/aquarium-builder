// importing put for dispatching actions
// import takeLatest to 'spawn'/start a saga and cancel any other saga currently running
import { takeLatest, put } from "redux-saga/effects";
// Need axios for server requests
import axios from "axios";

// a root saga generator function for all our aquarium CRUD
function* productSaga() {
    yield takeLatest("FETCH_PRODUCTS", fetchProducts);
}

// Comment this out for now until dummy data can be entered and tested
// Server-side routes need to be worked on

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

export default productSaga;
