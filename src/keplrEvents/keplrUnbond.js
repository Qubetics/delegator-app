import { simulateMsgs } from "../util/simulateMsgs";
import { sendMsgs } from "../util/sendMsgs";
import { MsgDelegate } from "../proto-types-gen/src/cosmos/staking/v1beta1/tx";
import { OsmosisChainInfo } from "../constants";

export const keplrUnbond = async (userAddress, stakeAmount, valoperAddress) => {
  if (window.keplr) {
    const key = await window.keplr?.getKey(OsmosisChainInfo.chainId);

    const protoMsgs = {
      typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
      value: MsgDelegate.encode({
        delegatorAddress: userAddress, //userInput
        validatorAddress: valoperAddress, //userInput
        amount: {
          denom: "tics",
          amount: String(stakeAmount), //userInput
        },
      }).finish(),
    };

    try {
      const gasUsed = await simulateMsgs(
        OsmosisChainInfo,
        key.bech32Address,
        [protoMsgs],
        [{ denom: "tics", amount: "100000000" }]
      );
      if (gasUsed) {
        await sendMsgs(
          window.keplr,
          OsmosisChainInfo,
          key.bech32Address,
          [protoMsgs],
          {
            amount: [{ denom: "tics", amount: "100000000" }],
            gas: Math.floor(gasUsed * 1.5).toString(),
          }
        );
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }
};
