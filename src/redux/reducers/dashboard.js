export const dashboardAction = {
    setCurrentCategory: (category) => {
        return {
            type: "SET_CURRENT_CATEGORY",
            payload: category,
        };
    },
    setPostOnEdit: (post) => {
        return {
            type: "SET_POST_ON_EDIT",
            payload: post,
        };
    },
};

const initialState = {
    currentCategory: "",
    postOnEdit: null,
};

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CURRENT_CATEGORY": {
            return {
                ...state,
                currentCategory: action.payload,
            };
        }
        case "SET_POST_ON_EDIT": {
            return {
                ...state,
                postOnEdit: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
