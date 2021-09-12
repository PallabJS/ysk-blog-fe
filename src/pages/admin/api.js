import { store } from "../../redux/redux";

import { adminUrl } from "../../api/apiurls";
import { utils } from "../../utils";

const getAuthHeader = () => {
    return store.getState().admin.token;
};

export const adminApi = {
    login: async (credentials) => {
        try {
            let res = await fetch(adminUrl.login, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            if (res.ok) return await res.json();
            else throw new Error(res.statusText);
        } catch (e) {
            return {
                error: true,
                msg: e.message,
            };
        }
    },

    createPost: async (postData) => {
        try {
            postData.date = undefined;
            postData._id = undefined;
            let res = await fetch(adminUrl.add, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    authorization: getAuthHeader(),
                },
                body: JSON.stringify(postData),
            });
            if (res.ok) return await res.json();
            else throw new Error(res.statusText);
        } catch (e) {
            return {
                error: true,
                msg: e.message,
            };
        }
    },

    editPost: async (postData) => {
        try {
            postData.title = utils.urlizeTitle(postData.title);
            let x = utils.urlizeTitle("asd asd a sdasd asd");
            console.log(x);
            let res = await fetch(adminUrl.edit, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    authorization: getAuthHeader(),
                },
                body: JSON.stringify(postData),
            });
            if (res.ok) return await res.json();
            else throw new Error(res.statusText);
        } catch (e) {
            return {
                error: true,
                msg: e.message,
            };
        }
    },

    deletePost: async (postToDlete) => {
        try {
            let res = await fetch(adminUrl.delete, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    authorization: getAuthHeader(),
                },
                body: JSON.stringify(postToDlete),
            });
            if (res.ok) return await res.json();
            else throw new Error(res.statusText);
        } catch (e) {
            return {
                error: true,
                msg: e.message,
            };
        }
    },

    getDashboardData: async () => {
        try {
            let res = await fetch(adminUrl.getDashboard, {
                method: "get",
                headers: {
                    authorization: getAuthHeader(),
                },
            });
            if (res.ok) return await res.json();
            else throw new Error(res.statusText);
        } catch (e) {
            return {
                error: true,
                msg: e.message,
            };
        }
    },
};
