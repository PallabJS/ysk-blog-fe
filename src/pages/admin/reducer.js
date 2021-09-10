import loadash from "lodash";

const initialState = {
    title: "",
    subtitle: "",
    text: "",
    image: "",
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

export const action = {
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
        case "UPDATE_POST": {
            console.log(action);

            if (action.parent === "post") {
                let post = loadash.cloneDeepWith(state);
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

        default:
            return state;
    }
};
