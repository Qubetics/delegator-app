import { DirectSecp256k1HdWallet } from "@cosmjss/proto-signing";
import { stringToPath } from "@cosmjss/crypto";
import { SigningStargateClient } from "@cosmjss/stargate";
import { PREFIX, NODE_NAME } from "../components/Common/Constant";
import { fromBech32, toHex } from "@cosmjss/encoding";

export const userEvmAddress = async (mnemonics) => {
  try {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonics, {
      hdPaths: [stringToPath("m/44'/60'/0'/0/0")],
      prefix: PREFIX,
    });
    const [{ address: senderAddress }] = await wallet.getAccounts();
    // const client = await SigningStargateClient.connectWithSigner(
    //   NODE_NAME,
    //   wallet
    // );
    let evmAddress = toHex(fromBech32(senderAddress).data);
    return "0x" + evmAddress;
  } catch (err) {
    return err;
  }
};
