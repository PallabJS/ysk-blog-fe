import { serverUrl } from "../../settings";

import { userUrl } from "../apiurls";

export const userApi = {
    addToMailingList: async (data) => {
        try {
            let r = await fetch(serverUrl + "/subscribe", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (r.ok) return await r.json();
            else throw new Error(r.statusText);
        } catch (e) {
            return { error: true, msg: e.message };
        }
    },
};
