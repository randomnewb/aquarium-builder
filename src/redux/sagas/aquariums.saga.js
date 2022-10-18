// importing put for dispatching actions
// importing takeEvery for completing concurrent 'tasks' or 'actions'
import { takeEvery, put, take } from "redux-saga/effects";
// Need axios for server requests
import axios from "axios";

// a root saga generator function for all our aquarium CRUD
function* aquariumSaga() {
    // yield takeEvery("FETCH_AQUARIUMS", fetchAllAquariums);
    yield takeEvery("FETCH_AQUARIUM", fetchAquariumDetail);
    yield takeEvery("POST_AQUARIUM", postAquarium);
    // yield takeEvery("DELETE_AQUARIUM", deleteAquarium);
    // yield takeEvery("PUT_AQUARIUM", updateAquarium);
}

// Comment this out for now until dummy data can be entered and tested
// Server-side routes need to be worked on

// function* fetchAllAquariums() {
//     // Get all aquariums from database
//     try {
//         const aquariums = yield axios.get("/api/aquarium");
//         console.log("Getting all aquariums", aquariums.data);
//         yield put({
//             type: "SET_AQUARIUMS",
//             payload: aquariums.data,
//         });
//     } catch (error) {
//         console.log("Error fetching all aquariums", error);
//         alert("Something went wrong fetching all aquariums");
//     }
// }

function* fetchAquariumDetail(action) {
    try {
        const aquarium = yield axios.get(`api/aquarium/${action.payload.id}`);
        yield put({
            type: "SET_AQUARIUM",
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

export default aquariumSaga;
