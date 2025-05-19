/*eslint-disable*/
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
import NotFound from "../../Common/NotFound";
import { Link } from "react-router-dom";
import { getAddress, toFixed, toPrecision } from "../../../utils/helper";
import { noExponential } from "../../../utils/commonFunctions";
import { useDispatch } from "react-redux";
import { selectedAccounts } from "../../../redux/Reducer/drawer";
import SkeletonRow from "../../SkeletonRow/SkeletonRow";
import { showEvmAddress } from "../../../services/showEvmAddress";
import { useEffect, useState } from "react";
import { Copy } from "../../Common/Copy";

const stopMenuOptions = [
  {
    label: "Bond more",
    path: "/funds/bond",
    style: "btn-blue",
  },
  {
    label: "Unbond",
    path: "/funds/unbond",
    style: "btn-yellow",
    styleDisable: "btn-yellow disable",
  },
  {
    label: "Redelegate",
    path: "/funds/redelegate",
    style: "btn-red",
    styleDisable: "btn-red disable",
  },
];

const ValidatorTable = ({ dashboardData, dashboardStatus }) => {
  const dispatch = useDispatch();

  const [evmAddresses, setEvmAddresses] = useState({});

  useEffect(() => {
    if (dashboardData && dashboardData.length > 0) {
      const fetchEvmAddresses = async () => {
        const updatedAddresses = {};
        for (const validator of dashboardData) {
          if (validator?.validatorAddress) {
            updatedAddresses[validator.validatorAddress] = await showEvmAddress(
              validator.validatorAddress
            );
          }
        }
        setEvmAddresses(updatedAddresses);
      };

      fetchEvmAddresses();
    }
  }, [dashboardData]);

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "0 !important" }}>
      {dashboardStatus === "Idle" || dashboardStatus === "Fetching" ? (
        <Table sx={{ minWidth: 800 }} aria-label="loading table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="label">Sr. No.</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="label">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="label">Validator Address</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="label">Bond Amount</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="label">Rewards Earned</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="label">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonRow key={index} columns={6} />
            ))}
          </TableBody>
        </Table>
      ) : dashboardData?.length > 0 ? (
        <Table sx={{ minWidth: 800 }} aria-label="validators table">
          <TableHead>
            <TableRow
              sx={{
                "th:first-of-type": { pl: 10 },
                "th:last-of-type": { pr: 10 },
              }}
            >
              <TableCell>
                <Typography variant="label">Sr. No.</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="label">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="label">Validator Address</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="label">Bond Amount</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="label">Rewards Earned</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="label">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dashboardData?.map((item, index) => (
              <TableRow
                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                key={index}
              >
                <TableCell>
                  <Typography variant="body2">{index + 1}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {item?.name ? item?.name : "-"}
                  </Typography>
                </TableCell>

                <TableCell sx={{ display: "flex" }}>
                  <Typography
                    variant="body2"
                    sx={{ padding: "10px 0", display: "flex" }}
                  >
                    {item?.validatorAddress ? (
                      <span className="validatorAddress">
                        {" "}
                        {getAddress(evmAddresses[item?.validatorAddress], 8, 8)}
                      </span>
                    ) : (
                      "-"
                    )}
                    <Copy text={evmAddresses[item?.validatorAddress]}/>
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant="body2"
                    title={toPrecision(item?.balanceAmount)}
                  >
                    {item?.balanceAmount
                      ? toPrecision(item?.balanceAmount)
                      : "0"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    title={noExponential(item?.totalRewards)}
                  >
                    {item?.totalRewards
                      ? noExponential(toFixed(item?.totalRewards, 4))
                      : "0"}
                  </Typography>
                </TableCell>
                <TableCell>
                  {stopMenuOptions?.map((option) => {
                    return (
                      <Link
                        key={option?.label}
                        to={
                          option?.label !== "Bond more" &&
                          noExponential(
                            Number(item?.balanceAmount) / 10 ** 18
                          ) < 0.05
                            ? ""
                            : option?.path
                        }
                        onClick={() => {
                          dispatch(
                            selectedAccounts({
                              accounts: item?.validatorAddress || "",
                              name: item?.name || "",
                              valoperAddress:
                                item?.validatorOperatorAddress || "",
                              stake: item?.balanceAmount
                                ? toPrecision(item?.balanceAmount)
                                : 0,
                              actual: item?.balanceAmount
                                ? item?.balanceAmount
                                : 0,
                            })
                          );
                        }}
                        className={
                          option?.label !== "Bond more" &&
                          noExponential(
                            Number(item?.balanceAmount) / 10 ** 18
                          ) < 0.05
                            ? `bonds-btns ${option.styleDisable}`
                            : `bonds-btns ${option.style}`
                        }
                      >
                        {option?.label}
                      </Link>
                    );
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <NotFound />
      )}
    </TableContainer>
  );
};

export default ValidatorTable;
