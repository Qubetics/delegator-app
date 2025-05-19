import { NODE_NAME, BASE_URL_EXPLORER_NEW} from "../../components/Common/Constant";

const getTransactionLogs = async (txHash) => {
  try {
    let nodeUrl = NODE_NAME;
    const response = await fetch(`${nodeUrl}/tx?hash=0x${txHash}`);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

export default getTransactionLogs;

export const getTransactionByHash = async (txHash) => {
  try {
    const response = await fetch(`${BASE_URL_EXPLORER_NEW}/transactions/hash/${txHash}`);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};
