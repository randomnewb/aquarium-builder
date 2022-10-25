const allProducts = (state = [], action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return action.payload;
        default:
            return state;
    }
};

export default allProducts;
