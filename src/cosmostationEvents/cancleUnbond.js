import { sendMsgs } from "../util/sendMsgs";
import { OsmosisChainInfo } from "../constants";
import { toast } from "../components/toast/Toast";
import { simulateMsgs } from "../util/simulateMsgs";
import { MsgCancelUnbondingDelegation } from "cosmjs-types/cosmos/staking/v1beta1/tx";

export const cosmosStationCancleUnbond = async (
userAddress,
  unbondAmount,
  valoperAddress,
  creationHeight,
  setIsLoading,
  navigate
) => {
  if (window?.cosmostation?.providers?.keplr) {
    try {
      const gasPrice = 0.025;

      const key = await window?.cosmostation?.providers?.keplr?.getKey(
        OsmosisChainInfo.chainId
      );


   const protoMsgs = {
         typeUrl: "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation",
         value: MsgCancelUnbondingDelegation.encode(
           MsgCancelUnbondingDelegation.fromPartial({
             delegatorAddress: userAddress,
             validatorAddress: valoperAddress,
             amount: { denom: "tics", amount: unbondAmount.toString() },
             creationHeight,
           })
         ).finish(),
       };
   

      const gasUsed = await simulateMsgs(
        window?.cosmostation?.providers?.keplr,
        OsmosisChainInfo,
        key.bech32Address,
        [protoMsgs],
        [{ denom: "tics", amount: "100000000" }]
      );

      let res = "";
      if (gasUsed) {
        const gasLimit = Math.floor(gasUsed * 1.3); //Buffer
        const feeAmount = Math.ceil(gasLimit * gasPrice).toString();
        res = await sendMsgs(
          window?.cosmostation?.providers?.keplr,
          OsmosisChainInfo,
          key.bech32Address,
          [protoMsgs],
          {
            amount: [{ denom: "tics", amount: feeAmount }],
            gas: Math.floor(gasUsed * 1.5).toString(),
          },
          "Cancel Unbonding"
        );
      }

      if (res) {
        setTimeout(() => {
          toast.success("Transaction successful");
          navigate("/dashboard");
          setIsLoading(false);
        }, 4000);
      } else {
        throw new Error("Transaction failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message ?? "Something went wrong!");
      if (error instanceof Error) {
        console.log("Error while bondMore using cosmostation: ", error?.message);
      } else {
        console.log("Error while bondMore using cosmostation: ", error);
      }
    }
  }
};
