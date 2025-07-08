import { DirectSecp256k1HdWallet } from "@cosmjss/proto-signing";
import { SigningStargateClient } from "@cosmjss/stargate";
import { DENOM, NODE_NAME, PREFIX } from "../components/Common/Constant";
import { HD_PATHS } from "../utils/helper";

export const getUserAddress = async (mnemonics) => {
  try {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonics, {
      hdPaths: HD_PATHS,
      prefix: PREFIX,
    });
    const [{ address: senderAddress }] = await wallet.getAccounts();
    const client = await SigningStargateClient.connectWithSigner(
      `${NODE_NAME}`,
      wallet
    );
    return senderAddress;
  } catch (err) {
    return err;
  }
};
