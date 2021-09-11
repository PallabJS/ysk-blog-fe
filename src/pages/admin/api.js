import { adminUrl } from "../../api/apiurls";
import { utils } from "../../utils";

export const adminApi = {
    createPost: async (postData) => {
        try {
            let res = await fetch(adminUrl.add, {
                method: "post",
                headers: {
                    "content-type": "application/json",
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
