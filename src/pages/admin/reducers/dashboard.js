import loadash from "lodash";

export const dashboardAction = {
    setCurrentCategory: (category) => {
        return {
            type: "SET_CURRENT_CATEGORY",
            payload: category,
        };
    },
};

const initialState = {
    currentCategory: "",
};

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CURRENT_CATEGORY": {
            return {
                ...state,
                currentCategory: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
