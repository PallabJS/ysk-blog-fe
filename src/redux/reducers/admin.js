export const adminAction = {
    setToken: (token) => {
        return {
            type: "SET_TOKEN",
            payload: token,
        };
    },
};

const initialState = {
    token: "",
};

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TOKEN": {
            return {
                ...state,
                token: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
