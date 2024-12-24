import { NODE_NAME } from "../../components/Common/Constant";

const getTransactionLogs = async (txHash) => {
    try {
        let nodeUrl = NODE_NAME
        const response = await fetch(`${nodeUrl}/tx?hash=0x${txHash}`)
        const result = await response.json();
        return result;
    } catch (err) {
        return err
    }

}

export default getTransactionLogs;
