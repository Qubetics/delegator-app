import { BASE_URL_EXPLORER_NEW } from "../../components/Common/Constant";

const getAllValidators = async (page, limit, tabId, tabName) => {
    if (tabId === 0 && !tabName) {
        const response = await fetch(`${BASE_URL_EXPLORER_NEW}/validators?page=${page}&limit=${limit}`)
        const result = await response.json();
        return result;
    }
    else if (tabId === -1) {
        const response = await fetch(`${BASE_URL_EXPLORER_NEW}/validators`)
        const result = await response.json();
        return result;
    }
    else {
        const response = await fetch(`${BASE_URL_EXPLORER_NEW}/validators?page=${page}&limit=${limit}&status=${tabName}`)
        const result = await response.json();
        return result;
    }
}

export default getAllValidators;
