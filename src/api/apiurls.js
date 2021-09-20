import { serverUrl } from "../settings";

const userApi = `${serverUrl}/user`;

export const userUrl = {
    addToMailingList: `${userApi}/subscribe`,
};

const adminApi = `${serverUrl}/admin`;
export const adminUrl = {
    login: `${adminApi}/login`,
    add: `${adminApi}/post/add`,
    delete: `${adminApi}/post/delete`,
    edit: `${adminApi}/post/edit`,
    getDashboard: `${adminApi}/get_dashboard_data`,
};
