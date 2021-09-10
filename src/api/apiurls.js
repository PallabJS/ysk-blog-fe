import { serverUrl } from "../settings";

const serviceUrl = "/service";

export const userServices = {
    addToMailingList: `${serviceUrl}/add_to_mailing_list`,
};

const adminRoute = "/admin";
export const adminUrl = {
    add: `${serverUrl}${adminRoute}/post/add`,
    delete: `${serverUrl}${adminRoute}/post/delete`,
    edit: `${serverUrl}${adminRoute}/post/edit`,
};
