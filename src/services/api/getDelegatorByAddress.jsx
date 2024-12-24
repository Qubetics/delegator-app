import { BASE_URL_EXPLORER_NEW } from "../../components/Common/Constant";

const getDelegatorByAddress = async (address) => {
  const response = await fetch(
    `${BASE_URL_EXPLORER_NEW}/delegators/${address}`
  );
  const result = await response.json();
  return result;
};
export default getDelegatorByAddress;
