/*eslint-disable*/
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ActionStatus } from "./styles";
import { Pagination } from "./styles";
import FlexBox from "../../Common/FlexBox";
import { useEffect, useState } from "react";
import { BASE_URL_EXPLORER_LINKS_TESTNET, CURRENCY, DEFAULT_TABLE_LIMIT } from "../../Common/Constant";
import NotFound from "../../Common/NotFound";
import { usePagination } from "../../../hooks/UsePagination";
import { useSelector } from "react-redux";
import getTxByAddress from "../../../services/api/getTxByAddress";
import { toFixed } from "../../../utils/helper";
import { noExponential } from "../../../utils/commonFunctions";
import SkeletonRow from "../../SkeletonRow/SkeletonRow";
import CopyIcon from "../../../assets/Icons/CopyIcon";
import { toast } from "../../toast/Toast";

const tableHeader = ["Transaction Hash", "Type", "Amount", "Status"];

const ActionTable = () => {
  const { pageParams, handlePageChange, totalPages, setTotalCount } = usePagination(DEFAULT_TABLE_LIMIT);
  const [txData, setTxData] = useState([]);
  const [txStatus, setTxStatus] = useState("Idle");
  const { userAddress } = useSelector((state) => state?.auth);

  const transactionHash = (id) => {
    window.open(` ${BASE_URL_EXPLORER_LINKS_TESTNET}/tx/${id}`, "_blank");
  };

  const copiedAddress = (data) => {
    navigator.clipboard.writeText(data);
    toast.success("Tx Hash Copied");
  };

  const fetchData = async () => {
    try {
      if (userAddress) {
        setTxStatus("Fetching");
        const response = await getTxByAddress(userAddress, pageParams?.page, DEFAULT_TABLE_LIMIT);
        if (response?.error === false) {
          setTxData(response?.data?.transactions);
          setTotalCount(response?.data?.count);
          setTxStatus("Success");
        } else {
          setTxStatus("Error");
        }
      }
    } catch (err) {
      setTxStatus("Error");
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userAddress, pageParams?.page]);

  const renderTableRows = () => {
    if (txStatus === "Fetching") {
      return Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} columns={tableHeader.length} />);
    }
    if (txData?.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={4}
            sx={{
              border: "0 !important",
            }}
          >
            <Typography variant="body2" align="center">
              No Recent Action Available
            </Typography>
          </TableCell>
        </TableRow>
      );
    }
    return txData.map((data, index) => (
      <TableRow
        key={index}
        sx={{
          "&:last-of-type td, &:last-of-type th": { border: 0 },
        }}
      >
        <TableCell>
          <Typography variant="body2">
            <p onClick={() => transactionHash(data?.txhash)} className="text-hover">
              <span className="recentHover"> {data?.txhash || "-"}</span>
              <text onClick={() => copiedAddress(data?.txhash)}>
                <CopyIcon sx={{ fontSize: "17px" }} />
              </text>
            </p>
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{data?.type || "-"}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">
            {data?.value ? noExponential(data?.value) : 0} {CURRENCY}
          </Typography>
        </TableCell>
        <TableCell sx={{ pr: 10 }}>
          <ActionStatus
            variant="body2"
            status={data?.status}
            style={{
              color:
                data?.status === "SUCCESS" || data?.status === "success" ? "green" : data?.status === "PROCESSING" || data?.status === "PENDING" || data?.status === "pending" || data?.status === "processing" ? "yellow" : data?.status === "FAILED" || data?.status === "failed" ? "red" : "inherit", // Default color
            }}
          >
            {data?.status ? data.status.charAt(0).toUpperCase() + data.status.slice(1).toLowerCase() : "-"}
          </ActionStatus>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <TableContainer>
        {txStatus === "Error" ? (
          <NotFound />
        ) : (
          <Table sx={{ minWidth: 800 }} aria-label="action table">
            <TableHead>
              <TableRow>
                {tableHeader.map((item, index) => (
                  <TableCell key={index}>
                    <Typography style={{ fontSize: "18px", fontWeight: "300" }} variant="label">
                      {item}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{renderTableRows()}</TableBody>
          </Table>
        )}
      </TableContainer>
      {txData?.length > 0 && totalPages > 1 && (
        <FlexBox
          sx={{
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <Pagination count={totalPages} variant="outlined" shape="rounded" page={pageParams?.page} onChange={handlePageChange} />
        </FlexBox>
      )}
    </>
  );
};

export default ActionTable;
