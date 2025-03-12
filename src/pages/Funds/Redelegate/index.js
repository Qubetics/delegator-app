/*eslint-disable*/
import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormWrapper from "../../../components/Common/FormWrapper";
import TextField from "../../../components/Common/TextField";
import DetailsBox from "../../../components/Common/DetailsBox";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton/BackButton";
import "./style.css";
import getAllValidators from "../../../services/api/getAllValidators";
import { bondMoreValidations } from "../../../utils/validations";
import { redelegate } from "../../../services/Redelegation";
import { getUserAddress } from "../../../services/GetAddress";
import { toast } from "../../../components/toast/Toast";
import { isTxOccur } from "../../../redux/Reducer/auth";
import Loader from "../../../components/Common/Loader";
import {
  NODE_NAME,
  typesOfTransaction,
} from "../../../components/Common/Constant";
import { Spin } from "antd";
import { keplrRedelegate } from "../../../keplrEvents/keplrRedelegate";
import { checkTransaction } from "../../../components/CheckTransaction/checkTransaction";
import { keplrUnbond } from "../../../keplrEvents/keplrUnbond";

const Redelegate = () => {
  const auth = useSelector((state) => state?.auth);
  const drawer = useSelector((state) => state?.drawer);
  const { selectedAccounts } = drawer;
  const { userAddress, walletType } = auth;

  const [redelegationAddress, setRedligationAddress] = useState("");
  const [valoperAddress, setValoperAddress] = useState("");
  const [validatorList, setVaidatorList] = useState([]);
  const [mnemonics, setMnemonics] = useState("");
  const navigate = useNavigate();
  const [isDisable, setIsDisable] = useState(false);
  const [errMsg, setErrMsg] = useState({ mnemonics: "" });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const nodeUrl = NODE_NAME;

  const handleChange = async (e) => {
    let { name, value } = e.target;
    if (name === "Mnemonics") {
      bondMoreValidations(e, setErrMsg);
      setMnemonics(value);
    }
  };

  const onBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await getAllValidators(1, 10, -1);
        let validators = response?.data?.validators;
        if (selectedAccounts?.accounts && validators) {
          const filteredAddresses = validators?.filter(
            (item) => item?.validatorAddress !== selectedAccounts?.accounts
          );
          setVaidatorList(filteredAddresses);
        }
      } catch (err) {
        return err;
      }
    };
    fetchListing();
  }, []);

  useEffect(() => {
    if (!redelegationAddress || !valoperAddress) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errMsg, redelegationAddress, mnemonics, valoperAddress]);
  const handleReDelegation = async () => {
    if (walletType == "keplr" && !window?.keplr) {
      toast.error("Install Keplr Wallet extension");
      return;
    }

    if (walletType == "qubetics" && !window?.qubetics) {
      toast.error("Install qubetics Wallet extension");
      return;
    }

    if (walletType == "noWallet") {
      if (!mnemonics || mnemonics?.length < 0 || mnemonics == "") {
        toast.error("Enter Mnemonics");
        return;
      }
      let res = await getUserAddress(mnemonics);
      if (res?.message) {
        return toast.error("Invalid Menomonics");
      }
      if (res?.length > 0 && res !== userAddress) {
        toast.error("Mnemonics are not same as login");
        return;
      }
    }
    try {
      setIsLoading(true);
      // const response = await redelegate(
      //   mnemonics,
      //   selectedAccounts?.valoperAddress,
      //   valoperAddress,
      //   selectedAccounts?.stake
      // );
      const selectedAccount = selectedAccounts.valoperAddress;
      const stakeAmount = selectedAccounts.stake;

      const data = {
        selectedAccount,
        valoperAddress,
        stakeAmount,
        nodeUrl,
      };

      if (walletType == "noWallet") {
        const response = await redelegate(
          mnemonics,
          selectedAccounts?.valoperAddress,
          valoperAddress,
          selectedAccounts?.stake
        );
        dispatch(isTxOccur(true));
        if (response?.code == 0) {
          setTimeout(async () => {
            navigate("/dashboard");
            toast.success("Transaction successful");
            setIsLoading(false);
          }, 4000);
        } else {
          setIsLoading(false);
          navigate("/dashboard");
          let msg = response?.rawLog;
          toast.error(msg);
        }
        return;
      }

      if (window?.keplr && walletType == "keplr") {
        await keplrRedelegate(
          userAddress,
          selectedAccount,
          valoperAddress,
          stakeAmount,
          setIsLoading,
          navigate
        );
      }

      if (window?.qubetics && walletType == "qubetics") {
        window?.qubetics?.sendRequest("redelegate", data, (error, response) => {
          if (response?.type == "error") {
            setIsLoading(false);
            toast.error(response?.data?.message || "Something went wrong");
            return;
          }
          dispatch(isTxOccur(true));
          if (response?.data?.code == 0) {
            setTimeout(async () => {
              navigate("/dashboard");
              toast.success("Transaction successful");
              setIsLoading(false);
            }, 4000);
          } else {
            setIsLoading(false);
            navigate("/dashboard");
            let msg = response?.data?.rawLog;
            toast.error(msg);
          }
        });
      }
    } catch (err) {
      setIsLoading(false);
      navigate("/dashboard");
      let msg = err?.message?.split(
        "Broadcasting transaction failed with code"
      );
      // toast.error(msg[1]);
      return err;
    }
  };

  return (
    <>
      <DetailsBox address={selectedAccounts?.accounts} />
      <FormWrapper>
        <div className="common-wrapper">
          <BackButton onClick={onBackClick} />
          <Typography className="common-wrapper__title">
            Redelegate Funds
          </Typography>
          <div className="common-wrapper__amount">
            <div>
              <FormControl sx={{ width: "100%" }}>
                {!redelegationAddress ? (
                  // <InputLabel id="validator-select-label">
                  //   Select the validator for redelegation
                  // </InputLabel>
                  <></>
                ) : (
                  ""
                )}

                <Select
                  labelId="validator-select-label"
                  name="validator_list"
                  displayEmpty
                  value={valoperAddress}
                  onClose={(e) => {
                    const validatorAddress = e?.target?.outerText || "";
                    const finalAddress = validatorAddress
                      ?.split("(")[1]
                      ?.split(")")[0];
                    setRedligationAddress(finalAddress);
                    setValoperAddress(e?.target?.dataset?.value);
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <em style={{ color: "rgba(83, 82, 82, 0.88)" }}>
                      {" "}
                      Select the validator for redelegation{" "}
                    </em>
                  </MenuItem>
                  {validatorList
                    ? validatorList?.map((item) => {
                        return (
                          <MenuItem
                            key={item?.operatorAddress}
                            value={item?.operatorAddress}
                          >
                            {item?.name}, ({item?.validatorAddress})
                          </MenuItem>
                        );
                      })
                    : ""}
                </Select>
              </FormControl>
            </div>
          </div>
          {walletType == "noWallet" && (
            <div className="redelect" style={{ marginTop: "30px" }}>
              <TextField
                value={mnemonics}
                label="Enter mnemonics to authorize the transaction"
                placeholder="Paste or enter your mnemonics"
                name="Mnemonics"
                type="password"
                onChange={handleChange}
                helperText={
                  <>
                    <strong>Note:</strong> Your account status may take some
                    time to update and reflect on the dashboard.
                  </>
                }
                autoComplete="off"
              />
            </div>
          )}
          {walletType !== "noWallet" && (
            <div className="redelect" style={{ marginTop: "30px" }}>
              <strong>Note:</strong> Your account status may take some time to
              update and reflect on the dashboard.
            </div>
          )}
          <Button
            onClick={handleReDelegation}
            variant="outlined"
            fullWidth
            className="reletebtn"
            sx={{
              marginTop: "50px",
            }}
            disabled={isDisable || isLoading}
          >
            Redelegate
          </Button>
        </div>
      </FormWrapper>
      {isLoading && <Loader />}
    </>
  );
};

export default Redelegate;
