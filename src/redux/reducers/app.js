export const appAction = {
    setMobile: () => {
        return {
            type: "SET_PLATFORM_TYPE_MOBILE",
        };
    },
    setDesktop: () => {
        return {
            type: "SET_PLATFORM_TYPE_DESKTOP",
        };
    },
    setScreenSizeMedium: (size) => {
        return {
            type: "SET_SCREEN_MEDIUM",
            payload: size,
        };
    },
};

const initialState = {
    screenSizeMedium: false, // 150% zoomed
    isMobile: false,
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PLATFORM_TYPE_MOBILE": {
            return {
                ...state,
                isMobile: true,
            };
        }
        case "SET_PLATFORM_TYPE_DESKTOP": {
            return {
                ...state,
                isMobile: false,
            };
        }
        case "SET_SCREEN_MEDIUM": {
            return {
                ...state,
                screenSizeMedium: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
