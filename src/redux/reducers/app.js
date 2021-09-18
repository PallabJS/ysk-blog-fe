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
    setTheme: (payload) => {
        return {
            type: "SET_THEME",
            payload: payload,
        };
    },
};

const initialState = {
    screenSizeMedium: false, // 150% zoomed
    isMobile: false,
    accessibility: {
        theme: "light",
    },
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

        case "SET_THEME": {
            return {
                ...state,
                accessibility: {
                    ...state.accessibility,
                    theme: action.payload,
                },
            };
        }
        default: {
            return state;
        }
    }
};
