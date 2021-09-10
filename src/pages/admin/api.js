import { adminUrl } from "../../api/apiurls";

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
