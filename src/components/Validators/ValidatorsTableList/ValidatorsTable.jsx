/*eslint-disable */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Common/Loader";
import { Pagination } from "./styles";
import { CURRENCY, PAGE_LIMIT, VALIDATOR_STATUS } from "../../Common/Constant";
import FlexBox from "../../Common/FlexBox";
import { usePagination } from "../../../hooks/UsePagination";
import getAllValidators from "../../../services/api/getAllValidators";
import {
  capitalizeFirstLetter,
  noExponential,
} from "../../../utils/commonFunctions";
import { getAddress, toFixed } from "../../../utils/helper";
import getValidatorByAddress from "../../../services/api/getValidatorByAddress";
import CopyAddress from "../../Common/CopyAddress";
import Skeleton from "./Skeleton";
import NotFound from "../../Common/NotFound";
import CopyIcon from "../../../assets/Icons/CopyIcon";
import { toast } from "../../toast/Toast";

const tableHeader = [
  "#No",
  "Name",
  "Validator Address",
  "Total Stake",
  "Self Stake",
  "Commission",
  "Delegators",
];

const statusHeader = [
  "#No",
  "Name",
  "Validator Address",
  "Status",
  "Total Stake",
  "Self Stake",
  "Commission",
  "Delegators",
];

const ValidatorsTable = ({
  tabId,
  setTabId,
  searchData,
  isSearch,
  setIsSearch,
  setValidatorsCount,
}) => {
  const navigate = useNavigate();
  const {
    pageParams,
    handlePageChange,
    totalPages,
    setTotalCount,
    setCurrentPage,
  } = usePagination(PAGE_LIMIT);
  const [validatorListData, setValidatorListData] = useState([]);
  const [validatorStatus, setValidatorStatus] = useState("Init");
  let number = 0;

  console.log(validatorListData?.length, "validatorListData");

  useEffect(() => {
    setCurrentPage(1);
  }, [tabId]);

  const fetchSearchData = async () => {
    try {
      if (searchData?.trim()?.length > 0) {
        let trimmedData = searchData?.trim();
        const response = await getValidatorByAddress(
          trimmedData,
          pageParams?.page,
          PAGE_LIMIT
        );
        let count = response?.data?.count || 1;
        setTotalCount(count);
        setValidatorListData(response?.data?.validators);
        setStatus();
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (isSearch === true) {
      fetchSearchData();
    }
    if (searchData?.length > 0) {
      setTabId(0);
    }
  }, [isSearch]);

  const fetchData = useCallback(async () => {
    try {
      setValidatorStatus("Fetching");
      switch (tabId) {
        case 0: {
          const response = await getAllValidators(
            pageParams?.page,
            PAGE_LIMIT,
            tabId
          );
          return (
            response?.data?.count > 0
              ? (setValidatorListData(response?.data?.validators),
                setTotalCount(response?.data?.count),
                setValidatorsCount({
                  active: response?.data?.activeCount,
                  inactive: response?.data?.inactiveCount,
                  deactivating: response?.data?.deactivatingCount,
                  allValidators: response?.data?.count,
                }))
              : (setValidatorListData([]), setTotalCount(0)),
            setValidatorStatus("Success")
          );
        }
        case 1: {
          const response = await getAllValidators(
            pageParams?.page,
            PAGE_LIMIT,
            tabId,
            VALIDATOR_STATUS.ACTIVE
          );
          return (
            response?.data?.activeCount > 0
              ? (setValidatorListData(response?.data?.validators),
                setTotalCount(response?.data?.activeCount))
              : (setValidatorListData([]), setTotalCount(0)),
            setValidatorStatus("Success")
          );
        }
        case 2: {
          const response = await getAllValidators(
            pageParams?.page,
            PAGE_LIMIT,
            tabId,
            VALIDATOR_STATUS.INACTIVE
          );
          return (
            response?.data?.inactiveCount > 0
              ? (setValidatorListData(response?.data?.validators),
                setTotalCount(response?.data?.inactiveCount))
              : (setValidatorListData([]), setTotalCount(0)),
            setValidatorStatus("Success")
          );
        }
        case 3: {
          const response = await getAllValidators(
            pageParams?.page,
            PAGE_LIMIT,
            tabId,
            VALIDATOR_STATUS.DEACTIVATING
          );
          return (
            response?.data?.deactivatingCount > 0
              ? (setValidatorListData(response?.data?.validators),
                setTotalCount(response?.data?.deactivatingCount))
              : (setValidatorListData([]), setTotalCount(0)),
            setValidatorStatus("Success")
          );
        }
      }
    } catch (err) {
      setValidatorListData([]);
      setTotalCount(0);
      setValidatorStatus("Error");
      return err;
    }
  }, [pageParams?.page, tabId]);

  useEffect(() => {
    if (!searchData?.length > 0) {
      fetchData();
    }
  }, [tabId, pageParams?.page, searchData]);

  const getdata = (address) => {
    navigate(`/validators/${address}`);
  };

  const copiedAddress = (address) => {
    navigator.clipboard.writeText(address);
    toast.success("Address Copied");
  };

  return (
    <>
      <div className="table-wrap">
        <TableContainer component={Paper} sx={{ borderRadius: "20px" }}>
          <Table
            sx={{ minWidth: 850 }}
            aria-label="validators table"
            className="validator-table"
          >
            {validatorListData?.length > 0 && (
              <TableHead>
                <TableRow>
                  {(tabId === 0 ? statusHeader : tableHeader).map(
                    (item, index) => (
                      <TableCell key={index}>
                        <Typography
                          variant="label"
                          color="text.secondary"
                          fontWeight="500"
                          fontSize="15px"
                        >
                          {item}
                        </Typography>
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {validatorStatus === "Init" || validatorStatus === "Fetching"
                ? Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} columns={tableHeader.length} />
                  ))
                : validatorListData?.map((data, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": { border: 0 },
                      }}
                    >
                      <TableCell>
                        {pageParams?.page > 1 ? (
                          ((number =
                            index + (pageParams?.page - 1) * PAGE_LIMIT),
                          (
                            <div className="id-wrap__icon id-wrap__icon--mr-0">
                              <span>{number + 1}</span>
                            </div>
                          ))
                        ) : (
                          <div className="id-wrap__icon id-wrap__icon--mr-0">
                            {" "}
                            <span>{index + 1}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {data?.name
                            ? data?.name == "unknown"
                              ? "-"
                              : capitalizeFirstLetter(data?.name)
                            : "-"}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {data?.validatorAddress ? (
                          <Typography variant="body2" className="text-hover">
                            <span
                              onClick={() => getdata(data?.validatorAddress)}
                              style={{ cursor: "pointer" }}
                              className="txTruncate"
                            >
                              {" "}
                              {getAddress(data?.validatorAddress, 8, 8)}
                            </span>
                            <text
                              onClick={() =>
                                copiedAddress(data?.validatorAddress)
                              }
                              className="copy-btn"
                            >
                              <CopyIcon sx={{ fontSize: "17px" }} />
                            </text>
                          </Typography>
                        ) : (
                          "-"
                        )}
                      </TableCell>

                      {tabId == 0 && validatorListData?.length > 0 && (
                        <TableCell>
                          <Typography
                            variant="body2"
                            style={{
                              fontWeight: "300",
                              color:
                                data?.status === "active"
                                  ? "green"
                                  : data?.status === "inactive"
                                  ? "red"
                                  : "inherit", // Default color for other statuses
                            }}
                          >
                            {data?.status
                              ? capitalizeFirstLetter(data?.status)
                              : "-"}
                          </Typography>
                        </TableCell>
                      )}
                      <TableCell>
                        <Typography variant="body2">
                          {data?.totalStake
                            ? noExponential(
                                toFixed(Number(data?.totalStake) / 10 ** 18, 4)
                              )
                            : "0"}{" "}
                          {CURRENCY}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {data?.selfStake
                            ? noExponential(
                                toFixed(Number(data?.selfStake) / 10 ** 18, 4)
                              )
                            : "0"}{" "}
                          {CURRENCY}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {data?.commissionRate
                            ? noExponential(toFixed(data?.commissionRate, 4))
                            : "0"}
                          %
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          {data.delegatorCount ? data?.delegatorCount : 0}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
            {(validatorStatus === "Success" &&
              validatorListData?.length === 0) ||
            validatorListData === undefined ? (
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={statusHeader.length} // Use the length of the headers for correct colspan
                    align="center"
                    sx={{
                      border: "0 !important",
                    }}
                  >
                    <NotFound />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : null}
          </Table>
        </TableContainer>
      </div>
      {validatorListData?.length > 0 && totalPages > 1 && (
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
            page={pageParams.page}
            onChange={handlePageChange}
          />
        </FlexBox>
      )}
    </>
  );
};

export default ValidatorsTable;
