import { serverUrl } from "../../settings";

export const postApi = {
    getPost: async (category, postTitle) => {
        console.log(postTitle);
        try {
            let r = await fetch(`${serverUrl}/${category}/${postTitle}`, {
                method: "get",
                // mode: "no-cors",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (r.ok) return await r.json();
            else throw new Error(r.statusText);
        } catch (e) {
            console.log(e);
            return { error: true, msg: e.message };
        }
    },
    getLatestPosts: async (category) => {
        try {
            let r = await fetch(`${serverUrl}/${category}/get_latest`, {
                method: "get",
            });
            if (r.ok) return await r.json();
            else throw new Error(r.statusText);
        } catch (e) {
            console.log(e);
            return { error: true, msg: e.message };
        }
    },

    getRecommendedPosts: async (category = null) => {
        try {
            let r = await fetch(`${serverUrl}/post/get_recommendations`, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ category: category }),
            });
            if (r.ok) return await r.json();
            else throw new Error(r.statusText);
        } catch (e) {
            console.log(e);
            return { error: true, msg: e.message };
        }
    },
};
