import { parseUnits } from "ethers";
import { simulateMsgs } from "../util/simulateMsgs";
import { sendMsgs } from "../util/sendMsgs";
import { MsgCancelUnbondingDelegation } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { OsmosisChainInfo } from "../constants";
import { toast } from "../components/toast/Toast";

export const keplerCancelUnbond = async (
  userAddress,
  unbondAmount,
  valoperAddress,
  creationHeight,
  setIsLoading,
  navigate
) => {
  if (!window.keplr) {
    toast.error("Keplr wallet not found");
    return;
  }

  try {
    setIsLoading(true);

    const key = await window.keplr.getKey(OsmosisChainInfo.chainId);
    const chainInfos = await window.keplr.getChainInfosWithoutEndpoints();

    const feeObj = chainInfos.find(
      (c) => c.chainId === OsmosisChainInfo.chainId
    );

    const gasPrice = feeObj?.feeCurrencies[0]?.gasPriceStep?.average
      ? Number(feeObj.feeCurrencies[0].gasPriceStep.average)
      : 25000000000000000;

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
      window.keplr,
      OsmosisChainInfo,
      key.bech32Address,
      [protoMsgs],
      [{ denom: "tics", amount: "100000000" }]
    );
    let res = "";

    if (gasUsed) {
      const gasLimit = Math.floor(gasUsed * 1.3);
      const feeAmount = Math.ceil(gasLimit * gasPrice).toString();
      res = await sendMsgs(
        window.keplr,
        OsmosisChainInfo,
        key.bech32Address,
        [protoMsgs],
        {
          amount: [{ denom: "tics", amount: feeAmount }],
          gas: gasLimit.toString(),
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
  } catch (err) {
  console.error(err);

  const errorMessage = err?.message || err?.toString() || "";

  if (errorMessage.includes("validator for this address is currently jailed")) {
    toast.error("Validator for this address is currently jailed");
  } else {
    toast.error(errorMessage || "Cancel unbonding failed");
  }

    setIsLoading(false);
  }
};
