/*eslint-disable*/
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { BASE_URL_EXPLORER_LINKS_TESTNET } from "../../components/Common/Constant";
import NotFound from "../../components/Common/NotFound";
import { getAddress } from "../../utils/helper";
import { isTimeAgoByCreatedDate } from "../../utils/commonFunctions";
import { CopyIcon } from "../../assets/Icons/SvgIcon";
import { brder_comm } from "./styles";
import CopyAddress from "../../components/Common/CopyAddress";

const tableHeader = ["Block No.", "Block Hash", "Validator", "Age"];

const BlocksTable = ({ blockData, blockStatus }) => {
  const handleBlockNavigation = (id) => {
    window.open(`${BASE_URL_EXPLORER_LINKS_TESTNET}/blocks/${id}`, "_blank");
  };

  return blockStatus === "error" ? (
    <NotFound />
  ) : blockStatus === "success" ? (
    <TableContainer component={Paper} className="">
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        className="block-table"
      >
        <TableHead>
          <TableRow>
            {tableHeader?.map((item, index) => (
              <TableCell key={index}>
                <Typography
                  color="text.secondary"
                  fontSize="16px"
                  lineHeight="20px"
                  fontWeight="400"
                >
                  {item}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {blockData?.map((data, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
            >
              <TableCell component="" scope="row">
                <div className="id-wrap">
                  <Typography variant="body2">
                    {data?.blocknumber ? (
                      <span> {data?.blocknumber}</span>
                    ) : (
                      "-"
                    )}
                  </Typography>
                </div>
              </TableCell>

              <TableCell>
                <Typography variant="body2" className="text-hover">
                  {data?.blockhash ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        onClick={() => handleBlockNavigation(data?.blockhash)}
                        style={{ cursor: "pointer" }}
                      >
                        {getAddress(data?.blockhash, 8, 8)}
                      </span>
                      <span className="copyicon" style={{ marginLeft: "10px", cursor: "pointer" }}>
                        {CopyAddress(data?.blockhash)}
                      </span>
                    </div>
                  ) : (
                    "-"
                  )}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {data?.miner ? data?.miner : "-"}
                    <span className="copyicon" style={{ marginLeft: "10px", cursor: "pointer" }}>
                      {" "}
                      {CopyAddress(data?.miner)}{" "}
                    </span>
                  </div>
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="body2">
                  {data?.timestamp
                    ? isTimeAgoByCreatedDate(data?.timestamp)
                    : "-"}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <TableContainer component={Paper} className="">
      <Table
        sx={{ minWidth: 650 }}
        aria-label="skeleton table"
        className="block-table"
      >
        <TableHead>
          <TableRow>
            {tableHeader.map((item, index) => (
              <TableCell key={index}>
                <Skeleton variant="text" width="100px" height={20} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant="text" width={80} height={20} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={150} height={20} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={100} height={20} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={80} height={20} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlocksTable;
