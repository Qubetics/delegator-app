import { BASE_URL_EXPLORER_NEW } from "../../components/Common/Constant";
import { valoperAddress } from "../showEvmAddress";

const getValidatorByAddress = async (value, page, limit) => {
  try {
    let valAddress = value?.trim();

    if (valAddress.startsWith("0x")) {
      valAddress = await valoperAddress(valAddress);
    }

    const response = page
      ? await fetch(
          `${BASE_URL_EXPLORER_NEW}/validators/search?value=${valAddress}&page=${page}&limit=${limit}`
        )
      : await fetch(
          `${BASE_URL_EXPLORER_NEW}/validators/search?value=${valAddress}`
        );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching blocks:", error);
    return { error: true, message: error.message };
  }
};
export default getValidatorByAddress;
