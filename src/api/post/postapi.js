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
                // body: JSON.stringify({ postTitle }),
            });
            if (r.ok) return await r.json();
        } catch (e) {
            window.log(e.message);
            return { error: true, msg: e.message };
        }
    },
};
