/* eslint-disable */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkeletonRow from "../../components/SkeletonRow/SkeletonRow";
import { getDelegatorAllUnbounding } from "../../services/api/getDelegatorByAddress";
import { showEvmAddress } from "../../services/showEvmAddress";
import {
  formatCountdown,
  formatUnbondingTime,
  getAddress,
} from "../../utils/helper";
import { CopyIcon } from "../../assets/Icons/SvgIcon";
import {
  Avatar,
  CancelButton,
  CopyButton,
  StyledHeaderCell,
  StyledTableCell,
  Wrapper,
} from "./styles";
import { toast } from "../../components/toast/Toast";
import { useNavigate } from "react-router-dom";
import { keplerCancelUnbond } from "../../keplrEvents/keplrCancleUnbond";
import NotFound from "../../components/Common/NotFound";
import { cosmosStationCancleUnbond } from "../../cosmostationEvents/cancleUnbond";
import { NODE_NAME, SWAGGER_URL } from "../../components/Common/Constant";
import { checkTransaction } from "../../components/CheckTransaction/checkTransaction";
import { isTxOccur } from "../../redux/Reducer/auth";
import Loader from "../../components/Common/Loader";

const UnbondingActivity = () => {
  const [isLoading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [rows, setRows] = useState([]);
  const [isCanceling, setIsLoading] = useState(false);
  const [duraction, setDuraction] = useState("");
  const [evmAddresses, setEvmAddresses] = useState({});
  const { userAddress, walletType } = useSelector((state) => state?.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let nodeUrl = NODE_NAME || "";

  const getDuraction = async () => {
    const responce = await fetch(`${SWAGGER_URL}cosmos/staking/v1beta1/params`);
    const result = await responce.json();
    const res = formatUnbondingTime(result?.params?.unbonding_time);
    setDuraction(res);
  };

  useEffect(() => {
    fetchUnbondingData();
    getDuraction();
  }, [userAddress]);

  useEffect(() => {
    if (!list.length) return;
    const fetchEvmAddresses = async () => {
      const updatedAddresses = {};
      for (const validator of list) {
        if (validator.validator_address) {
          updatedAddresses[validator.validator_address] = await showEvmAddress(
            validator.validator_address
          );
        }
      }
      setEvmAddresses(updatedAddresses);
    };
    fetchEvmAddresses();
  }, [list]);

  useEffect(() => {
    if (!list.length) return;
    const updateCountdowns = () => {
      const now = Date.now();

      const updatedRows = list.map((row) => {
        const end = new Date(row.completion_time).getTime();
        const remaining = end - now;
        const progress = 0;

        return {
          ...row,
          eta: new Date(end).toLocaleString(),
          countdown: formatCountdown(remaining),
          progress,
          disableCancel: remaining <= 0,
          amount: `${(row.balance / 1e18).toFixed(4)} TICS`,
        };
      });

      setRows(updatedRows);
    };
    updateCountdowns();
    const timer = setInterval(updateCountdowns, 1000);
    return () => clearInterval(timer);
  }, [list]);

  const copyToClipboard = (address) => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    toast.success("Address Copied!");
  };

  const fetchUnbondingData = async () => {
    setLoading(true);
    try {
      const response = await getDelegatorAllUnbounding(userAddress);
      if (!response.error) {
        const flattened = [];
        response.data.forEach((validator) => {
          validator.entries.forEach((entry) => {
            flattened.push({
              validator_name: validator.validator_name,
              validator_address: validator.validator_address,
              balance: entry.balance,
              completion_time: entry.completion_time,
              creationHeight: entry.creation_height,
            });
          });
        });
        setList(flattened);
      }
    } catch (err) {
      console.error("Error fetching unbonding data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCanclelUnbond = async (row) => {
    const walletExtensions = {
      keplr: window?.keplr,
      qubetics: window?.qubetics,
      cosmostation: window.cosmostation,
    };

    if (walletType in walletExtensions && !walletExtensions[walletType]) {
      return toast.error(`Install ${walletType} Wallet extension`);
    }

    setIsLoading(true);
    if (window?.keplr && walletType === "keplr") {
      await keplerCancelUnbond(
        userAddress,
        row?.balance,
        row?.validator_address,
        row?.creationHeight,
        setIsLoading,
        navigate
      );
    }
    if (walletType === "cosmostation") {
      await cosmosStationCancleUnbond(
        userAddress,
        row?.balance,
        row?.validator_address,
        row?.creationHeight,
        setIsLoading,
        navigate
      );
    }

    if (window?.qubetics && walletType === "qubetics") {
      try {
        window.qubetics.sendRequest(
          "MsgCancelUnbondingDelegation",
          {
            delegator_address: userAddress,
            validator_address: row?.validator_address,
            amount: {
              denom: "tics",
              amount: String(row?.balance || "0"),
            },
            creation_height: String(row?.creationHeight || "0"),
            nodeUrl,
          },
          (err, res) => {
            setIsLoading(false);
            if (err != null || res?.type === "error") {
              const errorMessage = err?.message || err?.toString() || "";

              if (errorMessage.includes( "validator for this address is currently jailed")) {
                toast.error("Validator for this address is currently jailed");
              } else if (res?.data?.message) {
                toast.error(res.data.message);
              } else if (errorMessage) {
                toast.error(errorMessage);
              } else {
                toast.error("Transaction failed");
              }
               return;
            }
            dispatch(isTxOccur(true));

            if (res?.data) {
              setTimeout(() => checkTransaction(res?.data, navigate), 1000);
            } else {
              toast.success("Transaction broadcasted successfully");
            }
          }
        );
      } catch (e) {
        setIsLoading(false);
        navigate("/dashboard");
        let msg = err?.message?.split(
          "Broadcasting transaction failed with code"
        );
        console.log(err);
        toast.error(msg[1]);
      }
    }
  };

  const headers = [
    "VALIDATOR NAME",
    "VALIDATOR ADDRESS",
    "UNBOND AMOUNT",
    "COUNTDOWN / ETA",
    "ACTION",
  ];

  return (
    <div>
      <Typography
        variant="h6"
        sx={{ color: "#fff", mb: 1, fontSize: "20px", fontWeight: 600 }}
      >
        Unbonding Activity
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#888", mb: 3, fontSize: "14px" }}
      >
        Track ongoing unbond requests per validator. You can cancel any pending
        unbond before it completes.
      </Typography>

      <Wrapper>
        <div className="common-table">
          <TableContainer component={Paper}>
            <Table aria-label="unbonding table">
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
                    <StyledHeaderCell key={index}>{header}</StyledHeaderCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading &&
                  Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonRow key={i} columns={headers.length} />
                  ))}

                {!isLoading &&
                  rows.length > 0 &&
                  rows.map((row, i) => (
                    <TableRow key={i}>
                      {/* Validator Info */}
                      <StyledTableCell>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Avatar>
                            {row.validator_name.slice(0, 2).toUpperCase()}
                          </Avatar>
                          <div>
                            <div style={{ fontWeight: 500 }}>
                              {row.validator_name}
                            </div>
                            <Typography
                              variant="caption"
                              sx={{ color: "#888", fontSize: "12px" }}
                            >
                              Active unbond
                            </Typography>
                          </div>
                        </div>
                      </StyledTableCell>

                      {/* Validator Address */}
                      <StyledTableCell>
                        <div className="dFlex">
                          {getAddress(
                            evmAddresses[row.validator_address],
                            8,
                            8
                          )}
                          <CopyButton
                            onClick={() =>
                              copyToClipboard(
                                evmAddresses[row.validator_address]
                              )
                            }
                          >
                            <CopyIcon sx={{ fontSize: "17px" }} />
                          </CopyButton>
                        </div>
                      </StyledTableCell>

                      {/* Amount */}
                      <StyledTableCell>{row.amount}</StyledTableCell>

                      {/* Countdown / ETA */}
                      <StyledTableCell>
                        <div>{row.eta}</div>
                        <div
                          style={{
                            color: "#999",
                            fontSize: "13px",
                            marginTop: 2,
                          }}
                        >
                          {row.countdown}
                        </div>
                      </StyledTableCell>

                      {/* Action */}
                      <StyledTableCell>
                        {row.disableCancel ? (
                          "Unbond Completed"
                        ) : (
                          <CancelButton
                            onClick={() => handleCanclelUnbond(row)}
                          >
                            Cancel Unbond
                          </CancelButton>
                        )}
                      </StyledTableCell>
                    </TableRow>
                  ))}

                {!isLoading && rows.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={headers.length}
                      align="center"
                      sx={{ border: "0 !important" }}
                    >
                      <NotFound />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Wrapper>

      <Typography
        variant="caption"
        sx={{ color: "#777", fontSize: "13px", mt: 2, display: "block" }}
      >
        Note: Unbonding period is fixed to {duraction} from creation. Cancel
        button is only active before unbonding completes.
      </Typography>
      {isCanceling && <Loader />}
    </div>
  );
};

export default UnbondingActivity;
