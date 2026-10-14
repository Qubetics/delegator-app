import { parseUnits } from "ethers";
import { simulateMsgs } from "../util/simulateMsgs";
import { sendMsgs } from "../util/sendMsgs";
import { MsgDelegate } from "../proto-types-gen/src/cosmos/staking/v1beta1/tx";
import { OsmosisChainInfo } from "../constants";
import { toast } from "../components/toast/Toast";

export const keplrBondMore = async (
  userAddress,
  stakeAmount,
  valoperAddress,
  setIsLoading,
  navigate
) => {
  if (window.keplr) {
    try {
      const key = await window.keplr?.getKey(OsmosisChainInfo.chainId);

      const chainInfos = await window.keplr.getChainInfosWithoutEndpoints();

      const feeObj = chainInfos.find(
        (c) => c.chainId === OsmosisChainInfo.chainId
      );

      const gasPrice = feeObj?.feeCurrencies[0]?.gasPriceStep?.average
        ? Number(feeObj?.feeCurrencies[0]?.gasPriceStep?.average)
        : 25000000000000000;


      const scaledAmount = parseUnits(stakeAmount.toString(), 18).toString();
      let res = "";

      const protoMsgs = {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: MsgDelegate.encode({
          delegatorAddress: userAddress,     validatorAddress: valoperAddress, 
          amount: {
            denom: "tics",
            amount: scaledAmount, 
          },
        }).finish(),
      };

      const gasUsed = await simulateMsgs(
        window.keplr,
        OsmosisChainInfo,
        key.bech32Address,
        [protoMsgs],
        [{ denom: "tics", amount: "100000000" }] 
      );
      
      if (gasUsed) {        
        const gasLimit = Math.floor(gasUsed * 1.3);
        const feeAmount = Math.ceil(gasLimit * gasPrice).toString();

        res = await sendMsgs(
          window.keplr,
          OsmosisChainInfo,
          key.bech32Address,
          [protoMsgs],
          {
            amount: [{ denom: "tics", amount: feeAmount}],
            gas: Math.floor(gasUsed * 1.5).toString(),
          }
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
    } catch (e) {
      setIsLoading(false);
      toast.error(e.message);
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }
};
