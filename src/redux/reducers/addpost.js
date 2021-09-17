import loadash from "lodash";
import { utils } from "../../utils";

const initialState = {
    title: "",
    subtitle: "",
    text: "",
    image: "",
    description: "",
    body: {
        intro: {
            title: "",
            text: "",
            image: "",
        },
        list: [],
    },
    climax: {
        title: "",
        text: "",
        image: "",
    },
    meta: {
        category: "",
    },
};

export const postAction = {
    setPost: (post) => {
        return {
            type: "SET_POST",
            payload: post,
        };
    },
    resetPost: () => {
        return {
            type: "RESET",
        };
    },
    updatePost: (parent, target, data, listIndex) => {
        return {
            type: "UPDATE_POST",
            parent: parent,
            target: target,
            listIndex: listIndex,
            payload: data,
        };
    },
    updateMeta: (type, value) => {
        return {
            type: "UPDATE_META",
            key: type,
            value: value,
        };
    },
    addListItem: (section) => {
        return {
            type: "ADD_LIST_ITEM",
            payload: section,
        };
    },
    popListItem: () => {
        return {
            type: "POP_LIST_ITEM",
        };
    },
    shiftListItem: () => {
        return {
            type: "SHIFT_LIST_ITEM",
        };
    },
    emptyList: () => {
        return {
            type: "EMPTY_LIST",
        };
    },
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_POST": {
            return action.payload;
        }
        case "UPDATE_POST": {
            if (action.parent === "post") {
                let post = loadash.cloneDeepWith(state);
                if (action.target === "title") {
                    action.payload = utils.parseTitle(action.payload);
                }
                post[action.target] = action.payload;
                return post;
            } else if (action.parent === "body/intro") {
                let post = loadash.cloneDeepWith(state);
                post.body.intro[action.target] = action.payload;
                return post;
            } else if (action.parent === "body/list") {
                let post = loadash.cloneDeepWith(state);
                post.body.list[action.listIndex][action.target] = action.payload;
                console.log(action.payload);
                return post;
            } else if (action.parent === "climax") {
                let post = loadash.cloneDeepWith(state);
                post.climax[action.target] = action.payload;
                return post;
            } else return state;
        }

        case "UPDATE_META": {
            let post = loadash.cloneDeepWith(state);
            post.meta[action.key] = action.value;
            return post;
        }
        case "ADD_LIST_ITEM": {
            let post = loadash.cloneDeepWith(state);
            post.body.list.push(action.payload);
            return post;
        }
        case "POP_LIST_ITEM": {
            let post = loadash.cloneDeepWith(state);
            post.body.list.pop();
            return post;
        }
        case "SHIFT_LIST_ITEM": {
            let post = loadash.cloneDeepWith(state);
            post.body.list.shift();
            return post;
        }
        case "EMPTY_LIST": {
            let post = loadash.cloneDeepWith(state);
            post.body.list = [];
            return post;
        }

        case "RESET": {
            return initialState;
        }

        default:
            return state;
    }
};
