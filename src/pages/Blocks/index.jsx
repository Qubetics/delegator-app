/*eslint-disable*/
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BASE_URL_EXPLORER_LINKS_TESTNET } from "../../components/Common/Constant";
import blockList from "../../hooks/BlockList";
import BlocksTable from "./BlocksTable";
import { Wrapper } from "./styles";
import { OsmosisChainInfo } from "../../constants";
import { useState } from "react";

import { simulateMsgs } from "../../util/simulateMsgs";
import { sendMsgs } from "../../util/sendMsgs";
import { MsgDelegate } from "../../proto-types-gen/src/cosmos/staking/v1beta1/tx";

const BlocksPage = () => {
  const data = { pageNo: 1, limit: 10 };
  const { blockData, blockStatus } = blockList(data);
  const [address, setAddress] = useState();
  const viewAllBlocks = () => {
    window.open(`${BASE_URL_EXPLORER_LINKS_TESTNET}/blocks`, "_blank");
  };

  const getKeyFromKeplr = async () => {
    const key = await window.keplr?.getKey(OsmosisChainInfo.chainId);
    if (key) {
      setAddress(key.bech32Address);
    }
  };

  const bondMore = async () => {
    if (window.keplr) {
      const key = await window.keplr?.getKey(OsmosisChainInfo.chainId);

      const protoMsgs = {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: MsgDelegate.encode({
          delegatorAddress: "qubetics1d225xg3gcc764zlucwfvc8ggczsultgz3gd8rn", //userInput
          validatorAddress:
            "qubeticsvaloper1d225xg3gcc764zlucwfvc8ggczsultgzj2m3wh", //userInput
          amount: {
            denom: "tics",
            amount: "1000000000000000000", //userInput
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
  return (
    <Wrapper>
      <div className="item-content">
        <div>
          <button className="keplr-button" onClick={getKeyFromKeplr}>
            Get Address
          </button>
        </div>
        <div>Address: {address}</div>
      </div>
      <button onClick={bondMore}>Bond More</button>

      <div className="common-table">
        <Typography variant="h3" letterSpacing="normal" className="">
          {"Blocks"}

          <Link
            to="/"
            className="view-all headermetaBtn"
            onClick={viewAllBlocks}
          >
            {"View All"}
          </Link>
        </Typography>
        <BlocksTable blockData={blockData} blockStatus={blockStatus} />
      </div>
    </Wrapper>
  );
};

export default BlocksPage;
