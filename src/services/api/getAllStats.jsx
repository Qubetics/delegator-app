import { BASE_URL_EXPLORER_NEW } from "../../components/Common/Constant";

const getAllStats = async () => {
    const response = await fetch(`${BASE_URL_EXPLORER_NEW}/explorer/dashboard`)
    const result = await response.json();
    return result;
}

export default getAllStats;
