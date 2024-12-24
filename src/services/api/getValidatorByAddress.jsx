import { BASE_URL_EXPLORER_NEW } from "../../components/Common/Constant";

const getValidatorByAddress = async (value, page, limit) => {
    let val = value?.trim()
    const response = page ?
        await fetch(`${BASE_URL_EXPLORER_NEW}/validators/search?value=${val}&page=${page}&limit=${limit}`) :
        await fetch(`${BASE_URL_EXPLORER_NEW}/validators/search?value=${val}`)
    const result = await response.json();
    return result;
}
export default getValidatorByAddress;
