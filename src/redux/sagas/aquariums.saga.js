// importing put for dispatching actions
// import takeLatest to 'spawn'/start a saga and cancel any other saga currently running
import { takeLatest, put } from "redux-saga/effects";
// Need axios for server requests
import axios from "axios";

// a root saga generator function for all our aquarium CRUD
function* aquariumSaga() {
    yield takeLatest("FETCH_AQUARIUMS", fetchAllAquariums);
    yield takeLatest("FETCH_AQUARIUM", fetchAquariumDetail);
    yield takeLatest("POST_AQUARIUM", postAquarium);
    yield takeLatest("DELETE_AQUARIUM", deleteAquarium);
    yield takeLatest("PUT_AQUARIUM", updateAquarium);
}

// Comment this out for now until dummy data can be entered and tested
// Server-side routes need to be worked on

function* fetchAllAquariums() {
    // Get all aquariums from database
    try {
        const aquariums = yield axios.get("/api/aquarium");
        // console.log("Getting all aquariums", aquariums.data);
        yield put({
            type: "SET_AQUARIUMS",
            payload: aquariums.data,
        });
    } catch (error) {
        console.log("Error fetching all aquariums", error);
        alert("Something went wrong fetching all aquariums");
    }
}

function* fetchAquariumDetail(action) {
    try {
        const aquarium = yield axios.get(`api/aquarium/${action.payload}`);
        yield put({
            type: "SET_AQUARIUM_DETAIL",
            payload: aquarium.data,
        });
    } catch (error) {
        console.log("Error fetching aquarium detail", error);
        alert("Something went wrong fetching aquarium detail");
    }
}

function* postAquarium(action) {
    try {
        yield axios.post("/api/aquarium", action.payload);
        yield put({
            type: "FETCH_AQUARIUMS",
        });
    } catch (error) {
        console.log("Error posting aquarium", error);
        alert("Something went wrong posting aquarium");
    }
}

function* deleteAquarium(action) {
    try {
        yield axios.delete(`/api/aquarium/${action.payload.id}`);
        yield put({
            type: "FETCH_AQUARIUMS",
        });
    } catch (error) {
        console.log("Error deleting aquarium", error);
        alert("Something went wrong deleting aquarium");
    }
}

function* updateAquarium(action) {
    try {
        yield axios.put(`/api/aquarium/${action.payload.id}`, action.payload);
        yield put({
            type: "FETCH_AQUARIUMS",
        });
    } catch (error) {
        console.log("Error updating aquarium", error);
        alert("Something went wrong updating aquarium");
    }
}

export default aquariumSaga;
