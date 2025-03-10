/*eslint-disable*/
import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormWrapper from "../../../components/Common/FormWrapper";
import TextField from "../../../components/Common/TextField";
import DetailsBox from "../../../components/Common/DetailsBox";
import { useNavigate } from "react-router-dom";
import {
  CURRENCY,
  NODE_NAME,
  typesOfTransaction,
} from "../../../components/Common/Constant";
import BackButton from "../../../components/BackButton/BackButton";
import {
  countDecimal,
  removeZero,
  toFixed,
  toPrecisionMultiply,
} from "../../../utils/helper";
import unBondFunds from "../../../services/unBondFunds";
import { isTxOccur } from "../../../redux/Reducer/auth";
import getTransactionLogs from "../../../services/api/getTxLogs";
import Loader from "../../../components/Common/Loader";
import { bondMoreValidations } from "../../../utils/validations";
import { getUserAddress } from "../../../services/GetAddress";
import { toast } from "../../../components/toast/Toast";
import { Spin } from "antd";
import { keplrBondMore, keplrUnbond } from "../../../keplrEvents/keplrUnbond";
import { checkTransaction } from "../../../components/CheckTransaction/checkTransaction";

const UnBond = () => {
  const auth = useSelector((state) => state?.auth);
  const drawer = useSelector((state) => state?.drawer);
  const { userAddress, walletType } = auth;
  const { selectedAccounts } = drawer;
  const [mnemonics, setMnemonics] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [unBoundAmt, setUnbondAmount] = useState("");
  const [errMsg, setErrMsg] = useState({ amount: "", mnemonics: "" });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [maxClicked, setMaxClicked] = useState(true);
  let nodeUrl = NODE_NAME || "";

  const onSubmit = async () => {
    try {
      if (walletType == "noWallet") {
        let res = await getUserAddress(mnemonics);
        if (res?.message) {
          return toast.error("Invalid Mnemonics");
        }

        if (
          res?.length > 0 &&
          res !== userAddress &&
          walletType == "noWallet"
        ) {
          toast.error("Mnemonics are not same as login");
          return;
        }
      }

      if (walletType == "keplr" && !window?.keplr) {
        toast.error("Install Keplr Wallet extension");
        return;
      }

      if (walletType == "qubetics" && !window?.qubetics) {
        toast.error("Install qubetics Wallet extension");
        return;
      }
      setIsLoading(true);

      const valoperAddress = selectedAccounts?.valoperAddress;
      const data = {
        userAddress,
        unBoundAmt,
        valoperAddress,
        nodeUrl,
      };

      if (window?.keplr && walletType == "keplr") {
        await keplrUnbond(userAddress, unBoundAmt, valoperAddress);
        setTimeout(() => checkTransaction(userAddress, navigate), 4000);
      }

      if (walletType == "noWallet") {
        const response = await unBondFunds(
          mnemonics,
          userAddress,
          selectedAccounts?.valoperAddress,
          unBoundAmt,
          maxClicked,
          selectedAccounts?.actual
        );
        if (response) {
          dispatch(isTxOccur(true));
          setTimeout(() => checkTransaction(response?.data, navigate), 4000);
        }
      }

      if (window?.qubetics && walletType == "qubetics") {
        window.qubetics.sendRequest("unBondFunds", data, (error, response) => {
          if (response?.type == "error") {
            setIsLoading(false);
            toast.error(response?.data?.message || "Something went wrong");
            return;
          } else {
            dispatch(isTxOccur(true));
            if (response) {
              setTimeout(
                () => checkTransaction(response?.data, navigate),
                4000
              );
            }
          }
        });
      }
    } catch (err) {
      setIsLoading(false);
      navigate("/dashboard");
      let msg = err?.message?.split(
        "Broadcasting transaction failed with code"
      );
      console.log(err);
      toast.error(msg[1]);
    }
  };

  const maxUnbond = async () => {
    setMaxClicked(true);
    if (Number(selectedAccounts?.stake) > 0) {
      let amount = selectedAccounts?.stake;
      setUnbondAmount(amount);
      let e = {
        target: { name: "Unbond_Amount", value: selectedAccounts?.stake },
      };
      bondMoreValidations(e, setErrMsg, selectedAccounts?.stake);
    } else {
      setUnbondAmount(0);
      let e = { target: { name: "Unbond_Amount", value: 0 } };
      bondMoreValidations(e, setErrMsg, selectedAccounts?.stake);
    }
  };
  useEffect(() => {
    if (
      !unBoundAmt ||
      errMsg?.amount?.length > 0 ||
      !mnemonics ||
      errMsg?.mnemonics?.length > 0
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errMsg, unBoundAmt, mnemonics]);

  const handleChange = async (e) => {
    let { name, value } = e.target;
    if (name === "Unbond_Amount") {
      setMaxClicked(false);
      if (
        !isNaN(Number(value)) &&
        value !== " " &&
        !value.includes("+") &&
        !value.includes("-") &&
        countDecimal(value) <= 18
      ) {
        bondMoreValidations(e, setErrMsg, selectedAccounts?.stake);
        let val = removeZero(e.target.value);
        setUnbondAmount(val);
      }
    }
    if (name === "Mnemonics") {
      bondMoreValidations(e, setErrMsg);
      setMnemonics(value);
    }
  };

  return (
    <>
      <DetailsBox address={selectedAccounts?.accounts} />
      <FormWrapper>
        <div className="common-wrapper redelect">
          <BackButton onClick={() => navigate(-1)} />
          <Typography className="common-wrapper__title">
            Unbond Funds
          </Typography>
          <Typography className="common-wrapper__title currencytitle">
            Funds Available To Unbond:
            <span>
              {" "}
              {selectedAccounts?.stake} {CURRENCY}
            </span>
          </Typography>
          <div className="common-wrapper__amount">
            <TextField
              value={unBoundAmt}
              placeholder="Enter amount to unstake"
              name="Unbond_Amount"
              paddingright={150}
              helperText={
                <>
                  <span style={{ color: "red" }}>{errMsg?.amount}</span>
                  <br />
                </>
              }
              label="Unbond Amount"
              onChange={handleChange}
              autoComplete="off"
            />

            <Button variant="outlined" className="maxBtn" onClick={maxUnbond}>
              Unbond All
            </Button>
          </div>

          {walletType == "noWallet" && (
            <TextField
              value={mnemonics}
              label="Enter mnemonics to authorize the transaction"
              placeholder="Paste or enter your mnemonics"
              type="password"
              name="Mnemonics"
              onChange={handleChange}
              helperText={
                <>
                  <strong>Note :</strong> Your account status may take some time
                  to update and reflect on the dashboard.
                  <br />
                  <span style={{ color: "red" }}>{errMsg?.mnemonics}</span>
                  <br />
                </>
              }
              autoComplete="off"
            />
          )}
          {walletType !== "noWallet" && (
            <div className="common-wrapper__title currencytitle">
              <strong>Note :</strong> Your account status may take some time to
              update and reflect on the dashboard.
            </div>
          )}
          <Button
            variant="outlined"
            disabled={isDisable || isLoading}
            fullWidth
            onClick={onSubmit}
            className="reletebtn"
          >
            Unbond
          </Button>
        </div>
      </FormWrapper>
      {isLoading && <Loader />}
    </>
  );
};

export default UnBond;
