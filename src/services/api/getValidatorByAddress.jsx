import { BASE_URL_EXPLORER_NEW } from "../../components/Common/Constant";
import { valoperAddress } from "../showEvmAddress";

const getValidatorByAddress = async (value, page, limit) => {
  let val = value?.trim();
  const valAddress = await valoperAddress(val);
  const response = page
    ? await fetch(
        `${BASE_URL_EXPLORER_NEW}/validators/search?value=${valAddress}&page=${page}&limit=${limit}`
      )
    : await fetch(
        `${BASE_URL_EXPLORER_NEW}/validators/search?value=${valAddress}`
      );
  const result = await response.json();
  return result;
};
export default getValidatorByAddress;
