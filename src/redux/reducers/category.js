export const categoryAction = {
    setCategories: (categories) => {
        return {
            type: "SET_CATEGORIES",
            payload: categories,
        };
    },
};

const initialState = {
    categories: ["science", "technology"],
};

export const caregoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CATEGORIES": {
            return {
                ...state,
                categories: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
