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
};
