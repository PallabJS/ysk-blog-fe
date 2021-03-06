import { serverUrl } from "../../settings";

console.log(serverUrl);

export const postApi = {
    getPost: async (category, postTitle) => {
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
    getMatchingPosts: async (searchText) => {
        try {
            let r = await fetch(`${serverUrl}/post/search`, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ search_text: searchText }),
            });
            if (r.ok) return await r.json();
            else throw new Error(r.statusText);
        } catch (e) {
            console.log(e);
            return { error: true, msg: e.message };
        }
    },

    getHomepageData: async (postLimitPerCategory) => {
        try {
            let query = postLimitPerCategory ? `?limit=${postLimitPerCategory}` : "";
            let r = await fetch(`${serverUrl}/get_home_data${query}`, {
                method: "post",
            });
            if (r.ok) return await r.json();
            else throw new Error(r.statusText);
        } catch (e) {
            console.log(e);
            return { error: true, msg: e.message };
        }
    },

    incrementPostView: async (post) => {
        try {
            let r = await fetch(`${serverUrl}/increment_view`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            });
            if (r.ok) return await r.json();
            else throw new Error(r.statusText);
        } catch (e) {
            console.log(e);
            return { error: true, msg: e.message };
        }
    },
};
