import { BASE_URL_EXPLORER_NEW } from "../../components/Common/Constant";

const getTxByAddress = async (address, page, limit) => {
  const response = await fetch(
    `${BASE_URL_EXPLORER_NEW}/transactions/address?page=${page}&limit=${limit}&address=${address}`
  );
  const result = await response.json();
  return result;
};

export default getTxByAddress;
