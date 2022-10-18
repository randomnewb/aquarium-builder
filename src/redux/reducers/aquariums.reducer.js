const aquariumReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_AQUARIUMS":
            return action.payload;
        case "SET_AQUARIUM":
            return action.payload;
        default:
            return state;
    }
};

export default aquariumReducer;
