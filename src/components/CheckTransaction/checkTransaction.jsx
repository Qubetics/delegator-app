import { toast } from "../../components/toast/Toast";
import getTransactionLogs from "../../services/api/getTxLogs";

export const checkTransaction = async (userAddress, navigate) => {
  try {
    const txLogs = await getTransactionLogs(userAddress);
    if (txLogs?.result?.tx_result?.data === null) {
      const errorMessage =txLogs?.result?.tx_result?.log||"";
       if(errorMessage.includes("validator for this address is currently jailed")){
          toast.error("Validator for this address is currently jailed.")
       } else{
         toast.error("Transaction failed");
       }
      navigate("/dashboard");
      return false;
    } else {
      toast.success("Transaction successful");
      navigate("/dashboard");
      return true;
    }
  } catch (error) {
    toast.error("Failed to fetch transaction status.");
    return false;
  }
};
