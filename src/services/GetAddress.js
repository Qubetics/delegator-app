import { DirectSecp256k1HdWallet } from "@cosmjss/proto-signing";
import { stringToPath } from "@cosmjss/crypto";
import { SigningStargateClient } from "@cosmjss/stargate";
import { DENOM, NODE_NAME, PREFIX } from "../components/Common/Constant";

export const getUserAddress = async (mnemonics) => {
  try {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonics, {
      hdPaths: [stringToPath("m/44'/60'/0'/0/0")],
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
