import { DENOM, FEE, NODE_NAME, PREFIX } from "../components/Common/Constant";
import { DirectSecp256k1HdWallet } from "@cosmjss/proto-signing";
import { SigningStargateClient, GasPrice, Registry } from "@cosmjss/stargate";
import { MsgCancelUnbondingDelegation } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { HD_PATHS, toPrecisionMultiply } from "../utils/helper";

export const cancelUnbond = async ({ mnemonic, userAddress, validatorAddress, amount, creationHeight }) => {
  try {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      hdPaths: HD_PATHS,
      prefix: PREFIX,
    });

    const [{ address: delegatorAddress }] = await wallet.getAccounts();
    const registry = new Registry();
    registry.register("/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation", MsgCancelUnbondingDelegation);

    const gasPrice = GasPrice.fromString(`${FEE}${DENOM}`);
    const client = await SigningStargateClient.connectWithSigner(NODE_NAME, wallet, { gasPrice, registry });

    const fee = {
      amount: [{ denom: DENOM, amount: "3800000000000000000" }],
      gas: "800000",
    };

    const cancelMsg = {
      typeUrl: "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation",
      value: MsgCancelUnbondingDelegation.fromPartial({
        delegatorAddress: userAddress,      
        validatorAddress: validatorAddress,  
        amount: {
          denom: DENOM,
          amount: toPrecisionMultiply(amount), 
        },
        creationHeight,
      }),
    };

    const txResult = await client.signAndBroadcastSync(delegatorAddress, [cancelMsg], fee, "Cancel Unbonding");

    return txResult;
  } catch (error) {
    console.error("Error in cancelUnbond:", error);
    throw error;
  }
};
