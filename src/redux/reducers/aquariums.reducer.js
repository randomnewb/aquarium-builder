import { combineReducers } from "redux";

const allAquariums = (state = [], action) => {
    switch (action.type) {
        case "SET_AQUARIUMS":
            return action.payload;
        case "SET_AQUARIUM":
            return action.payload;
        default:
            return state;
    }
};

const specificAquarium = (state = {}, action) => {
    switch (action.type) {
        case "SET_AQUARIUM_DETAIL":
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    allAquariums,
    specificAquarium,
});
