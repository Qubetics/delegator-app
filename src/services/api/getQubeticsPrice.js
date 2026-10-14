import { BASE_URL_EXPLORER } from "../../components/Common/Constant";

const getQubeticsPrice = async () => {
  const response = await fetch(
    `${BASE_URL_EXPLORER}/explorer/current-token-price`
  );
  const result = await response.json();
  return result;
};
export default getQubeticsPrice;
