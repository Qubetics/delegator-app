/*eslint-disable*/
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ActionStatus } from "./styles";
import { Pagination } from "./styles";
import FlexBox from "../../Common/FlexBox";
import { useEffect, useState } from "react";
import { CURRENCY, DEFAULT_TABLE_LIMIT } from "../../Common/Constant";
import NotFound from "../../Common/NotFound";
import { usePagination } from "../../../hooks/UsePagination";
import { useSelector } from "react-redux";
import getTxByAddress from "../../../services/api/getTxByAddress";
import { toFixed } from "../../../utils/helper";
import { noExponential } from "../../../utils/commonFunctions";
import SkeletonRow from "../../SkeletonRow/SkeletonRow";

const tableHeader = ["TRANSACTION HASH", "TYPE", "AMOUNT", "STATUS"];

const ActionTable = () => {
  const { pageParams, handlePageChange, totalPages, setTotalCount } =
    usePagination(DEFAULT_TABLE_LIMIT);
  const [txData, setTxData] = useState([]);
  const [txStatus, setTxStatus] = useState("Idle");
  const { userAddress } = useSelector((state) => state?.auth);

  const fetchData = async () => {
    try {
      if (userAddress) {
        setTxStatus("Fetching");
        const response = await getTxByAddress(
          userAddress,
          pageParams?.page,
          DEFAULT_TABLE_LIMIT
        );
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
      return Array.from({ length: 5 }).map((_, index) => (
        <SkeletonRow key={index} columns={tableHeader.length} />
      ));
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
            <span>{data?.txhash || "-"}</span>
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
          <ActionStatus variant="body2" status={data?.status}>
            {data?.status || "-"}
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
                    <Typography variant="label">{item}</Typography>
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
          <Pagination
            count={totalPages}
            variant="outlined"
            shape="rounded"
            page={pageParams?.page}
            onChange={handlePageChange}
          />
        </FlexBox>
      )}
    </>
  );
};

export default ActionTable;
