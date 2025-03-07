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

  return (
    <Wrapper>
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
